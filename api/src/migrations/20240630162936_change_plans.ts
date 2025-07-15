import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex('plans')
		.whereIn('id', [1])
		.update({ transcribed_seconds_monthly_limit: 60 });
}


export async function down(knex: Knex): Promise<void> {
	await knex('plans')
		.whereIn('id', [1])
		.update({ transcribed_seconds_monthly_limit: 300 });
}
