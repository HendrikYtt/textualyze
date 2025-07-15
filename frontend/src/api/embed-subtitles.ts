import {http} from './config';
import {MessageResponse, RequestPayload} from '@hendrikytt/api-contracts';

const basePath = '/embed-subtitles';

export const startEmbedding = async (requestPayload: RequestPayload, fileName: string) => {
	return http.post<MessageResponse>(`${basePath}/start-embedding`, {...requestPayload, fileName});
};
