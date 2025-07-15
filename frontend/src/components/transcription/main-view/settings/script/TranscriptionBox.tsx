import React, {useEffect, useRef, useState} from 'react';
import {Virtuoso, VirtuosoHandle} from 'react-virtuoso';
import {Segment, WordObject} from '@hendrikytt/api-contracts';
import {fpsConst} from '@hendrikytt/api-contracts/dist/remotion';
import {Box, Grid, IconButton, Slider, TextField} from '@mui/material';
import {useTranscriptionContext} from '../../../../../contexts/TranscriptionContext';
import {
	getTextWidth,
	isMoveWordToNextSegmentAvailable,
	isMoveWordToPreviousSegmentAvailable,
	segmentLimits,
	wordLimits
} from '../../../../../utils/transcription';
import {constructProgressComponent} from '../../../../../utils/tsx-utils';
import {colors} from '../../../../../themes';
import '/node_modules/flag-icons/css/flag-icons.min.css';
import {TranscriptionTranslateTo} from './TranscriptionTranslateTo';
import {isSmallerThanMd, isSmallerThanSm} from '../../../../../hooks/is-compact';
import {UIText} from '../../../../ui/UIText';
import '../../styles.css';
import {WordColorPicker} from './WordColorPicker';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import {useTranscriptionBox} from '../../../../../hooks/use-transcription-box';
import SouthIcon from '@mui/icons-material/South';
import NorthIcon from '@mui/icons-material/North';
import {SegmentTimestampRow} from './SegmentTimestampRow';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { UIDivider } from '../../../common/UIDivider';
import {useUserProjects} from '../../../../../contexts/UserProjectsContext';

