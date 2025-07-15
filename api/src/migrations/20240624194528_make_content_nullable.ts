import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable('diarizations', (table) => {
		table.text('content').nullable().alter();
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable('diarizations', (table) => {
		table.text('content').notNullable().alter();
	});
}
