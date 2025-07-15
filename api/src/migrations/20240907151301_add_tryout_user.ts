import { Knex } from 'knex';
import { Plan, User } from '@hendrikytt/api-contracts';
import { tryoutUserId } from '../features/users/router';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable('users', (table) => {
		table.jsonb('ip_addresses').defaultTo('[]');
	});

	await knex.schema.createTable('ip_addresses', (table) => {
		table.string('ip_address').primary();
		table.string('country');
		table.string('city');
		table.jsonb('extra');
		table.timestamps(true, true);
	});

	await knex.schema.createTable('not_signed_up_users', (table) => {
		table.increments('id').primary();
		table.string('ip_address').unique();
		table.boolean('has_uploaded').defaultTo(false);
		table.boolean('has_transcribed').defaultTo(false);
		table.boolean('has_exported').defaultTo(false);
		table.string('browser');
		table.string('device');
		table.timestamps(true, true);
	});

	const tryoutUserPlan: Plan = {
		id: 6,
		plan_type: 'FREE',
		price: 0,
		billing_interval: 'ANNUALLY',
		lookup_key: 'FREE',
		export_count_limit: 1,
		discounted_price: 0,
		transcribed_seconds_monthly_limit: 999_999_999,
		upload_limit_mb: 512,
		user_font_limit: 0,
		upload_limit_seconds: 120,
		user_project_limit: 0,
		user_templates_count_limit: 0,
		translate_count_limit: 1,
		created_at: new Date(),
		updated_at: new Date()
	};
	await knex('plans').insert(tryoutUserPlan);

	const tryoutUser: Omit<User, 'hear_from_us'> = {
		id: tryoutUserId,
		email: 'tryout_user example.com',
		plan_id: 6,
		profile_picture_url: null,
		stripe_customer_id: null,
		subscription_cancel_at: null,
		ip_addresses: [],
		created_at: new Date(),
		updated_at: new Date()
	};
	await knex('users').insert(tryoutUser);
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('not_signed_up_users');
	await knex.schema.dropTable('ip_addresses');
	await knex.schema.alterTable('users', (table) => {
		table.dropColumn('ip_addresses');
	});
	await knex('users').where({ id: tryoutUserId }).delete();
	await knex('plans').where({ id: 6 }).delete();
}