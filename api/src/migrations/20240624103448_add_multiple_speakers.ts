import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable('user_templates', (table) => {
		table.boolean('multiple_speakers').defaultTo(false);
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable('user_templates', (table) => {
		table.dropColumn('multiple_speakers');
	});
}
