import {TranslateRequest, TranslateResponse} from '@hendrikytt/api-contracts';
import {http} from './config';

const basePath = '/translate';

export const translateText = async (translateRequest: TranslateRequest) => {
	return http.post<TranslateResponse>(basePath, {...translateRequest});
};