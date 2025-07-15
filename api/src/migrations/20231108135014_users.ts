import {Knex} from 'knex';
import {Plan} from '@hendrikytt/api-contracts';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('plans', (table) => {
		table.integer('id').primary();
		table.string('plan_type').notNullable();
		table.string('billing_interval').notNullable();
		table.string('lookup_key').notNullable();
		table.integer('price').notNullable();
		table.integer('discounted_price').notNullable();
		table.integer('upload_limit_mb').notNullable();
		table.integer('upload_limit_seconds').notNullable();
		table.integer('transcribed_seconds_monthly_limit').notNullable();
		table.integer('export_count_limit').notNullable();
		table.integer('translate_count_limit').notNullable();
		table.timestamp('created_at').defaultTo(knex.fn.now());
		table.timestamp('updated_at').defaultTo(knex.fn.now());
		table.unique(['plan_type', 'billing_interval']);
	});

	await knex.schema.createTable('users', (table) => {
		table.increments('id').primary();
		table.string('stripe_customer_id').unique();
		table.integer('plan_id').references('id').inTable('plans').notNullable().index();
		table.string('email').notNullable().unique();
		table.timestamp('subscription_cancel_at');
		table.string('profile_picture_url');
		table.timestamp('created_at').defaultTo(knex.fn.now());
		table.timestamp('updated_at').defaultTo(knex.fn.now());
	});

	await knex.schema.createTable('usages', (table) => {
		table.increments('id').primary();
		table.integer('user_id').references('id').inTable('users').notNullable().index();
		table.integer('year').notNullable().checkBetween([2023, 2100]);
		table.integer('month').notNullable().checkBetween([1, 12]);
		table.integer('transcribed_seconds').notNullable();
		table.timestamp('created_at').defaultTo(knex.fn.now());
		table.timestamp('updated_at').defaultTo(knex.fn.now());
		table.unique(['user_id', 'month', 'year']);
	});

	const defaultPlans: Omit<Plan, 'created_at' | 'updated_at' | 'user_templates_count_limit' | 'user_project_limit' | 'user_font_limit'>[] = [
		{
			id: 1,
			plan_type: 'FREE',
			billing_interval: 'NONE',
			lookup_key: 'FREE',
			price: 0,
			discounted_price: 0,
			upload_limit_mb: 128,
			upload_limit_seconds: 20,
			transcribed_seconds_monthly_limit: 300,
			export_count_limit: 1,
			translate_count_limit: 0
		},
		{
			id: 2,
			plan_type: 'BASIC',
			billing_interval: 'MONTHLY',
			lookup_key: 'BASIC_MONTHLY',
			price: 15,
			discounted_price: 6,
			upload_limit_mb: 512,
			upload_limit_seconds: 600,
			transcribed_seconds_monthly_limit: 36000,
			export_count_limit: 10,
			translate_count_limit: 0
		},
		{
			id: 3,
			plan_type: 'BASIC',
			billing_interval: 'ANNUALLY',
			lookup_key: 'BASIC_ANNUALLY',
			price: 10,
			discounted_price: 4,
			upload_limit_mb: 512,
			upload_limit_seconds: 600,
			transcribed_seconds_monthly_limit: 43200,
			export_count_limit: 10,
			translate_count_limit: 0
		},
		{
			id: 4,
			plan_type: 'PRO',
			billing_interval: 'MONTHLY',
			lookup_key: 'PRO_MONTHLY',
			price: 30,
			discounted_price: 12,
			upload_limit_mb: 1024,
			upload_limit_seconds: 1200,
			transcribed_seconds_monthly_limit: 72000,
			export_count_limit: 20,
			translate_count_limit: 25
		},
		{
			id: 5,
			plan_type: 'PRO',
			billing_interval: 'ANNUALLY',
			lookup_key: 'PRO_ANNUALLY',
			price: 20,
			discounted_price: 8,
			upload_limit_mb: 1024,
			upload_limit_seconds: 1200,
			transcribed_seconds_monthly_limit: 86400,
			export_count_limit: 20,
			translate_count_limit: 25
		}
	];

	await knex('plans').insert(defaultPlans);
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists('usages');
	await knex.schema.dropTableIfExists('users');
	await knex.schema.dropTableIfExists('plans');
}

