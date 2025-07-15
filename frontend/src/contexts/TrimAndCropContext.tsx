import {createContext, FC, ReactNode, useContext, useEffect, useRef, useState} from 'react';
import * as React from 'react';
import {throttle} from 'lodash';
import {fpsConst} from '@hendrikytt/api-contracts/dist/remotion';
import {durationInSecondsToStringTimes, stringTimesToDurationInSeconds} from '../utils/trim-and-crop';
import {useTranscriptionContext} from './TranscriptionContext';
import {PlayerRef} from '@remotion/player';
import {SelectedAspectRatio} from '../components/trim-and-crop/TrimAndCropConfiguration';

const makeContext = <T,>(render: () => T) => {
	const MyContext = createContext<T>({} as T);

	const useMyContext = () => useContext(MyContext);

	const MyProvider: FC<{ children: ReactNode }> = ({ children }) => {
		const value = render();
		return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
	};

	return [MyProvider, useMyContext] as const;
};

const minTimeDiff = 2;
export const [TrimAndCropContextProvider, useTrimAndCropContext] = makeContext(() => {

	const {originalFileData} = useTranscriptionContext();

	const [isContinueLoading, setIsContinueLoading] = useState(false);
	const [isFileTrimmedAndCropped, setIsFileTrimmedAndCropped] = useState(false);
	const [isTrimAndCropOpen, setIsTrimAndCropOpen] = useState(false);
	const [isTrimAndCropPlayerPlaying, setIsTrimAndCropPlayerPlaying] = useState(false);

	const [linkAudio, setLinkAudio] = useState<string | null>(null);

	const [selectedAspectRatio, setSelectedAspectRatio] = useState<SelectedAspectRatio>('Original');

	const [trimmedStartTime, setTrimmedStartTime] = useState(0);
	const [trimmedEndTime, setTrimmedEndTime] = useState(0);

	const [trimmedEndMinutes, setTrimmedEndMinutes] = useState('00');
	const [trimmedEndSeconds, setTrimmedEndSeconds] = useState('00');
	const [trimmedEndHundredths, setTrimmedEndHundredths] = useState('00');
	const [trimmedStartMinutes, setTrimmedStartMinutes] = useState('00');
	const [trimmedStartSeconds, setTrimmedStartSeconds] = useState('00');
	const [trimmedStartHundredths, setTrimmedStartHundredths] = useState('00');

	const [previewDimensions, setPreviewDimensions] = useState<{previewHeight: number, previewWidth: number} | null>(null);

	const trimAndCropPlayerRef = useRef<PlayerRef>(null);

	const throttleMs = 100;

	const throttledSetEnd = useRef(throttle((totalSeconds) => {
		if (totalSeconds > 0) {
			setTrimmedEndTime(totalSeconds);
			if (trimAndCropPlayerRef.current) {
				const currentFrame = trimAndCropPlayerRef.current.getCurrentFrame();
				const newEndFrame = totalSeconds * fpsConst;
				if (currentFrame > newEndFrame) {
					trimAndCropPlayerRef.current.seekTo(newEndFrame);
				}
			}
		}
	}, throttleMs)).current;

	useEffect(() => {
		if (originalFileData.duration === 0) {
			return;
		}
		const totalSeconds = stringTimesToDurationInSeconds(trimmedEndMinutes, trimmedEndSeconds, trimmedEndHundredths);
		if (trimAndCropPlayerRef.current) {
			const inFrames = totalSeconds * fpsConst;
			trimAndCropPlayerRef.current.seekTo(inFrames);
		}
		// if end is larger than file end
		if (totalSeconds > originalFileData.duration) {
			const {minutes, seconds, hundredths} = durationInSecondsToStringTimes(originalFileData.duration);
			setTrimmedEndMinutes(minutes);
			setTrimmedEndSeconds(seconds);
			setTrimmedEndHundredths(hundredths);
			// if end - start is smaller than 2 sec
		} else if (Math.abs(totalSeconds - trimmedStartTime) < minTimeDiff || totalSeconds < trimmedStartTime) {
			const {minutes, seconds, hundredths} = durationInSecondsToStringTimes(trimmedStartTime + minTimeDiff);
			setTrimmedEndMinutes(minutes);
			setTrimmedEndSeconds(seconds);
			setTrimmedEndHundredths(hundredths);
		}
		const endHandlerDiv = document.querySelector('#end-handler');
		if (endHandlerDiv) {
			const childDiv = endHandlerDiv.querySelector('div');
			if (childDiv) {
				childDiv.textContent = `${trimmedEndMinutes}:${trimmedEndSeconds}:${trimmedEndHundredths}`;
			}
		}
		throttledSetEnd(totalSeconds);
	}, [trimmedEndMinutes, trimmedEndSeconds, trimmedEndHundredths, throttledSetEnd]);

	const throttledSetStart = useRef(throttle((totalSeconds) => {
		if (totalSeconds >= 0) {
			setTrimmedStartTime(totalSeconds);
			if (trimAndCropPlayerRef.current) {
				const currentFrame = trimAndCropPlayerRef.current.getCurrentFrame();
				const newStartFrame = totalSeconds * fpsConst;
				if (currentFrame < newStartFrame) {
					trimAndCropPlayerRef.current.seekTo(newStartFrame);
				}
			}
		}
	}, throttleMs)).current;
	useEffect(() => {
		const totalSeconds = stringTimesToDurationInSeconds(trimmedStartMinutes, trimmedStartSeconds, trimmedStartHundredths);
		if (totalSeconds < 0) {
			return;
		}
		if (trimAndCropPlayerRef.current) {
			const inFrames = totalSeconds * fpsConst;
			trimAndCropPlayerRef.current.seekTo(inFrames);
		}
		// if start - end is smaller than 2 sec
		if (Math.abs(totalSeconds - trimmedEndTime) < minTimeDiff || totalSeconds > trimmedEndTime) {
			const duration = trimmedEndTime === 0 ? 0 : trimmedEndTime - minTimeDiff;
			const {minutes, seconds, hundredths} = durationInSecondsToStringTimes(duration);
			setTrimmedStartMinutes(minutes);
			setTrimmedStartSeconds(seconds);
			setTrimmedStartHundredths(hundredths);
		}
		throttledSetStart(totalSeconds);
		const startHandlerDiv = document.querySelector('#start-handler');
		if (startHandlerDiv) {
			const childDiv = startHandlerDiv.querySelector('div');
			if (childDiv) {
				childDiv.textContent = `${trimmedStartMinutes}:${trimmedStartSeconds}:${trimmedStartHundredths}`;
			}
		}
	}, [trimmedStartMinutes, trimmedStartSeconds, trimmedStartHundredths, throttledSetStart]);

	const resetTrimAndCropState = () => {
		setIsFileTrimmedAndCropped(false);
		setSelectedAspectRatio('Original');

		setTrimmedStartTime(0);
		setTrimmedEndTime(0);

		setTrimmedEndMinutes('00');
		setTrimmedEndSeconds('00');
		setTrimmedEndHundredths('00');
		setTrimmedStartMinutes('00');
		setTrimmedStartSeconds('00');
		setTrimmedStartHundredths('00');

		setPreviewDimensions(null);
	};

	return {
		trimmedStartTime,
		setTrimmedStartTime,
		trimmedEndMinutes,
		setTrimmedEndMinutes,
		trimmedEndSeconds,
		setTrimmedEndSeconds,
		trimmedEndHundredths,
		setTrimmedEndHundredths,
		trimmedStartMinutes,
		setTrimmedStartMinutes,
		trimmedStartSeconds,
		setTrimmedStartSeconds,
		trimmedStartHundredths,
		setTrimmedStartHundredths,
		isTrimAndCropOpen,
		setIsTrimAndCropOpen,
		trimmedEndTime,
		setTrimmedEndTime,
		trimAndCropPlayerRef,
		selectedAspectRatio,
		setSelectedAspectRatio,
		resetTrimAndCropState,
		isTrimAndCropPlayerPlaying,
		setIsTrimAndCropPlayerPlaying,
		isContinueLoading,
		setIsContinueLoading,
		isFileTrimmedAndCropped,
		setIsFileTrimmedAndCropped,
		linkAudio,
		setLinkAudio,
		previewDimensions,
		setPreviewDimensions
	};
});