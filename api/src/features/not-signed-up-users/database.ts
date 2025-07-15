import {NotSignedUpUser} from '@hendrikytt/api-contracts';
import {Knex} from 'knex';
import {knex} from '../../knex';

export const getNotSignedUpUserByIpAddress = async (ipAddress: string, trx: Knex.Transaction | Knex = knex): Promise<NotSignedUpUser | undefined> => {
	return trx<NotSignedUpUser>('not_signed_up_users').where({ip_address: ipAddress}).first();
};

export const insertNotSignedUpUser = async (notSignedUpUser: Omit<NotSignedUpUser, 'id' | 'created_at' | 'updated_at'>, trx: Knex.Transaction | Knex = knex): Promise<NotSignedUpUser | undefined> => {
	const [result] = await trx<NotSignedUpUser>('not_signed_up_users').insert(notSignedUpUser).onConflict().ignore().returning('*');
	return result;
};

type FieldsToUpdate = {
    hasUploaded?: boolean;
    hasTranscribed?: boolean;
    hasExported?: boolean;
    hearFromUs?: string;
};

export const updateNotSignedUpUser = async (ipAddress: string, fieldsToUpdate: FieldsToUpdate, trx: Knex.Transaction | Knex = knex): Promise<NotSignedUpUser> => {
	const {
		hasUploaded,
		hasTranscribed,
		hasExported,
		hearFromUs
	} = fieldsToUpdate;
	const rows = await trx<NotSignedUpUser>('not_signed_up_users')
		.update(
			{
				updated_at: knex.fn.now(),
				has_uploaded: hasUploaded,
				has_transcribed: hasTranscribed,
				has_exported: hasExported,
				hear_from_us: hearFromUs
			}
		)
		.where({ip_address: ipAddress})
		.returning('*');
	return rows[0];
};