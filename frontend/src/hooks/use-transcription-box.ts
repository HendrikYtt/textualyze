import {useRef, useState} from 'react';
import {secondsToMSFormat, Segment} from '@hendrikytt/api-contracts';
import {msFormatToSeconds} from '../utils/time';
import {displayInfo} from '../utils/utils';
import {useTranscriptionContext} from '../contexts/TranscriptionContext';
import {
	addSegmentToSegments,
	addSegmentToUntouchedSegments,
	insertWordIntoSegments,
	insertWordIntoUntouchedSegments, moveWordToNextSegment,
	moveWordToPreviousSegment,
	removeSegmentFromSegments,
	removeSegmentFromUntouchedSegments,
	removeWordFromSegments,
	removeWordFromUntouchedSegments
} from '../utils/transcription';
import {isEqual} from 'lodash';
import {fpsConst} from '@hendrikytt/api-contracts/dist/remotion';

const calculatedTime = (100 / fpsConst) / 100;
const smallestPossibleTime = Math.ceil(calculatedTime * 100) / 100;
export const useTranscriptionBox = () => {
	const {
		requestPayload,
		setRequestPayload,
		adjustedFileData,
		unTouchedTranscription,
		setUnTouchedTranscription,
		playerRef,
		commandDifferenceType
	} = useTranscriptionContext();

	const [currentEditableMsTime, setCurrentEditableMsTime] = useState('');

	const segmentSettingsDropdownRef = useRef<HTMLDivElement>(null);
	const segmentSoundPickerDropdownRef = useRef<HTMLDivElement>(null);
	const segmentTimestampDropdownRef = useRef<HTMLDivElement>(null);

	const seekTo = (seekTime: number, addOne: boolean) => {
		if (!playerRef.current) {
			return;
		}
		const inFrames = Math.round(seekTime * fpsConst) + (addOne ? 1 : 0);
		playerRef.current.seekTo(inFrames);
		playerRef.current.pause();
	};

	const handleTranscribeTextChange = (segmentIndex: number, wordIndex: number, newText: string) => {
		const copy: Segment[] = JSON.parse(JSON.stringify(requestPayload.displayedTranscription));
		copy[segmentIndex].words[wordIndex].word = newText;

		setRequestPayload(prevState => ({
			...prevState,
			displayedTranscription: copy
		}));
	};

	const handleWordMsChange = (segmentIndex: number, wordIndex: number, newTimeMSFormat: string, field: 'startMs' | 'endMs') => {
		const displayedTranscriptionCopy: Segment[] = JSON.parse(JSON.stringify(requestPayload.displayedTranscription));
		if (wordIndex === 0 && field === 'startMs') {
			displayedTranscriptionCopy[segmentIndex][field] = newTimeMSFormat;
		} else if (wordIndex === displayedTranscriptionCopy[segmentIndex].words.length - 1 && field === 'endMs') {
			displayedTranscriptionCopy[segmentIndex][field] = newTimeMSFormat;
		}

		displayedTranscriptionCopy[segmentIndex].words[wordIndex][field] = newTimeMSFormat;

		setRequestPayload(prevState => ({
			...prevState,
			displayedTranscription: displayedTranscriptionCopy
		}));
	};

	const handleWordMsBlur = (segmentIndex: number, wordIndex: number, newTimeMSFormat: string, field: 'start' | 'end') => {
		const displayedTranscriptionCopy: Segment[] = JSON.parse(JSON.stringify(requestPayload.displayedTranscription));
		const segment = displayedTranscriptionCopy[segmentIndex];
		const word = segment.words[wordIndex];
		const formatted = msFormatToSeconds(newTimeMSFormat);

		const resetSegment = () => {
			segment[`${field}Ms`] = currentEditableMsTime;
			segment[field] = msFormatToSeconds(currentEditableMsTime)!;
		};
		if (formatted === null) {
			displayInfo('Timestamp must be of "MM:SS.SS" format');
			word[`${field}Ms`] = currentEditableMsTime;
			word[field] = msFormatToSeconds(currentEditableMsTime)!;
			resetSegment();
		} else {
			word[field] = formatted;

			if (field === 'start') {
				if (formatted >= word.end) {
					displayInfo(`Current timestamp must be smaller than ${secondsToMSFormat(word.end)}`);
					word[`${field}Ms`] = currentEditableMsTime;
					word[field] = msFormatToSeconds(currentEditableMsTime)!;
					resetSegment();
				} else if (wordIndex > 0) {
					const previousWord = segment.words[wordIndex - 1];

					if (formatted < previousWord.end) {
						displayInfo(`Current timestamp must be greater than ${secondsToMSFormat(previousWord.end)}`);
						word[`${field}Ms`] = currentEditableMsTime;
						word[field] = msFormatToSeconds(currentEditableMsTime)!;
						if (wordIndex === 0 || segment.words.length - 1 === wordIndex) {
							segment[`${field}Ms`] = currentEditableMsTime;
						}
					}
				} else if (wordIndex === 0) {
					if (formatted < segment.start) {
						displayInfo(`Current timestamp must be greater than ${secondsToMSFormat(segment.start)}`);
						word[`${field}Ms`] = currentEditableMsTime;
						word[field] = msFormatToSeconds(currentEditableMsTime)!;
						resetSegment();
					}
				}
			} else {
				if (formatted <= word.start) {
					displayInfo(`Current timestamp must be greater than ${secondsToMSFormat(word.start)}`);
					word[`${field}Ms`] = currentEditableMsTime;
					word[field] = msFormatToSeconds(currentEditableMsTime)!;
					resetSegment();
				} else if (wordIndex < segment.words.length - 1) {
					const nextWord = segment.words[wordIndex + 1];

					if (formatted > nextWord.start) {
						displayInfo(`Current timestamp must be smaller than ${secondsToMSFormat(nextWord.start)}`);
						word[`${field}Ms`] = currentEditableMsTime;
						word[field] = msFormatToSeconds(currentEditableMsTime)!;
						resetSegment();
					}
				} else if (wordIndex === segment.words.length - 1) {
					if (formatted > segment.end) {
						displayInfo(`Current timestamp must be smaller than ${secondsToMSFormat(segment.end)}`);
						word[`${field}Ms`] = currentEditableMsTime;
						word[field] = msFormatToSeconds(currentEditableMsTime)!;
						resetSegment();
					}
				}
			}
		}

		if (!isEqual(requestPayload.displayedTranscription, displayedTranscriptionCopy)) {
			setRequestPayload(prevState => ({
				...prevState,
				displayedTranscription: displayedTranscriptionCopy
			}));
		}
	};

	const handleSegmentMsChange = (segmentIndex: number, newTimeMSFormat: string, field: 'startMs' | 'endMs') => {
		const displayedTranscriptionCopy: Segment[] = JSON.parse(JSON.stringify(requestPayload.displayedTranscription));
		displayedTranscriptionCopy[segmentIndex][field] = newTimeMSFormat;
		if (field === 'startMs') {
			displayedTranscriptionCopy[segmentIndex].words[0][field] = newTimeMSFormat;
		} else {
			displayedTranscriptionCopy[segmentIndex].words[displayedTranscriptionCopy[segmentIndex].words.length - 1][field] = newTimeMSFormat;
		}

		setRequestPayload(prevState => ({
			...prevState,
			displayedTranscription: displayedTranscriptionCopy
		}));
	};

	const handleSegmentMsBlur = (segmentIndex: number, newTimeMSFormat: string, field: 'start' | 'end') => {
		const displayedTranscriptionCopy: Segment[] = JSON.parse(JSON.stringify(requestPayload.displayedTranscription));
		const lastSegmentIndex = displayedTranscriptionCopy.length - 1;
		const segment = displayedTranscriptionCopy[segmentIndex];
		const formatted = msFormatToSeconds(newTimeMSFormat);

		const resetWord = () => {
			const affectedWord = segment.words.find(w => w[field] === segment[field]);
			if (affectedWord) {
				affectedWord[`${field}Ms`] = currentEditableMsTime;
			}
		};

		const isTranscribe = requestPayload.processingAction === 'Transcribe';

		if (formatted === null) {
			displayInfo('Timestamp must be of "MM:SS.SS" format');
			segment[`${field}Ms`] = currentEditableMsTime;
			segment[field] = msFormatToSeconds(currentEditableMsTime)!;
			resetWord();
		} else {
			segment[field] = formatted;

			if (field === 'start') {
				const wordToCheck = segment.words[0];

				if (isTranscribe && formatted > wordToCheck.end) {
					displayInfo(`Current timestamp must be smaller than ${secondsToMSFormat(wordToCheck.end)}`);
					segment[`${field}Ms`] = currentEditableMsTime;
					segment[field] = msFormatToSeconds(currentEditableMsTime)!;
					resetWord();
				} else if (segmentIndex > 0) {
					const previousSegment = displayedTranscriptionCopy[segmentIndex - 1];

					if (isTranscribe && formatted < previousSegment.end) {
						displayInfo(`Current timestamp must be greater than ${secondsToMSFormat(previousSegment.end)}`);
						segment[`${field}Ms`] = currentEditableMsTime;
						segment[field] = msFormatToSeconds(currentEditableMsTime)!;
						resetWord();
					} else {
						wordToCheck[field] = formatted;
					}
				} else {
					wordToCheck[field] = formatted;
				}
			} else {
				const wordToCheck = segment.words[segment.words.length - 1];

				if (isTranscribe && formatted < wordToCheck.start) {
					displayInfo(`Current timestamp must be greater than ${secondsToMSFormat(wordToCheck.start)}`);
					segment[`${field}Ms`] = currentEditableMsTime;
					segment[field] = msFormatToSeconds(currentEditableMsTime)!;
					resetWord();
				} else if (segmentIndex === lastSegmentIndex) {
					if (isTranscribe && formatted > adjustedFileData.duration) {
						displayInfo(`Current timestamp must be smaller than ${secondsToMSFormat(adjustedFileData.duration)}`);
						segment[`${field}Ms`] = currentEditableMsTime;
						segment[field] = msFormatToSeconds(currentEditableMsTime)!;
						resetWord();
					} else {
						wordToCheck[field] = formatted;
					}
				} else {
					const nextSegment = displayedTranscriptionCopy[segmentIndex + 1];

					if (isTranscribe && formatted > nextSegment.start) {
						displayInfo(`Current timestamp must be smaller than ${secondsToMSFormat(nextSegment.start)}`);
						segment[`${field}Ms`] = currentEditableMsTime;
						segment[field] = msFormatToSeconds(currentEditableMsTime)!;
						resetWord();
					} else {
						wordToCheck[field] = formatted;
					}
				}
			}
		}

		setRequestPayload(prevState => ({
			...prevState,
			displayedTranscription: displayedTranscriptionCopy
		}));
	};

	const handleTranslateTextChange = (index: number, newText: string) => {
		const copy: Segment[] = JSON.parse(JSON.stringify(requestPayload.displayedTranscription));
		copy[index].translatedText = newText;
		setRequestPayload(prevState => ({
			...prevState,
			displayedTranscription: copy
		}));
	};

	const handleToggleLineBreak = (segmentIndex: number, wordIndex: number) => {
		const copy: Segment[] = JSON.parse(JSON.stringify(requestPayload.displayedTranscription));
		copy[segmentIndex].words[wordIndex].linebreak = !copy[segmentIndex].words[wordIndex].linebreak;

		setRequestPayload(prevState => ({
			...prevState,
			displayedTranscription: copy
		}));
	};

	const handleResetWordColors = (segmentIndex: number, wordIndex: number) => {
		const copy: Segment[] = JSON.parse(JSON.stringify(requestPayload.displayedTranscription));
		copy[segmentIndex].words[wordIndex].font_color = '';
		copy[segmentIndex].words[wordIndex].background_color = null;
		copy[segmentIndex].words[wordIndex].highlight_color = null;

		setRequestPayload(prevState => ({
			...prevState,
			displayedTranscription: copy
		}));
	};

	const handleSegmentPositionChange = (segmentIndex: number, value: number) => {
		const copy: Segment[] = JSON.parse(JSON.stringify(requestPayload.displayedTranscription));
		copy[segmentIndex].position = value;
		setRequestPayload(prevState => {
			return {
				...prevState,
				displayedTranscription: copy
			};
		});
	};

	const handleSegmentFontSizeChange = (segmentIndex: number, value: number) => {
		const copy: Segment[] = JSON.parse(JSON.stringify(requestPayload.displayedTranscription));
		copy[segmentIndex].fontSize = value;
		setRequestPayload(prevState => {
			return {
				...prevState,
				displayedTranscription: copy
			};
		});
	};

	const handleResetSegmentStyles = (segmentIndex: number) => {
		const copy: Segment[] = JSON.parse(JSON.stringify(requestPayload.displayedTranscription));
		copy[segmentIndex].position = null;
		copy[segmentIndex].fontSize = null;

		setRequestPayload(prevState => ({
			...prevState,
			displayedTranscription: copy
		}));
	};

	const handleAddWord = (segmentIndex: number, wordIndex: number) => {
		const updatedSegments = insertWordIntoSegments(requestPayload.displayedTranscription, segmentIndex, wordIndex);
		const updatedUntouchedSegments = insertWordIntoUntouchedSegments(updatedSegments, unTouchedTranscription, segmentIndex, wordIndex);
		setUnTouchedTranscription(updatedUntouchedSegments);
		setRequestPayload(prevState => ({
			...prevState,
			displayedTranscription: updatedSegments
		}));
		commandDifferenceType.current = {
			differenceType: 'NEW_WORD_INTO_SEGMENT',
			differences: [],
			customValues: {
				segmentIndex,
				wordIndex
			}
		};
	};

	const handleRemoveWord = (segmentIndex: number, wordIndex: number) => {
		const {remainingSegments, removedWord} = removeWordFromSegments(requestPayload.displayedTranscription, segmentIndex, wordIndex);
		const updatedUntouchedSegments = removeWordFromUntouchedSegments(requestPayload.displayedTranscription, unTouchedTranscription, segmentIndex, wordIndex);
		setUnTouchedTranscription(updatedUntouchedSegments);
		setRequestPayload(prevState => ({
			...prevState,
			displayedTranscription: remainingSegments
		}));
		commandDifferenceType.current = {
			differenceType: 'REMOVE_WORD_FROM_SEGMENT',
			differences: [],
			customValues: {
				segmentIndex,
				wordIndex,
				removedWord: removedWord
			}
		};
	};

	const handleAddSegment = (segmentIndex: number) => {
		const {updatedSegments, newSegment} = addSegmentToSegments(requestPayload.displayedTranscription, segmentIndex);
		const updatedUntouchedSegments = addSegmentToUntouchedSegments(requestPayload.displayedTranscription, unTouchedTranscription, segmentIndex, newSegment);
		setUnTouchedTranscription(updatedUntouchedSegments);
		setRequestPayload(prevState => ({
			...prevState,
			displayedTranscription: updatedSegments
		}));
		commandDifferenceType.current = {
			differenceType: 'NEW_SEGMENT',
			differences: [],
			customValues: {
				segmentIndex,
				newSegment
			}
		};
	};

	const handleRemoveSegment = (segmentIndex: number) => {
		const {remainingSegments, wordIdsToDelete, removedSegment} = removeSegmentFromSegments(requestPayload.displayedTranscription, segmentIndex);
		const remainingUntouchedSegments = removeSegmentFromUntouchedSegments(unTouchedTranscription, wordIdsToDelete);
		setUnTouchedTranscription(remainingUntouchedSegments);
		setRequestPayload(prevState => ({
			...prevState,
			displayedTranscription: remainingSegments
		}));
		commandDifferenceType.current = {
			differenceType: 'REMOVE_SEGMENT',
			differences: [],
			customValues: {
				segmentIndex,
				removedSegment
			}
		};
	};

	const handleMoveWordToPrevLine = (segmentIndex: number) => {
		const {remainingSegments} = moveWordToPreviousSegment(requestPayload.displayedTranscription, segmentIndex);
		setRequestPayload(prevState => ({
			...prevState,
			displayedTranscription: remainingSegments
		}));
		commandDifferenceType.current = {
			differenceType: 'MOVE_WORD_TO_PREV_SEGMENT',
			differences: [],
			customValues: {
				segmentIndex
			}
		};
	};

	const handleMoveWordToNextLine = (segmentIndex: number) => {
		const {remainingSegments} = moveWordToNextSegment(requestPayload.displayedTranscription, segmentIndex);
		setRequestPayload(prevState => ({
			...prevState,
			displayedTranscription: remainingSegments
		}));
		commandDifferenceType.current = {
			differenceType: 'MOVE_WORD_TO_NEXT_SEGMENT',
			differences: [],
			customValues: {
				segmentIndex
			}
		};
	};

	const handleWordTimeSliderChange = (timeValues: number[], segmentIndex: number, wordIndex: number) => {
		const startVal: number = timeValues[0];
		const startMs = secondsToMSFormat(startVal);
		const endVal: number = timeValues[1];
		const endMs = secondsToMSFormat(endVal);
		const copy: Segment[] = JSON.parse(JSON.stringify(requestPayload.displayedTranscription));
		copy[segmentIndex].words[wordIndex].start = startVal;
		copy[segmentIndex].words[wordIndex].startMs = startMs;
		copy[segmentIndex].words[wordIndex].end = endVal;
		copy[segmentIndex].words[wordIndex].endMs = endMs;
		setRequestPayload(prevState => {
			return {
				...prevState,
				displayedTranscription: copy
			};
		});
	};

	const handleSegmentTimeSliderChange = (timeValues: number[], segmentIndex: number) => {
		const [startVal, endVal] = timeValues;
		const copy: Segment[] = JSON.parse(JSON.stringify(requestPayload.displayedTranscription));
		const currentSegment = copy[segmentIndex];
		const wordsAmount = currentSegment.words.length;

		const firstWordEnd = currentSegment.words[0].end;
		if (firstWordEnd > startVal + smallestPossibleTime) {
			currentSegment.words[0].start = startVal;
			currentSegment.words[0].startMs = secondsToMSFormat(startVal);
		} else {
			return;
		}
		currentSegment.start = startVal;
		currentSegment.startMs = secondsToMSFormat(startVal);

		const lastWordStart = currentSegment.words[wordsAmount - 1].start;
		if (lastWordStart < endVal - smallestPossibleTime) {
			currentSegment.words[wordsAmount - 1].end = endVal;
			currentSegment.words[wordsAmount - 1].endMs = secondsToMSFormat(endVal);
		} else {
			return;
		}
		currentSegment.end = endVal;
		currentSegment.endMs = secondsToMSFormat(endVal);

		setRequestPayload(prevState => ({
			...prevState,
			displayedTranscription: copy
		}));
	};

	return {
		smallestPossibleTime,
		setCurrentEditableMsTime,
		handleTranscribeTextChange,
		handleWordMsChange,
		handleSegmentMsChange,
		handleSegmentMsBlur,
		handleTranslateTextChange,
		handleWordMsBlur,
		handleToggleLineBreak,
		handleResetWordColors,
		handleSegmentPositionChange,
		handleSegmentFontSizeChange,
		handleResetSegmentStyles,
		handleAddWord,
		handleRemoveWord,
		handleAddSegment,
		handleRemoveSegment,
		handleMoveWordToPrevLine,
		handleMoveWordToNextLine,
		handleWordTimeSliderChange,
		handleSegmentTimeSliderChange,
		seekTo,
		segmentTimestampDropdownRef,
		segmentSettingsDropdownRef,
		segmentSoundPickerDropdownRef
	};
};