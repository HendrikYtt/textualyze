import {RequestPayload} from '@hendrikytt/api-contracts';
import {
	constructNextRequestPayload,
	constructPreviousRequestPayload,
	getDifferences,
	revertDifference,
	StateDifference
} from './undo-redo';

describe('undo-redo', () => {

	describe('getDifferences', () => {
		it('initial load - []', () => {
			const prevState: RequestPayload = {
				...initialState,
				size: 0,
				duration: 0
			};
			const actual = getDifferences(prevState, initialState, 5, 5);
			const expected: StateDifference = {
				differenceType: 'INITIAL',
				differences: []
			};
			expect(actual).toStrictEqual(expected);
		});

		it('1 field - position', () => {
			const prevState: RequestPayload = {
				...initialState,
				position: 29
			};
			const actual = getDifferences(prevState, initialState, 5, 5);
			const expected: StateDifference = {
				differenceType: 'NORMAL',
				differences: [
					{
						'field': 'position',
						'oldValue': 29,
						'newValue': 30
					}
				]
			};
			expect(actual).toStrictEqual(expected);
		});

		it('multiple fields - upload font', () => {
			const prevState: RequestPayload = {
				...initialState,
				fontType: 'Default fonts',
				s3FontLink: '',
				styling: {
					...initialState.styling,
					font_family: 'The Bold Font',
					s3_font_name: 'The Bold Font'
				}
			};
			const actual = getDifferences(prevState, initialState, 5, 5);
			const expected: StateDifference = {
				differenceType: 'NORMAL',
				differences: [
					{
						'field': 'styling.font_family',
						'oldValue': 'The Bold Font',
						'newValue': 'GT-Walsheim-Pro-Bold'
					},
					{
						'field': 'styling.s3_font_name',
						'oldValue': 'The Bold Font',
						'newValue': 'font_1726237604012'
					},
					{
						'field': 'fontType',
						'oldValue': 'Default fonts',
						'newValue': 'Your fonts'
					},
					{
						'field': 's3FontLink',
						'oldValue': '',
						'newValue': 'https://textualyze-user-fonts.s3.eu-north-1.amazonaws.com/userId-1/font_1726237385523.ttf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAYUHLF6R5HEPK7NVT%2F20240913%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20240913T142644Z&X-Amz-Expires=86400&X-Amz-Signature=bd3210cc922cf9b7788423ba5b124f32ca5b0ee26b9a02dae49a62ae26f988f9&X-Amz-SignedHeaders=host&x-id=GetObject'
					}
				]
			};
			expect(actual).toStrictEqual(expected);
		});

		it('change word start time', () => {
			const prevState: RequestPayload = JSON.parse(JSON.stringify(initialState));
			prevState.displayedTranscription[1].words[1].start = 4.33;
			prevState.displayedTranscription[1].words[1].startMs = '00:04.33';
			const actual = getDifferences(prevState, initialState, 5, 5);
			const expected: StateDifference = {
				differenceType: 'NORMAL',
				differences: [
					{
						'field': 'displayedTranscription[1].words[1].start',
						'oldValue': 4.33,
						'newValue': 4.4
					},
					{
						'field': 'displayedTranscription[1].words[1].startMs',
						'oldValue': '00:04.33',
						'newValue': '00:04.40'
					}
				]
			};
			expect(actual).toStrictEqual(expected);
		});

		it('change segment start time', () => {
			const prevState: RequestPayload = JSON.parse(JSON.stringify(initialState));
			prevState.displayedTranscription[1].words[0].start = 2.28;
			prevState.displayedTranscription[1].words[0].startMs = '00:02.28';
			prevState.displayedTranscription[1].start = 2.28;
			prevState.displayedTranscription[1].startMs = '00:02.28';
			const actual = getDifferences(prevState, initialState, 5, 5);
			const expected: StateDifference = {
				differenceType: 'NORMAL',
				differences: [
					{
						'field': 'displayedTranscription[1].start',
						'newValue': 2.34,
						'oldValue': 2.28
					},
					{
						'field': 'displayedTranscription[1].words[0].start',
						'newValue': 2.34,
						'oldValue': 2.28
					},
					{
						'field': 'displayedTranscription[1].words[0].startMs',
						'newValue': '00:02.34',
						'oldValue': '00:02.28'
					},
					{
						'field': 'displayedTranscription[1].startMs',
						'newValue': '00:02.34',
						'oldValue': '00:02.28'
					}
				]
			};
			expect(actual).toStrictEqual(expected);
		});

		it('change words per segment up, should show only words per segment diff', () => {
			const prevState: RequestPayload = JSON.parse(JSON.stringify(initialState));
			const actual = getDifferences(prevState, initialState, 4, 5);
			const expected: StateDifference = {
				differenceType: 'MAX_WORD_PER_SEGMENT',
				differences: [
					{
						'field': 'maxWordsPerSegment',
						'oldValue': 4,
						'newValue': 5
					}
				]
			};
			expect(actual).toStrictEqual(expected);
		});

		it('change words per segment down, should show only words per segment diff', () => {
			const prevState: RequestPayload = JSON.parse(JSON.stringify(initialState));
			const actual = getDifferences(prevState, initialState, 5, 4);
			const expected: StateDifference = {
				differenceType: 'MAX_WORD_PER_SEGMENT',
				differences: [
					{
						'field': 'maxWordsPerSegment',
						'oldValue': 5,
						'newValue': 4
					}
				]
			};
			expect(actual).toStrictEqual(expected);
		});
	});

	describe('revertDifference', () => {
		it('NORMAL state difference', () => {
			const stateDifference: StateDifference = {
				differenceType: 'NORMAL',
				differences: [
					{
						'field': 'position',
						'oldValue': 29,
						'newValue': 30
					}
				]
			};
			const actual = revertDifference(stateDifference);
			const expected: StateDifference = {
				differenceType: 'NORMAL',
				differences: [
					{
						'field': 'position',
						'oldValue': 30,
						'newValue': 29
					}
				]
			};
			expect(actual).toStrictEqual(expected);
		});
	});

	describe('constructRequestPayload', () => {
		it('PREVIOUS - NORMAL state difference', () => {
			const stateDifference: StateDifference = {
				differenceType: 'NORMAL',
				differences: [
					{
						'field': 'position',
						'oldValue': 29,
						'newValue': 30
					}
				]
			};
			expect(initialState.position).toStrictEqual(30);
			const copy = JSON.parse(JSON.stringify(initialState));
			const output = constructPreviousRequestPayload(copy, stateDifference);
			expect(output.position).toStrictEqual(29);
		});
		it('PREVIOUS - NORMAL state difference - change word', () => {
			const stateDifference: StateDifference = {
				differenceType: 'NORMAL',
				differences: [
					{
						field: 'displayedTranscription[3].words[2].word',
						oldValue: 'juba',
						newValue: 'jub'
					}
				]
			};
			initialState.displayedTranscription[3].words[2].word = 'jub';
			expect(initialState.displayedTranscription[3].words[2].word).toStrictEqual('jub');
			const copy = JSON.parse(JSON.stringify(initialState));
			const output = constructPreviousRequestPayload(copy, stateDifference);
			expect(output.displayedTranscription[3].words[2].word).toStrictEqual('juba');
		});

		it('NEXT - NORMAL state difference', () => {
			const stateDifference: StateDifference = {
				differenceType: 'NORMAL',
				differences: [
					{
						'field': 'position',
						'oldValue': 30,
						'newValue': 29
					}
				]
			};
			expect(initialState.position).toStrictEqual(30);
			const copy = JSON.parse(JSON.stringify(initialState));
			const output = constructNextRequestPayload(copy, stateDifference);
			expect(output.position).toStrictEqual(29);
		});
		it('NEXT - NORMAL state difference - change word', () => {
			const stateDifference: StateDifference = {
				differenceType: 'NORMAL',
				differences: [
					{
						field: 'displayedTranscription[3].words[2].word',
						oldValue: 'jub',
						newValue: 'juba'
					}
				]
			};
			initialState.displayedTranscription[3].words[2].word = 'jub';
			expect(initialState.displayedTranscription[3].words[2].word).toStrictEqual('jub');
			const copy = JSON.parse(JSON.stringify(initialState));
			const output = constructNextRequestPayload(copy, stateDifference);
			expect(output.displayedTranscription[3].words[2].word).toStrictEqual('juba');
		});
	});
});

