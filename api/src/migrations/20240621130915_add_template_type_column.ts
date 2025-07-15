import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable('user_templates', (table) => {
		table.text('template_type').defaultTo('Default');
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable('user_templates', (table) => {
		table.dropColumn('template_type');
	});
}
