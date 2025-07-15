import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('diarizations', (table) => {
		table.string('request_id').notNullable().index();
		table.string('job_id').notNullable();
		table.jsonb('content').notNullable();
		table.boolean('is_finished').defaultTo(false);
		table.timestamp('created_at').defaultTo(knex.fn.now());
		table.timestamp('updated_at').defaultTo(knex.fn.now());

		table.unique(['request_id', 'job_id']);
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists('diarizations');
}
