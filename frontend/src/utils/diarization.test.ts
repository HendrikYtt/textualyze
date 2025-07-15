import {addDiarization, makeDiarizationContinuous} from './diarization';
import {diarizationContent, diarizationTranscription, diarizationTranscriptionDiarized} from './test-data';
import {DiarizationContent} from '@hendrikytt/api-contracts';

describe('diarization', () => {
	it('addDiarization should work', () => {
		const output = addDiarization(diarizationTranscription, diarizationContent);
		expect(output).toStrictEqual(diarizationTranscriptionDiarized);
	});

	it('makeDiarizationContinuous should work', () => {
		const output = makeDiarizationContinuous(diarizationContent);
		const expected: DiarizationContent[] = [
			{
				'speaker': 'SPEAKER_01',
				'start': 0.005,
				'end': 1.145
			},
			{
				'speaker': 'SPEAKER_02',
				'start': 1.145,
				'end': 9.385
			},
			{
				'speaker': 'SPEAKER_02',
				'start': 9.605,
				'end': 12.155
			},
			{
				'speaker': 'SPEAKER_01',
				'start': 12.155,
				'end': 18.465
			},
			{
				'speaker': 'SPEAKER_02',
				'start': 18.465,
				'end': 38.925
			},
			{
				'speaker': 'SPEAKER_02',
				'start': 39.545,
				'end': 44.685
			}
		];
		expect(output).toStrictEqual(expected);
	});
});