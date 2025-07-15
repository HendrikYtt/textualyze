import * as React from 'react';
import {createContext, FC, ReactNode, useContext, useEffect, useRef, useState} from 'react';
import {UploadedFile} from '../types';
import {defaultAdjustedFileData, defaultUploadedFile} from '../const/transcription';
import {convertToSegmentedArrayWithMaxWords, RequestPayload, Segment, Styling} from '@hendrikytt/api-contracts';
import {PlayerRef} from '@remotion/player';
import {deleteSocketListener} from '../api/sockets';
import {useAuth} from './UsersContext';
import {CurrentTab} from '../components/transcription/main-view/settings/TranscriptionSettings';
import {
	addSegmentToSegments, addSegmentToUntouchedSegments,
	extractAllTimestamps,
	insertWordIntoSegments,
	insertWordIntoUntouchedSegments,
	mergeTimestamps, moveWordToNextSegment, moveWordToPreviousSegment,
	removeSegmentFromSegments,
	removeSegmentFromUntouchedSegments,
	removeWordFromSegments,
	removeWordFromUntouchedSegments
} from '../utils/transcription';
import {isSmallerThanMd} from '../hooks/is-compact';
import {SelectedPreview} from '../components/transcription/main-view/settings/socials/TranscriptionSocials';
import {displayError, displayInfo} from '../utils/utils';
import {handleGAEvent} from '../lib/google-analytics';
import {
	constructNextRequestPayload,
	constructPreviousRequestPayload,
	getDifferences, specificCommands,
	StateDifference
} from '../utils/undo-redo';
import {isEqual} from 'lodash';

const makeContext = <T,>(render: () => T) => {
	const MyContext = createContext<T>({} as T);

	const useMyContext = () => useContext(MyContext);

	const MyProvider: FC<{ children: ReactNode }> = ({ children }) => {
		const value = render();
		return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
	};

	return [MyProvider, useMyContext] as const;
};

export const defaultBackgroundColor = '#7F32EE';
export const defaultHighlightColor = '#F9EA03';

export const defaultStyling: Styling = {
	id: 0,
	name: '',
	highlight_color: defaultHighlightColor,
	fade: false,
	italic: false,
	uppercase: true,
	auto_font_size: false,
	auto_move: true,
	auto_rotate: true,
	font_color: '#ffffff',
	bounce_effect: true,
	font_family: 'The Bold Font',
	outline_color: '#000000',
	remove_symbols: false,
	s3_font_name: '',
	word_by_word: true,
	word_spacing: 0,
	background_color: defaultBackgroundColor,
	template_type: 'Default',
	multiple_speakers: false,
	font_weight: 400
};

export const defaultSpeakerColors: Record<string, string> = {
	'SPEAKER_00': '#ffffff',
	'SPEAKER_01': '#FFBE00',
	'SPEAKER_02': '#00ff51',
	'SPEAKER_03': '#F64C71',
};
export const defaultRequestPayload: RequestPayload = {
	requestId: '',
	originalFileExtension: '',
	language: 'en',
	width: 0,
	height: 0,
	duration: 0,
	size: 0,
	position: 30,
	fontSize: 65,
	displayedTranscription: [],
	processingAction: 'Transcribe',
	isAudioFile: false,
	s3VideoLink: '',
	s3FontLink: '',
	fontFileExtension: '',
	fontType: 'Default fonts',
	adjustedWidth: 0,
	adjustedHeight: 0,
	xOffset: 0,
	yOffset: 0,
	adjustedStartTime: 0,
	adjustedEndTime: 0,
	styling: defaultStyling,
	compressedHeight: 0,
	compressedWidth: 0,
	uploadType: 'local',
	speakerColors: defaultSpeakerColors,
	targetLanguage: null,
	logo: null,
	aiDescription: null,
	showAiDescription: false
};

const iPhoneRatio = 0.5625;

export type CurrentStyleTab = 'Enhance' | 'Templates' | 'Customize';
export type RevertableTranscription = { requestPayload: RequestPayload, wordsPerLine: number };
export type SelectedTranslateOption = {label: string, value: string, countryCode: string};

