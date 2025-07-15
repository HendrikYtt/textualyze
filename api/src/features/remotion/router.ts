import PromiseRouter from 'express-promise-router';
import fs from 'fs';
import path from 'path';
import {RequestPayload} from '@hendrikytt/api-contracts';
import {protectAndValidate} from '../../lib/auth';
import {BadRequestError, NotFoundError} from '../../error';
import nodeFetch from 'node-fetch';
import {incrementTranscriptionExportCount} from '../transcriptions/database';
import {incomingRequestPayloadsPath} from '../../config';
import {log} from '../../lib/log';
import {Transform} from 'stream';
import {render} from './render';
import {
	getNotSignedUpUserByIpAddress,
	updateNotSignedUpUser
} from '../not-signed-up-users/database';
import {tryoutUserId} from '../users/router';
import {addIPAddress} from '../ip-addresses/service';

export const embedSubtitlesRouter = PromiseRouter();

embedSubtitlesRouter.post('/start-embedding', protectAndValidate(), async (req, res) => {
	const requestPayload = req.body as RequestPayload;
	const fileName = req.body.fileName;
	const frontendUser = req.user;
	const ipAddress = req.ip;

	const {
		requestId,
	} = requestPayload;

	try {
		const currentTranscription = frontendUser.transcriptions.find(t => t.request_id === requestId);
		if (!currentTranscription) {
			throw new NotFoundError('Transcription does not exist');
		}
		if (frontendUser.current_plan.plan_type === 'FREE' && currentTranscription?.export_count > 0) {
			throw new BadRequestError('Only in BASIC or PRO plan you can export multiple times');
		}
		if (currentTranscription.export_count >= frontendUser.current_plan.export_count_limit) {
			throw new BadRequestError('Export limit reached');
		}
		if (frontendUser.id === tryoutUserId && ipAddress) {
			const notSignedUpUser = await getNotSignedUpUserByIpAddress(ipAddress);
			if (notSignedUpUser?.has_exported) {
				throw new BadRequestError('You can\'t do this anymore');
			}
			await updateNotSignedUpUser(ipAddress, {hasExported: true});
			if (ipAddress) {
				await addIPAddress(ipAddress);
			}
		}
		await incrementTranscriptionExportCount(requestId);

		const requestPayloadPath = path.join(process.cwd(), incomingRequestPayloadsPath, `${requestId}.json`);
		await fs.promises.writeFile(requestPayloadPath, JSON.stringify(requestPayload, null, 2), 'utf8');

	} catch (e) {
		log.error(e);
		throw new BadRequestError(`${e}`);
	}
	res.status(202).send({ message: 'Request accepted, processing started.' });
	await render(requestId, frontendUser.id, fileName);
});

embedSubtitlesRouter.use('/export', protectAndValidate(), async (req, res) => {
	const url = req.query.url as string;
	const requestId = req.query.requestId as string;
	if (!url || !requestId) {
		throw new BadRequestError('URL and requestId parameters are required');
	}

	try {
		const response = await nodeFetch(url);
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const contentType = response.headers.get('Content-Type');
		if (contentType) {
			res.setHeader('Content-Type', contentType);
		} else {
			res.setHeader('Content-Type', 'text/plain');
		}

		const contentLength = response.headers.get('Content-Length');
		if (contentLength) {
			res.setHeader('Content-Length', contentLength);
		}

		// Create a Transform stream to log the progress
		let downloadedBytes = 0;
		const progressLogger = new Transform({
			transform(chunk, encoding, callback) {
				downloadedBytes += chunk.length;
				console.log(`${downloadedBytes} bytes downloaded`);
				// If there's a content length, calculate and log the percentage
				if (contentLength) {
					const percentage = (downloadedBytes / parseInt(contentLength)) * 100;
					console.log(`${percentage.toFixed(2)}% downloaded`);
				}
				this.push(chunk);
				callback();
			}
		});

		response.body.pipe(progressLogger).pipe(res);
	} catch (e) {
		log.error(e);
		throw new BadRequestError(`${e}`);
	}
});
