import {randomBytes} from 'crypto';
import {getTestEmails, updateUser} from './database';
import {addIPAddress} from '../ip-addresses/service';
import {uniq} from 'lodash';
import {User} from '@hendrikytt/api-contracts';

export const generateOOBCode = (length: number): string => {
	return randomBytes(length).toString('hex');
};

export const addMinutes = (date: Date, minutes: number): Date => {
	date.setMinutes(date.getMinutes() + minutes);
	return date;
};

export const isTestUser = async (email: string) => {
	const testEmails = await getTestEmails();
	const emails = testEmails.map(e => e.email);
	return emails.includes(email);
};

export const handleIpAddress = async (ipAddress: string | undefined, existingUser: User | undefined) => {
	if (ipAddress) {
		await addIPAddress(ipAddress);
		if (existingUser) {
			await updateUser(existingUser.email, {ipAddresses: uniq([...existingUser.ip_addresses, ipAddress])});
		}
	}
};
