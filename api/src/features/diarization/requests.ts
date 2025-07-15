import {PyannoteResp} from './types';
import {log} from '../../lib/log';
import {insertDiarization} from './database';

const pyannoteAIKey = 'sk_c2121286978a46849a122d9e77e322be';
const webhookUrl = 'https://textualyze.com/api/diarization/webhook';
export const createDiarization = async (audioUrl: string, requestId: string) => {
	const reqBody = {
		url: audioUrl,
		webhook: webhookUrl
	};
	const options = {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${pyannoteAIKey}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(reqBody)
	};

	try {
		const response = await fetch('https://api.pyannote.ai/v1/diarize', options);
		const data: PyannoteResp = await response.json();
		log.info(`PYANNOTE RESP: ${JSON.stringify(data)}`);
		await insertDiarization({
			request_id: requestId,
			content: null,
			job_id: data.jobId,
			is_finished: false
		});
	} catch (e) {
		log.error(`FAILED TO DIARIZE: ${e}`);
	}
};