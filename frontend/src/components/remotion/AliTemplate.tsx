import React from 'react';
import {RequestPayload, Segment} from '@hendrikytt/api-contracts';
import {interpolate, useVideoConfig} from 'remotion';
import {calculateFrame, transformString} from '@hendrikytt/api-contracts/dist/remotion';
import {baseSum, easeOut, getAutoFontSize, getFittedFontSize} from './utils';

export const AliTemplate: React.FC<{
	absoluteFrame: number;
	segment: Segment;
	requestPayload: string;
}> = ({absoluteFrame, segment, requestPayload}) => {
	const {width} = useVideoConfig();

	const payload = JSON.parse(requestPayload) as RequestPayload;
	const {
		position,
		fontSize,
		compressedWidth,
		compressedHeight,
		processingAction
	} = payload;

	const {
		background_color,
		font_color,
		italic,
		uppercase,
		remove_symbols,
		auto_font_size,
		font_family,
		font_weight
	} = payload.styling;

	const currentSum = compressedWidth + compressedHeight;
	const dimensionsRatio = currentSum / baseSum;
	const calculatedFontSize = (segment.fontSize !== null ? segment.fontSize : fontSize) * dimensionsRatio;
	const calculatedPosition = segment.position !== null ? segment.position : position;

	const fittedFontSize = getFittedFontSize(segment.text, width, font_family, font_weight, uppercase);

	return (
		<div
			className="subtitle"
			style={{
				position: 'absolute',
				padding: 0,
				margin: 0,
				textAlign: 'center',
				width: '100%',
				display: 'block',
				bottom: `${calculatedPosition}%`,
			}}
		>{/*<!--1. BLOCK-->*/}
			<div
				style={{
					display: 'block'
				}}
			>{/*<!--2. BLOCK-->*/}
				<div
					className="row-container"
					style={{
						display: 'inline-block',
						paddingLeft: `${calculatedFontSize * 0.5}px`,
						paddingRight: `${calculatedFontSize * 0.5}px`,
						paddingTop: `${calculatedFontSize * 0.3}px`,
						paddingBottom: `${calculatedFontSize * 0.25}px`,
						backgroundColor: background_color ? background_color : 'transparent',
						borderRadius: `${calculatedFontSize * 0.6}px`
					}}
				>{/*<!--3. INLINE-BLOCK-->*/}
					{/*<div>🚗*/}
					{/*</div>*/}
					<div
						className="row"
						style={{
							display: 'inline'
						}}
					>{/*<!--4. INLINE-->*/}
						{processingAction === 'Transcribe' && segment.words.map(word => {
							const currentWordStartFrame = calculateFrame(word.start);
							const currentWordEndFrame = calculateFrame(word.end);
							const isWordActive = absoluteFrame >= currentWordStartFrame && absoluteFrame < currentWordEndFrame;

							const transparency = interpolate(
								absoluteFrame,
								[currentWordStartFrame, currentWordEndFrame + 3],
								[0.3, 1],
								{
									extrapolateLeft: 'clamp',
									extrapolateRight: 'clamp',
									easing: easeOut
								}
							);

							const transformedWord = transformString(word.word, uppercase, remove_symbols);
							if (!transformedWord.trim()) {
								return null;
							}

							const calculatedFontColor = word.font_color !== '' ? word.font_color : font_color;

							return (
								<span
									key={word.id}
									style={{
										display: 'inline',
										opacity: `${isWordActive || currentWordStartFrame < absoluteFrame ? transparency : 0.3}`
									}}
								>{/*<!--5. INLINE-->*/}
									<span
										style={{
											display: 'inline-flex',
											fontSize: auto_font_size ? getAutoFontSize(fittedFontSize, dimensionsRatio) : calculatedFontSize,
											fontWeight: font_weight,
											color: calculatedFontColor,
											fontStyle: italic ? 'italic' : 'normal',
											fontFamily: font_family
										}}
									>{/*<!--6. INLINE-FLEX-->*/}
										&nbsp;{transformedWord}
									</span>
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
										style={{
											display: 'inline',
											opacity: 1
										}}
									>{/*<!--5. INLINE-->*/}
										<span
											style={{
												display: 'inline-flex',
												fontSize: auto_font_size ? getAutoFontSize(fittedFontSize, dimensionsRatio) : calculatedFontSize,
												fontWeight: font_weight,
												color: font_color,
												fontStyle: italic ? 'italic' : 'normal',
												fontFamily: font_family
											}}
										>{/*<!--6. INLINE-FLEX-->*/}
											&nbsp;{transformedText}
										</span>
									</span>
								);
							})()
						)}
					</div>
				</div>
			</div>
		</div>
	);
};