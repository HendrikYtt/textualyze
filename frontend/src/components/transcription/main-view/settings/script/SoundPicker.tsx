import {Box, Slider, Typography} from '@mui/material';
import {colors} from '../../../../../themes';
import React, {useEffect, useRef, useState} from 'react';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import {UIButton} from '../../../../ui/UIButton';
import {useTranscriptionContext} from '../../../../../contexts/TranscriptionContext';
import {Segment} from '@hendrikytt/api-contracts';
import {useTranscriptionBox} from '../../../../../hooks/use-transcription-box';
import RoomServiceOutlinedIcon from '@mui/icons-material/RoomServiceOutlined';
import MouseOutlinedIcon from '@mui/icons-material/MouseOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import {OverridableComponent} from '@mui/material/OverridableComponent';
import {SvgIconTypeMap} from '@mui/material/SvgIcon/SvgIcon';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseOutlinedIcon from '@mui/icons-material/PauseOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import VolumeDownOutlinedIcon from '@mui/icons-material/VolumeDownOutlined';
import LensOutlinedIcon from '@mui/icons-material/LensOutlined';
import KeyboardAltOutlinedIcon from '@mui/icons-material/KeyboardAltOutlined';
import AirOutlinedIcon from '@mui/icons-material/AirOutlined';
import ArchitectureOutlinedIcon from '@mui/icons-material/ArchitectureOutlined';
import {keyBy, mapValues} from 'lodash';
import {isSmallerThanMd} from '../../../../../hooks/is-compact';

type SoundClip = {
	name: string;
	soundFileName: string;
	icon: OverridableComponent<SvgIconTypeMap> & { muiName: string };
	lengthMs: number
}
const soundClips: SoundClip[] = [
	{
		name: 'Pop',
		soundFileName: 'pop',
		icon: LensOutlinedIcon,
		lengthMs: 750
	},
	{
		name: 'Ding',
		soundFileName: 'ding',
		icon: RoomServiceOutlinedIcon,
		lengthMs: 1900
	},
	{
		name: 'Click',
		soundFileName: 'click',
		icon: MouseOutlinedIcon,
		lengthMs: 500
	},
	{
		name: 'Money',
		soundFileName: 'money',
		icon: PaidOutlinedIcon,
		lengthMs: 1300
	},
	{
		name: 'Staple',
		soundFileName: 'staple',
		icon: ArchitectureOutlinedIcon,
		lengthMs: 500
	},
	{
		name: 'Typing',
		soundFileName: 'typing',
		icon: KeyboardAltOutlinedIcon,
		lengthMs: 2400
	},
	{
		name: 'Whoosh',
		soundFileName: 'whoosh',
		icon: AirOutlinedIcon,
		lengthMs: 500
	}
];

