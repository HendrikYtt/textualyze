import {formatTime} from './time';
import {
	getExportedFileName,
	RequestPayload,
	secondsToMSFormat,
	Segment, WordObject
} from '@hendrikytt/api-contracts';
import {exportFormat} from '../types';
import {displayError, displaySuccess} from './utils';
import {FontSelectionOption} from '../contexts/UserFontsContext';
import { v4 as uuidv4 } from 'uuid';

export const handleAreYouSureYouWantToLeave = (e: BeforeUnloadEvent) => {
	const message = 'You have unsaved changes. Are you sure you want to leave?';
	e.preventDefault();
	e.returnValue = message; // For older browsers
	return message; // For some modern browsers
};

export const handleCopyTranscription = (displayedTranscriptionState: Segment[]) => {
	navigator.clipboard
		.writeText(convertToSRT(displayedTranscriptionState))
		.then(() => displaySuccess('Transcription copied to clipboard!'))
		.catch(() => displayError(new Error('Could not copy transcription to clipboard')));
};

export const handleDownloadTranscription = (requestPayload: RequestPayload, format: exportFormat, fileName: string) => {
	const translate = requestPayload.processingAction === 'Translate';
	let content;
	let fileExtension;
	switch (format) {
	case 'VTT':
		content = convertToVTT(requestPayload.displayedTranscription, translate);
		fileExtension = 'vtt';
		displaySuccess('Transcription exported as .vtt!');
		break;
	case 'SRT':
		content = convertToSRT(requestPayload.displayedTranscription, translate);
		fileExtension = 'srt';
		displaySuccess('Transcription exported as .srt!');
		break;
	case 'TXT':
		content = convertToTXT(requestPayload.displayedTranscription, translate);
		fileExtension = 'txt';
		displaySuccess('Transcription exported as .txt!');
		break;
	}
	if (!content) {
		return;
	}
	const blob = new Blob([content], { type: 'text/plain' });
	const url = URL.createObjectURL(blob);

	const a = document.createElement('a');
	a.style.display = 'none';
	a.href = url;
	a.download = getExportedFileName(fileName, fileExtension);

	document.body.appendChild(a);
	a.click();

	// Clean up
	URL.revokeObjectURL(url);
	document.body.removeChild(a);
};

const isEmptyOrWhitespace = (str: string): boolean => {
	return str.trim().length === 0;
};

export const convertToSRT = (segments: Segment[], translate = false): string => {
	return segments.map((segment, index) => {
		const startTime = formatTime(segment.start);
		const endTime = formatTime(segment.end);
		const text = translate
			? segment.translatedText
			: segment.words.filter(word => !isEmptyOrWhitespace(word.word)).map(word => word.word.trim()).join(' ');

		return `${index+1}\n${startTime} --> ${endTime}\n${text}\n`;
	}).join('\n');
};

export const convertToVTT = (segments: Segment[], translate = false): string => {
	const vttContent = convertToSRT(segments, translate);
	return `WEBVTT\n\n${vttContent}`;
};

export const convertToTXT = (segments: Segment[], translate = false): string => {
	return segments.map(segment => translate
		? segment.translatedText
		: segment.words
			.filter(word => !isEmptyOrWhitespace(word.word))
			.map(word => word.word.trim())
			.join(' ')
	).join(' ');
};

export const getTextWidth = (inputValue: string, isMobile: boolean) => {
	const tempEl = document.createElement('span');
	tempEl.style.font = 'inherit';
	tempEl.style.position = 'absolute';
	tempEl.style.height = 'auto';
	tempEl.style.width = 'auto';
	tempEl.style.whiteSpace = 'pre';
	tempEl.textContent = inputValue;

	document.body.appendChild(tempEl);
	const value = `${tempEl.offsetWidth + (isMobile ? 25 : 15)}px`;
	document.body.removeChild(tempEl);

	return value;
};

