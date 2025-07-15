import PromiseRouter from 'express-promise-router';
import {protectAndValidate} from '../../lib/auth';
import {getDiarizationByJobId, getDiarizationByRequestId, updateDiarizationFields} from './database';
import {log} from '../../lib/log';
import {WebHookResp} from './types';
import {publishToPubSub} from '../../lib/redis';
import {getTranscriptionByRequestId} from '../transcriptions/database';

export const diarizationRouter = PromiseRouter();

diarizationRouter.get('/by-job-id/:jobId', protectAndValidate(), async (req, res) => {
	const diarization = await getDiarizationByJobId(req.params.jobId);
	res.status(200).json(diarization);
});

diarizationRouter.get('/by-request-id/:requestId', protectAndValidate(), async (req, res) => {
	const diarization = await getDiarizationByRequestId(req.params.requestId);
	res.status(200).json(diarization);
});

diarizationRouter.post('/webhook', async (req, res) => {
	log.info(`DIARIZATION WEBHOOK: ${JSON.stringify(req.body)}`);
	const webhookData: WebHookResp = req.body;
	const updated = await updateDiarizationFields(webhookData.jobId, {
		isFinished: true,
		content: webhookData.output.diarization
	});
	if (updated) {
		const transcription = await getTranscriptionByRequestId(updated?.request_id);
		if (transcription) {
			await publishToPubSub('diarization-finished', 'update', transcription.user_id.toString(), updated.request_id);
		}
	}
	res.status(200).send({ message: 'OK' });
});