import Knex from 'knex';
import {Client} from 'pg';
import {AuthenticationSession, TestEmail} from './types';
import {
	Diarization,
	IPAddress,
	NotSignedUpUser,
	Plan,
	SaleInfo,
	Transcription,
	Usage,
	User,
	UserFont,
	UserProject,
	UserTemplate,
	UserUpload
} from '@hendrikytt/api-contracts';
import {PaymentIntent} from './features/payment-intent/types';

export type KnexConfiguration = {
	client: string;
	connection: KnexConnection;
	migrations: {directory: string};
	seeds: {directory: string};
	asyncStackTraces: boolean;
}

export type KnexConnection = {
	host: string;
	port: number;
	user: string;
	password: string;
	database: string;
}

export const knexConfig: KnexConfiguration = {
	client: 'pg',
	connection: {
		host: process.env.POSTGRES_HOST || 'localhost',
		port: parseInt(process.env.POSTGRES_PORT!) || 5432,
		user: process.env.POSTGRES_USER || 'postgres',
		password: process.env.POSTGRES_PASSWORD || 'postgres',
		database: process.env.POSTGRES_DATABASE || 'textualyze'
	},
	migrations: {
		directory: `${__dirname}/migrations`,
	},
	seeds: {
		directory: `${__dirname}/seeds`,
	},
	asyncStackTraces: true,
};

export const knex = Knex(knexConfig);

export const initDatabase = async () => {
	const client = new Client({...knexConfig.connection, database: 'postgres', password: 'postgres'});
	await client.connect();
	try {
		await client.query(`CREATE DATABASE ${knexConfig.connection.database}`);
	} catch (err) {
		if ((err as { code: string }).code !== '42P04') {
			throw err;
		}
	}
	await client.end();
};

export const migrate = async () => {
	await knex.migrate.latest();
};

//this is good, it will check for types in repository (doesn't affect compiling though)
declare module 'knex/types/tables' {
    interface Tables {
		plans: Plan;
		users: User;
		usages: Usage;
		authentication_sessions: AuthenticationSession;
		transcriptions: Transcription;
		sale_info: SaleInfo;
		test_emails: TestEmail;
		user_templates: UserTemplate;
		user_projects: UserProject;
		user_uploads: UserUpload;
		user_fonts: UserFont;
		diarizations: Diarization;
		not_signed_up_users: NotSignedUpUser;
		ip_addresses: IPAddress;
		payment_intents: PaymentIntent;
    }
}