export const mergeTimestamps = (baseSegments: Segment[], timestamps: Result) => {
	const updatedSegments = baseSegments.map(baseSegment => {
		return {
			...baseSegment,
			words: baseSegment.words.map((word, index) => {
				if (index === 0) {
					const updated = {
						...word,
						start: timestamps.segmentStarts.shift() || word.start,
						startMs: timestamps.segmentStartMses.shift() || word.startMs,
						end: timestamps.segmentEnds.shift() || word.end,
						endMs: timestamps.segmentEndMses.shift() || word.endMs,
					};
					return updated;
				} else {
					const updated = {
						...word,
						start: timestamps.segmentStarts.shift() || word.start,
						startMs: timestamps.segmentStartMses.shift() || word.startMs,
						end: timestamps.segmentEnds.shift() || word.end,
						endMs: timestamps.segmentEndMses.shift() || word.endMs,
					};
					return updated;
				}
			}),
		};
	});

	const updatedObjectTimestamps = updatedSegments.map((segment) => {
		const updated: Segment = {
			...segment,
			start: segment.words[0].start,
			startMs: secondsToMSFormat(segment.words[0].start),
			end: segment.words[segment.words.length-1].end,
			endMs: secondsToMSFormat(segment.words[segment.words.length-1].end),
		};
		return updated;
	});
	return updatedObjectTimestamps;
};


interface Result {
	segmentEnds: number[];
	segmentEndMses: string[];
	segmentStarts: number[];
	segmentStartMses: string[];
}

export const extractAllTimestamps = (segments: Segment[]): Result => {
	return segments.reduce<Result>(
		(acc, segment) => {
			segment.words.forEach(word => {
				acc.segmentStarts.push(word.start);
				acc.segmentStartMses.push(word.startMs);
				acc.segmentEnds.push(word.end);
				acc.segmentEndMses.push(word.endMs);
			});
			return acc;
		},
		{ segmentEnds: [], segmentEndMses: [], segmentStarts: [], segmentStartMses: [] }
	);
};

export const applyFont = (option: Omit<FontSelectionOption, 'id'>) => {
	const s3FontName = option.s3FontName;

	const fontFaceRule = `
			  @font-face {
				font-family: "${s3FontName}";
				src: url("${option.s3FontLink}") format("truetype");
			  }
			`;

	const styleElement = document.createElement('style');
	styleElement.setAttribute('data-font', s3FontName);
	styleElement.appendChild(document.createTextNode(fontFaceRule));
	document.head.appendChild(styleElement);

	return {displayName: option.label, fontFamily: s3FontName};
};

export const insertWordIntoSegments = (displayedSegments: Segment[], segmentIndexToInsertIn: number, wordIndexToInsertAfter: number, wordToInsert?: WordObject) => {
	const updatedSegments: Segment[] = [...displayedSegments];
	const segmentToUpdate: Segment = { ...updatedSegments[segmentIndexToInsertIn] };

	const wordToInsertAfter: WordObject = { ...segmentToUpdate.words[wordIndexToInsertAfter] };
	const wordToInsertBefore: WordObject = { ...segmentToUpdate.words[wordIndexToInsertAfter + 1] };
	const newWord: WordObject = wordToInsert ? wordToInsert : {
		id: uuidv4(),
		start: wordToInsertAfter.end,
		end: wordToInsertBefore.start || segmentToUpdate.end,
		word: '',
		probability: 1,
		font_color: '',
		linebreak: false,
		background_color: null,
		highlight_color: null,
		startMs: secondsToMSFormat(wordToInsertAfter.end),
		endMs: secondsToMSFormat(wordToInsertBefore.start || segmentToUpdate.end),
		emoji: null,
		emojiUrl: null,
		sound: null,
		soundVolume: 100,
		speaker: 'SPEAKER_00'
	};

	let updatedWords;
	if (wordIndexToInsertAfter === -1) {
		updatedWords = [newWord, ...segmentToUpdate.words];
		segmentToUpdate.start = newWord.start;
		segmentToUpdate.startMs = newWord.startMs;
	} else {
		updatedWords = [
			...segmentToUpdate.words.slice(0, wordIndexToInsertAfter + 1),
			newWord,
			...segmentToUpdate.words.slice(wordIndexToInsertAfter + 1)
		];
	}

	const willNewWordBeInsertedToTheEnd = wordIndexToInsertAfter === segmentToUpdate.words.length - 1;
	if (willNewWordBeInsertedToTheEnd) {
		segmentToUpdate.end = newWord.end;
		segmentToUpdate.endMs = newWord.endMs;
	}

	segmentToUpdate.words = updatedWords;
	updatedSegments[segmentIndexToInsertIn] = segmentToUpdate;

	return updatedSegments;
};

