import {createClient} from 'redis';
import {log} from './log';
import {emitEvent} from '../socket-emits';
import {EventPayloads, SocketEvent} from '@hendrikytt/api-contracts/dist/sockets';

const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = process.env.REDIS_PORT || '6379';

const url = `redis://@${redisHost}:${redisPort}`;

log.info(`redis URL: ${url}`);

export const redisClientAndPublisher = createClient({
	url: url
});

export const redisSubscriber = createClient({
	url: url
});

export const initRedis = async () => {
	await redisClientAndPublisher.connect();
	await redisSubscriber.connect();
	await startSubscriber();

	redisClientAndPublisher.on('error', err => console.log('Redis Client Error', err));
	log.info('Redis client connected.');
};

export type PubSubMessage = {
	event: SocketEvent;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	payload: any;
	room: string | null;
	requestId: string | null;
}

const pubSubTopic = 'pubsub';
const startSubscriber = async () => {
	const batchTimerMs = 500;
	const buffers: Set<string> = new Set();
	let timer: NodeJS.Timeout | null = null;

	const processBuffer = async (): Promise<void> => {
		for (const buffer of buffers) {
			const pubsubMessage = JSON.parse(buffer) as PubSubMessage;
			const {
				payload,
				room,
				requestId,
				event
			} = pubsubMessage;
			await emitEvent(event, payload, room, requestId);
		}
		buffers.clear();
	};

	const addToBuffer = (message: string): void => {
		buffers.add(message);
		if (!timer) {
			timer = setTimeout(async () => {
				await processBuffer();
				timer = null;
			}, batchTimerMs);
		}
	};

	const bufferEvents: SocketEvent[] = ['users-update'];

	await redisSubscriber.subscribe(pubSubTopic, async (message) => {
		const pubsubMessage = JSON.parse(message) as PubSubMessage;
		const {
			payload,
			room,
			requestId,
			event
		} = pubsubMessage;
		const cacheKey = event.split('-')[0] as CacheKey;
		await invalidateCache(cacheKey, room);
		if (bufferEvents.includes(event)) {
			addToBuffer(message);
		} else {
			await emitEvent(event, payload, room, requestId);
		}
	});
};

export const publishToPubSub = async <E extends keyof EventPayloads>(
	event: E,
	messageData: EventPayloads[E],
	room: string | null,
	requestId: string | null
) => {
	const message: PubSubMessage = {
		event: event,
		payload: messageData,
		room: room,
		requestId: requestId
	};
	await redisClientAndPublisher.publish(pubSubTopic, JSON.stringify(message));
};

const secondsTTL = 3600;

type CacheKey = 'users' | 'plans' | 'sale' | 'transcriptions' | 'localUrl';
export type CacheId = number | string | null;

export const invalidateCache = async (key: CacheKey, id: CacheId) => {
	let cacheKey;
	if (id) {
		cacheKey = `${key}:${id}`;
	} else {
		cacheKey = key;
	}
	await redisClientAndPublisher.del(cacheKey);
};

export const getCache = async (key: CacheKey, id: CacheId) => {
	let cacheKey;
	if (id) {
		cacheKey = `${key}:${id}`;
	} else {
		cacheKey = key;
	}
	return await redisClientAndPublisher.get(cacheKey);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setCache = async (key: CacheKey, id: CacheId, value: any) => {
	let cacheKey;
	if (id) {
		cacheKey = `${key}:${id}`;
	} else {
		cacheKey = key;
	}
	return await redisClientAndPublisher.setEx(cacheKey, secondsTTL, JSON.stringify(value));
};
