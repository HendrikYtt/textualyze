import {FrontendUser, Plan, Transcription, Usage, User} from '@hendrikytt/api-contracts';
import {updateUser} from './database';
import request from 'supertest';
import {testKnex, testToken, testUser, uuid1, uuid2} from '../../utils/test-helper';
import {getPlans} from '../plans/database';
import {expect as heinExpect} from 'hein';
import {omit} from 'lodash';
import {redisClientAndPublisher} from '../../lib/redis';
import {app} from '../../services/api';
import {addAuthenticationSession} from '../mailer/database';
import {DateTime} from 'luxon';
import {knex} from '../../knex';

describe('users', () => {

	const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

	const daysToAdd = 2;
	const currentDate = new Date();
	const futureDate = new Date(currentDate.getTime() + daysToAdd * oneDayInMilliseconds);

	const usages: Usage[] = [
		{
			id: 1,
			user_id: testUser.id,
			year: 2023,
			month: 1,
			transcribed_seconds: 10,
			created_at: currentDate,
			updated_at: currentDate
		},
		{
			id: 2,
			user_id: testUser.id,
			year: 2023,
			month: 2,
			transcribed_seconds: 20,
			created_at: currentDate,
			updated_at: currentDate
		}
	];

	const transcriptions: Transcription[] = [
		{
			request_id: uuid1,
			user_id: testUser.id,
			export_count: 0,
			translated_languages: [],
			browser: 'Edge',
			device: 'desktop',
			created_at: currentDate,
			updated_at: currentDate
		},
		{
			request_id: uuid2,
			user_id: testUser.id,
			export_count: 1,
			translated_languages: ['en'],
			browser: 'Edge',
			device: 'desktop',
			created_at: currentDate,
			updated_at: currentDate
		}
	];

	let plans: Plan[];
	let frontendUser: FrontendUser;

	before(async () => {
		await redisClientAndPublisher.connect();
	});

	describe('GET user', () => {
		beforeEach(async () => {
			plans = await getPlans();
			frontendUser = {
				...omit(testUser, 'plan_id'),
				current_plan: plans[0],
				usages: [],
				transcriptions: []
			};
			transcriptions[1].created_at = currentDate;

			const userToInsert: Pick<User, 'email' | 'stripe_customer_id' | 'plan_id' | 'subscription_cancel_at' | 'profile_picture_url' | 'ip_addresses' | 'hear_from_us'> = {
				email: testUser.email,
				stripe_customer_id: testUser.stripe_customer_id,
				plan_id: 1,
				subscription_cancel_at: null,
				profile_picture_url: testUser.profile_picture_url,
				ip_addresses: [],
				hear_from_us: 'Google'
			};
			await testKnex<User>('users').insert({
				...userToInsert,
				ip_addresses: knex.raw('?::jsonb', [JSON.stringify(userToInsert.ip_addresses)])
			});
		});
		after(async () => {
			await redisClientAndPublisher.flushAll();
		});

		it('should get frontend user', async () => {
			await redisClientAndPublisher.flushAll();
			const resp = await request(app)
				.get('/user/me')
				.set('Authorization', `Bearer ${testToken}`)
				.expect(200);

			const actual = resp.body as FrontendUser;
			heinExpect(actual.email).to.eql(frontendUser.email);
			heinExpect(actual.id).to.eql(frontendUser.id);
			heinExpect(actual.stripe_customer_id).to.eql(frontendUser.stripe_customer_id);
			heinExpect(actual.usages).to.eql(frontendUser.usages);
			heinExpect(actual.subscription_cancel_at).to.eql(null);
			heinExpect(actual.current_plan.id).to.eql(frontendUser.current_plan.id);
			heinExpect(actual.profile_picture_url).to.eql(frontendUser.profile_picture_url);
			heinExpect(actual.current_plan).to.eql(frontendUser.current_plan);
			heinExpect(actual.hear_from_us).to.eql(frontendUser.hear_from_us);
		});

		it('should get frontend user with subscription and current plan', async () => {
			await redisClientAndPublisher.flushAll();
			frontendUser.current_plan = plans[1];
			await updateUser(frontendUser.email, {planId: 2});

			const resp = await request(app)
				.get('/user/me')
				.set('Authorization', `Bearer ${testToken}`)
				.expect(200);

			const actual = resp.body as FrontendUser;
			heinExpect(actual.email).to.eql(frontendUser.email);
			heinExpect(actual.id).to.eql(frontendUser.id);
			heinExpect(actual.stripe_customer_id).to.eql(frontendUser.stripe_customer_id);
			heinExpect(actual.usages).to.eql(frontendUser.usages);
			heinExpect(actual.subscription_cancel_at).to.eql(null);
			heinExpect(actual.current_plan.id).to.eql(frontendUser.current_plan.id);
			heinExpect(actual.profile_picture_url).to.eql(frontendUser.profile_picture_url);
			heinExpect(actual.current_plan).to.eql(frontendUser.current_plan);
			heinExpect(actual.hear_from_us).to.eql(frontendUser.hear_from_us);
		});

		it('should get frontend user with current plan and usage', async () => {
			await redisClientAndPublisher.flushAll();
			frontendUser.current_plan = plans[1];
			await updateUser(frontendUser.email, {planId: 2});
			frontendUser.usages = [usages[0]];
			await testKnex('usages').insert(usages[0]);

			const resp = await request(app)
				.get('/user/me')
				.set('Authorization', `Bearer ${testToken}`)
				.expect(200);

			const actual = resp.body as FrontendUser;
			heinExpect(actual.email).to.eql(frontendUser.email);
			heinExpect(actual.id).to.eql(frontendUser.id);
			heinExpect(actual.stripe_customer_id).to.eql(frontendUser.stripe_customer_id);
			heinExpect(actual.usages).to.eql(frontendUser.usages);
			heinExpect(actual.subscription_cancel_at).to.eql(null);
			heinExpect(actual.current_plan.id).to.eql(frontendUser.current_plan.id);
			heinExpect(actual.profile_picture_url).to.eql(frontendUser.profile_picture_url);
			heinExpect(actual.current_plan).to.eql(frontendUser.current_plan);
			heinExpect(actual.hear_from_us).to.eql(frontendUser.hear_from_us);
		});

		it('should get frontend user with current plan and usages', async () => {
			await redisClientAndPublisher.flushAll();
			frontendUser.current_plan = plans[1];
			await updateUser(frontendUser.email, {planId: 2});
			frontendUser.usages = usages;
			await testKnex('usages').insert(usages);

			const resp = await request(app)
				.get('/user/me')
				.set('Authorization', `Bearer ${testToken}`)
				.expect(200);

			const actual = resp.body as FrontendUser;
			heinExpect(actual.email).to.eql(frontendUser.email);
			heinExpect(actual.id).to.eql(frontendUser.id);
			heinExpect(actual.stripe_customer_id).to.eql(frontendUser.stripe_customer_id);
			heinExpect(actual.usages).to.eql(frontendUser.usages);
			heinExpect(actual.subscription_cancel_at).to.eql(null);
			heinExpect(actual.current_plan.id).to.eql(frontendUser.current_plan.id);
			heinExpect(actual.profile_picture_url).to.eql(frontendUser.profile_picture_url);
			heinExpect(actual.current_plan).to.eql(frontendUser.current_plan);
			heinExpect(actual.hear_from_us).to.eql(frontendUser.hear_from_us);
		});

		it('should get frontend user with current plan, usages and transcriptions', async () => {
			await redisClientAndPublisher.flushAll();
			frontendUser.current_plan = plans[1];
			await updateUser(frontendUser.email, {planId: 2});
			frontendUser.usages = usages;
			frontendUser.transcriptions = transcriptions;
			await testKnex('usages').insert(usages);
			await testKnex('transcriptions').insert(transcriptions);

			const resp = await request(app)
				.get('/user/me')
				.set('Authorization', `Bearer ${testToken}`)
				.expect(200);

			const actual = resp.body as FrontendUser;
			heinExpect(actual.email).to.eql(frontendUser.email);
			heinExpect(actual.id).to.eql(frontendUser.id);
			heinExpect(actual.stripe_customer_id).to.eql(frontendUser.stripe_customer_id);
			heinExpect(actual.usages).to.eql(frontendUser.usages);
			heinExpect(actual.subscription_cancel_at).to.eql(null);
			heinExpect(actual.current_plan.id).to.eql(frontendUser.current_plan.id);
			heinExpect(actual.profile_picture_url).to.eql(frontendUser.profile_picture_url);
			heinExpect(actual.transcriptions).to.eql(
				frontendUser.transcriptions.map(transcription =>
					omit(transcription, 'device', 'browser')
				)
			);
			heinExpect(actual.current_plan).to.eql(frontendUser.current_plan);
			heinExpect(actual.hear_from_us).to.eql(frontendUser.hear_from_us);
		});

		it('should get frontend user with current plan, usages and transcriptions, but one transcription is too old', async () => {
			await redisClientAndPublisher.flushAll();
			frontendUser.current_plan = plans[1];
			await updateUser(frontendUser.email, {planId: 2});
			frontendUser.usages = usages;
			transcriptions[1].created_at = DateTime.now().minus({days: 10}).toJSDate();
			frontendUser.transcriptions = [transcriptions[0]];
			await testKnex('usages').insert(usages);
			await testKnex('transcriptions').insert(transcriptions);

			const resp = await request(app)
				.get('/user/me')
				.set('Authorization', `Bearer ${testToken}`)
				.expect(200);

			const actual = resp.body as FrontendUser;
			heinExpect(actual.email).to.eql(frontendUser.email);
			heinExpect(actual.id).to.eql(frontendUser.id);
			heinExpect(actual.stripe_customer_id).to.eql(frontendUser.stripe_customer_id);
			heinExpect(actual.usages).to.eql(frontendUser.usages);
			heinExpect(actual.subscription_cancel_at).to.eql(null);
			heinExpect(actual.current_plan.id).to.eql(frontendUser.current_plan.id);
			heinExpect(actual.profile_picture_url).to.eql(frontendUser.profile_picture_url);
			heinExpect(actual.transcriptions).to.eql(
				frontendUser.transcriptions.map(transcription =>
					omit(transcription, 'device', 'browser')
				)
			);
			heinExpect(actual.current_plan).to.eql(frontendUser.current_plan);
			heinExpect(actual.hear_from_us).to.eql(frontendUser.hear_from_us);
		});

		it('should get frontend user with current plan, usages and transcriptions, stripe plan is canceled before current time', async () => {
			await redisClientAndPublisher.flushAll();
			frontendUser.current_plan = plans[1];
			const daysToAdd = 7;
			const currentDate = new Date();
			const pastDate = new Date(currentDate.getTime() - daysToAdd * oneDayInMilliseconds);
			await updateUser(frontendUser.email, {planId: 2, subscriptionCancelAt: pastDate});
			frontendUser.usages = usages;

			frontendUser.transcriptions = transcriptions;
			await testKnex('usages').insert(usages);
			await testKnex('transcriptions').insert(transcriptions);

			const resp = await request(app)
				.get('/user/me')
				.set('Authorization', `Bearer ${testToken}`)
				.expect(200);

			const actual = resp.body as FrontendUser;
			heinExpect(actual.email).to.eql(frontendUser.email);
			heinExpect(actual.id).to.eql(frontendUser.id);
			heinExpect(actual.stripe_customer_id).to.eql(frontendUser.stripe_customer_id);
			heinExpect(actual.usages).to.eql(frontendUser.usages);
			heinExpect(actual.subscription_cancel_at).to.eql(pastDate);
			heinExpect(actual.current_plan.id).to.eql(plans[0].id);
			heinExpect(actual.profile_picture_url).to.eql(frontendUser.profile_picture_url);
			heinExpect(actual.transcriptions).to.eql(
				frontendUser.transcriptions.map(transcription =>
					omit(transcription, 'device', 'browser')
				)
			);
			heinExpect(actual.hear_from_us).to.eql(frontendUser.hear_from_us);
		});

		it('should get frontend user with current plan, usages and transcriptions, but stripe plan is canceled after current time', async () => {
			await redisClientAndPublisher.flushAll();
			frontendUser.current_plan = plans[1];
			const daysToAdd = 7;
			const currentDate = new Date();
			const futureDate = new Date(currentDate.getTime() + daysToAdd * oneDayInMilliseconds);
			await updateUser(frontendUser.email, {planId: 2, subscriptionCancelAt: futureDate});
			frontendUser.usages = usages;

			frontendUser.transcriptions = transcriptions;
			await testKnex('usages').insert(usages);
			await testKnex('transcriptions').insert(transcriptions);

			const resp = await request(app)
				.get('/user/me')
				.set('Authorization', `Bearer ${testToken}`)
				.expect(200);

			const actual = resp.body as FrontendUser;
			heinExpect(actual.email).to.eql(frontendUser.email);
			heinExpect(actual.id).to.eql(frontendUser.id);
			heinExpect(actual.stripe_customer_id).to.eql(frontendUser.stripe_customer_id);
			heinExpect(actual.usages).to.eql(frontendUser.usages);
			heinExpect(actual.subscription_cancel_at).to.eql(futureDate);
			heinExpect(actual.profile_picture_url).to.eql(frontendUser.profile_picture_url);
			heinExpect(actual.current_plan.id).to.eql(plans[1].id);
			heinExpect(actual.transcriptions).to.eql(
				frontendUser.transcriptions.map(transcription =>
					omit(transcription, 'device', 'browser')
				)
			);
			heinExpect(actual.current_plan).to.eql(frontendUser.current_plan);
			heinExpect(actual.hear_from_us).to.eql(frontendUser.hear_from_us);
		});
	});

	describe('Authenticate with email', () => {
		const oobCode = 'oobCode';
		it('test email does not exist', async () => {
			await addAuthenticationSession({
				email: testUser.email,
				oob_code: oobCode,
				expires_at: futureDate
			});

			const resp = await request(app)
				.post('/user/authenticate')
				.send({
					email: testUser.email,
					oobCode: oobCode,
					action: 'signup'
				});
			heinExpect(resp.status).to.eql(200);

			const rows = await testKnex('users').where({id: testUser.id});
			const user = rows[0];

			heinExpect(user.email).to.eql(testUser.email);
			heinExpect(user.id).to.eql(testUser.id);
			heinExpect(user.stripe_customer_id).to.eql(null);
			heinExpect(user.plan_id).to.eql(1);
			heinExpect(user.subscription_cancel_at).to.eql(null);
		});

		it('test email exists', async () => {
			await testKnex('test_emails').insert({email: testUser.email});
			await addAuthenticationSession({
				email: testUser.email,
				oob_code: oobCode,
				expires_at: futureDate
			});

			const resp = await request(app)
				.post('/user/authenticate')
				.send({
					email: testUser.email,
					oobCode: oobCode,
					action: 'signup'
				});
			heinExpect(resp.status).to.eql(200);

			const rows = await testKnex('users').where({id: testUser.id});
			const user = rows[0];

			heinExpect(user.email).to.eql(testUser.email);
			heinExpect(user.id).to.eql(testUser.id);
			heinExpect(user.stripe_customer_id).to.eql(null);
			heinExpect(user.plan_id).to.eql(5);
			heinExpect(user.subscription_cancel_at).to.eql(null);
		});
	});

	describe('Authenticate with Google', () => {
		it('test email does not exist', async () => {
			const resp = await request(app)
				.post('/user/authenticate-with-google')
				.send({
					email: testUser.email,
					profilePictureUrl: 'profilePicUrl',
					action: 'signup'
				});
			heinExpect(resp.status).to.eql(200);

			const rows = await testKnex('users').where({id: testUser.id});
			const user = rows[0];

			heinExpect(user.email).to.eql(testUser.email);
			heinExpect(user.id).to.eql(testUser.id);
			heinExpect(user.stripe_customer_id).to.eql(null);
			heinExpect(user.plan_id).to.eql(1);
			heinExpect(user.subscription_cancel_at).to.eql(null);
		});

		it('test email exists', async () => {
			await testKnex('test_emails').insert({email: testUser.email});
			const resp = await request(app)
				.post('/user/authenticate-with-google')
				.send({
					email: testUser.email,
					profilePictureUrl: 'profilePicUrl',
					action: 'signup'
				});
			heinExpect(resp.status).to.eql(200);

			const rows = await testKnex('users').where({id: testUser.id});
			const user = rows[0];

			heinExpect(user.email).to.eql(testUser.email);
			heinExpect(user.id).to.eql(testUser.id);
			heinExpect(user.stripe_customer_id).to.eql(null);
			heinExpect(user.plan_id).to.eql(5);
			heinExpect(user.subscription_cancel_at).to.eql(null);
		});
	});
});