import {knex} from '../../knex';
import {Knex} from 'knex';
import {FrontendUser, User} from '@hendrikytt/api-contracts';
import {publishToPubSub} from '../../lib/redis';
import {NotFoundError} from '../../error';
import {TestEmail} from '../../types';
import {excludedEmails} from '../../services/api-reports-generator';

export const getFrontendUser = async (id: number): Promise<FrontendUser> => {
	const result = await knex.raw(`
        SELECT 
            u.id, 
            u.stripe_customer_id,
            u.email,
            u.hear_from_us,
            u.subscription_cancel_at,
            u.profile_picture_url,
            current_plan,
            usages,
            transcriptions,
            u.created_at, 
            u.updated_at
        FROM 
            users u
        LEFT JOIN LATERAL 
            (
                SELECT json_build_object(
                    'id', p.id, 
                    'plan_type', p.plan_type, 
                    'billing_interval', p.billing_interval,
                    'lookup_key', p.lookup_key,
                    'price', p.price,
                    'discounted_price', p.discounted_price,
                    'upload_limit_mb', p.upload_limit_mb, 
                    'upload_limit_seconds', p.upload_limit_seconds, 
                    'transcribed_seconds_monthly_limit', p.transcribed_seconds_monthly_limit, 
                    'export_count_limit', p.export_count_limit, 
                    'translate_count_limit', p.translate_count_limit, 
                    'user_templates_count_limit', p.user_templates_count_limit,
                    'user_project_limit', p.user_project_limit,
                    'user_font_limit', p.user_font_limit,
                    'created_at', p.created_at, 
                    'updated_at', p.updated_at
                ) AS current_plan
                FROM plans p
                WHERE p.id = CASE 
                                WHEN u.subscription_cancel_at < NOW() THEN 1
                                ELSE u.plan_id
                             END
            ) current_plan ON TRUE
        LEFT JOIN LATERAL 
            (
                SELECT COALESCE(json_agg(json_build_object(
                    'id', us.id, 
                    'user_id', us.user_id, 
                    'year', us.year, 
                    'month', us.month, 
                    'transcribed_seconds', us.transcribed_seconds,
                    'created_at', us.created_at, 
                    'updated_at', us.updated_at
                ) ORDER BY us.id), '[]'::json) AS usages
                FROM usages us
                WHERE us.user_id = u.id
            ) usages ON TRUE
        LEFT JOIN LATERAL 
            (
				SELECT COALESCE(json_agg(json_build_object(
					'request_id', tr.request_id, 
					'user_id', tr.user_id,
					'export_count', tr.export_count,
					'translated_languages', tr.translated_languages,
					'created_at', tr.created_at, 
					'updated_at', tr.updated_at
				) ORDER BY tr.created_at DESC), '[]'::json) AS transcriptions
				FROM transcriptions tr
                WHERE tr.user_id = u.id
                AND tr.created_at > NOW() - INTERVAL '9 DAY'
            ) transcriptions ON TRUE
        WHERE 
            u.id = ?
    `, [id]);

	const rowData = result.rows[0];
	return rowData;
};

export const getUserByEmail = async (email: string, trx: Knex.Transaction | Knex = knex): Promise<User | undefined> => {
	return trx<User>('users').where({email: email}).first();
};

export const getUserByStripeId = async (stripeCustomerId: string): Promise<User | undefined> => {
	return knex<User>('users').where({stripe_customer_id: stripeCustomerId}).first();
};

export const insertUser = async (user: Omit<User, 'id' | 'hear_from_us' | 'created_at' | 'updated_at'>, trx: Knex.Transaction | Knex = knex): Promise<User> => {
	let insertedUser: User;
	[insertedUser] = await trx<User>('users').insert({
		...user,
		ip_addresses: knex.raw('?::jsonb', [JSON.stringify(user.ip_addresses)])
	}).onConflict().ignore().returning('*');
	if (!insertedUser) {
		const existingUser = await getUserByEmail(user.email);
		if (!existingUser) {
			throw new NotFoundError('User not found');
		}
		const ipAddresses = [...existingUser.ip_addresses, ...user.ip_addresses];
		insertedUser = existingUser;
		insertedUser.ip_addresses = ipAddresses;
	}
	return insertedUser;
};

type FieldsToUpdate = {
	stripeCustomerId?: string;
	planId?: number;
	subscriptionCancelAt?: Date | null;
	ipAddresses?: string[];
	hearFromUs?: string | null;
};

export const updateUser = async (email: string, fieldsToUpdate: FieldsToUpdate, trx: Knex.Transaction | Knex = knex): Promise<User> => {
	const {
		stripeCustomerId,
		planId,
		subscriptionCancelAt,
		ipAddresses,
		hearFromUs
	} = fieldsToUpdate;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const updateFields: any = {
		updated_at: knex.fn.now(),
		stripe_customer_id: stripeCustomerId,
		plan_id: planId,
		subscription_cancel_at: subscriptionCancelAt,
		hear_from_us: hearFromUs,
	};

	if (ipAddresses !== undefined) {
		updateFields.ip_addresses = knex.raw('?::jsonb', [JSON.stringify(ipAddresses)]);
	}

	const rows = await trx<User>('users')
		.update(updateFields)
		.where({email: email})
		.returning('*');

	await publishToPubSub('users-update', 'update', rows[0].id.toString(), null);
	return rows[0];
};

export const getTestEmails = async (trx: Knex.Transaction | Knex = knex): Promise<TestEmail[]> => {
	return trx('test_emails');
};

export const getUsersCount = async () => {
	const result = await knex.raw(`
	        SELECT COUNT(*) as count
	        FROM users u
	    `);
	return result.rows[0].count;
};
