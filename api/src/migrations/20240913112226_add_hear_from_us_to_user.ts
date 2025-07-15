import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.table('users', (table) => {
		table.string('hear_from_us').nullable();
	});
}


export async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable('users', (table) => {
		table.dropColumn('hear_from_us');
	});
}

