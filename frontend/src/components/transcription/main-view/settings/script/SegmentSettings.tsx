import {Box, IconButton} from '@mui/material';
import {darken} from '@mui/material/styles';
import {colors} from '../../../../../themes';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import {maxFontSize, minFontSize} from '../../../../../const/ui';
import {UIButton} from '../../../../ui/UIButton';
import React, {useEffect, useRef, useState} from 'react';
import {useTranscriptionContext} from '../../../../../contexts/TranscriptionContext';
import {useTranscriptionBox} from '../../../../../hooks/use-transcription-box';
import {Segment} from '@hendrikytt/api-contracts';
import { UITooltip } from '../../../../ui/UITooltip';
import {UIText} from '../../../../ui/UIText';
import SoundIcon from '../../../../../assets/svg/music_cast.svg';
import SoundIconColored from '../../../../../assets/svg/music_cast_colored.svg';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import {SoundPicker} from './SoundPicker';
import {SegmentSettingsSlider} from './SegmentSettingsSlider';
import {isSmallerThanMd} from '../../../../../hooks/is-compact';
import { UIDivider } from '../../../common/UIDivider';

interface Props {
    currentSegment: Segment;
    segmentIndex: number
}
export const SegmentSettings: React.FC<Props> = ({
	segmentIndex,
	currentSegment
}) => {

	const smallerThanMd = isSmallerThanMd();

	const {
		requestPayload,
		activeSegmentSettingsIndex,
		setActiveSegmentSettingsIndex,
		setActiveSegmentSoundPickerIndex,
		setActiveSegmentTimestampIndex,
		setActiveWordSegmentIndex,
		setHasWordInputBeenClicked,
	} = useTranscriptionContext();

	const {
		handleSegmentPositionChange,
		handleSegmentFontSizeChange,
		handleResetSegmentStyles,
		seekTo,
		segmentSettingsDropdownRef,
		handleAddSegment,
	} = useTranscriptionBox();

	const [showSoundMenu, setShowSoundMenu] = useState(false);
	const [soundMenuTop, setSoundMenuTop] = useState(0);
	const addSoundRef = useRef<HTMLDivElement>(null);
	const soundMenuRef = useRef<HTMLDivElement>(null);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (addSoundRef.current) {
			const rect = addSoundRef.current.getBoundingClientRect();
			setSoundMenuTop(rect.top - (segmentSettingsDropdownRef.current?.getBoundingClientRect().top || 0));
		}
	}, [showSoundMenu]);

	const handleShowSoundMenu = () => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		setShowSoundMenu(true);
	};

	const handleHideSoundMenu = () => {
		timeoutRef.current = setTimeout(() => {
			setShowSoundMenu(false);
		}, 100);
	};

	const handleSegmentSettingsClick = (event: React.MouseEvent<HTMLElement>, segmentIndex: number) => {
		if (activeSegmentSettingsIndex !== null && activeSegmentSettingsIndex === segmentIndex) {
			setActiveSegmentSettingsIndex(null);
			return;
		}
		event.preventDefault();
		event.stopPropagation();
		setActiveSegmentSettingsIndex(segmentIndex);
		setActiveSegmentSoundPickerIndex(null);
		setActiveSegmentTimestampIndex(null);
		setActiveWordSegmentIndex(null);
		setHasWordInputBeenClicked(false);
		seekTo(requestPayload.displayedTranscription[segmentIndex].start, true);
	};

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
	};

	const doesCurrentSegmentHaveSound = currentSegment.words[0].sound !== null;

	return (
		<>
			<UITooltip
				title="Edit segment"
			>
				<IconButton
					onClick={(e) => {
						handleSegmentSettingsClick(e, segmentIndex);
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
					<CreateOutlinedIcon sx={{color: colors.background}} />
				</IconButton>
			</UITooltip>
			{activeSegmentSettingsIndex === segmentIndex && (
				<div
					ref={segmentSettingsDropdownRef}
					style={{
						position: 'absolute',
						height: 'auto',
						width: '185px',
						top: '90%',
						right: 0,
						zIndex: 1,
						backgroundColor: 'white',
						border: '1px solid #ccc',
						borderRadius: '5px',
						boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
						marginTop: '4px',
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
							handleAddSegment(segmentIndex);
							setHasWordInputBeenClicked(false);
							seekTo(currentSegment.end, false);
							setActiveSegmentSettingsIndex(null);
						}}
					>
						<AddOutlinedIcon sx={{color: 'black', fontSize: '14px', mr: '5px'}} />
						<UIText
							variant="tiny"
							sx={{color: 'black'}}
						>
							Add segment below
						</UIText>
					</Box>

					<Box
						ref={addSoundRef}
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							padding: '8px 14px',
							'&:hover': {
								cursor: 'pointer',
								backgroundColor: '#E7E7E9'
							},
						}}
						onMouseEnter={handleShowSoundMenu}
						onMouseLeave={handleHideSoundMenu}
					>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
							}}
						>
							{doesCurrentSegmentHaveSound
								? (<img src={SoundIconColored} height='16px' alt="Sound icon colored" style={{marginRight: '4px'}}/>)
								: (<img src={SoundIcon} height='16px' alt="Sound icon" style={{marginRight: '4px'}}/>)
							}
							<UIText
								variant="tiny"
								sx={{color: 'black'}}
							>
								Add sound
							</UIText>
						</div>
						<ArrowForwardIosOutlinedIcon sx={{color: 'black', fontSize: '14px'}} />
					</Box>
					{showSoundMenu && (
						<SoundPicker
							segmentIndex={segmentIndex}
							soundMenuRef={soundMenuRef}
							soundMenuTop={soundMenuTop}
							currentSegment={currentSegment}
							handleShowSoundMenu={handleShowSoundMenu}
							handleHideSoundMenu={handleHideSoundMenu}
						/>
					)}
					<UIDivider />

					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							marginTop: '8px',
							paddingLeft: '14px',
							paddingRight: '12px',
							cursor: 'default',
						}}
					>
						<SegmentSettingsSlider
							title="Position Y"
							value={currentSegment.position !== null ? currentSegment.position : requestPayload.position}
							onChange={(value) => {
								handleSegmentPositionChange(segmentIndex, value);
							}}
							minValue={0}
							maxValue={100}
							unit="%"
							disabled={false}
						/>
					</div>
					{!requestPayload.styling.auto_font_size && (
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								paddingLeft: '14px',
								paddingRight: '12px',
								cursor: 'default',
								marginTop: `${smallerThanMd ? '-10px' : 0}`
							}}
						>
							<SegmentSettingsSlider
								title="Size"
								value={currentSegment.fontSize !== null ? currentSegment.fontSize : requestPayload.fontSize}
								onChange={(value) => {
									handleSegmentFontSizeChange(segmentIndex, value);
								}}
								minValue={minFontSize}
								maxValue={maxFontSize}
								unit="px"
								disabled={false}
							/>
						</div>
					)}
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							cursor: 'default',
							marginTop: `${smallerThanMd ? '-10px' : 0}`,
							marginBottom: `${smallerThanMd ? 2 : 12}px`
						}}
					>
						<UIButton
							title="Reset"
							colorType="primary"
							variant="contained"
							backgroundColor="transparent"
							borderColor={colors.palette.primary}
							textColor={colors.palette.primary}
							onClick={() => {
								handleResetSegmentStyles(segmentIndex);
							}}
							fontSize="14px"
							sx={{
								maxHeight: '30px'
							}}
						>
						</UIButton>
					</div>
				</div>
			)}
		</>
	);
};