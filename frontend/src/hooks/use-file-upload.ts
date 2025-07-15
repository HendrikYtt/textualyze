import {displayError} from '../utils/utils';
import {durationInSecondsToStringTimes} from '../utils/trim-and-crop';
import {useTrimAndCropContext} from '../contexts/TrimAndCropContext';
import {useTranscriptionContext} from '../contexts/TranscriptionContext';
import {useAuth} from '../contexts/UsersContext';
import {supportedMediaTypes} from '../const/transcription';
import {getFileSizeInMB, getMediaProperties, isAudioFileType, VideoProperties} from '../utils/file-media';
import {fetchFile} from '@ffmpeg/util';
import {getFileDetails} from '../utils/ffmpeg';

export const exampleFileAttributes = {
	_previewHeight: 1080,
	_previewWidth: 1920,
	_height: 1080,
	_width: 1920,
	_duration: 28.80,
	_name: 'Example video',
	_size: 5.17,
	_videoSrc: 'https://d29o1hg78ui5xj.cloudfront.net/example_video.mp4'
};

const {
	_previewHeight,
	_previewWidth,
	_height,
	_width,
	_duration,
	_name,
	_size,
	_videoSrc
} = exampleFileAttributes;

export const useFileUpload = () => {
	const {user} = useAuth();

	const {
		setIsTrimAndCropOpen,
		setTrimmedEndMinutes,
		setTrimmedEndSeconds,
		setTrimmedEndHundredths,
		resetTrimAndCropState,
		setLinkAudio,
		setPreviewDimensions,
		setTrimmedEndTime
	} = useTrimAndCropContext();

	const {
		setOriginalFileData,
		setAdjustedFileData,
		setWillProgressBeLost,
		setIsUploading,
		setRequestPayload,
		setVideoSrc,
		setUploadingPercentage,
		resetFileLinkUpload,
		setOriginalFile
	} = useTranscriptionContext();

	const validateFileTypeAndResetState = async (uploadedFile: File) => {
		if (!user) {
			displayError(new Error('User not found'));
			return;
		}
		if (!supportedMediaTypes.includes(uploadedFile.type)) {
			displayError(new Error('Unsupported file type'));
			return;
		}
		setLinkAudio(null);
		resetTrimAndCropState();
		resetFileLinkUpload();
		setUploadingPercentage(0);
		setUploadingPercentage(0);
		const isAudio = isAudioFileType(uploadedFile);
		setRequestPayload(prevState => {
			return {
				...prevState,
				isAudioFile: isAudio,
				uploadType: 'local'
			};
		});
		setIsUploading(true);
		let height: number;
		let width: number;
		let duration: number;
		const properties = (await getMediaProperties(uploadedFile)) as unknown as VideoProperties;
		if (properties.height === 0 || properties.width === 0) {
			const fetchedFile = await fetchFile(uploadedFile);
			const details = await getFileDetails(fetchedFile);
			({height, width, duration} = details);
		} else {
			({height, width, duration} = properties);
		}

		setPreviewDimensions(prevState => {
			return {
				previewHeight: height,
				previewWidth: width
			};
		});
		if (duration > 2 * 3600) {
			setIsUploading(false);
			displayError(new Error('Uploaded file must be shorter than 2 hours'));
			return;
		}
		const sizeMB = getFileSizeInMB(uploadedFile);
		if (sizeMB > 2048) {
			setIsUploading(false);
			displayError(new Error('Uploaded file must be smaller than 2048MB'));
			return;
		}
		setOriginalFileData({
			height: height || 1920,
			width: width || 1080,
			duration: duration,
			name: uploadedFile.name,
			size: sizeMB
		});
		setOriginalFile(uploadedFile);
		setAdjustedFileData(prevState => {
			return {
				...prevState,
				name: uploadedFile.name,
				duration: duration
			};
		});
		const {minutes, seconds, hundredths} = durationInSecondsToStringTimes(duration);
		setTrimmedEndMinutes(minutes);
		setTrimmedEndSeconds(seconds);
		setTrimmedEndHundredths(hundredths);
		const blobUrl = URL.createObjectURL(
			new Blob([uploadedFile], { type: 'video/mp4' }),
		);
		setVideoSrc(blobUrl);
		setWillProgressBeLost(true);
		setIsTrimAndCropOpen(true);
	};

	const handleExampleVideo = () => {
		if (!user) {
			displayError(new Error('User not found'));
			return;
		}
		setLinkAudio(null);
		resetTrimAndCropState();
		resetFileLinkUpload();
		setUploadingPercentage(0);
		setUploadingPercentage(0);
		setRequestPayload(prevState => {
			return {
				...prevState,
				isAudioFile: false,
				uploadType: 'local'
			};
		});
		setIsUploading(true);

		setPreviewDimensions(prevState => {
			return {
				previewHeight: _previewHeight,
				previewWidth: _previewWidth
			};
		});
		setOriginalFileData({
			height: _height,
			width: _width,
			duration: _duration,
			name: _name,
			size: _size
		});
		setAdjustedFileData(prevState => {
			return {
				...prevState,
				name: _name,
				duration: _duration
			};
		});
		const {minutes, seconds, hundredths} = durationInSecondsToStringTimes(_duration);
		setTrimmedEndMinutes(minutes);
		setTrimmedEndSeconds(seconds);
		setTrimmedEndHundredths(hundredths);
		setVideoSrc(_videoSrc);
		setWillProgressBeLost(true);
		setIsTrimAndCropOpen(true);
	};

	return {
		validateFileTypeAndResetState,
		handleExampleVideo
	};
};