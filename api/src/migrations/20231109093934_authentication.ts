import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

	await knex.schema.createTable('authentication_sessions', (table) => {
		table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
		table.string('email').notNullable();
		table.string('oob_code').notNullable();
		table.timestamp('expires_at').notNullable();
		table.timestamp('created_at').defaultTo(knex.fn.now());
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists('authentication_sessions');
}
