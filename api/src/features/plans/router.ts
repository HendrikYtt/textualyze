import PromiseRouter from 'express-promise-router';
import {getPlans} from './database';
import {Plan} from '@hendrikytt/api-contracts';
import {getCache, setCache} from '../../lib/redis';

export const plansRouter = PromiseRouter();

plansRouter.get('/', async (req, res) => {
	let plans: Plan[];
	const cachedPlans = await getCache('plans', null);
	if (cachedPlans) {
		plans = JSON.parse(cachedPlans);
	} else {
		plans = await getPlans();
		await setCache('plans', null, plans);
	}
	res.status(200).json(plans);
});