export const insertWordIntoUntouchedSegments = (currentSegments: Segment[], untouchedSegments: Segment[], currentSegmentIndexToInsertIn: number, currentWordIndexToInsertAfter: number): Segment[] => {
	let absoluteIndex = 0;
	outerLoop:
	for (let segmentIndex = 0; segmentIndex < currentSegments.length; segmentIndex++) {
		const segment = currentSegments[segmentIndex];
		for (let wordIndex = 0; wordIndex < segment.words.length; wordIndex++) {
			if (segmentIndex === currentSegmentIndexToInsertIn && wordIndex === currentWordIndexToInsertAfter) {
				break outerLoop;
			}
			absoluteIndex++;
		}
	}

	outerLoop2:
	for (let segmentIndex = 0; segmentIndex < untouchedSegments.length; segmentIndex++) {
		const segment = untouchedSegments[segmentIndex];
		for (let wordIndex = 0; wordIndex < segment.words.length; wordIndex++) {
			if (absoluteIndex === 0) {
				const wordToInsert = currentSegments[currentSegmentIndexToInsertIn].words[currentWordIndexToInsertAfter + 1];
				untouchedSegments[segmentIndex].words.splice(wordIndex + 1, 0, wordToInsert);
				break outerLoop2;
			}
			absoluteIndex--;
		}
	}

	return untouchedSegments;
};

export const removeWordFromSegments = (displayedSegments: Segment[], segmentIndexToRemoveIn: number, wordIndexToRemove: number): {
	remainingSegments: Segment[],
	removedWord: WordObject
} => {
	const segmentsCopy: Segment[] = JSON.parse(JSON.stringify(displayedSegments));
	const removedWord = segmentsCopy[segmentIndexToRemoveIn].words.splice(wordIndexToRemove, 1)[0];

	const wordsLengthAfterRemove = segmentsCopy[segmentIndexToRemoveIn].words.length;

	if (wordsLengthAfterRemove > 0) {
		if (wordIndexToRemove === wordsLengthAfterRemove) {
			// last element
			segmentsCopy[segmentIndexToRemoveIn].end = segmentsCopy[segmentIndexToRemoveIn].words[wordIndexToRemove - 1].end;
			segmentsCopy[segmentIndexToRemoveIn].endMs = segmentsCopy[segmentIndexToRemoveIn].words[wordIndexToRemove - 1].endMs;
		} else if (wordIndexToRemove === 0) {
			// first element
			segmentsCopy[segmentIndexToRemoveIn].start = segmentsCopy[segmentIndexToRemoveIn].words[wordIndexToRemove].start;
			segmentsCopy[segmentIndexToRemoveIn].startMs = segmentsCopy[segmentIndexToRemoveIn].words[wordIndexToRemove].startMs;
		} else {
			// 	element somewhere in the middle
		}
		return {remainingSegments: segmentsCopy, removedWord: removedWord};
	} else {
		// remove segment
		return {
			remainingSegments: segmentsCopy.filter((s, index) => index !== segmentIndexToRemoveIn),
			removedWord: removedWord
		};
	}
};

export const removeWordFromUntouchedSegments = (currentSegmentsJustBeforeRemove: Segment[], untouchedSegments: Segment[], currentSegmentIndexToRemoveFrom: number, currentWordIndexToRemove: number): Segment[] => {
	let absoluteIndex = 0;
	outerLoop:
	for (let segmentIndex = 0; segmentIndex < currentSegmentsJustBeforeRemove.length; segmentIndex++) {
		const segment = currentSegmentsJustBeforeRemove[segmentIndex];
		for (let wordIndex = 0; wordIndex < segment.words.length; wordIndex++) {
			if (segmentIndex === currentSegmentIndexToRemoveFrom && wordIndex === currentWordIndexToRemove) {
				break outerLoop;
			}
			absoluteIndex++;
		}
	}

	outerLoop2:
	for (let segmentIndex = 0; segmentIndex < untouchedSegments.length; segmentIndex++) {
		const segment = untouchedSegments[segmentIndex];
		for (let wordIndex = 0; wordIndex < segment.words.length; wordIndex++) {
			if (absoluteIndex === 0) {
				untouchedSegments[segmentIndex].words.splice(wordIndex, 1);
				break outerLoop2;
			}
			absoluteIndex--;
		}
	}

	return untouchedSegments;
};

