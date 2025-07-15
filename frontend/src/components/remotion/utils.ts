import {Easing, EasingFunction, interpolate} from 'remotion';
import {makeTransform, rotate, scale, translateY} from '@remotion/animation-utils';
import {RequestPayload} from '@hendrikytt/api-contracts';
import React from 'react';
import {fitText} from '@remotion/layout-utils';

export const subtitleStyle: React.CSSProperties = {
	fontWeight: 'bold',
	padding: 0,
	margin: 0,
	textAlign: 'center',
	position: 'absolute',
	width: '100%',
};

const baseHeight = 1920;
const baseWidth = 1080;
export const baseSum = baseWidth + baseHeight;

export const easeOut: EasingFunction = Easing.out(Easing.ease);
export const easeInOutQuad: EasingFunction = Easing.inOut(Easing.quad);

export const getRotation = (autoRotate: boolean, originalSegmentId: number) => {
	if (!autoRotate) {
		return 0;
	}
	if (originalSegmentId % 2 === 0) {
		return -8;
	} else if (originalSegmentId % 3 === 0) {
		return 0;
	} else {
		return 8;
	}
};

export const generateTransform = (
	originalSegmentId: number,
	bounceEffect: boolean,
	autoRotate: boolean,
	autoMove: boolean,
	absoluteFrame: number,
	currentSegmentStartFrame: number,
	fontSize: number,
	ratio: number
) => {
	const textScale = bounceEffect ? interpolate(
		absoluteFrame,
		[currentSegmentStartFrame, currentSegmentStartFrame + 3],
		[0.8, 1.0],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
			easing: easeOut
		}
	) : 1;
	const translateYValue = interpolate(textScale, [0.8, 1.0], [fontSize * 0.8, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: easeOut
	});

	const transforms = [
		scale(textScale),
		translateY(translateYValue)
	];

	transforms.push(rotate(getRotation(autoRotate, originalSegmentId)));

	if (autoMove) {
		const period = 60;
		const frameInPeriod = absoluteFrame % period;
		const positionTop = interpolate(
			frameInPeriod,
			[0, 30, 60],
			[0, 20, 0],
			{
				extrapolateLeft: 'clamp',
				extrapolateRight: 'clamp',
				easing: easeInOutQuad
			}
		);
		const positionLeft = interpolate(
			frameInPeriod,
			[0, 30, 60],
			[0, 20, 0],
			{
				extrapolateLeft: 'clamp',
				extrapolateRight: 'clamp',
				easing: easeInOutQuad
			}
		);
		transforms.push(`translate(${positionLeft * ratio}px, ${positionTop * ratio}px)`);
	}

	return makeTransform(transforms);
};

export const getCommonTextStyles = (
	requestPayload: RequestPayload,
	calculatedFontSize: number,
	videoWidth: number,
	videoHeight: number,
	isWordActive: boolean,
	startFrame: number,
	isLastWordInSegment: boolean,
	lineBreak: boolean,
	sumRatio: number,
	subtitleType: 'stroke' | 'text' | 'background',
	absoluteFrame: number
) => {
	const {
		outline_color,
		italic,
		word_spacing
	} = requestPayload.styling;

	const outline = outline_color ? outline_color : 'transparent';

	//TODO: rather disable it, since it fucks up background color placement
	// const paddingRight = interpolate(
	// 	absoluteFrame,
	// 	[startFrame, startFrame + 2, startFrame + 4],
	// 	[calculatedFontSize / 20, calculatedFontSize / 15, calculatedFontSize / 20],
	// 	{
	// 		extrapolateLeft: 'clamp',
	// 		extrapolateRight: 'clamp',
	// 		easing: easeOut
	// 	}
	// );
	// const paddingLeft = interpolate(
	// 	absoluteFrame,
	// 	[startFrame, startFrame + 2, startFrame + 4],
	// 	[calculatedFontSize / 3, calculatedFontSize / 2, calculatedFontSize / 3],
	// 	{
	// 		extrapolateLeft: 'clamp',
	// 		extrapolateRight: 'clamp',
	// 		easing: easeOut
	// 	}
	// );

	const ratio = videoWidth / videoHeight;
	let marginRight = (videoWidth / 100) - (videoWidth / 40) + (word_spacing * sumRatio) + (ratio > 1.2 ? sumRatio * 20 : 0);
	// let pRight = isWordActive && subtitleType === 'background' ? paddingRight : calculatedFontSize / 10;
	// let pLeft = isWordActive && subtitleType === 'background' ? paddingLeft : calculatedFontSize / 3.5;
	let pRight = calculatedFontSize / 10;
	let pLeft = calculatedFontSize / 3.5;
	if (subtitleType === 'background' && (isLastWordInSegment || lineBreak)) {
		pRight += sumRatio * 10;
		pLeft -= sumRatio * 2;
		marginRight -= sumRatio * 10;
	}

	return {
		paddingRight: `${pRight}px`,
		paddingLeft: `${pLeft}px`,
		marginRight: `${marginRight}px`,
		borderRadius: `${calculatedFontSize / 10}px`,
		fontStyle: italic ? 'italic' : 'normal',
		WebkitTextStroke: subtitleType === 'stroke' ? `${calculatedFontSize / 7}px ${outline}` : undefined
	};
};

export const getAutoFontSize = (fittedFontSize: number, dimensionsRatio: number) => {
	const autoFontSize = fittedFontSize * 0.75;
	if (autoFontSize > 145) {
		return 145 * dimensionsRatio;
	} else if (autoFontSize < 60) {
		return 60 * dimensionsRatio;
	} else {
		return autoFontSize * dimensionsRatio;
	}
};

export const getFittedFontSize = (segmentText: string, width: number, fontFamily: string, fontWeight: number, uppercase: boolean) => {
	const { fontSize: fittedFontSize } = fitText({
		text: segmentText,
		withinWidth: width,
		fontFamily: fontFamily,
		fontWeight: fontWeight,
		textTransform: uppercase ? 'uppercase' : 'none',
	});
	return fittedFontSize;
};
