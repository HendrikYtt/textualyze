import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.table('user_templates', table => {
		table.string('s3_font_name');
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.table('user_templates', table => {
		table.dropColumn('s3_font_name');
	});
}
