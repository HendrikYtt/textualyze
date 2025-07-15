import nodeFetch from 'node-fetch';
import {ApiIPAddress} from './types';
import {getIPAddressByIp, insertIPAddress} from './database';
import {log} from '../../lib/log';
import {Knex} from 'knex';
import {knex} from '../../knex';

export const addIPAddress = async (ipAddress: string, trx: Knex.Transaction | Knex = knex) => {
	try {
		const ipAddressObj = await getIPAddressByIp(ipAddress);
		if (ipAddressObj) {
			return;
		}
		const response = await nodeFetch(`https://ipapi.co/${ipAddress}/json/`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'user-agent': 'ipapi/ipapi-nodejs/0.4.1'
			}
		});
		const data: ApiIPAddress = await response.json();
		if (data?.error) {
			log.error(`Could not add IP address: ${data.message}`);
			return;
		}
		const {ip, country_name, city} = data;
		return insertIPAddress({ip_address: ip, city: city, country: country_name, extra: data}, trx);
	} catch (e) {
		log.error(`Could not add IP address: ${e}`);
	}
};