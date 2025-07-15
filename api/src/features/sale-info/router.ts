import PromiseRouter from 'express-promise-router';
import {SaleInfo} from '@hendrikytt/api-contracts';
import {getSaleInfo, updateSaleInfo} from './database';
import {getCache, setCache} from '../../lib/redis';
import {xTokenProtect} from '../../lib/auth';

export const saleInfoRouter = PromiseRouter();

saleInfoRouter.get('/', async (req, res) => {
	let saleInfo: SaleInfo | undefined;
	const cachedSaleInfo = await getCache('sale', null);
	if (cachedSaleInfo) {
		saleInfo = JSON.parse(cachedSaleInfo);
	} else {
		saleInfo = await getSaleInfo();
		if (saleInfo) {
			await setCache('sale', null, saleInfo);
		}
	}
	res.status(200).json(saleInfo);
});

saleInfoRouter.post('/', xTokenProtect(), async (req, res) => {
	const payload: SaleInfo = req.body;
	const updated = await updateSaleInfo(payload);
	res.status(200).json(updated);
});
