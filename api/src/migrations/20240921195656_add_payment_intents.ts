import { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('payment_intents', (table) => {
		table.string('payment_intent_id').primary();
		table.string('email');
		table.integer('plan_id');
		table.timestamp('created_at').defaultTo(knex.fn.now());
	});
}


export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('payment_intents');
}

