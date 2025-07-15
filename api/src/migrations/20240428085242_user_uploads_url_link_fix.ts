import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.alterTable('user_uploads', table => {
		table.text('original_video_url').alter();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.alterTable('user_uploads', table => {
		table.string('original_video_url').alter();
	});
}
