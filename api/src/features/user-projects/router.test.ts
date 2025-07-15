import request from 'supertest';
import {app} from '../../services/api';
import {testKnex, testToken, testUser} from '../../utils/test-helper';
import {UserProject} from '@hendrikytt/api-contracts';
import {expect as heinExpect} from 'hein';
import {insertUser} from '../users/database';
import {DateTime} from 'luxon';
import {publishToPubSub} from '../../lib/redis';
import {EventPayloads} from '@hendrikytt/api-contracts/dist/sockets';

describe('user projects', () => {
	const currentDate = DateTime.now();
	const futureDate = currentDate.plus({days: 8}).toJSDate();

	const testUserProject1: UserProject = {
		request_id: 'requestId',
		user_id: 1,
		name: 'My First Project',
		request_payload: {
			requestId: '',
			originalFileExtension: '',
			language: 'en',
			styling: {
				id: 0,
				name: '',
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
			},
			width: 200,
			height: 100,
			duration: 10,
			size: 10,
			position: 30,
			fontSize: 80,
			displayedTranscription: [],
			processingAction: 'Transcribe',
			isAudioFile: false,
			s3FontLink: '',
			fontType: 'Default fonts',
			s3VideoLink: '',
			fontFileExtension: 'ttf',
			adjustedWidth: 69,
			adjustedHeight: 69,
			xOffset: 0,
			yOffset: 0,
			adjustedStartTime: 0,
			adjustedEndTime: 0,
			compressedHeight: 0,
			compressedWidth: 0,
			uploadType: 'local',
			speakerColors: {'SPEAKER_00': '#ffffff', 'SPEAKER_01': '#000000'},
			targetLanguage: null,
			logo: null,
			aiDescription: null,
			showAiDescription: false
		},
		untouched_transcription: [],
		longest_segment_length: 8,
		current_max_words_per_segment: 1,
		expiration_date: futureDate,
		screenshot_url: 'cloudfrontUrl',
		auto_scroll_script: true,
		created_at: new Date(),
		updated_at: new Date()
	};

	const testUserProject2: UserProject = {
		request_id: 'requestId2',
		user_id: 1,
		name: 'My Second Project',
		request_payload: {
			requestId: '',
			originalFileExtension: '',
			language: 'en',
			styling: {
				id: 0,
				name: '',
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
				font_weight: 400,
			},
			width: 200,
			height: 100,
			duration: 10,
			size: 10,
			position: 30,
			fontSize: 80,
			displayedTranscription: [],
			processingAction: 'Transcribe',
			isAudioFile: false,
			s3FontLink: '',
			fontType: 'Default fonts',
			s3VideoLink: '',
			fontFileExtension: 'ttf',
			adjustedWidth: 69,
			adjustedHeight: 69,
			xOffset: 0,
			yOffset: 0,
			adjustedStartTime: 0,
			adjustedEndTime: 0,
			compressedHeight: 0,
			compressedWidth: 0,
			uploadType: 'local',
			speakerColors: {'SPEAKER_00': '#ffffff', 'SPEAKER_01': '#000000'},
			targetLanguage: null,
			logo: null,
			aiDescription: null,
			showAiDescription: false
		},
		untouched_transcription: [],
		longest_segment_length: 7,
		current_max_words_per_segment: 3,
		expiration_date: new Date(),
		screenshot_url: 'cloudfrontUrl',
		auto_scroll_script: true,
		created_at: new Date(),
		updated_at: new Date()
	};

	beforeEach(async () => {
		await insertUser(testUser);
	});

	describe('GET', () => {
		it('should return empty list', async () => {
			const resp = await request(app)
				.get('/user-projects')
				.set('Authorization', `Bearer ${testToken}`)
				.expect(200);
			const actual = resp.body as UserProject[];
			heinExpect(actual.length).to.eql(0);
		});

		it('should get one users project', async () => {
			await testKnex('user_projects').insert(testUserProject1);
			const resp = await request(app)
				.get('/user-projects')
				.set('Authorization', `Bearer ${testToken}`)
				.expect(200);
			const actual = resp.body as UserProject[];
			heinExpect(actual.length).to.eql(1);
			heinExpect(actual[0]).to.partially.eql(testUserProject1);
		});

		it('should return empty list - expiration date has passed', async () => {
			await testKnex('user_projects').insert(testUserProject2);
			const resp = await request(app)
				.get('/user-projects')
				.set('Authorization', `Bearer ${testToken}`)
				.expect(200);
			const actual = resp.body as UserProject[];
			heinExpect(actual.length).to.eql(0);
		});

		it('should get two users projects', async () => {
			await testKnex('user_projects').insert(testUserProject1);
			testUserProject2.expiration_date = futureDate;
			await testKnex('user_projects').insert(testUserProject2);
			const resp = await request(app)
				.get('/user-projects')
				.set('Authorization', `Bearer ${testToken}`)
				.expect(200);
			const actual = resp.body as UserProject[];
			heinExpect(actual.length).to.eql(2);
			heinExpect(actual[0]).to.partially.eql(testUserProject1);
			heinExpect(actual[1]).to.partially.eql(testUserProject2);
		});
	});

	describe('POST', () => {
		it('should add one', async () => {
			const resp = await request(app)
				.post('/user-projects')
				.set('Authorization', `Bearer ${testToken}`)
				.send(testUserProject1)
				.expect(200);
			const { expiration_date, ...actualWithoutExpirationDate } = resp.body as UserProject;
			heinExpect(testUserProject1).to.partially.eql(actualWithoutExpirationDate);
		});

		it('should return error - request_payload is not nullable', async () => {
			const copy = JSON.parse(JSON.stringify(testUserProject1)) as UserProject;
			// @ts-expect-error TS2322
			copy.request_payload = null;
			await request(app)
				.post('/user-projects')
				.set('Authorization', `Bearer ${testToken}`)
				.send(copy)
				.expect(500);
		});

	});

	describe('PUT', async () => {
		it('should update font_family', async () => {
			await testKnex('user_projects').insert(testUserProject1);
			testUserProject1.request_payload.styling.font_family = 'Roboto';
			const resp = await request(app)
				.put(`/user-projects/${testUserProject1.request_id}`)
				.set('Authorization', `Bearer ${testToken}`)
				.send(testUserProject1)
				.expect(200);

			const { updated_at, ...actualWithoutUpdatedAt } = resp.body as UserProject;
			heinExpect(testUserProject1).to.partially.eql(actualWithoutUpdatedAt);
		});

		it('should throw 404 when entry not found', async () => {
			await testKnex('user_projects').insert(testUserProject1);
			await request(app)
				.put(`/user-projects/${1337}`)
				.set('Authorization', `Bearer ${testToken}`)
				.send(testUserProject1)
				.expect(404);
		});
	});

	describe('DELETE', async () => {
		it('should delete entry', async () => {
			const funcCopy = publishToPubSub;
			// eslint-disable-next-line @typescript-eslint/no-var-requires
			require('../../lib/redis').publishToPubSub = async <E extends keyof EventPayloads>(
				event: E,
				messageData: EventPayloads[E],
				room: string | null,
				requestId: string | null
			) => {
				console.log('published to pubsub');
			};
			await testKnex('user_projects').insert(testUserProject1);
			const resp = await request(app)
				.delete(`/user-projects/${testUserProject1.request_id}`)
				.set('Authorization', `Bearer ${testToken}`)
				.send(testUserProject1)
				.expect(200);

			const { updated_at, ...actualWithoutUpdatedAt } = resp.body as UserProject;
			heinExpect(testUserProject1).to.partially.eql(actualWithoutUpdatedAt);

			const rows = await testKnex('user_projects');
			heinExpect(rows.length).to.eql(0);

			// eslint-disable-next-line @typescript-eslint/no-var-requires
			require('../../lib/redis').publishToPubSub = funcCopy;
		});

		it('should not throw 404 when entry not found', async () => {
			await testKnex('user_projects').insert(testUserProject1);
			const resp = await request(app)
				.delete(`/user-projects/${1337}`)
				.set('Authorization', `Bearer ${testToken}`)
				.send(testUserProject1)
				.expect(200);

			heinExpect(resp.body).to.eql({});

			const rows = await testKnex('user_projects');
			heinExpect(rows.length).to.eql(1);
		});
	});

});