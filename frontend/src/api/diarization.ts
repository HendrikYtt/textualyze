import {http} from './config';
import {Diarization} from '@hendrikytt/api-contracts';

const basePath = '/diarization';

export const getDiarizationByRequestId = async (requestId: string) => {
	return http.get<Diarization>(`${basePath}/by-request-id/${requestId}`);
};