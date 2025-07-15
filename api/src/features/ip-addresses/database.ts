import {IPAddress} from '@hendrikytt/api-contracts';
import {Knex} from 'knex';
import {knex} from '../../knex';

export const insertIPAddress = async (ipAddress: Omit<IPAddress, 'created_at' | 'updated_at'>, trx: Knex.Transaction | Knex = knex): Promise<IPAddress | undefined> => {
	const [result] = await trx<IPAddress>('ip_addresses').insert(ipAddress).onConflict('ip_address').merge().returning('*');
	return result;
};

export const getIPAddressByIp = async (ipAddress: string, trx: Knex.Transaction | Knex = knex): Promise<IPAddress | undefined> => {
	return trx<IPAddress>('ip_addresses').where({ip_address: ipAddress}).first();
};
