import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable('user_templates', (table) => {
		table.renameColumn('highlight_color', 'background_color');
		table.renameColumn('active_word_highlight_color', 'highlight_color');
		table.boolean('auto_move').defaultTo(false);
		table.boolean('auto_rotate').defaultTo(false);
		table.boolean('fade').defaultTo(false);
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable('user_templates', (table) => {
		table.renameColumn('highlight_color', 'active_word_highlight_color');
		table.renameColumn('background_color', 'highlight_color');
		table.dropColumn('auto_move');
		table.dropColumn('auto_rotate');
		table.dropColumn('fade');
	});
}
