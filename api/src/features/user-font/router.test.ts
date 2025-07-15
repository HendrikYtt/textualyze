import request from 'supertest';
import {app} from '../../services/api';
import {testKnex, testToken, testUser} from '../../utils/test-helper';
import {UserFont} from '@hendrikytt/api-contracts';
import {expect as heinExpect} from 'hein';
import {insertUser} from '../users/database';

describe('user fonts', () => {
	const testUserFont1: UserFont = {
		id: 1,
		user_id: 1,
		s3_font_name: 's3File',
		original_font_file_name: 'originalFileData',
		file_extension: 'ttf',
		created_at: new Date(),
		updated_at: new Date(),
	};

	const testUserFont2: UserFont = {
		id: 2,
		user_id: 1,
		s3_font_name: 's3File1',
		original_font_file_name: 'originalFile2',
		file_extension: 'ttf',
		created_at: new Date(),
		updated_at: new Date(),
	};

	beforeEach(async () => {
		await insertUser(testUser);
	});

	describe('GET', () => {
		it('should return empty list', async () => {
			const resp = await request(app)
				.get('/user-fonts')
				.set('Authorization', `Bearer ${testToken}`)
				.expect(200);
			const actual = resp.body as UserFont[];
			heinExpect(actual.length).to.eql(0);
		});

		it('should get one users font', async () => {
			await testKnex('user_fonts').insert(testUserFont1);
			const resp = await request(app)
				.get('/user-fonts')
				.set('Authorization', `Bearer ${testToken}`)
				.expect(200);
			const actual = resp.body as UserFont[];
			heinExpect(actual.length).to.eql(1);
			heinExpect(actual[0]).to.partially.eql(testUserFont1);
		});

		it('should get two user fonts', async () => {
			await testKnex('user_fonts').insert(testUserFont1);
			await testKnex('user_fonts').insert(testUserFont2);
			const resp = await request(app)
				.get('/user-fonts')
				.set('Authorization', `Bearer ${testToken}`)
				.expect(200);
			const actual = resp.body as UserFont[];
			heinExpect(actual.length).to.eql(2);
			heinExpect(actual[0]).to.partially.eql(testUserFont1);
			heinExpect(actual[1]).to.partially.eql(testUserFont2);
		});
	});

	describe('POST', () => {
		it('should add one', async () => {
			const resp = await request(app)
				.post('/user-fonts')
				.set('Authorization', `Bearer ${testToken}`)
				.send({userFonts: [testUserFont1]})
				.expect(200);
			const actual = resp.body as UserFont;
			heinExpect(actual).to.partially.eql(testUserFont1);
		});

		it('should add two', async () => {
			const resp = await request(app)
				.post('/user-fonts')
				.set('Authorization', `Bearer ${testToken}`)
				.send({userFonts: [testUserFont1, testUserFont2]})
				.expect(200);
			const actual = resp.body as UserFont;
			heinExpect(actual).to.partially.eql(testUserFont1);
		});

		it('should return error - trying to bulk insert 2 at the same time', async () => {
			await request(app)
				.post('/user-fonts')
				.set('Authorization', `Bearer ${testToken}`)
				.send({userFonts: [testUserFont1, testUserFont1]})
				.expect(400);
		});

		it('should return error - font_family is not nullable', async () => {
			await testKnex('user_fonts').insert(testUserFont1);
			const copy = JSON.parse(JSON.stringify(testUserFont1)) as UserFont;
			// @ts-expect-error TS2322
			copy.s3_font_name = null;
			await request(app)
				.post('/user-fonts')
				.set('Authorization', `Bearer ${testToken}`)
				.send({userFonts: [copy]})
				.expect(500);
		});

		it('should return error - user id and s3 font file name combo must be unique', async () => {
			await testKnex('user_fonts').insert(testUserFont1);
			await request(app)
				.post('/user-fonts')
				.set('Authorization', `Bearer ${testToken}`)
				.send({userFonts: [testUserFont1]})
				.expect(400);
		});
	});

	describe('DELETE', async () => {
		it('should delete entry', async () => {
			await testKnex('user_fonts').insert(testUserFont1);
			const resp = await request(app)
				.delete(`/user-fonts/${testUserFont1.id}`)
				.set('Authorization', `Bearer ${testToken}`)
				.expect(200);

			const { updated_at, ...actualWithoutUpdatedAt } = resp.body as UserFont;
			heinExpect(testUserFont1).to.partially.eql(actualWithoutUpdatedAt);

			const rows = await testKnex('user_fonts');
			heinExpect(rows.length).to.eql(0);
		});

		it('should not throw 404 when entry not found', async () => {
			await testKnex('user_fonts').insert(testUserFont1);
			const resp = await request(app)
				.delete(`/user-fonts/${1337}`)
				.set('Authorization', `Bearer ${testToken}`)
				.expect(200);

			heinExpect(resp.body).to.eql({});

			const rows = await testKnex('user_fonts');
			heinExpect(rows.length).to.eql(1);
		});
	});

});