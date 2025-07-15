import {Grid, IconButton, Slider} from '@mui/material';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import {colors} from '../../../../../themes';
import {EmojiAnimationPicker} from './EmojiAnimationPicker';
import {darken} from '@mui/material/styles';
import React, {CSSProperties, useEffect} from 'react';
import {isSmallerThanSm} from '../../../../../hooks/is-compact';
import {useTranscriptionBox} from '../../../../../hooks/use-transcription-box';
import {useTranscriptionContext} from '../../../../../contexts/TranscriptionContext';
import {Segment} from '@hendrikytt/api-contracts';
import {SegmentSettings} from './SegmentSettings';
import {UITooltip} from '../../../../ui/UITooltip';
import CloseIcon from '@mui/icons-material/Close';

const timestampStyle: CSSProperties = {
	width: '90px',
	fontFamily: 'Plus Jakarta Sans, sans-serif',
	marginRight: '4px',
	marginBottom: '4px',
	caretColor: 'blue',
	height: '24px',
	backgroundColor: '#E5E6FF',
	borderRadius: '5px',
	border: '1px solid #8E8EAF',
	textAlign: 'center',
	fontSize: '16px',
	paddingLeft: '0px',
	paddingRight: '0px',
	color: colors.background
};

interface Props {
    currentSegment: Segment;
    segmentIndex: number;
    segmentTsLimits: {min: number, max: number};
	showSegmentControls: boolean;
}

export const SegmentTimestampRow: React.FC<Props> = ({
	segmentIndex,
	currentSegment,
	segmentTsLimits,
	showSegmentControls
}) => {
	const smallerThanSm = isSmallerThanSm();

	const {
		activeSegmentSettingsIndex,
		setActiveSegmentSettingsIndex,
		activeSegmentTimestampIndex,
		setActiveSegmentTimestampIndex,
		setActiveWordSegmentIndex,
		setHasWordInputBeenClicked,
		setActiveWordIndex,
		setIsWordDropdownRendered,
		labelMargin,
		setLabelMargin,
	} = useTranscriptionContext();

	const {
		smallestPossibleTime,
		setCurrentEditableMsTime,
		handleSegmentMsChange,
		handleSegmentMsBlur,
		handleRemoveSegment,
		handleSegmentTimeSliderChange,
		seekTo,
		segmentTimestampDropdownRef,
		segmentSettingsDropdownRef
	} = useTranscriptionBox();

	useEffect(() => {
		document.addEventListener('click', handleDocumentClick);

		return () => {
			document.removeEventListener('click', handleDocumentClick);
		};
	}, []);

	const handleDocumentClick = (event: MouseEvent) => {
		if (segmentSettingsDropdownRef.current && !segmentSettingsDropdownRef.current.contains(event.target as Node)) {
			setActiveSegmentSettingsIndex(null);
		}
		if (segmentTimestampDropdownRef.current && !segmentTimestampDropdownRef.current.contains(event.target as Node)) {
			setActiveSegmentTimestampIndex(null);
		}
	};

	const handleSegmentTimestampInputClick = (event: React.MouseEvent<HTMLElement>, segmentIndex: number) => {
		if (activeSegmentTimestampIndex !== null && activeSegmentSettingsIndex === segmentIndex) {
			return;
		}
		event.preventDefault();
		event.stopPropagation();
		setActiveSegmentTimestampIndex(segmentIndex);
		setActiveWordSegmentIndex(null);
		setActiveSegmentSettingsIndex(null);
		setActiveWordIndex(null);
		setIsWordDropdownRendered(false);
	};

	return (
		<Grid container item xs={12} alignSelf="center" justifyContent="space-between" mt={smallerThanSm ? '0px' : '4px'} mb="2px" sx={{position: 'relative'}}>
			<Grid item>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<input
						autoComplete="off"
						maxLength={8}
						value={currentSegment.startMs}
						onClick={(event) => {
							seekTo(currentSegment.start, true);
							handleSegmentTimestampInputClick(event, segmentIndex);
						}}
						onChange={(e) => {
							handleSegmentMsChange(segmentIndex, e.target.value, 'startMs');
						}}
						onFocus={(e) => {
							setCurrentEditableMsTime(e.target.value);
						}}
						onBlur={(e) => {
							handleSegmentMsBlur(segmentIndex, e.target.value, 'start');
						}}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								(e.target as HTMLInputElement).blur();
							}
						}}
						style={timestampStyle}
					/>
					<HorizontalRuleIcon sx={{color: colors.background, width: '10px', mr: '3px'}} />
					<input
						autoComplete="off"
						maxLength={8}
						value={currentSegment.endMs}
						onClick={(event) => {
							seekTo(currentSegment.end - smallestPossibleTime, false);
							handleSegmentTimestampInputClick(event, segmentIndex);
						}}
						onChange={(e) => {
							handleSegmentMsChange(segmentIndex, e.target.value, 'endMs');
						}}
						onFocus={(e) => {
							setCurrentEditableMsTime(e.target.value);
						}}
						onBlur={(e) => {
							handleSegmentMsBlur(segmentIndex, e.target.value, 'end');
						}}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								(e.target as HTMLInputElement).blur();
							}
						}}
						style={timestampStyle}
					/>
				</div>
			</Grid>
			{activeSegmentTimestampIndex === segmentIndex && (
				(() => {
					setTimeout(() => {
						setLabelMargin(15);
					}, 0);

					return (
						<div
							ref={segmentTimestampDropdownRef}
							style={{
								position: 'absolute',
								height: 'auto',
								width: '198px',
								left: 0,
								zIndex: 1,
								backgroundColor: 'white',
								border: '1px solid #ccc',
								borderRadius: '5px',
								boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
								marginTop: '24px',
							}}
						>
							<div
								style={{
									display: 'flex',
									justifyContent: 'center'
								}}
							>
								<Slider
									size="small"
									valueLabelDisplay="on"
									valueLabelFormat={(value, index) => (index === 0 ? 'Start' : 'End')}
									value={[currentSegment.start, currentSegment.end]}
									onChange={(event, value) => {
										handleSegmentTimeSliderChange(value as number[], segmentIndex);
									}}
									step={0.01}
									min={segmentTsLimits.min}
									max={segmentTsLimits.max}
									sx={{
										width: '90%',
										'& .MuiSlider-valueLabel': {
											backgroundColor: colors.palette.primary,
											top: `${labelMargin}px !important`,
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
					);
				})()
			)}

			{(showSegmentControls || currentSegment.start === currentSegment.end) && (
				<Grid item sx={{ position: 'relative' }}>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							columnGap: '5px'
						}}
					>
						<EmojiAnimationPicker
							segmentIndex={segmentIndex}
						/>
						<SegmentSettings
							currentSegment={currentSegment}
							segmentIndex={segmentIndex}
						/>
						<UITooltip
							title="Delete segment"
						>
							<IconButton
								onClick={(e) => {
									handleRemoveSegment(segmentIndex);
									setHasWordInputBeenClicked(false);
									seekTo(currentSegment.end, false);
								}}
								sx={{
									p: '2px',
									m: 0,
									mt: '-4px',
									'&:hover': {
										backgroundColor: darken(colors.inputBgGrey, 0.2),
									}
								}}
							>
								<CloseIcon sx={{color: colors.palette.primary}} />
							</IconButton>
						</UITooltip>
					</div>


				</Grid>)}
		</Grid>
	);
};