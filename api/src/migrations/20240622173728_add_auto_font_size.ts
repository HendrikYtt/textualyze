import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable('user_templates', (table) => {
		table.boolean('auto_font_size').defaultTo(false);
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable('user_templates', (table) => {
		table.dropColumn('auto_font_size');
	});
}
