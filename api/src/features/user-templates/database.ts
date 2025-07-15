import {Knex} from 'knex';
import {knex} from '../../knex';
import {UserTemplate} from '@hendrikytt/api-contracts';
import {BadRequestError} from '../../error';

export const getUserTemplatesByUserId = async (userId: number, trx: Knex.Transaction | Knex = knex): Promise<UserTemplate[]> => {
	return trx<UserTemplate>('user_templates').where({user_id: userId});
};

export const insertUserTemplate = async (userTemplate: Omit<UserTemplate, 'id' | 'created_at' | 'updated_at'>, trx: Knex.Transaction | Knex = knex): Promise<UserTemplate> => {
	try {
		const rows = await trx<UserTemplate>('user_templates').insert(userTemplate).returning('*');
		return rows[0];
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (e: any) {
		if (e.code === '23505') {
			throw new BadRequestError('This template name already exists');
		} else {
			throw e;
		}
	}
};

export const updateUserTemplate = async (id: number, updatedUserTemplate: Omit<UserTemplate, 'id' | 'created_at' | 'updated_at'>, trx: Knex.Transaction | Knex = knex): Promise<UserTemplate | undefined> => {
	const rows = await trx<UserTemplate>('user_templates')
		.where({id: id})
		.update({
			...updatedUserTemplate,
			updated_at: knex.fn.now()
		})
		.returning('*');
	return rows[0];
};

export const deleteUserTemplate = async (id: number, trx: Knex.Transaction | Knex = knex): Promise<UserTemplate> => {
	const rows = await trx<UserTemplate>('user_templates')
		.delete()
		.where({id: id})
		.returning('*');
	return rows[0] || {};
};
