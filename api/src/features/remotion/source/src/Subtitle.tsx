import React, {useEffect, useState } from 'react';
import {
	cancelRender,
	continueRender,
	delayRender,
	interpolate, Loop,
	OffthreadVideo,
	useVideoConfig
} from 'remotion';
import {RequestPayload, Segment} from '@hendrikytt/api-contracts';
import {getVideoMetadata} from '@remotion/media-utils';
import {calculateFrame, transformString} from '@hendrikytt/api-contracts/dist/remotion';
import {
	baseSum,
	easeInOutQuad,
	easeOut,
	generateTransform,
	getAutoFontSize,
	getCommonTextStyles,
	getFittedFontSize,
	subtitleStyle
} from './utils';

export const Subtitle: React.FC<{
	absoluteFrame: number;
	segment: Segment;
	requestPayload: string;
	subtitleType: 'text' | 'stroke' | 'background';
}> = ({ segment, absoluteFrame, requestPayload, subtitleType }) => {
	const {width, height} = useVideoConfig();

	const originalSegmentId = segment.originalId;
	const payload = JSON.parse(requestPayload) as RequestPayload;
	const {
		highlight_color,
		bounce_effect,
		word_by_word,
		uppercase,
		background_color,
		remove_symbols,
		font_color,
		auto_rotate,
		auto_move,
		fade,
		font_family,
		s3_font_name,
		id,
		name,
		auto_font_size,
		multiple_speakers,
		font_weight
	} = payload.styling;
	const {
		position,
		fontSize,
		processingAction,
		adjustedHeight,
		adjustedWidth,
		fontType,
		speakerColors
	} = payload;

	const currentSum = adjustedWidth + adjustedHeight;
	const dimensionsRatio = currentSum / baseSum;
	const calculatedFontSize = (segment.fontSize !== null ? segment.fontSize : fontSize) * dimensionsRatio;
	const calculatedPosition = segment.position !== null ? segment.position : position;
	const firstWordWithEmoji = segment.words.find(word => word.emoji !== null);
	const emojiUrl = firstWordWithEmoji ? firstWordWithEmoji.emojiUrl : null;
	const emoji = firstWordWithEmoji ? firstWordWithEmoji.emoji : null;
	const currentSegmentStartFrame = calculateFrame(segment.start);
	const wordsPerSegment = segment.words.length;

	const segmentTransformStyle = generateTransform(
		originalSegmentId,
		bounce_effect,
		auto_rotate,
		auto_move,
		absoluteFrame,
		currentSegmentStartFrame,
		calculatedFontSize,
		dimensionsRatio
	);
	const transparency = interpolate(
		absoluteFrame,
		[currentSegmentStartFrame, currentSegmentStartFrame + 15],
		[0, 1],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
			easing: easeInOutQuad
		}
	);

	const fittedFontSize = getFittedFontSize(segment.text, width * 2, font_family, 400, uppercase);

	let calculatedFontFamily = '';
	if (fontType === 'Default fonts') {
		calculatedFontFamily = font_family;
	} else {
		calculatedFontFamily = s3_font_name;
	}

	return (
		<div
			style={{
				...subtitleStyle,
				bottom: `${calculatedPosition}%`,
				transform: segmentTransformStyle,
				opacity: fade ? transparency : 1
			}}
		>
			<span
				style={{
					borderRadius: `${calculatedFontSize / 10}px`,
					paddingRight: `${calculatedFontSize / 8}px`,
					paddingLeft: `${calculatedFontSize / 8}px`,
					userSelect: 'none',
					display: 'inline',
					lineHeight: font_family === 'The Bold Font' ? 1.5 : 1.35
				}}>

				{processingAction === 'Transcribe' && segment.words.map((word, index) => {
					const currentWordStartFrame = calculateFrame(word.start);
					const currentWordEndFrame = calculateFrame(word.end);

					const isWordActive = absoluteFrame >= currentWordStartFrame && absoluteFrame < currentWordEndFrame;
					const isLastWordInSegment = index === segment.words.length - 1;

					const transformedWord = transformString(word.word, uppercase, remove_symbols);
					if (!transformedWord.trim()) {
						return null;
					}

					const fontColor = multiple_speakers ? speakerColors[word.speaker] : font_color;
					const calculatedFontColor = word.font_color !== '' ? word.font_color : fontColor;
					const calculatedBackgroundColor = word.background_color !== null ? word.background_color : background_color;
					const calculatedHighlightColor = word.highlight_color !== null ? word.highlight_color : highlight_color;

					const backgroundColorStyle = isWordActive && calculatedBackgroundColor ? calculatedBackgroundColor : 'transparent';
					let opacity;
					if (word_by_word) {
						opacity = absoluteFrame >= currentWordStartFrame ? 1 : 0;
					} else {
						opacity = 1;
					}

					if (subtitleType === 'background'){
						opacity = interpolate(
							absoluteFrame,
							[currentWordStartFrame, currentWordStartFrame + 4],
							[0.5, 1],
							{
								extrapolateLeft: 'clamp',
								extrapolateRight: 'clamp',
								easing: easeOut
							}
						);
					}

					const paddingTop = interpolate(
						absoluteFrame,
						[currentWordStartFrame, currentWordStartFrame + 2, currentWordStartFrame + 4],
						[12, 9, 12],
						{
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
							easing: easeOut
						}
					);
					const paddingBot = interpolate(
						absoluteFrame,
						[currentWordStartFrame, currentWordStartFrame + 2, currentWordStartFrame + 4],
						[5, 4, 5],
						{
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
							easing: easeOut
						}
					);

					const calculatedPaddingTop = calculatedFontSize / paddingTop;
					const calculatedPaddingBot = calculatedFontSize / paddingBot;

					let textFillColor;
					if (subtitleType === 'background') {
						textFillColor = 'transparent';
					} else if (isWordActive && calculatedHighlightColor) {
						textFillColor = calculatedHighlightColor;
					} else {
						textFillColor = calculatedFontColor;
					}

					const letterSpacing = 0;

					return (
						<span
							key={`${word.start}-${word.word}`}
							style={{
								opacity: opacity,
								display: 'inline',
								paddingTop: `${(subtitleType === 'background' ? calculatedPaddingTop : calculatedFontSize / 7) * (font_family === 'The Bold Font' ? 5 : 1)}px`,
								paddingBottom: `${subtitleType === 'background' ? calculatedPaddingBot : calculatedFontSize / 7}px`,
								backgroundColor: backgroundColorStyle && subtitleType === 'background' ? backgroundColorStyle : 'transparent',
								WebkitTextFillColor: textFillColor,
								letterSpacing: `${letterSpacing}px`,
								textShadow: id === 0 && name === 'MrBeast' && subtitleType === 'text' ? `0 0 70px ${font_color}` : 'none',
								fontWeight: font_weight,
								fontFamily: calculatedFontFamily,
								fontSize: auto_font_size ? getAutoFontSize(fittedFontSize, dimensionsRatio) : calculatedFontSize,
								...getCommonTextStyles(payload, calculatedFontSize, width, height, isWordActive, currentWordStartFrame, isLastWordInSegment, word.linebreak, dimensionsRatio, subtitleType, absoluteFrame)
							}}
						>
							{transformedWord + ' '}
							{word.linebreak && <br/>}
						</span>
					);
				})}

				{processingAction === 'Translate' && (
					(() => {
						const transformedText = transformString(segment.translatedText, uppercase, remove_symbols);
						if (!transformedText.trim()) {
							return null;
						}

						return (
							<span
								key={segment.start}
								style={{
									display: 'inline-block',
									backgroundColor: subtitleType === 'stroke' && background_color ? background_color : 'transparent',
									WebkitTextFillColor: font_color,
									fontSize: auto_font_size ? getAutoFontSize(fittedFontSize, dimensionsRatio) : calculatedFontSize,
									fontWeight: font_weight,
									fontFamily: calculatedFontFamily,
									...getCommonTextStyles(payload, calculatedFontSize, width, height, true, currentSegmentStartFrame, true, false, dimensionsRatio, subtitleType, absoluteFrame)
								}}
							>
								{transformedText}
							</span>
						);
					})()
				)}
			</span>

			{subtitleType === 'stroke' ? (
				<>
					{emojiUrl ? (
						<LoopedOffthreadVideo
							src={emojiUrl}
							calculatedFontSize={calculatedFontSize}
							wordsPerSegment={wordsPerSegment}
						/>
					) : (
						<div
							style={{
								position: 'absolute',
								top: '105%',
								left: '50%',
								transform: 'translate(-50%, -50%)',
								fontSize: calculatedFontSize * 1.5
							}}
						>{emoji}</div>
					)}
				</>
			) : (<></>)}
		</div>
	);
};

interface Props {
	src: string;
	calculatedFontSize: number;
	wordsPerSegment: number;
}
const LoopedOffthreadVideo: React.FC<Props> = ({
	src,
	calculatedFontSize,
	wordsPerSegment
}) => {
	const [duration, setDuration] = useState<null | number>(null);
	const [handle] = useState(() => delayRender());
	const { fps } = useVideoConfig();

	useEffect(() => {
		getVideoMetadata(src)
			.then(({ durationInSeconds }) => {
				setDuration(durationInSeconds);
				continueRender(handle);
			})
			.catch((err) => {
				cancelRender(handle);
			});
	}, [handle]);

	if (duration === null) {
		return null;
	}

	return (
		<Loop durationInFrames={Math.floor(fps * duration)}>
			<OffthreadVideo
				src={src}
				transparent
				style={{
					position: 'absolute',
					marginTop: `${(calculatedFontSize * 0.45) - wordsPerSegment }px`,
					top: '105%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: '100%',
					height: '100%',
					maxHeight: `${calculatedFontSize * 2}px`,
				}}
			/>
		</Loop>
	);
};