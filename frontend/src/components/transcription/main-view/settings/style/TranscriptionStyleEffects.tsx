import {Box, Grid, Typography} from '@mui/material';
import {
	useTranscriptionContext
} from '../../../../../contexts/TranscriptionContext';
import * as React from 'react';
import {isSmallerThanMd} from '../../../../../hooks/is-compact';
import {useEffect, useState} from 'react';
import GreenCheckCircle from '../../../../../assets/svg/GreenCheckCircle.svg';
import {colors} from '../../../../../themes';
import {UIText} from '../../../../ui/UIText';
import {displayInfo} from '../../../../../utils/utils';

type Effect = 'multiple_speakers' | 'bounce_effect' | 'word_by_word' | 'auto_rotate' | 'auto_move' | 'fade';

const effectMappings: Record<Effect, string> = {
	'bounce_effect': 'Bouncy',
	'word_by_word': 'Word by word',
	'auto_rotate': 'Auto rotate',
	'auto_move': 'Auto move',
	'fade': 'Fade',
	'multiple_speakers': 'Multiple speakers',
};

export const TranscriptionStyleEffects = () => {
	const smallerThanMd = isSmallerThanMd();

	const {
		requestPayload,
		setRequestPayload,
		assignedSpeakers
	} = useTranscriptionContext();

	const effectTransforms = (effect: Effect) => {
		const [isBounceEnd, setIsBounceEnd] = useState(true);
		const [wordVisibility, setWordVisibility] = useState({ word: false, by: false, word2: false });
		const [rotation, setRotation] = useState(0);
		const [position, setPosition] = useState({ top: 0, left: 0 });
		const [opacity, setOpacity] = useState(0);

		useEffect(() => {
			const interval = setInterval(() => {
				setIsBounceEnd(v => !v);
			}, isBounceEnd ? 2000 : 500);

			return () => clearInterval(interval);
		}, [isBounceEnd]);

		useEffect(() => {
			let mounted = true;
			const startSequence = () => {
				if (!mounted) return;

				setWordVisibility({ word: false, by: false, word2: false });

				const timers = [
					setTimeout(() => mounted && setWordVisibility(v => ({ ...v, word: true })), 500),
					setTimeout(() => mounted && setWordVisibility(v => ({ ...v, by: true })), 1500),
					setTimeout(() => mounted && setWordVisibility(v => ({ ...v, word2: true })), 2200),
					setTimeout(() => startSequence(), 3500)
				];

				return () => {
					timers.forEach(clearTimeout);
				};
			};

			startSequence();

			return () => {
				mounted = false;
			};
		}, []);

		useEffect(() => {
			let mounted = true;
			const rotateSequence = () => {
				if (!mounted) return;

				setRotation(-8);
				setTimeout(() => mounted && setRotation(0), 1000);
				setTimeout(() => mounted && setRotation(8), 2000);
				setTimeout(() => mounted && setRotation(0), 3000);
				setTimeout(() => rotateSequence(), 3000);
			};

			rotateSequence();

			return () => {
				mounted = false;
			};
		}, []);

		useEffect(() => {
			let mounted = true;
			const moveSequence = () => {
				if (!mounted) return;

				setPosition({ top: 0, left: 0 });
				setTimeout(() => mounted && setPosition({ top: 5, left: 5 }), 750);
				setTimeout(() => mounted && setPosition({ top: 0, left: 0 }), 1500);
				setTimeout(() => moveSequence(), 1500);
			};

			moveSequence();

			return () => {
				mounted = false;
			};
		}, []);

		useEffect(() => {
			let interval: NodeJS.Timeout | null = null;

			if (effect === 'fade') {
				setOpacity(0);
				interval = setInterval(() => {
					setOpacity(1);
					setTimeout(() => {
						setOpacity(0);
					}, 2000);
				}, 3500);
			}

			return () => {
				if (interval) clearInterval(interval);
			};
		}, [effect]);

		const getFontSize = () => {
			if (effect === 'word_by_word' || effect === 'auto_rotate' || effect === 'auto_move' || effect === 'fade' || effect === 'multiple_speakers') {
				return smallerThanMd ? '16px' : '20px';
			}
			if (smallerThanMd) {
				return isBounceEnd ? '20px' : '14px';
			} else {
				return isBounceEnd ? '22px' : '18px';
			}
		};

		const getWordSpacing = () => {
			return smallerThanMd ? '3px' : '6px';
		};

		const calculatedFontFamily = requestPayload.fontType === 'Default fonts' ? requestPayload.styling.font_family : requestPayload.styling.s3_font_name;

		const renderEffect: Record<Effect, React.ReactNode> = {
			bounce_effect: (
				<p
					style={{
						color: 'black',
						transition: 'all .05s ease-out',
						fontFamily: calculatedFontFamily,
						fontSize: getFontSize(),
						transform: `translateY(${isBounceEnd ? 0 : 6}px)`
					}}
				>
					Bouncy
				</p>
			),
			word_by_word: (
				<p
					style={{
						color: 'black',
						transition: 'all .05s ease-out',
						fontFamily: calculatedFontFamily,
						fontSize: getFontSize(),
					}}
				>
					<span style={{ opacity: wordVisibility.word ? 1 : 0 }}>Word</span>
					<span style={{ opacity: wordVisibility.by ? 1 : 0, marginLeft: getWordSpacing() }}>by</span>
					<span style={{ opacity: wordVisibility.word2 ? 1 : 0, marginLeft: getWordSpacing() }}>word</span>
				</p>
			),
			auto_rotate: (
				<p
					style={{
						color: 'black',
						fontFamily: calculatedFontFamily,
						fontSize: getFontSize(),
						transform: `rotate(${rotation}deg)`
					}}
				>
					Auto rotate
				</p>
			),
			auto_move: (
				<p
					style={{
						color: 'black',
						fontFamily: calculatedFontFamily,
						fontSize: getFontSize(),
						position: 'relative',
						transition: 'top 0.85s ease, left 0.85s ease',
						top: `${position.top}px`,
						left: `${position.left}px`
					}}
				>
					Auto move
				</p>
			),
			fade: (
				<p
					style={{
						color: 'black',
						fontFamily: calculatedFontFamily,
						fontSize: getFontSize(),
						transition: 'opacity 0.5s ease-out',
						opacity: opacity
					}}
				>
					Fade
				</p>
			),
			multiple_speakers: (
				<p
					style={{
						color: 'black',
						fontFamily: calculatedFontFamily,
						fontSize: getFontSize(),
					}}
				>
					<span
						style={{
							color: colors.palette.primary
						}}
					>
						Multiple{' '}
					</span>
					<span
						style={{
							color: colors.palette.secondary
						}}
					>
						speakers
					</span>
				</p>
			)
		};

		return renderEffect[effect];
	};

	const effectItem = (effect: Effect) => {
		const isCurrentlySelected = requestPayload.styling[effect];
		const isDisabled = effect === 'multiple_speakers' && assignedSpeakers.length === 0;

		return (
			<Grid item xs={6}
				  px={1}
				  onClick={() => {
					  if (isDisabled) {
						  displayInfo('Multiple speakers will be ready in a few moments');
						  return;
					  }
					  if (isCurrentlySelected) {
						  setRequestPayload((prevState) => ({
							  ...prevState,
							  styling: {
								  ...prevState.styling,
								  [effect]: false
							  }
						  }));
					  } else {
						  setRequestPayload((prevState) => ({
							  ...prevState,
							  styling: {
								  ...prevState.styling,
								  [effect]: true
							  }
						  }));
					  }
				  }}
			>
				<Box
					sx={{
						opacity: isDisabled ? 0.5 : 1,
						position: 'relative',
						height: '80px',
						width: '100%',
						borderRadius: '12px',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: '#F8F8FC',
						border: `${isCurrentlySelected ? 3 : 1}px solid ${isCurrentlySelected ? '#008A62' : '#8E8EAF'}`,
						userSelect: 'none',
						'&:hover': {
							cursor: isDisabled ? 'not-allowed' : 'pointer',
							backgroundColor: isDisabled ? '#F8F8FC' : '#E7E7E9'
						},
						color: 'black'
					}}
				>
					{isCurrentlySelected && (
						<div style={{
							position: 'absolute',
							top: smallerThanMd ? '3px' : '5px',
							left: smallerThanMd ? '3px' : '5px',
						}}>
							<img src={GreenCheckCircle} height={25} alt="Green check circle"/>
						</div>
					)}
					{effectTransforms(effect)}
				</Box>
				<Typography
					color="black"
					textAlign="center"
				>
					{effectMappings[effect]}
				</Typography>
			</Grid>
		);
	};

	return (
		<Grid container rowSpacing={smallerThanMd ? 1 : 2} mt={smallerThanMd ? 0 : -2} mb={2} sx={{width: '100%'}}>
			<Grid item xs={12}>
				<UIText
					variant="small"
					color={colors.darkGrey}
				>
					Text style
				</UIText>
			</Grid>
			{effectItem('word_by_word')}
			{effectItem('multiple_speakers')}
			<Grid item xs={12}>
				<UIText
					variant="small"
					color={colors.darkGrey}
				>
					Animation
				</UIText>
			</Grid>
			{effectItem('bounce_effect')}
			{effectItem('auto_rotate')}
			{effectItem('auto_move')}
			{effectItem('fade')}
		</Grid>
	);
};