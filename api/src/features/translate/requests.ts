import {translator} from './config';
import {SourceLanguageCode, TargetLanguageCode} from 'deepl-node/dist/types';

export const getTranslation = async (vttContent: string, sourceLanguage: SourceLanguageCode, targetLanguage: TargetLanguageCode): Promise<string> => {
	const translatedText = await translator.translateText(vttContent, sourceLanguage, targetLanguage);
	return translatedText.text;
};