export const addSegmentToSegments = (displayedSegments: Segment[], segmentIndexToInsertAfter: number, segmentToInsert?: Segment) => {
	const segmentsCopy: Segment[] = JSON.parse(JSON.stringify(displayedSegments));

	const currentSegment = segmentsCopy[segmentIndexToInsertAfter];
	const nextSegment = segmentsCopy[segmentIndexToInsertAfter + 1];

	const newSegment = segmentToInsert || buildNewSegment(currentSegment, nextSegment);

	const updatedSegments = [
		...segmentsCopy.slice(0, segmentIndexToInsertAfter + 1),
		newSegment,
		...segmentsCopy.slice(segmentIndexToInsertAfter + 1)
	];
	return {updatedSegments, newSegment};
};

export const addSegmentToUntouchedSegments = (currentSegments: Segment[], untouchedSegments: Segment[], currentSegmentIndexToInsertAfter: number, newSegment: Segment): Segment[] => {
	const segmentsCopy: Segment[] = JSON.parse(JSON.stringify(untouchedSegments));
	let absoluteIndex = 0;
	outerLoop:
	for (let segmentIndex = 0; segmentIndex < currentSegments.length; segmentIndex++) {
		const segment = currentSegments[segmentIndex];
		for (let wordIndex = 0; wordIndex < segment.words.length; wordIndex++) {
			if (segmentIndex === currentSegmentIndexToInsertAfter && wordIndex === segment.words.length - 1) {
				break outerLoop;
			}
			absoluteIndex++;
		}
	}

	outerLoop2:
	for (let segmentIndex = 0; segmentIndex < segmentsCopy.length; segmentIndex++) {
		const currentSegment = segmentsCopy[segmentIndex];
		for (let wordIndex = 0; wordIndex < currentSegment.words.length; wordIndex++) {
			if (absoluteIndex === 0) {
				// if it is not last word in segment
				if (wordIndex !== currentSegment.words.length - 1) {
					segmentsCopy[segmentIndex].words.splice(wordIndex + 1, 0, newSegment.words[0]);
					break outerLoop2;
				} else {
					// last segment in transcription
					segmentsCopy.push(newSegment);
					break outerLoop2;
				}
			}
			absoluteIndex--;
		}
	}

	return segmentsCopy;
};

export const removeSegmentFromSegments = (displayedSegments: Segment[], segmentIndexToRemove: number) => {
	const wordIdsToDelete = displayedSegments[segmentIndexToRemove].words.map(w => w.id);
	const remainingSegments: Segment[] = JSON.parse(JSON.stringify(displayedSegments));
	const removedSegment = remainingSegments.splice(segmentIndexToRemove, 1)[0];
	return {remainingSegments, wordIdsToDelete, removedSegment};
};

export const removeSegmentFromUntouchedSegments = (untouchedSegments: Segment[], wordIdsToDelete: string[]): Segment[] => {
	const segmentsCopy: Segment[] = JSON.parse(JSON.stringify(untouchedSegments));
	for (let segmentIndex = 0; segmentIndex < segmentsCopy.length; segmentIndex++) {
		const currentSegment = segmentsCopy[segmentIndex];
		currentSegment.words = currentSegment.words.filter(word => !wordIdsToDelete.includes(word.id));
	}
	return segmentsCopy.filter(s => s.words.length > 0);
};

export const isMoveWordToPreviousSegmentAvailable = (segmentIndex: number, wordIndex: number) => {
	const segmentIsNotFirstOne = segmentIndex > 0;
	const isFirstWordInSegment = wordIndex === 0;
	return segmentIsNotFirstOne && isFirstWordInSegment;
};

