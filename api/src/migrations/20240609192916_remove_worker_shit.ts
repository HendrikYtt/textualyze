import { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists('worker_url_entry');
	await knex.schema.dropTableIfExists('max_concurrent_transcriptions');
	await knex.schema.alterTable('user_uploads', table => {
		table.dropColumn('worker_url');
	});
}


export async function down(knex: Knex): Promise<void> {
	//NO GOING BACK
}

