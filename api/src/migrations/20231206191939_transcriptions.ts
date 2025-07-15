import {Knex} from 'knex';
import {SaleInfo} from '@hendrikytt/api-contracts';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('max_concurrent_transcriptions', (table) => {
		table.integer('value').primary().notNullable();
	});

	await knex.schema.createTable('sale_info', (table) => {
		table.boolean('is_active').notNullable();
		table.timestamp('sale_end_date').notNullable();
	});

	await knex.schema.createTable('transcriptions', (table) => {
		table.uuid('request_id').notNullable().unique();
		table.integer('user_id').references('id').inTable('users').notNullable().index();
		table.integer('export_count').defaultTo(0).notNullable();
		table.specificType('translated_languages', 'TEXT[]').defaultTo('{}');
		table.timestamp('created_at').defaultTo(knex.fn.now());
		table.timestamp('updated_at').defaultTo(knex.fn.now());
	});

	await knex.schema.createTable('worker_url_entry', (table) => {
		table.increments('id').primary();
		table.string('url').notNullable().unique();
		table.specificType('request_ids_transcribing', 'TEXT[]').defaultTo('{}');
		table.specificType('request_ids_queued', 'TEXT[]').defaultTo('{}');
		table.boolean('is_locked').defaultTo(false).notNullable();
		table.timestamp('created_at').defaultTo(knex.fn.now());
		table.timestamp('updated_at').defaultTo(knex.fn.now());
	});

	await knex.schema.createTable('request_ids_stored', (table) => {
		table.string('request_id').primary();
		table.integer('user_id').references('id').inTable('users').notNullable();
		table.string('worker_url').references('url').inTable('worker_url_entry');
		table.timestamp('created_at').defaultTo(knex.fn.now()).index();
	});

	const defaultSaleInfo: SaleInfo = {
		is_active: false,
		sale_end_date: new Date()
	};
	await knex('sale_info').insert(defaultSaleInfo);

	const defaultConfigurations = {
		value: 3
	};
	await knex('max_concurrent_transcriptions').insert(defaultConfigurations);
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists('max_concurrent_transcriptions');
	await knex.schema.dropTableIfExists('sale_info');
	await knex.schema.dropTableIfExists('transcriptions');
	await knex.schema.dropTableIfExists('request_ids_stored');
	await knex.schema.dropTableIfExists('worker_url_entry');
}
