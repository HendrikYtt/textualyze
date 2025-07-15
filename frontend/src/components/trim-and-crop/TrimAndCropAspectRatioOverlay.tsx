import React, {useRef, useState, useCallback, useMemo} from 'react';
import { useTranscriptionContext } from '../../contexts/TranscriptionContext';
import {
	handleHorizontalWidths,
	handleVerticalWidths
} from '../../utils/trim-and-crop';
import {greyAreaOverlay} from './TrimAndCrop';

interface Props {
    newHeight: number;
    newWidth: number;
	previewHeight: number;
	previewWidth: number;
}

export const TrimAndCropAspectRatioOverlay: React.FC<Props> = ({ newHeight, newWidth, previewHeight, previewWidth }) => {
	const {
		currentXOffset,
		currentYOffset,
	} = useTranscriptionContext();

	const [userCursor, setUserCursor] = useState('grab');
	const dragRef = useRef<HTMLDivElement | null>(null);

	const {
		widthPercentage,
		remainingWidthPercentage,
		heightPercentage,
		remainingHeightPercentage,
		horizontalSpeedFactor
	} = useMemo(() => {
		const widthRatio = newWidth / previewWidth;
		const widthPercentage = widthRatio * 100;
		const remainingWidthPercentage = (100 - widthPercentage) / 2;

		const heightRatio = newHeight / previewHeight;
		const heightPercentage = heightRatio * 100;
		const remainingHeightPercentage = (100 - heightPercentage) / 2;

		const ratio = previewHeight / 1920;
		const horizontalSpeedFactor = ratio < 1 ? 1.5 : ratio + 1;

		return {
			widthRatio,
			widthPercentage,
			remainingWidthPercentage,
			heightRatio,
			heightPercentage,
			remainingHeightPercentage,
			horizontalSpeedFactor
		};
	}, [newWidth, previewWidth, newHeight, previewHeight]);

	const isColumnLayout = newHeight < previewHeight;

	const handleDragVertical = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
		const dragDiv = dragRef.current;
		if (!dragDiv) return;

		let mouseYPosition = event.clientY;
		const screenHeight = window.innerHeight;
		const speedFactor = 3500 / screenHeight * horizontalSpeedFactor;
		const parentHeight = dragDiv.parentElement!.offsetHeight;

		const maxDragTop = parentHeight - dragDiv.offsetHeight;

		const onMouseMove = (moveEvent: MouseEvent) => {
			setUserCursor('grabbing');
			const deltaY = (moveEvent.clientY - mouseYPosition) * speedFactor;
			const topDivHeight = dragDiv.offsetTop;
			const aboveDiv = dragDiv.previousSibling as HTMLDivElement;

			const belowDiv = dragDiv.nextSibling as HTMLDivElement;

			const newDragTop = topDivHeight + deltaY;

			currentYOffset.current = handleVerticalWidths(newDragTop, maxDragTop, dragDiv, parentHeight, aboveDiv, deltaY, belowDiv);

			mouseYPosition = moveEvent.clientY;
		};

		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', () => {
			setUserCursor('grab');
			document.removeEventListener('mousemove', onMouseMove);
		});
	}, []);

	const handleTouchDragVertical = useCallback((event: React.TouchEvent<HTMLDivElement>) => {
		const dragDiv = dragRef.current;
		if (!dragDiv) return;

		let startY = event.touches[0].clientY;
		const screenHeight = window.innerHeight;
		const speedFactor = 3000 / screenHeight * horizontalSpeedFactor;
		const parentHeight = dragDiv.parentElement!.offsetHeight;

		const onTouchMove = (moveEvent: TouchEvent) => {
			setUserCursor('grabbing');
			const currentY = moveEvent.touches[0].clientY;
			const deltaY = (currentY - startY) * speedFactor;
			const dragDivTop = dragDiv.offsetTop;

			const aboveDiv = dragDiv.previousSibling as HTMLDivElement;
			const belowDiv = dragDiv.nextSibling as HTMLDivElement;

			const newDragTop = dragDivTop + deltaY;
			const maxDragTop = parentHeight - dragDiv.offsetHeight;
			currentYOffset.current = handleVerticalWidths(newDragTop, maxDragTop, dragDiv, parentHeight, aboveDiv, deltaY, belowDiv);

			startY = currentY;
		};

		const onTouchEnd = () => {
			setUserCursor('grab');
			document.removeEventListener('touchmove', onTouchMove);
			document.removeEventListener('touchend', onTouchEnd);
		};

		document.addEventListener('touchmove', onTouchMove);
		document.addEventListener('touchend', onTouchEnd);
	}, []);

	const handleDragHorizontal = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
		const dragDiv = dragRef.current;
		if (!dragDiv) return;

		let mouseXPosition = event.clientX;
		const screenWidth = window.innerWidth;
		const base = screenWidth < 2000 ? 4300 : 3000 + screenWidth / 4;
		const speedFactor = base / screenWidth;

		const parentWidth = dragDiv.parentElement!.offsetWidth;

		const onMouseMove = (moveEvent: MouseEvent) => {
			setUserCursor('grabbing');
			const deltaX = (moveEvent.clientX - mouseXPosition) * speedFactor;
			const dragDivLeft = dragDiv.offsetLeft;

			const leftDiv = dragDiv.previousSibling as HTMLDivElement;
			const rightDiv = dragDiv.nextSibling as HTMLDivElement;

			const maxDragLeft = parentWidth - dragDiv.offsetWidth;
			const newDragLeft = dragDivLeft + deltaX;
			currentXOffset.current = handleHorizontalWidths(newDragLeft, maxDragLeft, parentWidth, leftDiv, deltaX, rightDiv, dragDiv);

			mouseXPosition = moveEvent.clientX;
		};

		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', () => {
			setUserCursor('grab');
			document.removeEventListener('mousemove', onMouseMove);
		});
	}, []);

	const handleTouchDragHorizontal = useCallback((event: React.TouchEvent<HTMLDivElement>) => {
		const dragDiv = dragRef.current;
		if (!dragDiv) return;

		let startX = event.touches[0].clientX;
		const screenWidth = window.innerWidth;
		const base = screenWidth > 2000 ? 3000 : 2000;
		const speedFactor = base / screenWidth;
		const parentWidth = dragDiv.parentElement!.offsetWidth;

		const onTouchMove = (moveEvent: TouchEvent) => {
			setUserCursor('grabbing');
			const currentX = moveEvent.touches[0].clientX;
			const deltaX = (currentX - startX) * speedFactor;
			const dragDivLeft = dragDiv.offsetLeft;

			const leftDiv = dragDiv.previousSibling as HTMLDivElement;
			const rightDiv = dragDiv.nextSibling as HTMLDivElement;

			const newDragLeft = dragDivLeft + deltaX;
			const maxDragLeft = parentWidth - dragDiv.offsetWidth;

			currentXOffset.current = handleHorizontalWidths(newDragLeft, maxDragLeft, parentWidth, leftDiv, deltaX, rightDiv, dragDiv);

			startX = currentX;
		};

		const onTouchEnd = () => {
			setUserCursor('grab');
			document.removeEventListener('touchmove', onTouchMove);
			document.removeEventListener('touchend', onTouchEnd);
		};

		document.addEventListener('touchmove', onTouchMove);
		document.addEventListener('touchend', onTouchEnd);
	}, []);

	const handleDrag = isColumnLayout ? handleDragVertical : handleDragHorizontal;
	const handleTouch = isColumnLayout ? handleTouchDragVertical : handleTouchDragHorizontal;

	const borderWidth = Math.sqrt(previewHeight * previewWidth) * 0.01;

	return (
		<div
			style={{
				height: '100%',
				width: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				flexDirection: isColumnLayout ? 'column' : 'row',
			}}
		>
			<div
				style={{
					height: `${remainingHeightPercentage === 0 ? 100 : remainingHeightPercentage}%`,
					width: `${isColumnLayout && remainingWidthPercentage === 0 ? 100 : remainingWidthPercentage}%`,
					backgroundColor: greyAreaOverlay,
					pointerEvents: 'none'
				}}
			></div>
			<div
				ref={dragRef}
				style={{
					height: `${heightPercentage}%`,
					width: `${widthPercentage}%`,
					border: `${borderWidth}px dashed white`,
					backgroundColor: 'transparent',
					cursor: userCursor
				}}
				onTouchStart={handleTouch}
				onMouseDown={handleDrag}
			></div>
			<div
				style={{
					height: `${remainingHeightPercentage === 0 ? 100 : remainingHeightPercentage}%`,
					width: `${isColumnLayout && remainingWidthPercentage === 0 ? 100 : remainingWidthPercentage}%`,
					backgroundColor: greyAreaOverlay,
					pointerEvents: 'none'
				}}
			></div>
		</div>
	);
};
