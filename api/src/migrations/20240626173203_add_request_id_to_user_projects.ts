import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.table('user_projects', (table) => {
		// 1. Create new column requestId: string
		table.string('request_id');
		table.string('screenshot_url');
	});

	// 2 & 3. Get requestId from requestPayload column and backfill
	const templates = await knex('user_projects').select('id', 'request_payload');
	for (const template of templates) {
		const requestPayload = template.request_payload;
		await knex('user_projects')
			.where('id', template.id)
		// @ts-ignore
			.update({ request_id: requestPayload.requestId });
	}

	await knex.schema.alterTable('user_projects', (table) => {
		// 4. Drop PK from id and drop id column
		table.dropPrimary();
		table.dropColumn('id');

		// 5. Make requestId PK
		// @ts-expect-error db migration
		table.primary('request_id');
	});

	await knex('plans')
		.whereIn('id', [4, 5])
		.update({ user_project_limit: 30 });

	await knex('plans')
		.whereIn('id', [2, 3])
		.update({ user_project_limit: 15 });
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable('user_projects', (table) => {
		table.dropPrimary();
		table.dropColumn('request_id');
		table.dropColumn('screenshot_url');
	});

	await knex.schema.alterTable('user_projects', (table) => {
		table.increments('id');
	});

	await knex('plans')
		.whereIn('id', [4, 5])
		.update({ user_project_limit: 10 });

	await knex('plans')
		.whereIn('id', [2, 3])
		.update({ user_project_limit: 5 });
}