import {Knex} from 'knex';
import {knex} from '../../knex';
import {UserProject} from '@hendrikytt/api-contracts';
import {publishToPubSub} from '../../lib/redis';

export const getUserProjectsByUserId = async (
	userId: number,
	trx: Knex.Transaction | Knex = knex
): Promise<UserProject[]> => {
	return trx<UserProject>('user_projects')
		.where({ user_id: userId })
		.andWhere('expiration_date', '>', knex.fn.now())
		.orderBy([
			{ column: 'created_at', order: 'DESC' }
		]);
};

export const getUserProjectByUserIdAndRequestId = async (userId: number, requestId: string, trx: Knex.Transaction | Knex = knex): Promise<UserProject | undefined> => {
	return trx<UserProject>('user_projects')
		.whereRaw('request_payload->>\'requestId\' = ?', [requestId])
		.andWhere({user_id: userId})
		.first();
};

export const insertUserProject = async (userProject: Omit<UserProject, 'created_at' | 'updated_at'>, trx: Knex.Transaction | Knex = knex): Promise<UserProject> => {
	const rows = await trx<UserProject>('user_projects').insert(userProject).returning('*');
	return rows[0];
};

export const updateUserProject = async (requestId: string, updatedUserProject: Omit<UserProject, 'id' | 'created_at' | 'updated_at'>, trx: Knex.Transaction | Knex = knex): Promise<UserProject | undefined> => {
	const rows = await trx<UserProject>('user_projects')
		.where({request_id: requestId})
		.update({
			...updatedUserProject,
			updated_at: knex.fn.now()
		})
		.returning('*');
	return rows[0];
};

export const updateUserProjectName = async (requestId: string, name: string, trx: Knex.Transaction | Knex = knex): Promise<UserProject | object | undefined> => {
	const rows = await trx<UserProject>('user_projects')
		.where({request_id: requestId})
		.update({
			name: name,
			updated_at: knex.fn.now()
		})
		.returning('*');
	return rows[0];
};

export const deleteUserProject = async (requestId: string, trx: Knex.Transaction | Knex = knex): Promise<UserProject> => {
	const rows = await trx<UserProject>('user_projects')
		.delete()
		.where({request_id: requestId})
		.returning('*');
	if (rows.length === 1) {
		await publishToPubSub('user-projects-update', 'update', rows[0].user_id.toString(), null);
	}
	return rows[0] || {};
};