interface Props {
	segmentIndex: number;
	currentSegment: Segment;
	soundMenuRef: React.RefObject<HTMLDivElement>;
	soundMenuTop: number;
	handleShowSoundMenu(): void;
	handleHideSoundMenu(): void
}
export const SoundPicker: React.FC<Props> = ({
	segmentIndex,
	currentSegment,
	soundMenuRef,
	soundMenuTop,
	handleShowSoundMenu,
	handleHideSoundMenu
}) => {
	const smallerThanMd = isSmallerThanMd();

	const {
		segmentSoundPickerDropdownRef
	} = useTranscriptionBox();

	const {
		requestPayload,
		setRequestPayload,
		setActiveSegmentSoundPickerIndex,
	} = useTranscriptionContext();

	const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);
	const [playingStates, setPlayingStates] = useState<Record<string, boolean>>(mapValues(keyBy(soundClips, 'soundFileName'), () => false));

	useEffect(() => {
		document.addEventListener('click', handleDocumentClick);

		return () => {
			document.removeEventListener('click', handleDocumentClick);
		};
	}, []);

	const handleDocumentClick = (event: MouseEvent) => {
		if (segmentSoundPickerDropdownRef.current && !segmentSoundPickerDropdownRef.current.contains(event.target as Node)) {
			setActiveSegmentSoundPickerIndex(null);
		}
	};

	const handlePlay = (index: number, soundFileName: string, lengthMs: number) => {
		const audio = audioRefs.current[index];
		if (audio) {
			if (audio.paused) {
				setPlayingStates(prevState => {
					prevState[soundFileName] = true;
					return {
						...prevState
					};
				});
				setTimeout(() => {
					setPlayingStates(prevState => {
						prevState[soundFileName] = false;
						return {
							...prevState
						};
					});
				}, lengthMs);
				audio.play();
			} else {
				setPlayingStates(prevState => {
					prevState[soundFileName] = false;
					return {
						...prevState
					};
				});
				audio.pause();
			}
		}
	};

	const handleSoundVolumeChange = (event: Event, newValue: number | number[]) => {
		const copy = JSON.parse(
			JSON.stringify(requestPayload.displayedTranscription)
		) as Segment[];
		copy[segmentIndex].words[0].soundVolume = newValue as number;
		setRequestPayload(prevState => {
			return {
				...prevState,
				displayedTranscription: copy
			};
		});
	};

	const handleSetSound = (sClip: SoundClip, isPlay: boolean) => {
		setRequestPayload(prevState => {
			const copy = JSON.parse(
				JSON.stringify(requestPayload.displayedTranscription)
			) as Segment[];
			if (copy[segmentIndex].words[0].sound === sClip.soundFileName && !isPlay) {
				copy[segmentIndex].words[0].sound = null;
			} else {
				copy[segmentIndex].words[0].sound = sClip.soundFileName;
			}
			return {
				...prevState,
				displayedTranscription: copy
			};
		});
	};

	const handleRemoveSound = () => {
		setRequestPayload(prevState => {
			const copy = JSON.parse(
				JSON.stringify(requestPayload.displayedTranscription)
			) as Segment[];
			copy[segmentIndex].words[0].sound = null;
			return {
				...prevState,
				displayedTranscription: copy
			};
		});
	};

	return (
		<div
			ref={soundMenuRef}
			style={{
				position: 'absolute',
				right: '100%',
				top: `${soundMenuTop}px`,
				width: '130px',
				backgroundColor: 'white',
				border: '1px solid #ccc',
				borderRadius: '5px',
				boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
			}}
			onMouseEnter={handleShowSoundMenu}
			onMouseLeave={handleHideSoundMenu}
		>
			<div>
				{soundClips.map((sClip, index) => {
					const audioFileName = `/audio/${sClip.soundFileName}.mp3`;
					return (
						<Box
							key={sClip.soundFileName}
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								color: 'black',
								padding: `${smallerThanMd ? 0 : 4}px 8px`,
								'&:hover': {
									cursor: 'pointer',
									backgroundColor: '#E7E7E9'
								}
							}}
							onClick={() => {
								handleSetSound(sClip, false);
							}}
						>
							<div
								style={{
									display: 'flex',
									justifyContent: 'start',
									alignItems: 'center',
								}}
							>
								<audio ref={el => audioRefs.current[index] = el} src={audioFileName} />
								{playingStates[sClip.soundFileName]
									? <PauseOutlinedIcon
										onClick={(e) => {
											e.stopPropagation();
											e.preventDefault();
										}}
										sx={{ mr: 1 }}
									/>
									: <PlayArrowIcon
										onClick={(e) => {
											e.stopPropagation();
											e.preventDefault();
											handleSetSound(sClip, true);
											handlePlay(index, sClip.soundFileName, sClip.lengthMs);
										}}
										sx={{ mr: 1 }}
									/>
								}
								<div
									style={{
										display: 'flex',
										justifyContent: 'start',
										alignItems: 'center',
									}}
									onClick={() => {

									}}
								>
									<Typography
										fontWeight="500"
										color="inherit"
										fontSize="12px"
									>
										{sClip.name}
									</Typography>
								</div>
							</div>
							{requestPayload.displayedTranscription[segmentIndex].words[0].sound === sClip.soundFileName && (
								<CheckOutlinedIcon sx={{fontSize: '18px', color: 'green', mt: '-2px'}} />
							)}
						</Box>
					);
				})}
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						marginTop: `${smallerThanMd ? -8 : 0}px`,
						padding: '0px 8px'
					}}
				>
					<VolumeDownOutlinedIcon sx={{color: colors.grey, mr: '4px'}} />
					<Slider
						size="small"
						valueLabelDisplay="auto"
						value={currentSegment.words[0].soundVolume}
						onChange={handleSoundVolumeChange}
					/>
					<VolumeUpOutlinedIcon sx={{color: colors.grey, ml: '6px'}} />
				</div>
				<div
					style={{
						marginTop: `${smallerThanMd ? -8 : 8}px`,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						marginBottom: '4px'
					}}
				>
					<UIButton
						title="Remove"
						colorType="primary"
						variant="contained"
						backgroundColor="transparent"
						borderColor={colors.palette.primary}
						textColor={colors.palette.primary}
						onClick={handleRemoveSound}
						fontSize="14px"
						sx={{
							maxHeight: '30px'
						}}
					>
					</UIButton>
				</div>
			</div>
		</div>
	);
};
