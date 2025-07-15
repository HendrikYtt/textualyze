import PromiseRouter from 'express-promise-router';
import {getTranslation} from './requests';
import {protectAndValidate} from '../../lib/auth';
import {TranslateRequest, TranslateResponse} from '@hendrikytt/api-contracts';
import {BadRequestError} from '../../error';
import {addTranscriptionTranslatedLanguage, getTranscriptionByRequestId} from '../transcriptions/database';
import {SourceLanguageCode, TargetLanguageCode} from 'deepl-node/dist/types';

export const translateRouter = PromiseRouter();

translateRouter.post<unknown, TranslateResponse>('/', protectAndValidate(), async (req, res) => {
	const {
		requestId,
		sourceLanguage,
		targetLanguage,
		text
	} = req.body as TranslateRequest;

	const frontendUser = req.user;
	if (frontendUser.current_plan.plan_type !== 'PRO') {
		throw new BadRequestError('This feature is only available in PRO plan');
	}

	const transcription = await getTranscriptionByRequestId(requestId);
	if (!transcription) {
		throw new BadRequestError('Transcription does not exist');
	}
	if (transcription.translated_languages.length >= frontendUser.current_plan.translate_count_limit) {
		throw new BadRequestError('Translate limit reached');
	}

	const translatedText = await getTranslation(text, sourceLanguage as SourceLanguageCode, targetLanguage as TargetLanguageCode);
	await addTranscriptionTranslatedLanguage(requestId, targetLanguage);
	return res.status(200).send({'text': translatedText});
});