export const isMoveWordToNextSegmentAvailable = (displayedSegments: Segment[], segmentIndex: number, wordIndex: number) => {
	const segmentIsNotLastOne = segmentIndex < displayedSegments.length - 1;
	const isLastWordInSegment = wordIndex === displayedSegments[segmentIndex].words.length - 1;
	return segmentIsNotLastOne && isLastWordInSegment;
};

export const moveWordToPreviousSegment = (displayedSegments: Segment[], segmentIndex: number) => {
	const wordToMove = displayedSegments[segmentIndex].words[0];
	const updatedSegments = insertWordIntoSegments(displayedSegments, segmentIndex - 1, displayedSegments[segmentIndex - 1].words.length - 1, wordToMove);
	const remainingSegments = removeWordFromSegments(updatedSegments, segmentIndex, 0);
	return remainingSegments;
};

export const moveWordToNextSegment = (displayedSegments: Segment[], segmentIndex: number) => {
	const lastWordIndex = displayedSegments[segmentIndex].words.length;
	const wordToMove = displayedSegments[segmentIndex].words[lastWordIndex - 1];
	const updatedSegments = insertWordIntoSegments(displayedSegments, segmentIndex + 1, -1, wordToMove);
	const remainingSegments = removeWordFromSegments(updatedSegments, segmentIndex, lastWordIndex - 1);
	return remainingSegments;
};

export const wordLimits = (displayedSegments: Segment[], segmentIndex: number, wordIndex: number) => {
	const currentSegment = displayedSegments[segmentIndex];
	const segmentWordsCount = currentSegment.words.length;
	let min: number;
	let max: number;
	const isFirstWordInSegment = wordIndex === 0;
	const isLastWordInSegment = wordIndex === segmentWordsCount - 1;

	if (isFirstWordInSegment) {
		min = currentSegment.start;
		max = isLastWordInSegment ? currentSegment.end : currentSegment.words[wordIndex + 1].start;
		return {min, max};
	}

	if (isLastWordInSegment) {
		min = currentSegment.words[wordIndex - 1].end;
		max = currentSegment.end;
	} else {
		min = currentSegment.words[wordIndex - 1].end;
		max = currentSegment.words[wordIndex + 1].start;
	}

	return {min, max};
};

export const segmentLimits = (displayedSegments: Segment[], segmentIndex: number, fileDuration: number) => {
	let min: number;
	let max: number;
	const isFirstSegment = segmentIndex === 0;
	const isLastSegment = segmentIndex === displayedSegments.length - 1;

	if (isFirstSegment) {
		min = 0;
		max = isLastSegment ? fileDuration : displayedSegments[segmentIndex + 1].start;
	} else if (isLastSegment) {
		min = displayedSegments[segmentIndex - 1].end;
		max = fileDuration;
	} else {
		min = displayedSegments[segmentIndex - 1].end;
		max = displayedSegments[segmentIndex + 1].start;
	}

	return { min, max };
};

export const buildNewSegment = (currentSegment: Segment, nextSegment: Segment) => {
	const newSegment: Segment = {
		id: 9000 + currentSegment.id,
		originalId: 9000 + currentSegment.originalId,
		start: currentSegment.end,
		end: nextSegment?.start || currentSegment.end,
		startMs: currentSegment.endMs,
		endMs: nextSegment?.startMs || currentSegment.endMs,
		words: [
			{
				id: uuidv4(),
				start: currentSegment.end,
				startMs: currentSegment.endMs,
				end: nextSegment?.start || currentSegment.end,
				endMs: nextSegment?.startMs || currentSegment.endMs ,
				linebreak: false,
				font_color: '',
				background_color: null,
				highlight_color: null,
				probability: 1,
				word: '',
				emoji: null,
				emojiUrl: null,
				sound: null,
				soundVolume: 100,
				speaker: 'SPEAKER_00'
			}
		],
		text: '',
		translatedText: '',
		fontSize: null,
		position: null
	};
	return newSegment;
};