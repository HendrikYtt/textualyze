import {SaleInfo} from '@hendrikytt/api-contracts';
import {knex} from '../../knex';
import {publishToPubSub} from '../../lib/redis';

export const getSaleInfo = async (): Promise<SaleInfo | undefined> => {
	return knex<SaleInfo>('sale_info').first();
};

export const updateSaleInfo = async (saleInfo: SaleInfo): Promise<SaleInfo> => {
	const rows = await knex<SaleInfo>('sale_info').update({is_active: saleInfo.is_active, sale_end_date: saleInfo.sale_end_date}).returning('*');
	await publishToPubSub('sale-info-update', rows[0], null, null);
	return rows[0];
};