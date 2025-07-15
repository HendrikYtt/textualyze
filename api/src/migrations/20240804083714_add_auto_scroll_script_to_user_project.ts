import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.table('user_projects', (table) => {
		table.boolean('auto_scroll_script').defaultTo(true);
	});

	await knex('user_projects').update('auto_scroll_script', true);
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable('user_projects', (table) => {
		table.dropColumn('auto_scroll_script');
	});
}