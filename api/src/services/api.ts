import cors from 'cors';
import express from 'express';
import 'dotenv/config';
import * as http from 'http';
import {Server as SocketIoServer} from 'socket.io';
import {expressLogger, log} from '../lib/log';
import {pingRouter} from '../ping/router';
import {workerRouter} from '../features/worker/router';
import {usersCount, usersRouter} from '../features/users/router';
import {stripeRouter} from '../features/stripe/router';
import {plansRouter} from '../features/plans/router';
import {translateRouter} from '../features/translate/router';
import {saleInfoRouter} from '../features/sale-info/router';
import {embedSubtitlesRouter} from '../features/remotion/router';
import {errorHandler} from '../error';
import {initDatabase, migrate} from '../knex';
import {initRedis} from '../lib/redis';
import MailService from '../features/mailer/service';
import {emitEvent} from '../socket-emits';
import rateLimit from 'express-rate-limit';
import {userTemplatesRouter} from '../features/user-templates/router';
import {userProjectsRouter} from '../features/user-projects/router';
import {s3Router} from '../features/s3/router';
import {userFontsRouter} from '../features/user-font/router';
import {UploadCancelMessage} from '@hendrikytt/api-contracts/dist/sockets';
import {diarizationRouter} from '../features/diarization/router';
import {deployFunction, getOrCreateBucket} from '@remotion/lambda';
import {notSignedUpUsersRouter} from '../features/not-signed-up-users/router';
import {getUsersCount} from '../features/users/database';

export const podName = process.env.POD_NAME;

export const app: express.Application = express();
const port: number = parseInt(process.env.PORT || '3000');

app.set('trust proxy', 1);
const apiLimiter = rateLimit({
	windowMs: 60 * 1000, // 1min
	limit: 400, // limit each IP to 400 requests per windowMs
	message: 'Too many requests from this IP, please try again after 1 minute'
});

app.use(apiLimiter);
app.use(expressLogger);
app.use(express.json({ limit: '2048mb' }));
app.use(cors());
app.use('/ping', pingRouter);
app.use('/worker', workerRouter);
app.use('/user', usersRouter);
app.use('/stripe', stripeRouter);
app.use('/plans', plansRouter);
app.use('/translate', translateRouter);
app.use('/sale-info', saleInfoRouter);
app.use('/embed-subtitles', embedSubtitlesRouter);
app.use('/user-templates', userTemplatesRouter);
app.use('/user-projects', userProjectsRouter);
app.use('/s3', s3Router);
app.use('/user-fonts', userFontsRouter);
app.use('/diarization', diarizationRouter);
app.use('/not-signed-up-users', notSignedUpUsersRouter);

app.use(errorHandler);

const httpServer = http.createServer(app);
export const apiSocketIoServer = new SocketIoServer(httpServer, {
	cors: {
		origin: '*',
	}
});
httpServer.timeout = 600000;

// empty namespace is used for dev
export const namespace = process.env.SOCKET_IO_NAMESPACE || '';

apiSocketIoServer.of(namespace).on('connection', (socket) => {
	log.info(`Client connected: ${socket.id}`);

	socket.on('upload-cancel', async (data: UploadCancelMessage) => {
		log.info('==UPLOAD CANCEL==');
		await emitEvent('upload-cancel', data, data.room, data.data);
	});

	socket.on('joinRoom', (roomId) => {
		socket.join(roomId);
	});

	socket.on('leaveRoom', (roomId) => {
		socket.leave(roomId);
	});

	socket.on('disconnect', async (reason) => {
		log.info(`Client disconnected: ${socket.id}, Reason: ${reason}`);
	});

});

export let functionName: string;
export let bucketName: string;

export const start = async () => {
	try {
		await initRedis();
		// await updateDiarizationFields('6099732b-a6c5-482a-808a-e2b5465d745b', {
		// 	content: [
		// 		{
		// 			'speaker': 'SPEAKER_01',
		// 			'start': 0.005,
		// 			'end': 2.105
		// 		},
		// 		{
		// 			'speaker': 'SPEAKER_01',
		// 			'start': 3.065,
		// 			'end': 10.345
		// 		},
		// 		{
		// 			'speaker': 'SPEAKER_01',
		// 			'start': 11.245,
		// 			'end': 12.325
		// 		},
		// 		{
		// 			'speaker': 'SPEAKER_00',
		// 			'start': 12.985,
		// 			'end': 14.025
		// 		},
		// 		{
		// 			'speaker': 'SPEAKER_01',
		// 			'start': 14.585,
		// 			'end': 15.765
		// 		},
		// 		{
		// 			'speaker': 'SPEAKER_00',
		// 			'start': 15.845,
		// 			'end': 18.285
		// 		},
		// 		{
		// 			'speaker': 'SPEAKER_01',
		// 			'start': 17.625,
		// 			'end': 23.345
		// 		},
		// 		{
		// 			'speaker': 'SPEAKER_01',
		// 			'start': 24.325,
		// 			'end': 25.765
		// 		},
		// 		{
		// 			'speaker': 'SPEAKER_01',
		// 			'start': 25.805,
		// 			'end': 29.205
		// 		}
		// 	]
		// });

		log.info(`process.env.NODE_ENV ${process.env.NODE_ENV}`);
		process.once('SIGTERM', async () => {
			log.info('SIGTERM received');
		});
		if (process.env.NODE_ENV !== 'test') {
			httpServer.listen(port, async () => {
				const mailService = MailService.getInstance();
				await mailService.createConnection();
				log.info(`Server running at http://localhost:${port}`);
				await initDatabase();
				await migrate();
				({ functionName } = await deployFunction({
					region: 'us-east-1',
					timeoutInSeconds: 600,
					memorySizeInMb: 10240,
					createCloudWatchLogGroup: true,
					diskSizeInMb: 4096
				}));
				({ bucketName } = await getOrCreateBucket({
					region: 'us-east-1',
				}));

				usersCount.count = await getUsersCount();
				setInterval(async () => {
					usersCount.count = await getUsersCount();
				}, 10_000);

				// if (process.env.NODE_ENV === 'dev') {
				// 	await (async function () {
				// 		const listener = await ngrok.forward({
				// 			addr: 3000,
				// 			authtoken: '1TtkGtnXMWbZbTqwW8G6nxs4O3Z_3GRvDbNjrQaUusx5hNafR'
				// 		});
				// 		const localUrl = listener.url();
				// 		console.log(`Ingress established at: ${localUrl}`);
				// 		//send that url to prod endpoint
				// 		const url = 'https://textualyze.com/api/worker/set-local-url';
				// 		// const url = 'http://localhost:3000/worker/set-local-url';
				// 		const response = await nodeFetch(url, {
				// 			method: 'POST',
				// 			headers: {
				// 				'Content-Type': 'application/json',
				// 			},
				// 			body: JSON.stringify({
				// 				localUrl
				// 			}),
				// 		});
				// 		if (response.ok) {
				// 			const data = await response.json();
				// 			console.log(data);
				// 		} else {
				// 			console.log(`response status: ${response.status}`);
				// 		}
				//
				// 	})();
				// 	process.stdin.resume();
				// }
			});
		}
	} catch (error) {
		log.error(`Failed to initialize server: ${error}`);
		process.exit(1);
	}
};
