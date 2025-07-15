import PromiseRouter from 'express-promise-router';
import {getNotSignedUpUserByIpAddress} from './database';

export const notSignedUpUsersRouter = PromiseRouter();

notSignedUpUsersRouter.get('/', async (req, res) => {
	const ipAddress = req.ip;
	if (ipAddress) {
		return res.json(await getNotSignedUpUserByIpAddress(ipAddress) || null);
	}
	res.json(null);
});