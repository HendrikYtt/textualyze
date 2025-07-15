import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('test_emails', (table) => {
		table.string('email').primary();
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists('test_emails');
}
