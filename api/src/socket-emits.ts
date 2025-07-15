import { EventPayloads } from '@hendrikytt/api-contracts/dist/sockets';
import {apiSocketIoServer, namespace} from './services/api';

export const emitEvent = async <E extends keyof EventPayloads>(
	eventName: E,
	data: EventPayloads[E],
	roomId: string | null,
	requestId: string | null
) => {
	const server = apiSocketIoServer.of(namespace);
	if (roomId) {
		const targetRoom = requestId
			? `${eventName}:${roomId}:${requestId}`
			: `${eventName}:${roomId}`;
		server.to(targetRoom).emit(eventName, data);
	} else {
		server.emit(eventName, data);
	}
};
