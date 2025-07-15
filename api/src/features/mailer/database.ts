import {AuthenticationSession} from '../../types';
import {knex} from '../../knex';
import {Knex} from 'knex';

export const getAuthenticationSessionByOobCode = async (oobCode: string): Promise<AuthenticationSession | undefined> => {
	const rows = await knex<AuthenticationSession>('authentication_sessions').where({oob_code: oobCode});
	return rows[0];
};

export const addAuthenticationSession = async (session: Omit<AuthenticationSession, 'id' | 'created_at'>): Promise<AuthenticationSession | undefined> => {
	const rows = await knex<AuthenticationSession>('authentication_sessions')
		.insert({
			email: session.email,
			oob_code: session.oob_code,
			expires_at: session.expires_at
		})
		.returning('*');
	return rows[0];
};

export const deleteAuthenticationSessionByOobCode = async (oobCode: string, trx: Knex.Transaction | Knex = knex): Promise<AuthenticationSession | undefined> => {
	const rows = await trx<AuthenticationSession>('authentication_sessions').delete().where({oob_code: oobCode}).returning('*');
	return rows[0];
};