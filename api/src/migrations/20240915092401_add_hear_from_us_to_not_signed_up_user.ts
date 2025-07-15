import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.table('not_signed_up_users', (table) => {
		table.string('hear_from_us').nullable();
	});
}


export async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable('not_signed_up_users', (table) => {
		table.dropColumn('hear_from_us');
	});
}

