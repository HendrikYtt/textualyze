import {SelectedAspectRatio} from '../components/trim-and-crop/TrimAndCropConfiguration';

export const stringTimesToDurationInSeconds = (stringMinutes: string, stringSeconds: string, stringHundredths: string) => {
	const minutesInSeconds = Number(stringMinutes) * 60;
	const seconds = Number(stringSeconds);
	const hundredthsInSeconds = Number(stringHundredths) / 100;
	return minutesInSeconds + seconds + hundredthsInSeconds;
};

export const durationInSecondsToStringTimes = (duration: number) => {
	const minutes = Math.floor(duration / 60);
	const seconds = Math.floor(duration % 60);
	const hundredths = Math.floor((duration % 1) * 100);
	return {
		minutes: minutes.toString().padStart(2, '0'),
		seconds: seconds.toString().padStart(2, '0'),
		hundredths: hundredths.toString().padStart(2, '0')
	};
};

export const handleVerticalWidths = (newDragTop: number, maxDragTop: number, dragDiv: HTMLDivElement, parentHeight: number, aboveDiv: HTMLDivElement, deltaY: number, belowDiv: HTMLDivElement) => {
	const yOffset = aboveDiv.offsetHeight;
	if (newDragTop >= 0 && newDragTop <= maxDragTop) {
		dragDiv.style.top = `${(newDragTop / parentHeight) * 100}%`;
		aboveDiv.style.height = `${((aboveDiv.offsetHeight + deltaY) / parentHeight) * 100}%`;
		belowDiv.style.height = `${((belowDiv.offsetHeight - deltaY) / parentHeight) * 100}%`;
	}
	return yOffset;
};

export const handleHorizontalWidths = (newDragLeft: number, maxDragLeft: number, parentWidth: number, leftDiv: HTMLDivElement, deltaX: number, rightDiv: HTMLDivElement, dragDiv: HTMLDivElement) => {
	const xOffset = leftDiv.offsetWidth;
	if (newDragLeft >= 0 && newDragLeft <= maxDragLeft) {
		const draggableWidth = (newDragLeft / parentWidth) * 100;
		const leftDivWidth = ((leftDiv.offsetWidth + deltaX) / parentWidth) * 100;
		const rightDivWidth = ((rightDiv.offsetWidth - deltaX) / parentWidth) * 100;
		dragDiv.style.left = `${draggableWidth}%`;

		leftDiv.style.width = `${leftDivWidth}%`;
		rightDiv.style.width = `${rightDivWidth}%`;
	}
	return xOffset;
};

export const calculateNewDimensions = (width: number, height: number, aspectRatio: SelectedAspectRatio) => {
	let aspectWidth, aspectHeight;
	if (aspectRatio === 'Original') {
		aspectWidth = width;
		aspectHeight = height;
	} else {
		[aspectWidth, aspectHeight] = aspectRatio.split(':').map(Number);
	}

	const currentRatio = width / height;
	const newRatio = aspectWidth / aspectHeight;

	if (newRatio > currentRatio) {
		const croppedWidth = width;
		const croppedHeight = Math.round(width / newRatio);
		return { croppedHeight, croppedWidth };
	} else {
		const croppedHeight = height;
		const croppedWidth = Math.round(height * newRatio);
		return { croppedHeight, croppedWidth };
	}
};

export const pxToFrames = (px: number, framesPerPx: number) => {
	return px / framesPerPx;
};