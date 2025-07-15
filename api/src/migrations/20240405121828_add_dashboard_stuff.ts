import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable('plans', (table) => {
		table.integer('user_project_limit').nullable();
		table.integer('user_font_limit').nullable();
	});

	await knex('plans')
		.update({
			user_project_limit: 0,
			user_font_limit: 0
		})
		.where({id: 1});

	await knex('plans')
		.update({
			user_project_limit: 5,
			user_font_limit: 0
		})
		.whereIn('id', [2, 3]);

	await knex('plans')
		.update({
			user_project_limit: 10,
			user_font_limit: 50
		})
		.whereIn('id', [4, 5]);

	await knex.schema.alterTable('plans', (table) => {
		table.integer('user_project_limit').notNullable().alter();
		table.integer('user_font_limit').notNullable().alter();
	});

	await knex.schema.createTable('user_projects', (table) => {
		table.increments('id');
		table.integer('user_id').references('id').inTable('users').notNullable().index();
		table.string('name').notNullable();
		table.jsonb('request_payload').notNullable();
		table.specificType('untouched_transcription', 'jsonb[]').notNullable();
		table.integer('longest_segment_length').notNullable();
		table.integer('current_max_words_per_segment').notNullable();
		table.timestamp('expiration_date').notNullable();
		table.timestamp('created_at').defaultTo(knex.fn.now());
		table.timestamp('updated_at').defaultTo(knex.fn.now());

		table.unique(['user_id', 'name']);
	});

	await knex.schema.createTable('user_uploads', (table) => {
		table.increments('id');
		table.integer('user_id').references('id').inTable('users').notNullable().index();
		table.string('request_id').notNullable();
		table.string('upload_type').notNullable();
		table.string('original_video_url').nullable();
		table.float('duration').notNullable();
		table.float('size').notNullable();
		table.integer('width').notNullable();
		table.integer('height').notNullable();
		table.string('worker_url').notNullable();
		table.timestamp('created_at').defaultTo(knex.fn.now());
		table.timestamp('updated_at').defaultTo(knex.fn.now());
	});

	await knex.schema.createTable('user_fonts', (table) => {
		table.increments('id');
		table.integer('user_id').references('id').inTable('users').notNullable().index();
		table.string('original_font_file_name').notNullable();
		table.string('s3_font_name').notNullable();
		table.string('file_extension').notNullable();
		table.timestamp('created_at').defaultTo(knex.fn.now());
		table.timestamp('updated_at').defaultTo(knex.fn.now());

		table.unique(['user_id', 's3_font_name']);
	});

	await knex.schema.dropTableIfExists('request_ids_stored');

	await knex.schema.alterTable('user_templates', (table) => {
		table.dropColumn('position');
		table.dropColumn('font_size');
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable('plans', (table) => {
		table.dropColumn('user_project_limit');
		table.dropColumn('user_font_limit');
	});

	await knex.schema.dropTableIfExists('user_projects');
	await knex.schema.dropTableIfExists('user_uploads');
	await knex.schema.dropTableIfExists('user_fonts');

	await knex.schema.createTable('request_ids_stored', (table) => {
		table.string('request_id').primary();
		table.integer('user_id').references('id').inTable('users').notNullable();
		table.timestamp('created_at').defaultTo(knex.fn.now()).index();
	});

	await knex.schema.alterTable('user_templates', (table) => {
		table.integer('position');
		table.string('font_size');
	});
}
