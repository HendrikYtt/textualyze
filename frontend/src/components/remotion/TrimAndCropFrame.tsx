import PropTypes from 'prop-types';
import {AbsoluteFill, Audio, Video} from 'remotion';
import {z} from 'zod';
import {useTrimAndCropContext} from '../../contexts/TrimAndCropContext';
import React, { useEffect} from 'react';
import {useTranscriptionContext} from '../../contexts/TranscriptionContext';
import {
	calculateNewDimensions,
} from '../../utils/trim-and-crop';
import {TrimAndCropAspectRatioOverlay} from '../trim-and-crop/TrimAndCropAspectRatioOverlay';

export const myCompSchema = z.object({
	isAudio: z.boolean(),
	videoSrc: z.string(),
	videoHeight: z.number(),
	videoWidth: z.number()
});

export const TrimAndCropFrame: React.FC<z.infer<typeof myCompSchema>> = ({
	isAudio,
	videoSrc,
	videoHeight,
	videoWidth
}) => {
	const {
		originalFileData,
		previewCropDimensions,
		originalCropDimensions
	} = useTranscriptionContext();

	const {
		selectedAspectRatio,
		trimAndCropPlayerRef,
		setIsTrimAndCropPlayerPlaying,
		linkAudio,
		previewDimensions
	} = useTrimAndCropContext();

	const {croppedHeight: previewCroppedHeight, croppedWidth: previewCroppedWidth} = calculateNewDimensions(videoWidth, videoHeight, selectedAspectRatio);
	const {croppedHeight: originalCroppedHeight, croppedWidth: originalCroppedWidth} = calculateNewDimensions(originalFileData.width, originalFileData.height, selectedAspectRatio);
	previewCropDimensions.current = {height: previewCroppedHeight, width: previewCroppedWidth};
	originalCropDimensions.current = {height: originalCroppedHeight, width: originalCroppedWidth};

	useEffect(() => {
		if (trimAndCropPlayerRef?.current?.getCurrentFrame() === 0 || !trimAndCropPlayerRef?.current?.isPlaying()) {
			setIsTrimAndCropPlayerPlaying(false);
		}
	}, [trimAndCropPlayerRef?.current?.getCurrentFrame()]);

	return (
		<AbsoluteFill>
			<AbsoluteFill style={{backgroundColor: isAudio ? 'black' : 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
				{videoSrc && !isAudio && <Video
					src={videoSrc} preload="metadata" style={{
						objectFit: 'contain',
						maxWidth: '100%',
						maxHeight: '100%'
					}}  />}
				{linkAudio && <Audio src={linkAudio} />}
				{videoSrc && isAudio && <Audio src={videoSrc} />}
			</AbsoluteFill>
			<AbsoluteFill>
				{selectedAspectRatio !== 'Original' && (
					<TrimAndCropAspectRatioOverlay
						previewWidth={previewDimensions?.previewWidth || originalFileData.width}
						previewHeight={previewDimensions?.previewHeight || originalFileData.height}
						newHeight={previewCroppedHeight}
						newWidth={previewCroppedWidth}
					/>
				)}
			</AbsoluteFill>
		</AbsoluteFill>
	);
};

TrimAndCropFrame.propTypes = {
	isAudio: PropTypes.bool.isRequired,
	videoSrc: PropTypes.string.isRequired
};
