import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable('user_projects', table => {
		table.dropUnique(['user_id', 'name'], 'user_projects_user_id_name_unique');
	});
}

export async function down(knex: Knex): Promise<void> {
}
