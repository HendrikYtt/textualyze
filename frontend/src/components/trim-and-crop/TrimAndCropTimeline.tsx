import Draggable, {DraggableData, DraggableEvent} from 'react-draggable';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {colors} from '../../themes';
import {useTrimAndCropContext} from '../../contexts/TrimAndCropContext';
import {durationInSecondsToStringTimes, pxToFrames} from '../../utils/trim-and-crop';
import {useTranscriptionContext} from '../../contexts/TranscriptionContext';
import {fpsConst} from '@hendrikytt/api-contracts/dist/remotion';
import {Box, Button, CircularProgress, darken} from '@mui/material';
import {useCurrentPlayerFrame} from './use-current-player-frame';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {userSelectNone} from '../../const/ui';
import {fetchFile} from '@ffmpeg/util';
import {isSmallerThanMd} from '../../hooks/is-compact';
import {takeScreenshots} from '../../utils/ffmpeg';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {delay} from '../../utils/time';
import {greyAreaTimeline} from './TrimAndCrop';

const seekerZIndex = 5;
const handlersZIndex = 4;
const areasZIndex = 3;
const draggableAreaZIndex = 2;

export const TrimAndCropTimeline = () => {
	const smallerThanMd = isSmallerThanMd();

	const {
		trimmedStartTime,
		trimmedEndTime,
		trimAndCropPlayerRef,
		setTrimmedStartMinutes,
		setTrimmedStartSeconds,
		setTrimmedStartHundredths,
		setTrimmedEndMinutes,
		setTrimmedEndSeconds,
		setTrimmedEndHundredths,
		isTrimAndCropPlayerPlaying,
		setIsTrimAndCropPlayerPlaying,
	} = useTrimAndCropContext();

	const {
		originalFileData,
		originalFile,
		requestPayload
	} = useTranscriptionContext();

	const currentFrame = useCurrentPlayerFrame(trimAndCropPlayerRef);

	const changeInitiatedByTimeline = useRef(false);

	const containerWidthPx = useRef(0);
	const containerRef = useRef<HTMLDivElement>(null);
	const seekerRef = useRef<HTMLDivElement>(null);
	const isFirstRender = useRef(true);

	const [startHandlerPositionFromLeftPx, setStartHandlerPositionFromLeftPx] = useState(1);
	const currentStartPositionPx = useRef(1);
	const [endAreaWidthPx, setEndAreaWidthPx] = useState(0);
	const currentEndAreaWidthPx = useRef(0);

	const [endHandlerPositionFromRightPx, setEndHandlerPositionFromRightPx] = useState(0);
	const [endHandlerPositionFromLeftPx, setEndHandlerPositionFromLeftPx] = useState(0);

	const [totalImages, setTotalImages] = useState(0);
	const [screenShots, setScreenShots] = useState<string[]>([]);
	const [framesPerPx, setFramesPerPx] = useState(0);

	const getSeekerTime = () => {
		const inSeconds = currentFrame / fpsConst;
		const {minutes, seconds, hundredths} = durationInSecondsToStringTimes(inSeconds);
		return `${minutes}:${seconds}.${hundredths}`;
	};

	const handleContainerClick = async (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
		let clientX;
		let container: HTMLDivElement | null;

		if ('touches' in event) {
			clientX = event.touches[0].clientX;
			container = containerRef.current;
		} else {
			clientX = event.clientX;
			container = event.currentTarget as HTMLDivElement;
		}

		if (!trimAndCropPlayerRef.current || !container) {
			return;
		}

		changeInitiatedByTimeline.current = true;
		trimAndCropPlayerRef.current.pause();
		const position = clientX - container.getBoundingClientRect().left;
		const newXPosition = position > containerWidthPx.current ? containerWidthPx.current : position;
		const frames = pxToFrames(newXPosition, framesPerPx);
		trimAndCropPlayerRef.current.seekTo(frames);

		// if start handler is larger than seeker, then put start to current seeker
		if (newXPosition < startHandlerPositionFromLeftPx && startHandlerPositionFromLeftPx >= 0) {
			setStartHandlerPositionFromLeftPx(newXPosition);
			const inSecs = newXPosition / framesPerPx / fpsConst;
			const { minutes, seconds, hundredths } = durationInSecondsToStringTimes(inSecs);
			setTrimmedStartMinutes(minutes);
			setTrimmedStartSeconds(seconds);
			setTrimmedStartHundredths(hundredths);
		}

		// if end handler is smaller than seeker, then put end to current seeker
		if (newXPosition > endHandlerPositionFromLeftPx) {
			const pos = containerWidthPx.current - newXPosition;
			const newPos = pos >= 0 ? pos : 0;
			setEndAreaWidthPx(newPos + 15);
			setEndHandlerPositionFromRightPx(-newPos);
			setEndHandlerPositionFromLeftPx(containerWidthPx.current - newPos);
			const inSecs = newXPosition / framesPerPx / fpsConst;
			const { minutes, seconds, hundredths } = durationInSecondsToStringTimes(inSecs);
			setTrimmedEndMinutes(minutes);
			setTrimmedEndSeconds(seconds);
			setTrimmedEndHundredths(hundredths);
		}
		await delay(500);
		changeInitiatedByTimeline.current = false;
	};

	// DRAGGING
	const startHandlerOnDrag = (e: DraggableEvent, data: DraggableData) => {
		const inPx = data.x;
		currentStartPositionPx.current = inPx;
		if (trimAndCropPlayerRef.current && isTrimAndCropPlayerPlaying) {
			trimAndCropPlayerRef.current.pause();
			setIsTrimAndCropPlayerPlaying(false);
		}

		const inSecs = inPx / framesPerPx / fpsConst;
		const startHandlerDiv = document.querySelector('#start-handler');
		if (startHandlerDiv) {
			if (trimAndCropPlayerRef.current) {
				trimAndCropPlayerRef.current.seekTo(inSecs * fpsConst);
			}
		}
	};

	const endHandlerOnDrag = (e: DraggableEvent, data: DraggableData) => {
		const inPx = data.x;
		currentEndAreaWidthPx.current = -inPx;
		if (trimAndCropPlayerRef.current && isTrimAndCropPlayerPlaying) {
			trimAndCropPlayerRef.current.pause();
			setIsTrimAndCropPlayerPlaying(false);
		}
		const fromLeft = containerWidthPx.current - currentEndAreaWidthPx.current;
		const inSecs = fromLeft / framesPerPx / fpsConst;
		const endHandlerDiv = document.querySelector('#end-handler');
		if (endHandlerDiv) {
			if (trimAndCropPlayerRef.current) {
				trimAndCropPlayerRef.current.seekTo(inSecs * fpsConst);
			}
		}
	};

	const initialWidth = useRef(0);
	const hasMoved = useRef(false);

	const shouldTakeScreenshots = totalImages > 0 && originalFile && !smallerThanMd && !requestPayload.isAudioFile && requestPayload.uploadType === 'local';

	const draggableAreaOnStart = (e: DraggableEvent, data: DraggableData) => {
		initialWidth.current = endHandlerPositionFromLeftPx - startHandlerPositionFromLeftPx;
		hasMoved.current = false;
	};

	const draggableAreaOnDrag = (e: DraggableEvent, data: DraggableData) => {
		if (!trimAndCropPlayerRef.current) {
			return;
		}
		if (trimAndCropPlayerRef.current.isPlaying()) {
			trimAndCropPlayerRef.current.pause();
		}
		const frames = pxToFrames(data.x, framesPerPx);
		trimAndCropPlayerRef.current.seekTo(frames);
		setStartHandlerPositionFromLeftPx(data.x);
		const startAndDraggableArea = data.x + initialWidth.current;
		setEndHandlerPositionFromLeftPx(startAndDraggableArea);
		const fromRight = startAndDraggableArea - containerWidthPx.current;
		setEndHandlerPositionFromRightPx(fromRight);
		setEndAreaWidthPx(-fromRight);
		hasMoved.current = true;
	};

	const handleClick = (e: React.MouseEvent) => {
		if (hasMoved.current) {
			e.preventDefault();
			e.stopPropagation();
		}
	};

	const takeFileScreenshots = async () => {
		if (shouldTakeScreenshots) {
			const fetchedFile = await fetchFile(originalFile);
			try {
				await takeScreenshots(fetchedFile, originalFileData.duration, totalImages, setScreenShots);
			} catch (e) {
				console.log('ERROR', e);
			}
		}
	};

	useEffect(() => {
		takeFileScreenshots();
		return () => {
			screenShots.forEach(url => URL.revokeObjectURL(url));
		};
	}, [totalImages]);


	// SET CONTAINER WIDTH
	useEffect(() => {
		const handleContainerWidthResize = () => {
			if (containerRef.current) {
				containerWidthPx.current = containerRef.current.offsetWidth;
				const number = containerWidthPx.current / scaledWidth;
				setTotalImages(Math.floor(number));
			}
		};
		handleContainerWidthResize();
		window.addEventListener('resize', handleContainerWidthResize);

		// Clean up the event listener when the component unmounts
		return () => {
			window.removeEventListener('resize', handleContainerWidthResize);
		};
	}, [containerRef.current]);

	// SET FRAMES PER PX
	useEffect(() => {
		if (originalFileData.duration > 0) {
			const unit = containerWidthPx.current / originalFileData.duration / fpsConst;
			setFramesPerPx(unit);
		}
	}, [originalFileData.duration]);

	// AFTER END HANDLER MOVE OR CHANGE FROM END INPUT
	useEffect(() => {
		if (changeInitiatedByTimeline.current) {
			return;
		}
		const fromRight = trimmedEndTime * framesPerPx * fpsConst;
		const width = containerWidthPx.current - fromRight;
		const calculated = width < 0 ? 0 : -width;
		if (isFirstRender.current) {
			setEndHandlerPositionFromRightPx(0);
			setEndAreaWidthPx(0);
			setEndHandlerPositionFromLeftPx(containerWidthPx.current);
			isFirstRender.current = false;
		} else {
			setEndHandlerPositionFromRightPx(calculated);
			setEndAreaWidthPx(width < 0 ? 0 : width);
			setEndHandlerPositionFromLeftPx(containerWidthPx.current - width);
		}
	}, [trimmedEndTime]);

	// AFTER START HANDLER MOVE OR CHANGE FROM START INPUT
	useEffect(() => {
		if (changeInitiatedByTimeline.current) {
			return;
		}
		const newXPosition = trimmedStartTime * framesPerPx * fpsConst;
		setStartHandlerPositionFromLeftPx(newXPosition);
	}, [trimmedStartTime]);

	const {
		startBounds,
		endBounds,
		scaledWidth,
		isSeekerAtTheEnd
	} = useMemo(() => {
		const gap = 2 * (containerWidthPx.current / originalFileData.duration);

		const startBounds = {
			left: 0,
			right: endHandlerPositionFromLeftPx - gap
		};

		const endBounds = {
			left: startHandlerPositionFromLeftPx - containerWidthPx.current + gap,
			right: 0
		};

		const scaledWidth = (originalFileData.width / originalFileData.height) * 60;

		const isSeekerAtTheEnd = currentFrame / (originalFileData.duration * fpsConst) * 100 > 85;
		const isStartHandlerAtTheEnd = startHandlerPositionFromLeftPx / containerWidthPx.current * 100 > 85;
		const isEndHandlerAtTheEnd = (containerWidthPx.current + endHandlerPositionFromRightPx) / containerWidthPx.current * 100 > 85;

		return {
			gap,
			startBounds,
			endBounds,
			scaledWidth,
			isSeekerAtTheEnd,
			isStartHandlerAtTheEnd,
			isEndHandlerAtTheEnd,
		};
	}, [
		containerWidthPx.current,
		originalFileData.duration,
		endHandlerPositionFromLeftPx,
		startHandlerPositionFromLeftPx,
		originalFileData.width,
		originalFileData.height,
		currentFrame,
		endHandlerPositionFromRightPx
	]);

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100%',
			}}
		>
			<Button
				onClick={() => {
					if (!trimAndCropPlayerRef.current) {
						return;
					}
					if (trimAndCropPlayerRef?.current?.isPlaying()) {
						trimAndCropPlayerRef.current.pause();
						setIsTrimAndCropPlayerPlaying(false);
					} else {
						trimAndCropPlayerRef.current.play();
						setIsTrimAndCropPlayerPlaying(true);
					}
				}}
				sx={{
					backgroundColor: colors.palette.primary,
					borderTopLeftRadius: '8px',
					borderBottomLeftRadius: '8px',
					borderTopRightRadius: '0px',
					borderBottomRightRadius: '0px',
					height: '60px',
					width: '60px',
					padding: 0,
					minWidth: 0,
					mr: '2px',
					'&:hover': {
						backgroundColor: darken(colors.palette.primary, 0.1),
					},
				}}
			>
				{isTrimAndCropPlayerPlaying
					? <PauseIcon sx={{fontSize: '35px', color: 'white'}} />
					: <PlayArrowIcon sx={{fontSize: '35px', color: 'white'}} />}
			</Button>

			<div
				ref={containerRef}
				style={{
					width: '100%',
					height: '60px',
					position: 'relative'
				}}
				onClick={handleContainerClick}
			>
				<div
					style={{
						display: 'flex',
						height: '100%'
					}}
				>
					{shouldTakeScreenshots && Array.from({ length: totalImages }).map((_, index) => {
						return (
							<div
								key={index}
								style={{
									width: `${scaledWidth}px`,
									height: '100%',
									zIndex: 2,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center'
								}}
							>
								{screenShots.length - 1 >= index ? (
									<img
										src={screenShots[index]}
										alt="img"
										style={{
											height: 'auto',
											overflow: 'hidden',
											display: 'block'
										}}
									/>
								) : (
									<CircularProgress size={20} />
								)}
							</div>
						);
					})}

				</div>

				{/* SEEKER */}
				<div
					id="seeker"
					ref={seekerRef}
					style={{
						height: '100%',
						width: '2px',
						backgroundColor: 'white',
						position: 'absolute',
						top: '0px',
						left: `${currentFrame * framesPerPx}px`,
						zIndex: seekerZIndex
					}}
				>
					<Box
						sx={{
							position: 'absolute',
							left: '50%',
							transform: `translateX(${isSeekerAtTheEnd ? '-90' : '-50'}%)`,
							top: '-25px',
							fontSize: '12px',
							backgroundColor: colors.palette.primary,
							color: 'white',
							padding: '0px 5px 0px 5px',
							width: '70px',
							textAlign: 'center',
							borderRadius: '6px',
							...userSelectNone,
							':after': {
								content: '""',
								position: 'absolute',
								bottom: '-9px', // position of the arrow below the box
								left: '50%',
								transform: `translateX(${isSeekerAtTheEnd ? '220' : '-50'}%)`,
								borderWidth: '5px',
								borderStyle: 'solid',
								borderColor: `${colors.palette.primary} transparent transparent transparent` // Adjust this color to match the div background
							}
						}}
					>
						{getSeekerTime()}
					</Box>
				</div>


				{/* START AREA */}
				<div
					id="start-area"
					style={{
						width: `${startHandlerPositionFromLeftPx}px`,
						height: '100%',
						backgroundColor: greyAreaTimeline,
						position: 'absolute',
						left: '0px',
						top: '0px',
						opacity: 0.6,
						zIndex: areasZIndex
					}}
				></div>

				{/* DRAGGABLE AREA */}
				<Draggable
					axis="x"
					bounds="parent"
					position={{x: startHandlerPositionFromLeftPx, y: 0}}
					onStart={draggableAreaOnStart}
					onDrag={draggableAreaOnDrag}
					onStop={() => {
						const endInSecs = endHandlerPositionFromLeftPx / framesPerPx / fpsConst;
						const {minutes: endMinutes, seconds: endSeconds, hundredths: endHundredths} = durationInSecondsToStringTimes(endInSecs);
						setTrimmedEndMinutes(endMinutes);
						setTrimmedEndSeconds(endSeconds);
						setTrimmedEndHundredths(endHundredths);

						const startInSecs = startHandlerPositionFromLeftPx / framesPerPx / fpsConst;
						const {minutes: startMinutes, seconds: startSeconds, hundredths: startHundredths} = durationInSecondsToStringTimes(startInSecs);
						setTrimmedStartMinutes(startMinutes);
						setTrimmedStartSeconds(startSeconds);
						setTrimmedStartHundredths(startHundredths);
					}}
				>
					<div
						className="btn"
						style={{
							backgroundColor: 'rgba(128, 128, 128, 0.5)',
							width: `${endHandlerPositionFromLeftPx - startHandlerPositionFromLeftPx}px`,
							border: `5px solid ${colors.background}`,
							height: '100%',
							position: 'absolute',
							top: 0,
							cursor: 'grab',
							zIndex: draggableAreaZIndex,
						}}
						onClick={handleClick}
						onTouchStart={handleContainerClick}
					>
					</div>
				</Draggable>

				{/* END AREA */}
				<div
					style={{
						width: `${endAreaWidthPx}px`, // Adjusted width calculation
						height: '100%',
						backgroundColor: greyAreaTimeline,
						position: 'absolute',
						right: '0px', // Ensures this div stays anchored to the right
						top: '0px',
						opacity: 0.5,
						zIndex: areasZIndex
					}}
				></div>

				{/* START HANDLER */}
				<Draggable
					axis="x"
					position={{x: startHandlerPositionFromLeftPx, y: 0}}
					bounds={startBounds}
					onDrag={startHandlerOnDrag}
					onStop={() => {
						changeInitiatedByTimeline.current = true;
						const inSecs = currentStartPositionPx.current / framesPerPx / fpsConst;
						const {minutes, seconds, hundredths} = durationInSecondsToStringTimes(inSecs);
						setStartHandlerPositionFromLeftPx(currentStartPositionPx.current);
						setTrimmedStartMinutes(minutes);
						setTrimmedStartSeconds(seconds);
						setTrimmedStartHundredths(hundredths);
						setTimeout(() => {
							changeInitiatedByTimeline.current = false;
						}, 500);
					}}
				>
					<div
						id="start-handler"
						style={{
							height: '100%',
							width: '15px',
							backgroundColor: colors.background,
							position: 'absolute',
							top: '0px',
							cursor: 'ew-resize',
							zIndex: handlersZIndex,
							borderTopLeftRadius: '4px',
							borderBottomLeftRadius: '4px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center'
						}}
					>
						<KeyboardArrowLeftIcon
							style={{
								transform: 'scaleY(2)',
								color: 'white'
							}}
						/>
					</div>
				</Draggable>

				{/* END HANDLER */}
				<Draggable
					axis="x"
					position={{x: endHandlerPositionFromRightPx, y: 0}}
					bounds={endBounds}
					onDrag={endHandlerOnDrag}
					onStop={() => {
						changeInitiatedByTimeline.current = true;

						const fromLeft = containerWidthPx.current - currentEndAreaWidthPx.current;
						const fromRight = -currentEndAreaWidthPx.current;
						const inSecs = (fromLeft) / framesPerPx / fpsConst;
						const {minutes, seconds, hundredths} = durationInSecondsToStringTimes(inSecs);
						setEndHandlerPositionFromLeftPx(fromLeft);
						setEndHandlerPositionFromRightPx(fromRight);
						setEndAreaWidthPx(currentEndAreaWidthPx.current < 0 ? 0 : currentEndAreaWidthPx.current);

						setTrimmedEndMinutes(minutes);
						setTrimmedEndSeconds(seconds);
						setTrimmedEndHundredths(hundredths);
						setTimeout(() => {
							changeInitiatedByTimeline.current = false;
						}, 500);
					}}
				>
					<div
						id="end-handler"
						style={{
							height: '100%',
							width: '15px',
							backgroundColor: colors.background,
							position: 'absolute',
							top: '0px',
							right: '0px',
							cursor: 'ew-resize',
							zIndex: handlersZIndex,
							borderTopRightRadius: '4px',
							borderBottomRightRadius: '4px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center'
						}}
					>
						<KeyboardArrowRightIcon
							style={{
								transform: 'scaleY(2)',
								color: 'white'
							}}
						/>
					</div>
				</Draggable>
			</div>
		</div>
	);
};