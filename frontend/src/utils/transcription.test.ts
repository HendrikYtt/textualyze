import {baseSegment, inputVAD1, inputVAD2, inputVAD3, inputVAD7, updatedSegment,} from './test-data';
import {
	convertToSegmentedArrayWithMaxWords,
	mergeSegments,
	secondsToMSFormat,
	Segment
} from '@hendrikytt/api-contracts';
import {
	addSegmentToSegments,
	addSegmentToUntouchedSegments,
	buildNewSegment,
	extractAllTimestamps,
	insertWordIntoSegments,
	insertWordIntoUntouchedSegments,
	isMoveWordToNextSegmentAvailable,
	isMoveWordToPreviousSegmentAvailable,
	mergeTimestamps,
	moveWordToNextSegment,
	moveWordToPreviousSegment,
	removeSegmentFromSegments,
	removeSegmentFromUntouchedSegments,
	removeWordFromSegments,
	removeWordFromUntouchedSegments,
	segmentLimits,
	wordLimits
} from './transcription';
import { omit } from 'lodash';

const removeWordIds = (segment: Segment) => {
	return {
		...segment,
		words: segment.words.map(word => {
			const { id, ...rest } = word;
			return rest;
		})
	};
};

const removeAllWordIds = (segments: Segment[]) => {
	return segments.map(removeWordIds);
};

