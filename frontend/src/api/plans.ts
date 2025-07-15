import {Plan} from '@hendrikytt/api-contracts';
import {http} from './config';

const basePath = '/plans';

export const getPlans = async () => {
	return http.get<Plan[]>(basePath);
};