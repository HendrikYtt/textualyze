import {Knex} from 'knex';
import {knex} from '../../knex';
import {UserUpload} from '@hendrikytt/api-contracts';

export const getUserUploadsByUserId = async (userId: number, trx: Knex.Transaction | Knex = knex): Promise<UserUpload[]> => {
	return trx<UserUpload>('user_uploads').where({user_id: userId});
};

export const getUserUploadsByRequestId = async (requestId: string, trx: Knex.Transaction | Knex = knex): Promise<UserUpload | undefined> => {
	return trx<UserUpload>('user_uploads').where({request_id: requestId}).first();
};

export const insertUserUpload = async (userProject: Omit<UserUpload, 'id' | 'created_at' | 'updated_at'>, trx: Knex.Transaction | Knex = knex): Promise<UserUpload> => {
	const rows = await trx<UserUpload>('user_uploads').insert(userProject).returning('*');
	return rows[0];
};

export const updateUserUpload = async (id: number, updatedUserUpload: Omit<UserUpload, 'id' | 'created_at' | 'updated_at'>, trx: Knex.Transaction | Knex = knex): Promise<UserUpload | undefined> => {
	const rows = await trx<UserUpload>('user_uploads')
		.where({id: id})
		.update({
			...updatedUserUpload,
			updated_at: knex.fn.now()
		})
		.returning('*');
	return rows[0];
};

type FieldsToUpdate = {
	size?: number;
	width?: number;
	height?: number;
};

export const updateUserUploadFields = async (requestId: string, fieldsToUpdate: FieldsToUpdate, trx: Knex.Transaction | Knex = knex): Promise<UserUpload> => {
	const {
		size,
		width,
		height
	} = fieldsToUpdate;
	const rows = await trx<UserUpload>('user_uploads')
		.update(
			{
				updated_at: knex.fn.now(),
				size: size,
				width: width,
				height: height
			}
		)
		.where({request_id: requestId})
		.returning('*');
	return rows[0];
};

export const deleteUserUpload = async (id: number, trx: Knex.Transaction | Knex = knex): Promise<UserUpload> => {
	const rows = await trx<UserUpload>('user_uploads')
		.delete()
		.where({id: id})
		.returning('*');
	return rows[0] || {};
};
