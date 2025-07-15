import {Knex} from 'knex';
import {knex} from '../../knex';
import {UserFont} from '@hendrikytt/api-contracts';
import {BadRequestError} from '../../error';

export const getUserFontsByUserId = async (userId: number, trx: Knex.Transaction | Knex = knex): Promise<UserFont[]> => {
	return trx<UserFont>('user_fonts').where({user_id: userId});
};

export type BulkInsertUserFont = Omit<UserFont, 'id' | 'created_at' | 'updated_at'>[]
export const bulkInsertUserFont = async (bulkInsert: BulkInsertUserFont, trx: Knex.Transaction | Knex = knex): Promise<UserFont> => {
	try {
		const rows = await trx<UserFont>('user_fonts').insert(bulkInsert).returning('*');
		return rows[0];
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (e: any) {
		if (e.code === '23505') {
			throw new BadRequestError('This font name already exists');
		} else {
			throw e;
		}
	}
};

export const updateUserFont = async (id: number, updatedUserFont: Omit<UserFont, 'id' | 'created_at' | 'updated_at'>, trx: Knex.Transaction | Knex = knex): Promise<UserFont | undefined> => {
	const rows = await trx<UserFont>('user_fonts')
		.where({id: id})
		.update({
			...updatedUserFont,
			updated_at: knex.fn.now()
		})
		.returning('*');
	return rows[0];
};

export const deleteUserFont = async (id: number, trx: Knex.Transaction | Knex = knex): Promise<UserFont> => {
	const rows = await trx<UserFont>('user_fonts')
		.delete()
		.where({id: id})
		.returning('*');
	return rows[0] || {};
};