export const TranscriptionBox = () => {
	const {
		requestPayload,
		playerRef,
		isTranscriptionStreamFinished,
		transcribingPercentage,
		isConfigurationOpen,
		adjustedFileData,
		setActiveSegmentSettingsIndex,
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
		setLabelMargin
	} = useTranscriptionContext();

	const {
		smallestPossibleTime,
		setCurrentEditableMsTime,
		handleTranscribeTextChange,
		handleWordMsChange,
		handleTranslateTextChange,
		handleWordMsBlur,
		handleToggleLineBreak,
		handleResetWordColors,
		handleAddWord,
		handleRemoveWord,
		handleMoveWordToPrevLine,
		handleMoveWordToNextLine,
		handleWordTimeSliderChange,
		seekTo
	} = useTranscriptionBox();

	const {
		currentUserProject
	} = useUserProjects();

	const smallerThanMd = isSmallerThanMd();
	const smallerThanSm = isSmallerThanSm();

	const [colorPickerOpen, setColorPickerOpen] = useState(false);
	const wordDropdownRef = useRef<HTMLDivElement>(null);
	const [wordDropdownLeftPosition, setWordDropdownLeftPosition] = useState(0);

	const [currentlyHoveredSegment, setCurrentlyHoveredSegment] = useState<number | null>(null);

	const [currentPlayerTimeInSeconds, setCurrentPlayerTimeInSeconds] = useState(0);

	const virtuosoRef = useRef<VirtuosoHandle>(null!);
	const boxRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const updateTime = () => {
			const time = getCurrentTimeInMs();
			if (time) {
				setCurrentPlayerTimeInSeconds(time);
			}
		};

		const intervalId = setInterval(updateTime, 100);
		return () => clearInterval(intervalId);
	}, [playerRef]);

	useEffect(() => {
		if (!currentUserProject?.auto_scroll_script && !smallerThanMd) {
			return;
		}
		if (!playerRef.current) {
			return;
		}
		// if (!playerRef.current.isPlaying()) {
		// 	return;
		// }
		setHasWordInputBeenClicked(false);
		const relevantIndex = requestPayload.displayedTranscription.findIndex((item) =>
			item.start <= currentPlayerTimeInSeconds && currentPlayerTimeInSeconds <= item.end
		);

		if (relevantIndex !== -1) {
			virtuosoRef.current?.scrollToIndex({ index: relevantIndex, behavior: 'auto' });
		}

	}, [currentPlayerTimeInSeconds, requestPayload.displayedTranscription]);

	useEffect(() => {
		document.addEventListener('click', handleDocumentClick);

		return () => {
			document.removeEventListener('click', handleDocumentClick);
		};
	}, [colorPickerOpen]);

	const handleDocumentClick = (event: MouseEvent) => {
		if (wordDropdownRef.current && !wordDropdownRef.current.contains(event.target as Node) && !colorPickerOpen) {
			setActiveWordSegmentIndex(null);
			setIsWordDropdownRendered(null);
		}
	};

	const getCurrentTimeInMs = () => {
		const player = playerRef.current;
		if (player) {
			const currentFrame = player.getCurrentFrame();
			const currentTimeInSeconds = currentFrame / fpsConst;
			return parseFloat(currentTimeInSeconds.toFixed(2));
		}
	};

	const getSegmentBackgroundColor = (segment: Segment) => {
		if (!playerRef.current) {
			return {backgroundColor: 'none', isSegmentActive: false};
		}
		return segment.start <= currentPlayerTimeInSeconds && currentPlayerTimeInSeconds <= segment.end - 0.01
			? {backgroundColor: '#E5E6FF', isSegmentActive: true}
			: {backgroundColor: 'none', isSegmentActive: false};
	};

	const getTranscribeTextBackgroundColor = (word: WordObject) => {
		if (!playerRef.current) {
			return {backgroundColor: '#F8F8FC', color: 'black'};
		}
		return word.start <= currentPlayerTimeInSeconds && currentPlayerTimeInSeconds <= word.end - 0.01 && !hasWordInputBeenClicked
			? {backgroundColor: colors.background, color: 'white'}
			: {backgroundColor: '#F8F8FC', color: 'black'};
	};

	const getTranslateTextBackgroundColor = (segment: Segment) => {
		if (!playerRef.current) {
			return {backgroundColor: '#F8F8FC', color: 'black'};
		}
		return segment.start <= currentPlayerTimeInSeconds && currentPlayerTimeInSeconds <= segment.end - 0.01
			? {backgroundColor: colors.background, color: 'white'}
			: {backgroundColor: '#F8F8FC', color: 'black'};
	};

	const getPaddingBottom = (index: number) => {
		const paddingBottom = smallerThanMd ? '280px' : '20px';
		return index === requestPayload.displayedTranscription.length - 1 ? paddingBottom : '0px';
	};

	const handleWordInputClick = (event: React.MouseEvent<HTMLElement>, segmentIndex: number, wordIndex: number) => {
		event.preventDefault();
		event.stopPropagation();
		setHasWordInputBeenClicked(true);
		setActiveSegmentTimestampIndex(null);
		setActiveWordSegmentIndex(segmentIndex);
		setActiveSegmentSettingsIndex(null);
		setActiveWordIndex(wordIndex);
		setIsWordDropdownRendered(false);
	};

	const handleContainerClick = (e: React.MouseEvent<HTMLElement>, segmentStart: number) => {
		const targetId = (e.target as HTMLElement).id;
		if (targetId.startsWith('segment-container')) {
			seekTo(segmentStart, true);
		}
	};

	return (
		<Box ref={boxRef} sx={{height: '100%', width: '100%'}} >
			<Grid container item justifyContent={smallerThanMd ? 'start' : 'space-between'} alignItems="center" xs={12}>
				{!isTranscriptionStreamFinished && !isConfigurationOpen && transcribingPercentage < 100 && (
					<Grid container item justifyContent="center" px={smallerThanMd ? '14px' : 3} mt={3}>
						{constructProgressComponent(transcribingPercentage, colors.font.secondary)}
					</Grid>
				)}
				{isTranscriptionStreamFinished && (
					<TranscriptionTranslateTo />
				)}
			</Grid>
			<Virtuoso
				style={{
					height: '100%',
					maxHeight: `calc(100% - ${smallerThanMd ? 0 : 150}px)`,
				}}
				ref={virtuosoRef}
				totalCount={requestPayload.displayedTranscription.length}
				itemContent={(segmentIndex) => {
					const currentSegment = requestPayload.displayedTranscription[segmentIndex];
					const segmentTsLimits = segmentLimits(requestPayload.displayedTranscription, segmentIndex, adjustedFileData.duration);
					const {backgroundColor: segmentBackgroundColor, isSegmentActive} = getSegmentBackgroundColor(currentSegment);
					return (
						<Grid
							id={`segment-container1-${segmentIndex}`}
							key={`${currentSegment.id}`}
							container
							item
							pr={1}
							pl={1}
							xs={12}
							mt="4px"
							sx={{
								paddingBottom: getPaddingBottom(segmentIndex),
							}}
						>
							<Grid
								id={`segment-container2-${segmentIndex}`}
								container
								pr={smallerThanMd ? 0 : 1}
								pl={smallerThanMd ? 1 : 2}
								pt={smallerThanMd ? '2px' : '4px'}
								pb={smallerThanMd ? '2px' : '4px'}
								onClick={() => {
									seekTo(currentSegment.start, true);
								}}
								onMouseEnter={() => setCurrentlyHoveredSegment(currentSegment.id)}
								onMouseLeave={() => setCurrentlyHoveredSegment(null)}
								sx={{
									backgroundColor: segmentBackgroundColor,
									outline: `${isSegmentActive ? `1px solid ${colors.background}` : 'none'}`,
									borderRadius: '8px',
									'&:hover': {
										cursor: 'pointer',
										backgroundColor: isSegmentActive ? segmentBackgroundColor : '#E7E7E9',
									},
								}}
							>
								{/*===SEGMENT TIMESTAMPS===*/}
								<SegmentTimestampRow
									segmentIndex={segmentIndex}
									currentSegment={currentSegment}
									segmentTsLimits={segmentTsLimits}
									showSegmentControls={isSegmentActive || currentlyHoveredSegment === currentSegment.id}
								/>

								{/*===WORDS===*/}
								<Grid
									id={`segment-container3-${segmentIndex}`}
									container
									item
									xs={12}
								>
									{/*===TRANSCRIBE===*/}
									{requestPayload.processingAction === 'Transcribe' && currentSegment.words.map((w, wordIndex) => {
										const {backgroundColor, color} = getTranscribeTextBackgroundColor(w);
										const isLastWordInSegment = wordIndex === currentSegment.words.length - 1;
										const isMovePrevAvailable = isMoveWordToPreviousSegmentAvailable(segmentIndex, wordIndex);
										const isMoveNextAvailable = isMoveWordToNextSegmentAvailable(requestPayload.displayedTranscription, segmentIndex, wordIndex);
										const textWidth = getTextWidth(w.word, smallerThanSm);
										const wordTsLimits = wordLimits(requestPayload.displayedTranscription, segmentIndex, wordIndex);
										const calculatedFontColor = w.font_color ||
											(requestPayload.styling.multiple_speakers ? requestPayload.speakerColors[w.speaker] : '');
										return (
											<Box key={`word-${segmentIndex}-${wordIndex}`} style={{position: 'relative', marginRight: '4px', marginBottom: '4px'}}
												 sx={{
													 '& .text-input': {
														 textDecoration: calculatedFontColor !== '' ? 'underline' : 'none',
														 textDecorationColor: `${calculatedFontColor} !important`,
														 '&:hover': {
															 borderColor: '#CECECF !important',
														 },
													 },
													 '& .ts-input': {
														 '&:hover': {
															 borderColor: '#CECECF !important',
														 },
													 },
												 }}
											>
												<input
													autoComplete="off"
													value={w.word}
													onChange={(e) => {
														handleTranscribeTextChange(segmentIndex, wordIndex, e.target.value);
													}}
													onClick={(e: React.MouseEvent<HTMLElement>) => {
														seekTo(w.start, true);
														handleWordInputClick(e, segmentIndex, wordIndex);
													}}
													className="text-input"
													style={{
														width: textWidth,
														fontFamily: 'Plus Jakarta Sans, sans-serif',
														caretColor: 'black',
														borderRadius: '5px',
														height: '24px',
														border: '0.1px solid #8E8EAF',
														backgroundColor: backgroundColor,
														fontSize: '16px',
														textAlign: 'center',
														color: color,
														paddingLeft: '0px',
														paddingRight: '0px'
													}}
												/>
												{activeWordSegmentIndex === segmentIndex && activeWordIndex === wordIndex && (
													(() => {
														setTimeout(() => {
															if (wordDropdownRef.current && boxRef.current) {
																const boxWidth = boxRef.current.offsetWidth;
																const xPos = wordDropdownRef.current.getBoundingClientRect().x;
																const diff = smallerThanMd ? 205 : 100;
																const shouldAdjustPosition = xPos + diff > boxWidth;

																setLabelMargin(15);

																if (isWordDropdownRendered) {
																	if (shouldAdjustPosition) {
																		setWordDropdownLeftPosition(-128);
																	}
																	return;
																}

																if (shouldAdjustPosition) {
																	setWordDropdownLeftPosition(-128);
																} else {
																	setWordDropdownLeftPosition(0);
																}

																setIsWordDropdownRendered(true);
															}
														}, 0);

														return (
															<div
																ref={wordDropdownRef}
																style={{
																	position: 'absolute',
																	height: 'auto',
																	top: `${smallerThanMd ? 85 : 100}%`,
																	width: '204px',
																	left: wordDropdownLeftPosition,
																	zIndex: 1000,
																	backgroundColor: 'white',
																	border: '1px solid #ccc',
																	borderRadius: '5px',
																	boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
																	marginTop: '4px',
																	paddingLeft: '0px',
																	paddingRight: '0px'
																}}
															>
																<Box
																	sx={{
																		display: 'flex',
																		alignItems: 'center',
																		padding: '8px 14px',
																		'&:hover': {
																			cursor: 'pointer',
																			backgroundColor: '#E7E7E9'
																		},
																	}}
																	onClick={(e) => {
																		handleAddWord(segmentIndex, wordIndex);
																	}}
																>
																	<AddOutlinedIcon sx={{color: 'black', fontSize: '14px', mr: '5px'}} />
																	<UIText
																		variant="tiny"
																		sx={{color: 'black'}}
																	>
																		Add word
																	</UIText>
																</Box>

																{!isLastWordInSegment && (
																	<Box
																		sx={{
																			display: 'flex',
																			alignItems: 'center',
																			padding: '8px 14px',
																			'&:hover': {
																				cursor: 'pointer',
																				backgroundColor: '#E7E7E9'
																			},
																		}}
																		onClick={(e) => handleToggleLineBreak(segmentIndex, wordIndex)}
																	>
																		{w.linebreak
																			? (<CloseIcon sx={{color: 'black', fontSize: '14px', mr: '5px'}} />)
																			: (<KeyboardReturnIcon sx={{color: 'black', fontSize: '14px', mr: '5px'}} />)
																		}
																		<UIText
																			variant="tiny"
																			sx={{color: 'black'}}
																		>
																			{w.linebreak ? 'Remove line break' : 'Add line break'}
																		</UIText>
																	</Box>
																)}

																{isMovePrevAvailable && (
																	<Box
																		sx={{
																			display: 'flex',
																			alignItems: 'center',
																			padding: '8px 14px',
																			'&:hover': {
																				cursor: 'pointer',
																				backgroundColor: '#E7E7E9'
																			},
																		}}
																		onClick={(e) => {
																			handleMoveWordToPrevLine(segmentIndex);
																		}}
																	>
																		<NorthIcon sx={{color: 'black', fontSize: '14px', mr: '5px'}} />
																		<UIText
																			variant="tiny"
																			sx={{color: 'black'}}
																		>
																			Move to prev line
																		</UIText>
																	</Box>
																)}
																{isMoveNextAvailable && (
																	<Box
																		sx={{
																			display: 'flex',
																			alignItems: 'center',
																			padding: '8px 14px',
																			'&:hover': {
																				cursor: 'pointer',
																				backgroundColor: '#E7E7E9'
																			},
																		}}
																		onClick={(e) => {
																			handleMoveWordToNextLine(segmentIndex);
																		}}
																	>
																		<SouthIcon sx={{color: 'black', fontSize: '14px', mr: '5px'}} />
																		<UIText
																			variant="tiny"
																			sx={{color: 'black'}}
																		>
																			Move to next line
																		</UIText>
																	</Box>
																)}
																<Box
																	sx={{
																		display: 'flex',
																		alignItems: 'center',
																		padding: '8px 14px',
																		'&:hover': {
																			cursor: 'pointer',
																			backgroundColor: '#E7E7E9'
																		},
																	}}
																	onClick={(e) => {
																		handleRemoveWord(segmentIndex, wordIndex);
																		setActiveWordSegmentIndex(null);
																		setIsWordDropdownRendered(null);
																	}}
																>
																	<CloseIcon sx={{color: 'black', fontSize: '14px', mr: '5px'}} />
																	<UIText
																		variant="tiny"
																		sx={{color: 'black'}}
																	>
																		Delete word
																	</UIText>
																</Box>

																{(!isLastWordInSegment || isMovePrevAvailable || isMoveNextAvailable) && (
																	<UIDivider />
																)}
																<div
																	style={{
																		display: 'flex',
																		alignItems: 'center',
																		columnGap: '4px',
																		padding: `${smallerThanMd ? 2 : 6}px 12px ${smallerThanMd ? 0 : 4}px 12px`
																	}}
																>
																	<UIText
																		variant="tiny"
																		sx={{color: 'black'}}
																	>
																		Colors:
																	</UIText>
																	<WordColorPicker
																		segmentIndex={segmentIndex}
																		wordIndex={wordIndex}
																		setColorPickerOpen={setColorPickerOpen}
																		colorType="font_color"
																	/>
																	<WordColorPicker
																		segmentIndex={segmentIndex}
																		wordIndex={wordIndex}
																		setColorPickerOpen={setColorPickerOpen}
																		colorType="highlight_color"
																	/>
																	<WordColorPicker
																		segmentIndex={segmentIndex}
																		wordIndex={wordIndex}
																		setColorPickerOpen={setColorPickerOpen}
																		colorType="background_color"
																	/>
																	<IconButton
																		sx={{
																			color: '#1C1B1F',
																			p: 0
																		}}
																		onClick={() => {
																			handleResetWordColors(segmentIndex, wordIndex);
																		}}
																	>
																		<CloseIcon fontSize="small" />
																	</IconButton>
																</div>
																<div style={{ padding: `${smallerThanMd ? 4 : 8}px 10px` }}>
																	<input
																		autoComplete="off"
																		maxLength={8}
																		value={w.startMs}
																		onChange={(e) => handleWordMsChange(segmentIndex, wordIndex, e.target.value, 'startMs')}
																		onFocus={(e) => setCurrentEditableMsTime(e.target.value)}
																		onBlur={(e) => handleWordMsBlur(segmentIndex, wordIndex, e.target.value, 'start')}
																		onKeyDown={(e) => {
																			if (e.key === 'Enter') {
																				(e.target as HTMLInputElement).blur();
																			}
																		}}
																		className="ts-input"
																		style={{
																			fontFamily: 'Plus Jakarta Sans, sans-serif',
																			width: '84px',
																			caretColor: 'black',
																			borderRadius: '5px',
																			height: '24px',
																			border: '0.1px solid #8E8EAF',
																			backgroundColor: '#E5E6FF',
																			fontSize: '16px',
																			textAlign: 'center',
																			color: 'black',
																			paddingLeft: '0px',
																			paddingRight: '0px'
																		}}
																	/>
																	<span
																		style={{
																			color: 'black',
																			marginLeft: '2px',
																			marginRight: '2px',
																		}}
																	>
            														-
																	</span>
																	<input
																		autoComplete="off"
																		maxLength={8}
																		value={w.endMs}
																		onChange={(e) => handleWordMsChange(segmentIndex, wordIndex, e.target.value, 'endMs')}
																		onFocus={(e) => setCurrentEditableMsTime(e.target.value)}
																		onBlur={(e) => handleWordMsBlur(segmentIndex, wordIndex, e.target.value, 'end')}
																		onKeyDown={(e) => {
																			if (e.key === 'Enter') {
																				(e.target as HTMLInputElement).blur();
																			}
																		}}
																		className="ts-input"
																		style={{
																			fontFamily: 'Plus Jakarta Sans, sans-serif',
																			width: '84px',
																			caretColor: 'black',
																			borderRadius: '5px',
																			height: '24px',
																			border: '0.1px solid #8E8EAF',
																			backgroundColor: '#E5E6FF',
																			fontSize: '16px',
																			textAlign: 'center',
																			color: 'black',
																			paddingLeft: '0px',
																			paddingRight: '0px'
																		}}
																	/>
																	<div
																		style={{
																			display: 'flex',
																			justifyContent: 'center',
																			marginTop: `${smallerThanMd ? -14 : 0}px`
																		}}
																	>
																		<Slider
																			size="small"
																			valueLabelDisplay="on"
																			valueLabelFormat={(value, index) => (index === 0 ? 'Start' : 'End')}
																			value={[currentSegment.words[wordIndex].start, currentSegment.words[wordIndex].end]}
																			onChange={(event, value) => {
																				handleWordTimeSliderChange(value as number[], segmentIndex, wordIndex);
																			}}
																			step={0.01}
																			min={wordTsLimits.min}
																			max={wordTsLimits.max}
																			sx={{
																				width: '90%',
																				'& .MuiSlider-valueLabel': {
																					backgroundColor: colors.palette.primary,
																					top: `${labelMargin}px`,
																					transform: 'none',
																					'& > *': {
																						transform: 'none',
																					},
																					'&::before': {
																						backgroundColor: 'transparent',
																						content: '""',
																						position: 'absolute',
																						top: '-8px',
																						left: '50%',
																						transform: 'translateX(-50%) rotate(180deg)',
																						borderLeft: '3px solid transparent',
																						borderRight: '3px solid transparent',
																						borderTop: `3px solid ${colors.palette.primary}`,
																					},
																				},
																			}}
																		/>
																	</div>
																</div>

															</div>
														);
													})()
												)}
												{w.linebreak && (
													<KeyboardReturnIcon sx={{color: colors.grey, mb: '-6px', mr: '-4px'}} />
												)}
											</Box>
										);
									})}
									{/*===TRANSLATE===*/}
									{requestPayload.processingAction === 'Translate' && isTranscriptionStreamFinished && (
										<Box sx={{width: '100%'}} pr={2}>
											<TextField
												autoComplete="off"
												value={currentSegment.translatedText}
												onChange={(e) => {
													handleTranslateTextChange(segmentIndex, e.target.value);
												}}
												onClick={() => {
													seekTo(currentSegment.start + smallestPossibleTime, true);
												}}
												multiline
												fullWidth
												sx={{
													fontFamily: 'Plus Jakarta Sans, sans-serif',
													marginRight: '4px',
													height: '100%',
													width: '100%',
													'& .MuiInputBase-input': {
														fontFamily: 'Plus Jakarta Sans, sans-serif',
														caretColor: 'white',
														fontSize: '16px',
														lineHeight: '18px'
													},
													'& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
														borderColor: '#CECECF'
													},
													'& .MuiInputBase-root': {
														backgroundColor: getTranslateTextBackgroundColor(currentSegment),
														paddingY: 1,
														paddingRight: '12px',
														paddingLeft: '12px',
													}
												}}
											/>
										</Box>
									)}
								</Grid>
							</Grid>
						</Grid>
					);
				}}
			/>
		</Box>
	);
};