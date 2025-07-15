import Knex, {Knex as KnexType} from 'knex';
import {Client} from 'pg';
import {knexConfig} from '../knex';
import chai from 'chai';
import chaiHttp from 'chai-http';
import {createAccessToken} from '../lib/jwt';
import {User} from '@hendrikytt/api-contracts';
import {app} from '../services/api';

export const uuid1 = '85d78ff2-5c7e-4e03-a999-41be5a558a01';
export const uuid2 = '85d78ff2-5c7e-4e03-a999-41be5a558a02';
export const uuid4 = '85d78ff2-5c7e-4e03-a999-41be5a558a04';

export const testUser: User = {
	id: 1,
	stripe_customer_id: 'cus_123',
	plan_id: 1,
	email: 'yes@yes.com',
	subscription_cancel_at: null,
	profile_picture_url: 'url',
	ip_addresses: [],
	hear_from_us: 'Google',
	created_at: new Date(),
	updated_at: new Date()
};

export const testToken = createAccessToken(testUser.id);

export let testKnex: KnexType;

const client = new Client({ ...knexConfig.connection, database: 'postgres', password: 'postgres' });

chai.use(chaiHttp);
export const server = chai.request(app).keepOpen();

before(async () => {
	try {
		await client.connect();

		// Terminate all existing connections to the test database
		await client.query(`SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = '${knexConfig.connection.database}_test' AND pid <> pg_backend_pid();`);

		await client.query(`DROP DATABASE IF EXISTS ${knexConfig.connection.database}_test`);
		await client.query(`CREATE DATABASE ${knexConfig.connection.database}_test`);
	} catch (error) {
		console.error('Error in before hook:', error);
	}
});

beforeEach(async () => {
	testKnex = Knex({
		...knexConfig,
		connection: {
			...knexConfig.connection,
			database: `${knexConfig.connection.database}_test`,
			password: 'postgres'
		},
	});
	await testKnex.migrate.latest();

	//because knex is a const, you can't import and reassign it, but this way you can
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	await require('../knex').knex.destroy();
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	require('../knex').knex = testKnex;
});

afterEach(async () => {
	try {
		await testKnex.migrate.rollback();
		await testKnex.destroy();
	} catch (error) {
		console.error('Error in afterEach hook:', error);
	}
});

after(async () => {
	try {
		server.close();
		// Terminate all existing connections to the test database
		await client.query(`SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = '${knexConfig.connection.database}_test' AND pid <> pg_backend_pid();`);

		await client.query(`DROP DATABASE IF EXISTS ${knexConfig.connection.database}_test`);
		await client.end();
	} catch (error) {
		console.error('Error in after hook:', error);
	}
});
