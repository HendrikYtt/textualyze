import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('user_templates', (table) => {
		table.increments('id');
		table.integer('user_id').references('id').inTable('users').notNullable().index();
		table.string('name').notNullable();
		table.string('font_family').notNullable();
		table.integer('position').notNullable();
		table.integer('font_size').notNullable();
		table.string('font_color').notNullable();
		table.string('outline_color');
		table.string('highlight_color');
		table.boolean('bounce_effect').notNullable();
		table.boolean('italic').notNullable();
		table.string('active_word_highlight_color');
		table.boolean('remove_symbols').notNullable();
		table.boolean('uppercase').notNullable();
		table.boolean('word_by_word').notNullable();
		table.integer('word_spacing').notNullable();
		table.timestamp('created_at').defaultTo(knex.fn.now());
		table.timestamp('updated_at').defaultTo(knex.fn.now());

		table.unique(['user_id', 'name']);
	});

	await knex.schema.alterTable('plans', (table) => {
		table.integer('user_templates_count_limit').nullable();
	});

	await knex('plans')
		.update({
			user_templates_count_limit: 0
		})
		.where({id: 1});

	await knex('plans')
		.update({
			user_templates_count_limit: 5
		})
		.whereIn('id', [2, 3]);

	await knex('plans')
		.update({
			user_templates_count_limit: 10
		})
		.whereIn('id', [4, 5]);

	await knex.schema.alterTable('plans', (table) => {
		table.integer('user_templates_count_limit').notNullable().alter();
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists('user_templates');
	await knex.schema.alterTable('plans', (table) => {
		table.dropColumn('user_templates_count_limit');
	});

}
