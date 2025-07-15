import * as path from 'path';
import * as fs from 'fs/promises';
import { JWT } from 'google-auth-library';
import {log} from '../../lib/log';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const SERVICE_ACCOUNT_PATH = path.join(process.cwd(), 'service-account.json');

export let auth: JWT;

const authorizeServiceAccount = async (): Promise<JWT> => {
	try {
		const content = await fs.readFile(SERVICE_ACCOUNT_PATH, 'utf8');
		const keys = JSON.parse(content);

		return new JWT({
			email: keys.client_email,
			key: keys.private_key,
			scopes: SCOPES,
		});
	} catch (err) {
		log.error('Error loading service account:', err);
		throw err;
	}
};

export const startGoogleSheets = async (): Promise<void> => {
	try {
		auth = await authorizeServiceAccount();
	} catch (error) {
		log.error(error);
	}
};