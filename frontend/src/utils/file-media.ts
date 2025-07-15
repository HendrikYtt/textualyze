export type VideoProperties = {
    duration: number;
    width: number;
    height: number;
}

export const getMediaProperties = (file: File) => {
	return new Promise((resolve, reject) => {
		const video = document.createElement('video');
		video.preload = 'metadata';

		video.onloadedmetadata = () => {
			const duration = video.duration;
			const width = video.videoWidth;
			const height = video.videoHeight;

			URL.revokeObjectURL(video.src);
			resolve({duration, width, height});
		};

		video.onerror = (e) => {
			reject(e);
		};

		video.src = URL.createObjectURL(file);
	});
};

export const getImageProperties = (file: File): Promise<{ width: number; height: number }> => {
	return new Promise((resolve, reject) => {
		const img = new Image();

		img.onload = () => {
			const width = img.naturalWidth;
			const height = img.naturalHeight;

			URL.revokeObjectURL(img.src);
			resolve({ width, height });
		};

		img.onerror = (e) => {
			URL.revokeObjectURL(img.src);
			reject(e);
		};

		img.src = URL.createObjectURL(file);
	});
};

export const getFileSizeInMB = (file: File): number => {
	const sizeInMB = file.size / (1024 * 1024);
	return parseFloat(sizeInMB.toFixed(2));
};

export const isAudioFileType = (file: File) => {
	const audioMimeTypes = [
		'audio/mpeg',
		'audio/wav',
		'audio/ogg',
		'audio/flac',
		'audio/aac',
		'audio/webm',
		'audio/mp4',
		'audio/x-m4a',
		'audio/vnd.wav',
	];
	return audioMimeTypes.includes(file.type) && !file.type.startsWith('video/');
};

export const getImageContentType = (extension: string) => {
	switch (extension) {
	case 'jpg':
	case 'jpeg':
		return 'image/jpeg';
	case 'png':
		return 'image/png';
	case 'gif':
		return 'image/gif';
	case 'webp':
		return 'image/webp';
	case 'svg':
		return 'image/svg+xml';
	default:
		return 'application/octet-stream';
	}
};