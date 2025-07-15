import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	const hasContentColumn = await knex.schema.hasColumn('diarizations', 'content');

	if (hasContentColumn) {
		await knex.schema.alterTable('diarizations', (table) => {
			table.dropColumn('content');
		});
	}

	await knex.schema.alterTable('diarizations', (table) => {
		table.specificType('content', 'jsonb[]').defaultTo('{}');
	});

	await knex.schema.alterTable('user_templates', (table) => {
		table.integer('font_weight').defaultTo(400);
	});
}

export async function down(knex: Knex): Promise<void> {
	const hasContentColumn = await knex.schema.hasColumn('diarizations', 'content');

	if (hasContentColumn) {
		await knex.schema.alterTable('diarizations', (table) => {
			table.dropColumn('content');
		});
	}

	await knex.schema.alterTable('diarizations', (table) => {
		table.text('content').nullable();
	});

	await knex.schema.alterTable('user_templates', (table) => {
		table.dropColumn('font_weight');
	});
}