describe('transcription', () => {

	describe('convertToSegmentedArrayWithMaxWords', () => {
		it('should work 1', () => {
			const wordsPerSegment = 1;
			const output = convertToSegmentedArrayWithMaxWords(inputVAD7, inputVAD7, wordsPerSegment);
			const transformedOutput = removeAllWordIds(output);
			const transformedExpected = removeAllWordIds(inputVAD1);

			expect(transformedOutput).toStrictEqual(transformedExpected);
		});
		it('should work 2', () => {
			const wordsPerSegment = 2;
			const output = convertToSegmentedArrayWithMaxWords(inputVAD7, inputVAD7, wordsPerSegment);
			const transformedOutput = removeAllWordIds(output);
			const transformedExpected = removeAllWordIds(inputVAD2);

			expect(transformedOutput).toStrictEqual(transformedExpected);
		});
		it('should work 3', () => {
			const wordsPerSegment = 3;
			const output = convertToSegmentedArrayWithMaxWords(inputVAD7, inputVAD7, wordsPerSegment);
			const transformedOutput = removeAllWordIds(output);
			const transformedExpected = removeAllWordIds(inputVAD3);

			expect(transformedOutput).toStrictEqual(transformedExpected);
		});
	});

	describe('mergeSegments', () => {
		it('should merge', () => {
			const output = mergeSegments(baseSegment, updatedSegment, false);
			const transformedOutput = removeAllWordIds(output);
			const transformedExpected = removeAllWordIds(updatedSegment);

			expect(transformedOutput).toStrictEqual(transformedExpected);
		});
	});

	describe('mergeTimestamps', () => {
		it('should merge with the same length', () => {
			const edited = JSON.parse(JSON.stringify(inputVAD7));
			edited[0].start = 1.48;
			edited[0].startMs = secondsToMSFormat(1.48);
			edited[0].words[0].start = 1.48;
			edited[0].words[0].startMs = secondsToMSFormat(1.48);

			const expected = JSON.parse(JSON.stringify(inputVAD7));
			expected[0].start = 1.48;
			expected[0].startMs = secondsToMSFormat(1.48);
			expected[0].words[0].start = 1.48;
			expected[0].words[0].startMs = secondsToMSFormat(1.48);

			const timestamps = extractAllTimestamps(edited);
			const output = mergeTimestamps(inputVAD7, timestamps);
			expect(output).toStrictEqual(expected);
		});

		it('should merge with different length', () => {
			const edited = JSON.parse(JSON.stringify(inputVAD1));
			edited[0].start = 1.48;
			edited[0].startMs = secondsToMSFormat(1.48);
			edited[0].words[0].start = 1.48;
			edited[0].words[0].startMs = secondsToMSFormat(1.48);

			const expected = JSON.parse(JSON.stringify(inputVAD7));
			expected[0].start = 1.48;
			expected[0].startMs = secondsToMSFormat(1.48);
			expected[0].words[0].start = 1.48;
			expected[0].words[0].startMs = secondsToMSFormat(1.48);

			const timestamps = extractAllTimestamps(edited);
			const output = mergeTimestamps(inputVAD7, timestamps);
			expect(output).toStrictEqual(expected);
		});
	});

	describe('insertWordIntoSegments', () => {
		it('should work - duration should be set to 0', () => {
			const segmentIndexToInsertIn = 0;
			const wordIndexToInsertAfter = 0;
			const updatedSegments = insertWordIntoSegments(inputVAD7, segmentIndexToInsertIn, wordIndexToInsertAfter);
			expect(omit(updatedSegments[segmentIndexToInsertIn].words[wordIndexToInsertAfter + 1], 'id')).toStrictEqual(
				omit({
					start: 1.73,
					end: 1.73,
					word: '',
					probability: 1,
					font_color: '',
					linebreak: false,
					background_color: null,
					highlight_color: null,
					emoji: null,
					emojiUrl: null,
					startMs: secondsToMSFormat(1.73),
					endMs: secondsToMSFormat(1.73),
					sound: null,
					soundVolume: 100,
					speaker: 'SPEAKER_00'
				}, 'id'));
		});

		it('should work - duration should be set to next start', () => {
			const segmentIndexToInsertIn = 0;
			const wordIndexToInsertAfter = 1;
			const updatedSegments = insertWordIntoSegments(inputVAD7, segmentIndexToInsertIn, wordIndexToInsertAfter);
			expect(omit(updatedSegments[segmentIndexToInsertIn].words[wordIndexToInsertAfter + 1], 'id')).toStrictEqual(
				omit({
					start: 2.19,
					end: 3.15,
					word: '',
					probability: 1,
					font_color: '',
					linebreak: false,
					background_color: null,
					highlight_color: null,
					emoji: null,
					emojiUrl: null,
					startMs: secondsToMSFormat(2.19),
					endMs: secondsToMSFormat(3.15),
					sound: null,
					soundVolume: 100,
					speaker: 'SPEAKER_00'
				}, 'id'));
		});

		it('should work - if it is last one in segment, new word end should be segment end', () => {
			const segmentIndexToInsertIn = 0;
			const wordIndexToInsertAfter = 6;
			const updatedSegments = insertWordIntoSegments(inputVAD7, segmentIndexToInsertIn, wordIndexToInsertAfter);
			expect(omit(updatedSegments[segmentIndexToInsertIn].words[wordIndexToInsertAfter + 1], 'id')).toStrictEqual(
				omit({
					start: 7.01,
					end: 7.01,
					word: '',
					probability: 1,
					font_color: '',
					linebreak: false,
					background_color: null,
					highlight_color: null,
					emoji: null,
					emojiUrl: null,
					startMs: secondsToMSFormat(7.01),
					endMs: secondsToMSFormat(7.01),
					sound: null,
					soundVolume: 100,
					speaker: 'SPEAKER_00'
				}, 'id'));
		});
	});

	describe('insertWordIntoUntouchedSegments', () => {
		it('should work - current segments have 1 word per line, untouched 7', () => {
			const segmentIndexToInsertIn = 10;
			const wordIndexToInsertAfter = 0;
			const copy1: Segment[] = JSON.parse(JSON.stringify(inputVAD1));
			const copy7: Segment[] = JSON.parse(JSON.stringify(inputVAD7));
			const updatedSegments = insertWordIntoSegments(copy1, segmentIndexToInsertIn, wordIndexToInsertAfter);
			const untouchedOutput = insertWordIntoUntouchedSegments(updatedSegments, copy7, segmentIndexToInsertIn, wordIndexToInsertAfter);
			expect(omit(updatedSegments[segmentIndexToInsertIn].words[wordIndexToInsertAfter + 1], 'id')).toStrictEqual(omit(untouchedOutput[1].words[4], 'id'));
		});
	});

	describe('removeWordFromSegments', () => {
		it('should remove 1st word object', () => {
			const segmentIndexToRemoveIn = 0;
			const wordIndexToRemove = 0;
			const copy: Segment[] = JSON.parse(JSON.stringify(inputVAD7));
			copy[segmentIndexToRemoveIn].words = copy[segmentIndexToRemoveIn].words.filter((w, index) => index !== wordIndexToRemove);
			copy[segmentIndexToRemoveIn].start = copy[segmentIndexToRemoveIn].words[wordIndexToRemove].start;
			copy[segmentIndexToRemoveIn].startMs = copy[segmentIndexToRemoveIn].words[wordIndexToRemove].startMs;
			const {remainingSegments, removedWord} = removeWordFromSegments(inputVAD7, segmentIndexToRemoveIn, wordIndexToRemove);
			expect(remainingSegments).toStrictEqual(copy);
			expect(removedWord).toStrictEqual(inputVAD7[segmentIndexToRemoveIn].words[wordIndexToRemove]);
		});

		it('should remove last word object', () => {
			const segmentIndexToRemoveIn = 0;
			const wordIndexToRemove = 6;
			const copy: Segment[] = JSON.parse(JSON.stringify(inputVAD7));
			copy[segmentIndexToRemoveIn].words = copy[segmentIndexToRemoveIn].words.filter((w, index) => index !== wordIndexToRemove);
			copy[segmentIndexToRemoveIn].end = copy[segmentIndexToRemoveIn].words[wordIndexToRemove - 1].end;
			copy[segmentIndexToRemoveIn].endMs = copy[segmentIndexToRemoveIn].words[wordIndexToRemove - 1].endMs;
			const {remainingSegments, removedWord} = removeWordFromSegments(inputVAD7, segmentIndexToRemoveIn, wordIndexToRemove);
			expect(remainingSegments).toStrictEqual(copy);
			expect(removedWord).toStrictEqual(inputVAD7[segmentIndexToRemoveIn].words[wordIndexToRemove]);
		});

		it('should remove segment too if word object is the last one in that segment', () => {
			const segmentIndexToRemoveIn = 0;
			const wordIndexToRemove = 0;
			let copy: Segment[] = JSON.parse(JSON.stringify(inputVAD7));
			copy[segmentIndexToRemoveIn].words = [copy[segmentIndexToRemoveIn].words[0]];
			const {remainingSegments, removedWord} = removeWordFromSegments(copy, segmentIndexToRemoveIn, wordIndexToRemove);
			copy = copy.filter((w, index) => index !== segmentIndexToRemoveIn);
			expect(remainingSegments).toStrictEqual(copy);
			expect(removedWord).toStrictEqual(inputVAD7[segmentIndexToRemoveIn].words[wordIndexToRemove]);
		});
	});

	describe('removeWordFromUntouchedSegments', () => {
		it('should remove the word correctly from untouched segments', () => {
			const segmentIndexToRemoveFrom = 10;
			const wordIndexToRemove = 0;
			const copy1: Segment[] = JSON.parse(JSON.stringify(inputVAD1));
			const copy7: Segment[] = JSON.parse(JSON.stringify(inputVAD7));
			const untouchedOutput = removeWordFromUntouchedSegments(copy1, copy7, segmentIndexToRemoveFrom, wordIndexToRemove);
			expect(omit(untouchedOutput[1].words[3], 'id')).toStrictEqual({
				end: 9.57,
				endMs: secondsToMSFormat(9.57),
				probability: 0.994140625,
				font_color: '',
				linebreak: false,
				background_color: null,
				highlight_color: null,
				emoji: null,
				emojiUrl: null,
				start: 9.27,
				startMs: secondsToMSFormat(9.27),
				word: 'video.',
				sound: null,
				soundVolume: 100,
				speaker: 'SPEAKER_00'
			});
		});
	});

	describe('addSegmentToSegments', () => {
		it('should work - add after first to the middle', () => {
			const segmentIndexToInsertAfter = 0;
			const copy7: Segment[] = JSON.parse(JSON.stringify(inputVAD7));
			const currentSegment = copy7[segmentIndexToInsertAfter];
			const nextSegment = copy7[segmentIndexToInsertAfter + 1];
			const newSegment = buildNewSegment(currentSegment, nextSegment);
			const {updatedSegments} = addSegmentToSegments(copy7, segmentIndexToInsertAfter);

			const transformedNewSegment = removeAllWordIds([newSegment]);
			const transformedOutput = removeAllWordIds(updatedSegments);
			expect(transformedOutput[segmentIndexToInsertAfter + 1]).toStrictEqual(transformedNewSegment[0]);
		});

		it('should work - add to the end', () => {
			const segmentIndexToInsertAfter = 1;
			const copy7: Segment[] = JSON.parse(JSON.stringify(inputVAD7));
			const currentSegment = copy7[segmentIndexToInsertAfter];
			const nextSegment = copy7[segmentIndexToInsertAfter + 1];
			const newSegment = buildNewSegment(currentSegment, nextSegment);
			const {updatedSegments} = addSegmentToSegments(copy7, segmentIndexToInsertAfter);

			const transformedNewSegment = removeAllWordIds([newSegment]);
			const transformedOutput = removeAllWordIds(updatedSegments);
			expect(transformedOutput[segmentIndexToInsertAfter + 1]).toStrictEqual(transformedNewSegment[0]);
		});
	});

	describe('addSegmentToUntouchedSegments', () => {
		it('should work - new segment is between untouched segments words', () => {
			const currentSegmentIndexToInsertAfter = 0;
			const copy1: Segment[] = JSON.parse(JSON.stringify(inputVAD1));
			const copy7: Segment[] = JSON.parse(JSON.stringify(inputVAD7));
			const newSegment = buildNewSegment(copy1[currentSegmentIndexToInsertAfter], copy1[currentSegmentIndexToInsertAfter + 1]);
			expect(copy7[0].words.length).toStrictEqual(7);
			const output = addSegmentToUntouchedSegments(copy1, copy7, currentSegmentIndexToInsertAfter, newSegment);

			expect(output[0].words.length).toStrictEqual(8);
		});

		it('should work - new segment is not between untouched segment words meaning index is at the last word in the segment', () => {
			const currentSegmentIndexToInsertAfter = 11;
			const copy1: Segment[] = JSON.parse(JSON.stringify(inputVAD1));
			const copy7: Segment[] = JSON.parse(JSON.stringify(inputVAD7));
			const newSegment = buildNewSegment(copy1[currentSegmentIndexToInsertAfter], copy1[currentSegmentIndexToInsertAfter + 1]);
			expect(copy7.length).toStrictEqual(2);
			const output = addSegmentToUntouchedSegments(copy1, copy7, currentSegmentIndexToInsertAfter, newSegment);

			expect(output.length).toStrictEqual(3);
		});
	});

	describe('removeSegmentFromSegments', () => {
		it('should work - delete 1st one', () => {
			const segmentIndexToDeleteIn = 0;
			const copy7: Segment[] = JSON.parse(JSON.stringify(inputVAD7));
			const {remainingSegments} = removeSegmentFromSegments(copy7, segmentIndexToDeleteIn);

			const transformedCopy = removeAllWordIds(copy7);
			const transformedOutput = removeAllWordIds(remainingSegments);
			expect(transformedOutput).toStrictEqual([transformedCopy[1]]);
		});

		it('should work - delete 2nd one', () => {
			const segmentIndexToDeleteIn = 1;
			const copy7: Segment[] = JSON.parse(JSON.stringify(inputVAD7));
			const {remainingSegments} = removeSegmentFromSegments(copy7, segmentIndexToDeleteIn);

			const transformedCopy = removeAllWordIds(copy7);
			const transformedOutput = removeAllWordIds(remainingSegments);
			expect(transformedOutput).toStrictEqual([transformedCopy[0]]);
		});
	});

	describe('removeSegmentFromSegments', () => {
		it('should work - delete 1 word id', () => {
			const copy7: Segment[] = JSON.parse(JSON.stringify(inputVAD7));
			const wordIdsToDelete = [copy7[0].words[0].id];
			const output = removeSegmentFromUntouchedSegments(copy7, wordIdsToDelete);

			expect(output.length).toStrictEqual(2);
			expect(output[0].words.length).toStrictEqual(6);
		});

		it('should work - delete 2nd one', () => {
			const copy7: Segment[] = JSON.parse(JSON.stringify(inputVAD7));
			const wordIdsToDelete = copy7[0].words.map(w => w.id);
			const output = removeSegmentFromUntouchedSegments(copy7, wordIdsToDelete);

			expect(output.length).toStrictEqual(1);
		});
	});

	describe('segment move validators', () => {
		it('isMoveWordToPreviousSegmentAvailable - segment is not first one and word is first in segment', () => {
			const output = isMoveWordToPreviousSegmentAvailable(1, 0);
			expect(output).toStrictEqual(true);
		});

		it('isMoveWordToPreviousSegmentAvailable - segment is first one and word is first in segment', () => {
			const output = isMoveWordToPreviousSegmentAvailable(0, 0);
			expect(output).toStrictEqual(false);
		});

		it('isMoveWordToPreviousSegmentAvailable - segment is first one and word is not first in segment', () => {
			const output = isMoveWordToPreviousSegmentAvailable(0, 1);
			expect(output).toStrictEqual(false);
		});

		it('isMoveWordToNextSegmentAvailable - segment is not last one and word is last in segment', () => {
			const output = isMoveWordToNextSegmentAvailable(inputVAD7, 0, 6);
			expect(output).toStrictEqual(true);
		});

		it('isMoveWordToNextSegmentAvailable - segment is last one and word is last in segment', () => {
			const output = isMoveWordToNextSegmentAvailable(inputVAD7, 1, 6);
			expect(output).toStrictEqual(false);
		});

		it('isMoveWordToNextSegmentAvailable - segment is last one and word is not last in segment', () => {
			const output = isMoveWordToNextSegmentAvailable(inputVAD7, 1, 5);
			expect(output).toStrictEqual(false);
		});

		it('isMoveWordToPreviousSegmentAvailable && isMoveWordToNextSegmentAvailable - segment is first one and word is only one in segment', () => {
			const isNext = isMoveWordToNextSegmentAvailable(inputVAD1, 0, 0);
			expect(isNext).toStrictEqual(true);

			const isPrev = isMoveWordToPreviousSegmentAvailable(0, 0);
			expect(isPrev).toStrictEqual(false);
		});

		it('isMoveWordToPreviousSegmentAvailable && isMoveWordToNextSegmentAvailable - segment is in the middle and word is only one in segment', () => {
			const isNext = isMoveWordToNextSegmentAvailable(inputVAD1, 1, 0);
			expect(isNext).toStrictEqual(true);

			const isPrev = isMoveWordToPreviousSegmentAvailable(1, 0);
			expect(isPrev).toStrictEqual(true);
		});

		it('isMoveWordToPreviousSegmentAvailable && isMoveWordToNextSegmentAvailable - segment is last and word is only one in segment', () => {
			const isNext = isMoveWordToNextSegmentAvailable(inputVAD1, inputVAD1.length - 1, 0);
			expect(isNext).toStrictEqual(false);

			const isPrev = isMoveWordToPreviousSegmentAvailable(inputVAD1.length - 1, 0);
			expect(isPrev).toStrictEqual(true);
		});

	});

	describe('moveWordToPreviousSegment', () => {
		it('should move 2nd segment 1st word to 1st segment', () => {
			const segmentIndex = 1;
			const copy2: Segment[] = JSON.parse(JSON.stringify(inputVAD2));
			const wordToMove = copy2[segmentIndex].words[0];
			const {remainingSegments} = moveWordToPreviousSegment(copy2, segmentIndex);

			expect(remainingSegments[segmentIndex - 1].words.length).toStrictEqual(3);
			expect(remainingSegments[segmentIndex].words.length).toStrictEqual(1);
			expect(remainingSegments[segmentIndex - 1].words[remainingSegments[segmentIndex - 1].words.length - 1].end).toStrictEqual(wordToMove.end);
		});

		it('should move last segment 1st word (last word here) to last-1 segment', () => {
			const copy2: Segment[] = JSON.parse(JSON.stringify(inputVAD2));
			const lastSegmentIndex = copy2.length - 1;
			const wordToMove = copy2[lastSegmentIndex].words[0];
			const {remainingSegments} = moveWordToPreviousSegment(copy2, lastSegmentIndex);

			expect(remainingSegments[lastSegmentIndex - 1].words.length).toStrictEqual(3);
			expect(remainingSegments[lastSegmentIndex - 1].words[remainingSegments[lastSegmentIndex - 1].words.length - 1].end).toStrictEqual(wordToMove.end);
			expect(remainingSegments[lastSegmentIndex]?.words.length).toBeUndefined();
		});
	});

	describe('moveWordToNextSegment', () => {
		it('should move 2nd segment last word to 3rd segment', () => {
			const segmentIndex = 1;
			const copy2: Segment[] = JSON.parse(JSON.stringify(inputVAD2));
			const wordToMove = copy2[segmentIndex].words[copy2[segmentIndex].words.length - 1];
			const {remainingSegments} = moveWordToNextSegment(copy2, segmentIndex);

			expect(remainingSegments[segmentIndex].words.length).toStrictEqual(1);
			expect(remainingSegments[segmentIndex + 1].words.length).toStrictEqual(3);
			expect(remainingSegments[segmentIndex + 1].words[0].start).toStrictEqual(wordToMove.start);
			expect(remainingSegments[segmentIndex + 1].start).toStrictEqual(wordToMove.start);
		});

		it('should move 4th segment last word (last word here) to 5th segment', () => {
			const segmentIndex = 3;
			const copy2: Segment[] = JSON.parse(JSON.stringify(inputVAD2));
			const wordToMove = copy2[segmentIndex].words[copy2[segmentIndex].words.length - 1];
			expect(copy2.length).toStrictEqual(7);

			const {remainingSegments} = moveWordToNextSegment(copy2, segmentIndex);
			expect(remainingSegments.length).toStrictEqual(6);
			expect(remainingSegments[segmentIndex].words.length).toStrictEqual(3);
			expect(remainingSegments[segmentIndex].words[0].start).toStrictEqual(wordToMove.start);
			expect(remainingSegments[segmentIndex].start).toStrictEqual(wordToMove.start);
		});
	});

	describe('wordLimits', () => {
		it('1st segment, 1st word', () => {
			const segmentIndex = 0;
			const wordIndex = 0;
			const copy2: Segment[] = JSON.parse(JSON.stringify(inputVAD2));
			const output = wordLimits(copy2, segmentIndex, wordIndex);
			expect(output).toStrictEqual({min: 1.47, max: 1.73});
		});

		it('1st segment, last word', () => {
			const segmentIndex = 0;
			const wordIndex = 1;
			const copy2: Segment[] = JSON.parse(JSON.stringify(inputVAD2));
			const output = wordLimits(copy2, segmentIndex, wordIndex);
			expect(output).toStrictEqual({min: 1.73, max: 2.19});
		});

		it('last segment, last word', () => {
			const copy2: Segment[] = JSON.parse(JSON.stringify(inputVAD2));
			const segmentIndex = copy2.length - 1;
			const wordIndex = 0;
			const output = wordLimits(copy2, segmentIndex, wordIndex);
			expect(output).toStrictEqual({min: 9.27, max: 9.57});
		});
	});

	describe('segmentLimits', () => {
		it('1st segment', () => {
			const segmentIndex = 0;
			const fileDuration = 10.40;
			const copy2: Segment[] = JSON.parse(JSON.stringify(inputVAD2));
			const output = segmentLimits(copy2, segmentIndex, fileDuration);
			expect(output).toStrictEqual({min: 0, max: 3.15});
		});

		it('2nd segment', () => {
			const segmentIndex = 1;
			const fileDuration = 10.40;
			const copy2: Segment[] = JSON.parse(JSON.stringify(inputVAD2));
			const output = segmentLimits(copy2, segmentIndex, fileDuration);
			expect(output).toStrictEqual({min: 2.19, max: 5.41});
		});

		it('last segment', () => {
			const copy2: Segment[] = JSON.parse(JSON.stringify(inputVAD2));
			const segmentIndex = copy2.length - 1;
			const fileDuration = 10.40;
			const output = segmentLimits(copy2, segmentIndex, fileDuration);
			expect(output).toStrictEqual({min: 9.27, max: 10.40});
		});
	});
});