export const defaultValue = 'default';
export const defaultTranslateOption: SelectedTranslateOption = {label: 'Original language', value: defaultValue, countryCode: '-'};
export const defaultTranscribeOption = { label: 'English', value: 'en', countryCode: 'gb' };

export const defaultMaxWordsPerSegment = 5;

export const [TranscriptionContextProvider, useTranscriptionContext] = makeContext(() => {
	const {user} = useAuth();

	const smallerThanMd = isSmallerThanMd();

	const areRenderSocketsInitialized = useRef(false);
	const [currentTab, setCurrentTab] = useState<CurrentTab>('script');
	const [currentStyleTab, setCurrentStyleTab] = useState<CurrentStyleTab>('Enhance');
	const [drawerBleeding, setDrawerBleeding] = useState(90);

	const [isConfigurationOpen, setIsConfigurationOpen] = useState(true);
	const [isFontSelectionOpen, setIsFontSelectionOpen] = useState(false);
	const [isSelectTranslateOpen, setIsSelectTranslateOpen] = useState(false);
	const [isUploading, setIsUploading] = useState(false);
	const [isTranscriptionDrawerOpen, setIsTranscriptionDrawerOpen] = useState(false);
	const [isTranscriptionStreamFinished, setIsTranscriptionStreamFinished] = useState(false);

	const [maxWordsPerSegment, setMaxWordsPerSegment] = useState(defaultMaxWordsPerSegment);
	const [requestId, setRequestId] = useState<string>();
	const [shouldRedirect, setShouldRedirect] = useState<boolean>(false);
	const [selectedTranscribeOption, setSelectedTranscribeOption] = useState(defaultTranscribeOption);
	const [selectedPreview, setSelectedPreview] = useState<SelectedPreview>('none');
	const [transcribingPercentage, setTranscribingPercentage] = useState(0);

	const [adjustedFile, setAdjustedFile] = useState<File | null>(null);
	const [adjustedFileData, setAdjustedFileData] = useState(defaultAdjustedFileData);
	const [originalFile, setOriginalFile] = useState<File | null>(null);
	const [originalFileData, setOriginalFileData] = useState<UploadedFile>(defaultUploadedFile);

	// this state will be kept up to date when words per line change or when words are moved between segments
	const [unTouchedTranscription, setUnTouchedTranscription] = useState<Segment[]>([]);
	// this is the actual baseline where you can revert back to
	const [requestPayloadToRevertTo, setRequestPayloadToRevertTo] = useState<RevertableTranscription>({requestPayload: defaultRequestPayload, wordsPerLine: maxWordsPerSegment});
	const [videoSrc, setVideoSrc] = useState<string>('');
	const [globalVideoLinkSrc, setGlobalVideoLinkSrc] = useState('');

	const [requestPayload, setRequestPayload] = useState<RequestPayload>(defaultRequestPayload);

	//UPLOAD STATES
	const [isUploadFinished, setIsUploadFinished] = useState(false);
	const [isRemoveUploadedFileLoading, setIsRemoveUploadedFileLoading] = useState(false);
	const [uploadingPercentage, setUploadingPercentage] = useState(0);

	//LINK UPLOAD STATES
	const [isLinkUploading, setIsLinkUploading] = useState(false);
	const [isLinkUploadFinished, setIsLinkUploadFinished] = useState(false);
	const [isRemoveUploadedFileLinkLoading, setIsRemoveUploadedFileLinkLoading] = useState(false);
	const [downloadFromUrlToApiPercentage, setDownloadFromUrlToApiPercentage] = useState(0);

	const currentXOffset = useRef<number | null>(null);
	const currentYOffset = useRef<number | null>(null);
	const longestSegmentLength = useRef(0);
	const maxWordsPerSegmentRef = useRef(defaultMaxWordsPerSegment);
	const previewCropDimensions = useRef({width: 0, height: 0});
	const originalCropDimensions = useRef({width: 0, height: 0});
	const playerRef = useRef<PlayerRef>(null);
	const [willProgressBeLost, setWillProgressBeLost] = useState(false);

	//TRANSCRIPTION BOX
	const [activeSegmentSettingsIndex, setActiveSegmentSettingsIndex] = useState<number | null>(null);
	const [activeSegmentSoundPickerIndex, setActiveSegmentSoundPickerIndex] = useState<number | null>(null);
	const [activeSegmentTimestampIndex, setActiveSegmentTimestampIndex] = useState<number | null>(null);
	const [activeWordSegmentIndex, setActiveWordSegmentIndex] = useState<number | null>(null);
	const [activeWordIndex, setActiveWordIndex] = useState<number | null>(null);
	const [hasWordInputBeenClicked, setHasWordInputBeenClicked] = useState(false);
	const [isWordDropdownRendered, setIsWordDropdownRendered] = useState<boolean | null>(null);
	const [labelMargin, setLabelMargin] = useState(0);

	const [assignedSpeakers, setAssignedSpeakers] = useState<string[]>([]);
	const [projectScreenshotUrl, setProjectScreenshotUrl] = useState<string | null>(null);

	//UNDO-REDO
	const [past, setPast] = useState<StateDifference[]>([]);
	const [future, setFuture] = useState<StateDifference[]>([]);

	const commandDifferenceType = useRef<StateDifference | null>(null);
	const prevRequestPayloadRef = useRef<RequestPayload>();
	const prevWordsPerSegmentRef = useRef<number>();
	const isChangeComingFromUndoOrRedoOrRevert = useRef(false);
	const shouldSkipUndoRedoFlow = useRef(false);

	useEffect(() => {
		if (smallerThanMd) {
			setDrawerBleeding(75);
		} else {
			setDrawerBleeding(90);
		}
	}, [smallerThanMd]);

	useEffect(() => {
		const reactToMaxWordsPerSegmentAndSetRequestPayload = () => {
			maxWordsPerSegmentRef.current = maxWordsPerSegment;
			if (requestPayload.processingAction === 'Transcribe') {
				const transcriptionToDisplay = getTranscriptionToDisplay(maxWordsPerSegment);
				setRequestPayload(prevState => ({
					...prevState,
					displayedTranscription: transcriptionToDisplay
				}));
			}
		};
		reactToMaxWordsPerSegmentAndSetRequestPayload();
	}, [maxWordsPerSegment]);

	useEffect(() => {
		const reactToRequestPayloadAndHandleUndoRedo = () => {
			const prevRequestPayload = prevRequestPayloadRef.current;
			const prevWordsPerSegment = prevWordsPerSegmentRef.current;
			prevRequestPayloadRef.current = requestPayload;
			prevWordsPerSegmentRef.current = maxWordsPerSegment;
			if (shouldSkipUndoRedoFlow.current) {
				shouldSkipUndoRedoFlow.current = false;
				return;
			}
			if (isChangeComingFromUndoOrRedoOrRevert.current) {
				isChangeComingFromUndoOrRedoOrRevert.current = false;
				return;
			}

			if (commandDifferenceType.current && specificCommands.includes(commandDifferenceType.current.differenceType)) {
				const stateDifference: StateDifference = {
					differenceType: commandDifferenceType.current.differenceType,
					differences: [],
					customValues: commandDifferenceType.current.customValues
				};
				addToPast(stateDifference);
				clearFuture();
				commandDifferenceType.current = null;
				return;
			}

			if (isTranscriptionStreamFinished && prevRequestPayload && prevRequestPayload.duration !== 0 && !isEqual(prevRequestPayload, requestPayload)) {
				const stateDifference = getDifferences(prevRequestPayload, requestPayload, prevWordsPerSegment, maxWordsPerSegment);
				if (stateDifference.differenceType === 'INITIAL') {
					return;
				}
				addToPast(stateDifference);
				clearFuture();
			}
		};
		reactToRequestPayloadAndHandleUndoRedo();
	}, [requestPayload]);

	useEffect(() => {
		const handleUndoRedoWithKeys = (event: KeyboardEvent): void => {
			const isCtrlPressed = event.ctrlKey;

			if (isCtrlPressed && (event.key === 'z' || event.key === 'Z')) {
				undo();
			}
			if (isCtrlPressed && (event.key === 'y' || event.key === 'Y')) {
				redo();
			}
		};

		window.addEventListener('keydown', handleUndoRedoWithKeys);

		return (): void => {
			window.removeEventListener('keydown', handleUndoRedoWithKeys);
		};
	}, [past, future]);

	const getTranscriptionToDisplay = (newMaxWordsPerSegment: number) => {
		const unTouchedTranscriptionCopy = JSON.parse(JSON.stringify(unTouchedTranscription));
		const timestamps = extractAllTimestamps(requestPayload.displayedTranscription);
		const transcriptionWithMergedTimestamps = mergeTimestamps(unTouchedTranscriptionCopy, timestamps);
		return convertToSegmentedArrayWithMaxWords(
			transcriptionWithMergedTimestamps,
			requestPayload.displayedTranscription,
			newMaxWordsPerSegment
		);
	};

	const addToPast = (difference: StateDifference) => {
		setPast(prevState => {
			return [...prevState, difference];
		});
	};

	const clearFuture = () => {
		setFuture([]);
	};

	const clearPast = () => {
		setPast([]);
	};

	const undo = () => {
		const previous = past.pop();
		if (previous) {
			isChangeComingFromUndoOrRedoOrRevert.current = true;
			setFuture(prevState => ([...prevState, previous]));
			const copy = JSON.parse(JSON.stringify(requestPayload));
			if (previous.differenceType === 'MAX_WORD_PER_SEGMENT') {
				setMaxWordsPerSegment(previous.differences[0].oldValue);
				return;
			}
			if (previous.differenceType === 'NEW_WORD_INTO_SEGMENT') {
				const {segmentIndex, wordIndex} = previous.customValues;
				const wordIndexToRemove = wordIndex + 1;
				const {remainingSegments} = removeWordFromSegments(requestPayload.displayedTranscription, segmentIndex, wordIndexToRemove);
				const updatedUntouchedSegments = removeWordFromUntouchedSegments(requestPayload.displayedTranscription, unTouchedTranscription, segmentIndex, wordIndexToRemove);
				setUnTouchedTranscription(updatedUntouchedSegments);
				setRequestPayload(prevState => ({
					...prevState,
					displayedTranscription: remainingSegments
				}));
				return;
			}
			if (previous.differenceType === 'REMOVE_WORD_FROM_SEGMENT') {
				const {segmentIndex, wordIndex, removedWord} = previous.customValues;
				const wordIndexToAdd = wordIndex - 1;
				const updatedSegments = insertWordIntoSegments(requestPayload.displayedTranscription, segmentIndex, wordIndexToAdd, removedWord);
				const updatedUntouchedSegments = insertWordIntoUntouchedSegments(updatedSegments, unTouchedTranscription, segmentIndex, wordIndexToAdd);
				setUnTouchedTranscription(updatedUntouchedSegments);
				setRequestPayload(prevState => ({
					...prevState,
					displayedTranscription: updatedSegments
				}));
				return;
			}
			if (previous.differenceType === 'NEW_SEGMENT') {
				const {segmentIndex} = previous.customValues;
				const segmentIndexToRemove = segmentIndex + 1;
				const {remainingSegments, wordIdsToDelete} = removeSegmentFromSegments(requestPayload.displayedTranscription, segmentIndexToRemove);
				const remainingUntouchedSegments = removeSegmentFromUntouchedSegments(unTouchedTranscription, wordIdsToDelete);
				setUnTouchedTranscription(remainingUntouchedSegments);
				setRequestPayload(prevState => ({
					...prevState,
					displayedTranscription: remainingSegments
				}));
				return;
			}
			if (previous.differenceType === 'REMOVE_SEGMENT') {
				const {segmentIndex, removedSegment} = previous.customValues;
				const segmentIndexToInsertAfter = segmentIndex - 1;
				const {updatedSegments, newSegment} = addSegmentToSegments(requestPayload.displayedTranscription, segmentIndexToInsertAfter, removedSegment);
				const updatedUntouchedSegments = addSegmentToUntouchedSegments(requestPayload.displayedTranscription, unTouchedTranscription, segmentIndexToInsertAfter, newSegment);
				setUnTouchedTranscription(updatedUntouchedSegments);
				setRequestPayload(prevState => ({
					...prevState,
					displayedTranscription: updatedSegments
				}));
				return;
			}
			if (previous.differenceType === 'MOVE_WORD_TO_NEXT_SEGMENT') {
				const {segmentIndex} = previous.customValues;
				const segmentIndexToMoveFrom = segmentIndex + 1;
				const {remainingSegments} = moveWordToPreviousSegment(requestPayload.displayedTranscription, segmentIndexToMoveFrom);
				setRequestPayload(prevState => ({
					...prevState,
					displayedTranscription: remainingSegments
				}));
				return;
			}
			if (previous.differenceType === 'MOVE_WORD_TO_PREV_SEGMENT') {
				const {segmentIndex} = previous.customValues;
				const segmentIndexToMoveFrom = segmentIndex - 1;
				const {remainingSegments} = moveWordToNextSegment(requestPayload.displayedTranscription, segmentIndexToMoveFrom);
				setRequestPayload(prevState => ({
					...prevState,
					displayedTranscription: remainingSegments
				}));
				return;
			}
			const previousRequestPayload = constructPreviousRequestPayload(copy, previous);
			setRequestPayload(previousRequestPayload);
		}
	};

	const redo = () => {
		const next = future.pop();
		if (next) {
			isChangeComingFromUndoOrRedoOrRevert.current = true;
			setPast(prevState => ([...prevState, next]));
			const copy = JSON.parse(JSON.stringify(requestPayload));
			if (next.differenceType === 'MAX_WORD_PER_SEGMENT') {
				setMaxWordsPerSegment(next.differences[0].newValue);
				return;
			}
			if (next.differenceType === 'NEW_WORD_INTO_SEGMENT') {
				const {segmentIndex, wordIndex} = next.customValues;
				const updatedSegments = insertWordIntoSegments(requestPayload.displayedTranscription, segmentIndex, wordIndex);
				const updatedUntouchedSegments = insertWordIntoUntouchedSegments(updatedSegments, unTouchedTranscription, segmentIndex, wordIndex);
				setUnTouchedTranscription(updatedUntouchedSegments);
				setRequestPayload(prevState => ({
					...prevState,
					displayedTranscription: updatedSegments
				}));
				return;
			}
			if (next.differenceType === 'REMOVE_WORD_FROM_SEGMENT') {
				const {segmentIndex, wordIndex} = next.customValues;
				const {remainingSegments} = removeWordFromSegments(requestPayload.displayedTranscription, segmentIndex, wordIndex);
				const updatedUntouchedSegments = removeWordFromUntouchedSegments(requestPayload.displayedTranscription, unTouchedTranscription, segmentIndex, wordIndex);
				setUnTouchedTranscription(updatedUntouchedSegments);
				setRequestPayload(prevState => ({
					...prevState,
					displayedTranscription: remainingSegments
				}));
				return;
			}
			if (next.differenceType === 'NEW_SEGMENT') {
				const {segmentIndex, newSegment: redoSegment} = next.customValues;
				const {updatedSegments, newSegment} = addSegmentToSegments(requestPayload.displayedTranscription, segmentIndex, redoSegment);
				const updatedUntouchedSegments = addSegmentToUntouchedSegments(requestPayload.displayedTranscription, unTouchedTranscription, segmentIndex, newSegment);
				setUnTouchedTranscription(updatedUntouchedSegments);
				setRequestPayload(prevState => ({
					...prevState,
					displayedTranscription: updatedSegments
				}));
				return;
			}
			if (next.differenceType === 'REMOVE_SEGMENT') {
				const {segmentIndex} = next.customValues;
				const {remainingSegments, wordIdsToDelete} = removeSegmentFromSegments(requestPayload.displayedTranscription, segmentIndex);
				const remainingUntouchedSegments = removeSegmentFromUntouchedSegments(unTouchedTranscription, wordIdsToDelete);
				setUnTouchedTranscription(remainingUntouchedSegments);
				setRequestPayload(prevState => ({
					...prevState,
					displayedTranscription: remainingSegments
				}));
				return;
			}
			if (next.differenceType === 'MOVE_WORD_TO_NEXT_SEGMENT') {
				const {segmentIndex} = next.customValues;
				const {remainingSegments} = moveWordToNextSegment(requestPayload.displayedTranscription, segmentIndex);
				setRequestPayload(prevState => ({
					...prevState,
					displayedTranscription: remainingSegments
				}));
				return;
			}
			if (next.differenceType === 'MOVE_WORD_TO_PREV_SEGMENT') {
				const {segmentIndex} = next.customValues;
				const {remainingSegments} = moveWordToPreviousSegment(requestPayload.displayedTranscription, segmentIndex);
				setRequestPayload(prevState => ({
					...prevState,
					displayedTranscription: remainingSegments
				}));
				return;
			}
			const previousRequestPayload = constructNextRequestPayload(copy, next);
			setRequestPayload(previousRequestPayload);
		}
	};

	const revertChanges = () => {
		const revertCopy: RequestPayload = JSON.parse(JSON.stringify(requestPayloadToRevertTo.requestPayload));
		setRequestPayload(revertCopy);
		setMaxWordsPerSegment(requestPayloadToRevertTo.wordsPerLine);
		clearPast();
		clearFuture();
		isChangeComingFromUndoOrRedoOrRevert.current = true;
		displayInfo('Changes reverted');
	};

	const resetTranscriptionsState = () => {
		setUnTouchedTranscription([]);
		setRequestPayload({ ...defaultRequestPayload, displayedTranscription: [] });
		setOriginalFileData(defaultUploadedFile);
		setAdjustedFileData(defaultAdjustedFileData);
		setOriginalFile(null);
		setAdjustedFile(null);
		setVideoSrc('');
		setIsTranscriptionStreamFinished(false);
		setIsConfigurationOpen(true);
		setTranscribingPercentage(0);
		setCurrentTab('script');
		setMaxWordsPerSegment(defaultMaxWordsPerSegment);
		setWillProgressBeLost(false);
		setRequestId(undefined);
		maxWordsPerSegmentRef.current = defaultMaxWordsPerSegment;

		longestSegmentLength.current = 0;
		areRenderSocketsInitialized.current = false;
		previewCropDimensions.current = {width: 0, height: 0};

		setSelectedTranscribeOption(defaultTranscribeOption);

		setActiveSegmentSettingsIndex(null);
		setActiveSegmentSoundPickerIndex(null);
		setActiveSegmentTimestampIndex(null);
		setActiveWordSegmentIndex(null);
		setActiveWordIndex(null);
		setHasWordInputBeenClicked(false);
		setIsWordDropdownRendered(null);
		setLabelMargin(0);

		setAssignedSpeakers([]);
		setProjectScreenshotUrl(null);

		if (requestId && user) {
			const userId = user.id.toString();
			deleteSocketListener('render-progress', userId, requestId);
			deleteSocketListener('render-ready', userId, requestId);
			deleteSocketListener('render-failed', userId, requestId);

			deleteSocketListener('transcribe-ready', userId, requestId);
			deleteSocketListener('transcribe-failed', userId, requestId);

			deleteSocketListener('upload-ready', userId, requestId);
			deleteSocketListener('upload-failed', userId, requestId);
			deleteSocketListener('upload-cancel', userId, requestId);

			deleteSocketListener('download-from-url-to-api-progress', userId, requestId);
			deleteSocketListener('download-from-url-to-api-ready', userId, requestId);
			deleteSocketListener('download-from-url-to-api-failed', userId, requestId);
		}
		setShouldRedirect(true);

		resetFileUpload(false);
		resetFileLinkUpload(false);
	};

	const resetFileUpload = async (removeVideo = true) => {
		setIsUploading(false);
		setIsUploadFinished(false);
		setUploadingPercentage(0);
		if (removeVideo) {
			await handleRemoveVideo(setIsRemoveUploadedFileLoading);
		}
	};

	const resetFileLinkUpload = async (removeVideo = true) => {
		setIsLinkUploading(false);
		setIsLinkUploadFinished(false);
		setDownloadFromUrlToApiPercentage(0);
		if (removeVideo) {
			await handleRemoveVideo(setIsRemoveUploadedFileLinkLoading);
		}
	};

	const handleRemoveVideo = async (setIsLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
		try {
			if (requestId) {
				setIsLoading(true);
				resetTranscriptionsState();
			}
		} catch (e) {
			displayError(e);
		}
		handleGAEvent('Delete-file');
		setWillProgressBeLost(false);
		setIsLoading(false);
		setIsUploadFinished(false);
		setIsLinkUploadFinished(false);
	};

	const isiPhoneRatio = adjustedFileData.adjustedWidth / adjustedFileData.adjustedHeight < iPhoneRatio + 0.006;

	return {
		unTouchedTranscription,
		setUnTouchedTranscription,
		resetTranscriptionsState,
		longestSegmentLength,
		requestId,
		setRequestId,
		originalFileData,
		setOriginalFileData,
		adjustedFileData,
		setAdjustedFileData,
		videoSrc,
		setVideoSrc,
		isTranscriptionStreamFinished,
		setIsTranscriptionStreamFinished,
		playerRef,
		requestPayload,
		setRequestPayload,
		maxWordsPerSegment,
		setMaxWordsPerSegment,
		transcribingPercentage,
		setTranscribingPercentage,
		isConfigurationOpen,
		setIsConfigurationOpen,
		currentTab,
		setCurrentTab,
		areRenderSocketsInitialized,
		isTranscriptionDrawerOpen,
		setIsTranscriptionDrawerOpen,
		isSelectTranslateOpen,
		setIsSelectTranslateOpen,
		maxWordsPerSegmentRef,
		drawerBleeding,
		selectedPreview,
		setSelectedPreview,
		isiPhoneRatio,
		currentStyleTab,
		setCurrentStyleTab,
		willProgressBeLost,
		setWillProgressBeLost,
		shouldRedirect,
		setShouldRedirect,
		isFontSelectionOpen,
		setIsFontSelectionOpen,
		isUploading,
		setIsUploading,
		adjustedFile,
		setAdjustedFile,
		originalFile,
		setOriginalFile,
		isUploadFinished,
		setIsUploadFinished,
		isRemoveUploadedFileLoading,
		setIsRemoveUploadedFileLoading,
		uploadingPercentage,
		setUploadingPercentage,
		handleRemoveVideo,
		isLinkUploading,
		setIsLinkUploading,
		isLinkUploadFinished,
		setIsLinkUploadFinished,
		isRemoveUploadedFileLinkLoading,
		setIsRemoveUploadedFileLinkLoading,
		downloadFromUrlToApiPercentage,
		setDownloadFromUrlToApiPercentage,
		resetFileUpload,
		resetFileLinkUpload,
		currentXOffset,
		currentYOffset,
		previewCropDimensions,
		activeSegmentSettingsIndex,
		setActiveSegmentSettingsIndex,
		activeSegmentTimestampIndex,
		setActiveSegmentTimestampIndex,
		activeWordSegmentIndex,
		setActiveWordSegmentIndex,
		hasWordInputBeenClicked,
		setHasWordInputBeenClicked,
		activeWordIndex,
		setActiveWordIndex,
		isWordDropdownRendered,
		setIsWordDropdownRendered,
		labelMargin,
		setLabelMargin,
		activeSegmentSoundPickerIndex,
		setActiveSegmentSoundPickerIndex,
		requestPayloadToRevertTo,
		setRequestPayloadToRevertTo,
		revertChanges,
		assignedSpeakers,
		setAssignedSpeakers,
		selectedTranscribeOption,
		setSelectedTranscribeOption,
		globalVideoLinkSrc,
		setGlobalVideoLinkSrc,
		projectScreenshotUrl,
		setProjectScreenshotUrl,
		originalCropDimensions,
		undo,
		redo,
		past,
		future,
		commandDifferenceType,
		shouldSkipUndoRedoFlow
	};
});