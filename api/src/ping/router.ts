import PromiseRouter from 'express-promise-router';
import {Request, Response} from 'express';
import {knex} from '../knex';

export const pingRouter = PromiseRouter();

pingRouter.get('/liveness', async (req: Request, res: Response) => {
	res.status(200).send({message: 'pong'});
});

pingRouter.get('/readiness', async (req: Request, res: Response) => {
	await knex.raw('SELECT 1');
	res.status(200).send({message: 'pong'});
});
