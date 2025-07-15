import {http} from './config';
import {SaleInfo} from '@hendrikytt/api-contracts';

const basePath = '/sale-info';

export const getSaleInfo = async () => {
	return http.get<SaleInfo>(basePath);
};