const initialState: RequestPayload = {
	'logo': null,
	'size': 1.31,
	'width': 716,
	'height': 1272,
	'styling': {
		'id': 0,
		'fade': false,
		'name': '',
		'italic': false,
		'auto_move': true,
		'uppercase': true,
		'font_color': '#ffffff',
		'auto_rotate': true,
		'font_family': 'GT-Walsheim-Pro-Bold',
		'font_weight': 400,
		's3_font_name': 'font_1726237604012',
		'word_by_word': true,
		'word_spacing': 0,
		'bounce_effect': true,
		'outline_color': '#000000',
		'template_type': 'Default',
		'auto_font_size': false,
		'remove_symbols': false,
		'highlight_color': '#F9EA03',
		'background_color': '#7F32EE',
		'multiple_speakers': false
	},
	'xOffset': 0,
	'yOffset': 0,
	'duration': 9.72,
	'fontSize': 65,
	'fontType': 'Your fonts',
	'language': 'et',
	'position': 30,
	'requestId': '805f0bd9-b263-49db-b60d-21dac9a8e42a',
	's3FontLink': 'https://textualyze-user-fonts.s3.eu-north-1.amazonaws.com/userId-1/font_1726237385523.ttf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAYUHLF6R5HEPK7NVT%2F20240913%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20240913T142644Z&X-Amz-Expires=86400&X-Amz-Signature=bd3210cc922cf9b7788423ba5b124f32ca5b0ee26b9a02dae49a62ae26f988f9&X-Amz-SignedHeaders=host&x-id=GetObject',
	'uploadType': 'local',
	'isAudioFile': false,
	's3VideoLink': 'https://d34z9b7y2k2zj7.cloudfront.net/805f0bd9-b263-49db-b60d-21dac9a8e42a_compressed.mp4',
	'adjustedWidth': 716,
	'aiDescription': null,
	'speakerColors': {
		'SPEAKER_00': '#ffffff',
		'SPEAKER_01': '#FFBE00',
		'SPEAKER_02': '#00ff51',
		'SPEAKER_03': '#F64C71'
	},
	'adjustedHeight': 1272,
	'targetLanguage': null,
	'adjustedEndTime': 9.72,
	'compressedWidth': 716,
	'compressedHeight': 1272,
	'processingAction': 'Transcribe',
	'adjustedStartTime': 0,
	'fontFileExtension': '',
	'showAiDescription': false,
	'originalFileExtension': 'mp4',
	'displayedTranscription': [
		{
			'id': 1,
			'end': 1.28,
			'text': 'Ja!',
			'endMs': '00:01.28',
			'start': 0.12,
			'words': [
				{
					'id': '9b84048f-0ab7-4fc6-9359-4fb40ab9a1fb',
					'end': 1.28,
					'word': 'Ja!',
					'emoji': null,
					'endMs': '00:01.28',
					'sound': null,
					'start': 0.12,
					'speaker': 'SPEAKER_01',
					'startMs': '00:00.12',
					'emojiUrl': null,
					'linebreak': false,
					'font_color': '',
					'probability': 0.04,
					'soundVolume': 100,
					'highlight_color': null,
					'background_color': null
				}
			],
			'startMs': '00:00.12',
			'fontSize': null,
			'position': null,
			'originalId': 0,
			'translatedText': 'Ja!'
		},
		{
			'id': 2,
			'end': 5.72,
			'text': 'Informaatikasse avalduste vastu võtmine juba',
			'endMs': '00:05.72',
			'start': 2.34,
			'words': [
				{
					'id': 'e1ddece3-5f89-406a-9f64-7f439848801c',
					'end': 4.1,
					'word': 'Informaatikasse',
					'emoji': null,
					'endMs': '00:04.10',
					'sound': null,
					'start': 2.34,
					'speaker': 'SPEAKER_01',
					'startMs': '00:02.34',
					'emojiUrl': null,
					'linebreak': false,
					'font_color': '',
					'probability': 0.03,
					'soundVolume': 100,
					'highlight_color': null,
					'background_color': null
				},
				{
					'id': '71ae9982-e631-471d-a88b-d2ac37e09a6c',
					'end': 4.94,
					'word': 'avalduste',
					'emoji': null,
					'endMs': '00:04.94',
					'sound': null,
					'start': 4.40,
					'speaker': 'SPEAKER_01',
					'startMs': '00:04.40',
					'emojiUrl': null,
					'linebreak': false,
					'font_color': '',
					'probability': 0.01,
					'soundVolume': 100,
					'highlight_color': null,
					'background_color': null
				},
				{
					'id': '74d091a9-9e94-4c89-ba68-53b4c6042dd4',
					'end': 5.24,
					'word': 'vastu',
					'emoji': null,
					'endMs': '00:05.24',
					'sound': null,
					'start': 4.94,
					'speaker': 'SPEAKER_01',
					'startMs': '00:04.94',
					'emojiUrl': null,
					'linebreak': false,
					'font_color': '',
					'probability': 0.02,
					'soundVolume': 100,
					'highlight_color': null,
					'background_color': null
				},
				{
					'id': 'd2070382-0afc-4c71-8f74-60532fefb16b',
					'end': 5.52,
					'word': 'võtmine',
					'emoji': null,
					'endMs': '00:05.52',
					'sound': null,
					'start': 5.24,
					'speaker': 'SPEAKER_01',
					'startMs': '00:05.24',
					'emojiUrl': null,
					'linebreak': false,
					'font_color': '',
					'probability': 0.13,
					'soundVolume': 100,
					'highlight_color': null,
					'background_color': null
				},
				{
					'id': '614f1705-25de-4d35-8de1-58732193a0d5',
					'end': 5.72,
					'word': 'juba',
					'emoji': null,
					'endMs': '00:05.72',
					'sound': null,
					'start': 5.52,
					'speaker': 'SPEAKER_01',
					'startMs': '00:05.52',
					'emojiUrl': null,
					'linebreak': false,
					'font_color': '',
					'probability': 0,
					'soundVolume': 100,
					'highlight_color': null,
					'background_color': null
				}
			],
			'startMs': '00:02.34',
			'fontSize': null,
			'position': null,
			'originalId': 1,
			'translatedText': 'Die Annahme von Bewerbungen für Informatik ist bereits'
		},
		{
			'id': 3,
			'end': 6.16,
			'text': 'käib.',
			'endMs': '00:06.16',
			'start': 5.72,
			'words': [
				{
					'id': '8111c68e-c9b4-4ba0-ab65-69dcb83cab4b',
					'end': 6.16,
					'word': 'käib.',
					'emoji': null,
					'endMs': '00:06.16',
					'sound': null,
					'start': 5.72,
					'speaker': 'SPEAKER_00',
					'startMs': '00:05.72',
					'emojiUrl': 'https://d1ym62eexzi0wy.cloudfront.net/1f49d.webm',
					'linebreak': false,
					'font_color': '',
					'probability': 0,
					'soundVolume': 100,
					'highlight_color': null,
					'background_color': null
				}
			],
			'startMs': '00:05.72',
			'fontSize': null,
			'position': null,
			'originalId': 1,
			'translatedText': 'ist jetzt offen.'
		},
		{
			'id': 4,
			'end': 8.16,
			'text': 'Esita avaldus juba täna, vaid',
			'endMs': '00:08.16',
			'start': 6.34,
			'words': [
				{
					'id': '70495638-9094-428b-ae6f-d6d8babb195c',
					'end': 6.78,
					'word': 'Esita',
					'emoji': null,
					'endMs': '00:06.78',
					'sound': null,
					'start': 6.40,
					'speaker': 'SPEAKER_00',
					'startMs': '00:06.40',
					'emojiUrl': null,
					'linebreak': false,
					'font_color': '',
					'probability': 0.05,
					'soundVolume': 100,
					'highlight_color': null,
					'background_color': null
				},
				{
					'id': '46ddfb80-abe5-48a4-a693-04b43f65aa51',
					'end': 7.08,
					'word': 'avaldus',
					'emoji': null,
					'endMs': '00:07.08',
					'sound': null,
					'start': 6.78,
					'speaker': 'SPEAKER_01',
					'startMs': '00:06.78',
					'emojiUrl': null,
					'linebreak': false,
					'font_color': '',
					'probability': 0.65,
					'soundVolume': 100,
					'highlight_color': null,
					'background_color': null
				},
				{
					'id': '600817d5-6a9b-4a8d-bd03-c69b9ac1d83c',
					'end': 7.22,
					'word': 'juba',
					'emoji': null,
					'endMs': '00:07.22',
					'sound': null,
					'start': 7.08,
					'speaker': 'SPEAKER_01',
					'startMs': '00:07.08',
					'emojiUrl': null,
					'linebreak': false,
					'font_color': '',
					'probability': 0.5,
					'soundVolume': 100,
					'highlight_color': null,
					'background_color': null
				},
				{
					'id': '7215c18f-886d-442b-9ec6-5527fe4ef837',
					'end': 7.82,
					'word': 'täna,',
					'emoji': null,
					'endMs': '00:07.82',
					'sound': null,
					'start': 7.22,
					'speaker': 'SPEAKER_01',
					'startMs': '00:07.22',
					'emojiUrl': null,
					'linebreak': false,
					'font_color': '',
					'probability': 0.33,
					'soundVolume': 100,
					'highlight_color': null,
					'background_color': null
				},
				{
					'id': '18d574c5-9e69-425c-a859-55143f5929ae',
					'end': 8.16,
					'word': 'vaid',
					'emoji': null,
					'endMs': '00:08.16',
					'sound': null,
					'start': 7.82,
					'speaker': 'SPEAKER_01',
					'startMs': '00:07.82',
					'emojiUrl': null,
					'linebreak': false,
					'font_color': '',
					'probability': 0.08,
					'soundVolume': 100,
					'highlight_color': null,
					'background_color': null
				}
			],
			'startMs': '00:06.40',
			'fontSize': null,
			'position': null,
			'originalId': 2,
			'translatedText': 'Reichen Sie Ihre Bewerbung noch heute ein, nur noch'
		},
		{
			'id': 5,
			'end': 9.28,
			'text': 'kaks päeva veel.',
			'endMs': '00:09.28',
			'start': 8.16,
			'words': [
				{
					'id': '393a2743-98ae-414a-ac87-2d2e68606036',
					'end': 8.48,
					'word': 'kaks',
					'emoji': null,
					'endMs': '00:08.48',
					'sound': null,
					'start': 8.16,
					'speaker': 'SPEAKER_01',
					'startMs': '00:08.16',
					'emojiUrl': null,
					'linebreak': false,
					'font_color': '',
					'probability': 0.03,
					'soundVolume': 100,
					'highlight_color': null,
					'background_color': null
				},
				{
					'id': 'c90d9954-b273-4c17-b366-df3089522d2e',
					'end': 8.88,
					'word': 'päeva',
					'emoji': null,
					'endMs': '00:08.88',
					'sound': null,
					'start': 8.48,
					'speaker': 'SPEAKER_01',
					'startMs': '00:08.48',
					'emojiUrl': null,
					'linebreak': false,
					'font_color': '',
					'probability': 0.02,
					'soundVolume': 100,
					'highlight_color': null,
					'background_color': null
				},
				{
					'id': '3037fe9d-241f-409a-8967-d3c7ee231340',
					'end': 9.28,
					'word': 'veel.',
					'emoji': null,
					'endMs': '00:09.28',
					'sound': null,
					'start': 8.88,
					'speaker': 'SPEAKER_01',
					'startMs': '00:08.88',
					'emojiUrl': null,
					'linebreak': false,
					'font_color': '',
					'probability': 0.12,
					'soundVolume': 100,
					'highlight_color': null,
					'background_color': null
				}
			],
			'startMs': '00:08.16',
			'fontSize': null,
			'position': null,
			'originalId': 2,
			'translatedText': 'noch zwei Tage.'
		}
	]
};