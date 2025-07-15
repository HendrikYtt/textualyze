import request from 'supertest';
import {app} from '../../services/api';
import {testKnex, testToken, testUser} from '../../utils/test-helper';
import {Styling, UserTemplate} from '@hendrikytt/api-contracts';
import {expect as heinExpect} from 'hein';
import {insertUser} from '../users/database';

describe('user templates', () => {
	const styling: Styling = {
		id: 1,
		name: 'Cool template',
		highlight_color: 'yellow',
		fade: false,
		italic: false,
		uppercase: false,
		auto_font_size: false,
		auto_move: false,
		auto_rotate: false,
		font_color: 'white',
		bounce_effect: false,
		font_family: 'The Bold Font',
		outline_color: 'black',
		remove_symbols: false,
		s3_font_name: '',
		word_by_word: false,
		word_spacing: 0,
		background_color: 'purple',
		template_type: 'Default',
		multiple_speakers: false,
		font_weight: 400
	};
	const testUserTemplate1: UserTemplate = {
		user_id: 1,
		created_at: new Date(),
		updated_at: new Date(),
		...styling
	};

	const testUserTemplate2: UserTemplate = {
		user_id: 1,
		created_at: new Date(),
		updated_at: new Date(),
		...styling,
		id: 2,
		name: 'Stay cool template'
	};

	beforeEach(async () => {
		await insertUser(testUser);
	});

	describe('GET', () => {
		it('should return empty list', async () => {
			const resp = await request(app)
				.get('/user-templates')
				.set('Authorization', `Bearer ${testToken}`)
				.expect(200);
			const actual = resp.body as UserTemplate[];
			heinExpect(actual.length).to.eql(0);
		});

		it('should get one users template', async () => {
			await testKnex('user_templates').insert(testUserTemplate1);
			const resp = await request(app)
				.get('/user-templates')
				.set('Authorization', `Bearer ${testToken}`)
				.expect(200);
			const actual = resp.body as UserTemplate[];
			heinExpect(actual.length).to.eql(1);
			heinExpect(actual[0]).to.partially.eql(testUserTemplate1);
		});

		it('should get two user templates', async () => {
			await testKnex('user_templates').insert(testUserTemplate1);
			await testKnex('user_templates').insert(testUserTemplate2);
			const resp = await request(app)
				.get('/user-templates')
				.set('Authorization', `Bearer ${testToken}`)
				.expect(200);
			const actual = resp.body as UserTemplate[];
			heinExpect(actual.length).to.eql(2);
			heinExpect(actual[0]).to.partially.eql(testUserTemplate1);
			heinExpect(actual[1]).to.partially.eql(testUserTemplate2);
		});
	});

	describe('POST', () => {
		it('should add one', async () => {
			const resp = await request(app)
				.post('/user-templates')
				.set('Authorization', `Bearer ${testToken}`)
				.send(testUserTemplate1)
				.expect(200);
			const actual = resp.body as UserTemplate;
			heinExpect(actual).to.partially.eql(testUserTemplate1);
		});

		it('should return error - font_family is not nullable', async () => {
			const copy = JSON.parse(JSON.stringify(testUserTemplate1)) as UserTemplate;
			// @ts-expect-error TS2322
			copy.font_family = null;
			await request(app)
				.post('/user-templates')
				.set('Authorization', `Bearer ${testToken}`)
				.send(copy)
				.expect(500);
		});

		it('should not return error - outline_color is nullable', async () => {
			const copy = JSON.parse(JSON.stringify(testUserTemplate1)) as UserTemplate;
			copy.outline_color = null;
			const resp = await request(app)
				.post('/user-templates')
				.set('Authorization', `Bearer ${testToken}`)
				.send(copy)
				.expect(200);
			const actual = resp.body as UserTemplate;
			heinExpect(actual).to.partially.eql(copy);
		});
	});

	describe('PUT', async () => {
		it('should update font_family', async () => {
			await testKnex('user_templates').insert(testUserTemplate1);
			testUserTemplate1.font_family = 'Roboto';
			const resp = await request(app)
				.put(`/user-templates/${testUserTemplate1.id}`)
				.set('Authorization', `Bearer ${testToken}`)
				.send(testUserTemplate1)
				.expect(200);

			const { updated_at, ...actualWithoutUpdatedAt } = resp.body as UserTemplate;
			heinExpect(testUserTemplate1).to.partially.eql(actualWithoutUpdatedAt);
		});

		it('should throw 404 when entry not found', async () => {
			await testKnex('user_templates').insert(testUserTemplate1);
			testUserTemplate1.font_family = 'Roboto';
			await request(app)
				.put(`/user-templates/${1337}`)
				.set('Authorization', `Bearer ${testToken}`)
				.send(testUserTemplate1)
				.expect(404);
		});
	});

	describe('DELETE', async () => {
		it('should delete entry', async () => {
			await testKnex('user_templates').insert(testUserTemplate1);
			const resp = await request(app)
				.delete(`/user-templates/${testUserTemplate1.id}`)
				.set('Authorization', `Bearer ${testToken}`)
				.send(testUserTemplate1)
				.expect(200);

			const { updated_at, ...actualWithoutUpdatedAt } = resp.body as UserTemplate;
			heinExpect(testUserTemplate1).to.partially.eql(actualWithoutUpdatedAt);

			const rows = await testKnex('user_templates');
			heinExpect(rows.length).to.eql(0);
		});

		it('should not throw 404 when entry not found', async () => {
			await testKnex('user_templates').insert(testUserTemplate1);
			const resp = await request(app)
				.delete(`/user-templates/${1337}`)
				.set('Authorization', `Bearer ${testToken}`)
				.send(testUserTemplate1)
				.expect(200);

			heinExpect(resp.body).to.eql({});

			const rows = await testKnex('user_templates');
			heinExpect(rows.length).to.eql(1);
		});
	});

});