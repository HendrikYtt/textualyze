import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.table('transcriptions', (table) => {
		table.string('device').defaultTo('Unknown');
		table.string('browser').defaultTo('Unknown');
	});

	await knex('transcriptions').update('device', 'Unknown');
	await knex('transcriptions').update('browser', 'Unknown');

	await knex.schema.table('user_uploads', (table) => {
		table.string('device').defaultTo('Unknown');
		table.string('browser').defaultTo('Unknown');
	});

	await knex('user_uploads').update('device', 'Unknown');
	await knex('user_uploads').update('browser', 'Unknown');
}


export async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable('transcriptions', (table) => {
		table.dropColumn('device');
		table.dropColumn('browser');
	});
    
	await knex.schema.alterTable('user_uploads', (table) => {
		table.dropColumn('device');
		table.dropColumn('browser');
	});
}

