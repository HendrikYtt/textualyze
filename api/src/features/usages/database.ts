import {knex} from '../../knex';
import {Usage} from '@hendrikytt/api-contracts';
import {getCurrentMonthNumber, getCurrentYear} from '../../utils/utils';
import {Knex} from 'knex';
import {publishToPubSub} from '../../lib/redis';

const getUsageByUserIdAndMonth = async (userId: number, month: number, year: number): Promise<Usage | undefined> => {
	return knex<Usage>('usages').where({user_id: userId, month: month, year: year}).first();
};

export const upsertUsage = async (userId: number, transcribedSeconds: number, trx: Knex.Transaction | Knex = knex): Promise<Usage> => {
	const month = getCurrentMonthNumber();
	const year = getCurrentYear();
	const usage = await getUsageByUserIdAndMonth(userId, month, year);

	return trx.transaction(async (trx) => {
		if (!usage) {
			const rows = await trx<Usage>('usages')
				.insert({
					user_id: userId,
					month: month,
					year: year,
					transcribed_seconds: transcribedSeconds
				})
				.returning('*');
			await publishToPubSub('users-update', 'update', rows[0].user_id.toString(), null);
			return rows[0];
		} else {
			await trx<Usage>('usages')
				.where({ user_id: userId, month: month })
				.increment('transcribed_seconds', transcribedSeconds);

			const updatedRows = await trx<Usage>('usages')
				.where({ user_id: userId, month: month })
				.update({
					month: month,
					updated_at: knex.fn.now()
				})
				.returning('*');
			await publishToPubSub('users-update', 'update', updatedRows[0].user_id.toString(), null);
			return updatedRows[0];
		}
	});
};
