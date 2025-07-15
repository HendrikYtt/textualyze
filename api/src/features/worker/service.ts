import {promisify} from 'util';
import {log} from '../../lib/log';
import {
	secondsToMSFormat,
	Segment,
	WordObject
} from '@hendrikytt/api-contracts';
import {exec as execCallback, spawn} from 'child_process';
import path from 'path';
import {incomingFilesPath} from '../../config';
import fs from 'fs';
import { randomUUID } from 'crypto';
import {InitialSegmentsV2} from '../../types';
import {publishToPubSub} from '../../lib/redis';
import {updateUserUploadFields} from '../user-upload/database';
import {getS3ScreenshotUrl, uploadFileToS3, uploadScreenshotToS3} from '../s3/service';
import util from 'util';
import * as readline from 'readline';

const exec = promisify(execCallback);
const execPromise = util.promisify(exec);

export const initialSegmentToSegmentV2 = (initialSegments: InitialSegmentsV2): { segments: Segment[], longestSegmentLength: number } => {
	const segments: Segment[] = [];
	let longestSegmentLength = 0;
	let prevEndTime = 0;

	initialSegments.segments.forEach((initialSegment) => {
		const constructedSegment: Segment = {
			id: initialSegment.id,
			start: Math.max(initialSegment.start, prevEndTime),
			startMs: secondsToMSFormat(Math.max(initialSegment.start, prevEndTime)),
			end: initialSegment.end,
			endMs: secondsToMSFormat(initialSegment.end),
			originalId: initialSegment.id,
			text: initialSegment.text,
			translatedText: '',
			words: initialSegment.words.map(wordObject => {
				const currentWord = wordObject.word;
				const obj: WordObject = {
					id: randomUUID(),
					start: Math.max(wordObject.start, prevEndTime),
					startMs: secondsToMSFormat(Math.max(wordObject.start, prevEndTime)),
					end: wordObject.end,
					endMs: secondsToMSFormat(wordObject.end),
					word: currentWord,
					probability: wordObject.score,
					font_color: '',
					linebreak: false,
					highlight_color: null,
					background_color: null,
					emoji: null,
					emojiUrl: null,
					sound: null,
					soundVolume: 100,
					speaker: wordObject.speaker
				};
				return obj;
			}),
			fontSize: null,
			position: null
		};

		// Update the segment start time if it overlaps with the previous segment
		if (constructedSegment.start < prevEndTime) {
			constructedSegment.start = prevEndTime;
			constructedSegment.startMs = secondsToMSFormat(prevEndTime);
		}

		segments.push(anomalyChecker(constructedSegment));
		if (constructedSegment.words.length > longestSegmentLength) {
			longestSegmentLength = constructedSegment.words.length;
		}

		prevEndTime = constructedSegment.end;
	});

	return { segments, longestSegmentLength };
};

export const anomalyChecker = (segment: Segment) => {
	const sameStartEndWordsCount = segment.words.filter(word => word.start === word.end).length;

	if (sameStartEndWordsCount > 3) {
		const segmentStart = segment.start;
		const segmentEnd = segment.end;

		const totalWordLength = segment.words.reduce((acc, word) => acc + word.word.length, 0);

		let currentStart = segmentStart;

		const newSegment: Segment = {
			id: segment.id,
			start: segmentStart,
			startMs: segment.startMs,
			end: segmentEnd,
			endMs: segment.endMs,
			originalId: segment.originalId,
			text: segment.text,
			translatedText: segment.translatedText,
			fontSize: segment.fontSize,
			position: segment.position,
			words: segment.words.map(word => {
				const wordDuration = ((segmentEnd - segmentStart) * (word.word.length / totalWordLength));
				const wordStart = parseFloat(currentStart.toFixed(2));
				const wordEnd = parseFloat((currentStart + wordDuration).toFixed(2));
				currentStart = wordEnd;

				const newWord: WordObject = {
					id: word.id,
					start: wordStart,
					startMs: secondsToMSFormat(wordStart),
					end: wordEnd,
					endMs: secondsToMSFormat(wordEnd),
					word: word.word,
					linebreak: word.linebreak,
					sound: word.sound,
					soundVolume: word.soundVolume,
					emoji: word.emoji,
					emojiUrl: word.emojiUrl,
					probability: word.probability,
					font_color: word.font_color,
					background_color: word.background_color,
					highlight_color: word.highlight_color,
					speaker: word.speaker
				};
				return newWord;
			})
		};

		return newSegment;
	} else {
		return segment;
	}
};

export const cropVideo = async (
	fileName: string,
	requestId: string,
	width: number,
	height: number,
	cropWidth: number,
	cropHeight: number,
	xOffset: number,
	yOffset: number,
	userId: number,
	type: 'local' | 'link'
): Promise<{ filePath: string, fileName: string, size: number, adjustedHeight: number, adjustedWidth: number }> => {
	const inputFilePath = path.join(process.cwd(), incomingFilesPath, fileName);
	if (width === cropWidth && height === cropHeight) {
		const stats = await fs.promises.stat(inputFilePath);
		const fileSizeInMegabytes = stats.size / (1024 * 1024);
		return { filePath: inputFilePath, fileName: fileName, size: fileSizeInMegabytes, adjustedHeight: height, adjustedWidth: width };
	}

	// to make sure they are divisible by 2, so ffmpeg can render this video later
	cropWidth = cropWidth % 2 === 0 ? cropWidth : cropWidth - 1;
	cropHeight = cropHeight % 2 === 0 ? cropHeight : cropHeight - 1;

	const croppedFileName = `${requestId}_cropped.mp4`;
	const outputFilePath = path.join(process.cwd(), incomingFilesPath, croppedFileName);

	const args = [
		'-i', inputFilePath,
		'-vf', `crop=${cropWidth}:${cropHeight}:${xOffset}:${yOffset}`,
		'-c:v', 'libx264',
		'-c:a', 'aac',
		outputFilePath,
	];

	log.info(`ffmpeg command ffmpeg ${args.join(' ')}`);

	return new Promise((resolve, reject) => {
		const ffmpeg = spawn('ffmpeg', args);

		ffmpeg.stdout.on('data', (data) => {
			// log.info(`stdout: ${data.toString()}`);
		});

		ffmpeg.stderr.on('data', (data) => {
			// log.info(`stderr: ${data.toString()}`);
		});

		ffmpeg.on('close', async (code) => {
			if (code === 0) {
				log.info('ffmpeg process exited successfully');

				try {
					const stats = await fs.promises.stat(outputFilePath);
					const fileSizeInMegabytes = stats.size / (1024 * 1024);

					await fs.promises.unlink(inputFilePath);
					log.info(`Original file ${fileName} deleted`);

					const finalFilePath = path.join(process.cwd(), incomingFilesPath, fileName);
					await fs.promises.rename(outputFilePath, finalFilePath);
					log.info(`Cropped file renamed to ${fileName}`);

					resolve({ filePath: finalFilePath, fileName: fileName, size: fileSizeInMegabytes, adjustedHeight: cropHeight, adjustedWidth: cropWidth });
				} catch (error) {
					log.error('Error getting file stats:', error);
					if (type === 'link') {
						await publishToPubSub('download-from-url-to-api-failed', {error: 'Failed to download file from URL'}, userId.toString(), requestId);
					} else {
						await publishToPubSub('upload-failed', { error: 'Upload failed' }, userId.toString(), requestId);
					}
					reject(new Error('Failed to get file stats'));
				}
			} else {
				log.error(`ffmpeg process exited with code ${code}`);
				if (type === 'link') {
					await publishToPubSub('download-from-url-to-api-failed', {error: 'Failed to download file from URL'}, userId.toString(), requestId);
				} else {
					await publishToPubSub('upload-failed', { error: 'Upload failed' }, userId.toString(), requestId);
				}
				reject(new Error(`ffmpeg process exited with code ${code}`));
			}
		});
	});
};

export const trimVideo = async (
	fileName: string,
	requestId: string,
	adjustedStartTime: number,
	adjustedEndTime: number,
	originalDuration: number,
	size: number,
	userId: number,
	type: 'local' | 'link'
): Promise<{ filePath: string, fileName: string, size: number }> => {
	const filePath = path.join(process.cwd(), incomingFilesPath, fileName);
	const adjustedDuration = adjustedEndTime - adjustedStartTime;
	if (Math.abs((adjustedDuration) - originalDuration) < 0.02) {
		return {filePath: filePath, fileName: fileName, size: size};
	}
	const trimmedFileName = `${requestId}_trimmed.mp4`;
	const outputFilePath = path.join(process.cwd(), incomingFilesPath, trimmedFileName);

	const args = [
		'-ss', `${adjustedStartTime}`,
		'-i', filePath,
		'-t', `${adjustedDuration}`,
		'-c', 'copy',
		outputFilePath,
	];

	log.info(`ffmpeg command ffmpeg ${args.join(' ')}`);

	// Returning the Promise directly
	return new Promise((resolve, reject) => {
		const ffmpeg = spawn('ffmpeg', args);

		ffmpeg.stdout.on('data', (data) => {
			// log.info(`stdout: ${data.toString()}`);
		});

		ffmpeg.stderr.on('data', (data) => {
			// log.info(`stderr: ${data.toString()}`);
		});

		ffmpeg.on('close', async (code) => {
			if (code === 0) {
				log.info('ffmpeg process exited successfully');

				try {
					const stats = await fs.promises.stat(outputFilePath);
					const fileSizeInMegabytes = stats.size / (1024 * 1024);

					await fs.promises.unlink(filePath);
					log.info(`Original file ${fileName} deleted`);

					const finalFilePath = path.join(process.cwd(), incomingFilesPath, fileName);
					await fs.promises.rename(outputFilePath, finalFilePath);
					log.info(`Trimmed file renamed to ${fileName}`);

					resolve({ filePath: outputFilePath, fileName: fileName, size: fileSizeInMegabytes });
				} catch (error) {
					log.error('Error getting file stats:', error);
					if (type === 'link') {
						await publishToPubSub('download-from-url-to-api-failed', {error: 'Failed to download file from URL'}, userId.toString(), requestId);
					} else {
						await publishToPubSub('upload-failed', { error: 'Upload failed' }, userId.toString(), requestId);
					}
					reject(new Error('Failed to get file stats'));
				}
			} else {
				log.error(`ffmpeg process exited with code ${code}`);
				if (type === 'link') {
					await publishToPubSub('download-from-url-to-api-failed', {error: 'Failed to download file from URL'}, userId.toString(), requestId);
				} else {
					await publishToPubSub('upload-failed', { error: 'Upload failed' }, userId.toString(), requestId);
				}
				reject(new Error(`ffmpeg process exited with code ${code}`));
			}
		});
	});
};

export const downloadAndValidateFile = async (
	requestId: string,
	videoUrl: string,
	userId: number,
	userDurationLimitSeconds: number,
	videoTitle: string,
	adjustedStartTime: number,
	adjustedEndTime: number,
	originalWidth: number,
	originalHeight: number,
	cropWidth: number,
	cropHeight: number,
	xOffset: number,
	yOffset: number,
) => {
	const localVideoFilePath = path.join(process.cwd(), incomingFilesPath, `${requestId}.mp4`);
	const adjustedDuration = adjustedEndTime - adjustedStartTime;

	const ytDlpCmd: string[] = [
		'-f', 'bestvideo*+bestaudio/best',
		'-o', `${path.join(process.cwd(), incomingFilesPath, `${requestId}_full`)}`,
		`"${videoUrl}"`
	];

	log.info(`Starting to download video from URL with yt-dlp - ${requestId}`);

	const downloadPromise = new Promise((resolve, reject) => {
		const childProcess = execCallback(`yt-dlp ${ytDlpCmd.join(' ')}`);
		let downloadStarted = false;
		let lastPercentage = 0;

		if (childProcess.stdout) {
			const rl = readline.createInterface({
				input: childProcess.stdout,
				crlfDelay: Infinity
			});

			rl.on('line', async (line) => {
				const match = line.match(/(\d+\.\d+)%/);
				if (match) {
					const percentage = parseFloat(match[1]);

					// Ignore 100% if download hasn't started or if it's not greater than the last percentage
					if (percentage === 100 && (!downloadStarted || percentage < lastPercentage)) {
						return;
					}

					downloadStarted = true;

					if (percentage > lastPercentage) {
						lastPercentage = percentage;
					}
					publishToPubSub('download-from-url-to-api-progress', {percentage: lastPercentage}, userId.toString(), requestId);
					log.info(`Download progress: ${lastPercentage.toFixed(2)}% - ${requestId}`);
				}
			});
		}

		childProcess.on('error', (error) => {
			reject(error);
		});

		childProcess.on('close', (code) => {
			log.info(`yt-dlp exited with code: ${code}`);
			resolve(null);
		});
	});

	await downloadPromise;
	//await exec(`yt-dlp ${ytDlpCmd.join(' ')}`);

	const dirPath = path.join(process.cwd(), incomingFilesPath);
	const downloadedFile = fs.readdirSync(dirPath, {withFileTypes: true})
		.map(item => item.name)
		.find(item => item.startsWith(requestId));

	if (!downloadedFile) {
		log.error('Could not find downloaded file');
		await publishToPubSub('download-from-url-to-api-failed', {error: 'Download from URL failed'}, userId.toString(), requestId);
		return;
	}

	const originalFilePath = path.join(dirPath, downloadedFile);
	const ffmpegCmd: string[] = [
		'-ss', secondsToMSFormatWithHours(adjustedStartTime),
		'-i', originalFilePath,
		'-t', secondsToMSFormatWithHours(adjustedDuration),
		'-c', 'copy',
		localVideoFilePath
	];
	log.info(`Starting to trim video from URL with ffmpeg - ${requestId}`);
	await exec(`ffmpeg ${ffmpegCmd.join(' ')}`);
	await fs.promises.unlink(originalFilePath);

	const screenshotFilePath = await getFirstScreenshotFromVideo(localVideoFilePath, requestId, false);
	const cloudFrontUrl = getS3ScreenshotUrl(requestId);

	execCallback(`ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 "${localVideoFilePath}"`, async (error, output, stderr) => {
		if (error) {
			await publishToPubSub('download-from-url-to-api-failed', {error: 'Download from URL failed'}, userId.toString(), requestId);
			log.error(`Error getting video properties: ${error.message}`);
			return;
		}
		const [actualWidth, actualHeight] = output.trim().split('x');
		const parsedWidth = (parseFloat(actualWidth) || originalWidth);
		const parsedHeight = (parseFloat(actualHeight) || originalHeight);
		const widthRatio = parsedWidth / originalWidth;
		const heightRatio = parsedHeight / originalHeight;

		const croppedVideo = await cropVideo(`${requestId}.mp4`, requestId, parsedWidth, parsedHeight, cropWidth * widthRatio, cropHeight * heightRatio, xOffset, yOffset, userId, 'link');

		let compressedWidth;
		let compressedHeight;
		const currentPixelsAmount = parsedWidth * parsedHeight;
		const compressedOrCopiedFilePath = path.join(process.cwd(), incomingFilesPath, `${requestId}_compressed.mp4`);
		if (currentPixelsAmount > hqVideoPixelsAmount) {
			({compressedWidth, compressedHeight} = await compressVideo(croppedVideo.filePath, compressedOrCopiedFilePath, cropWidth, cropHeight));
		} else {
			await fs.promises.copyFile(localVideoFilePath, compressedOrCopiedFilePath);
			compressedWidth = parsedWidth;
			compressedHeight = parsedHeight;
		}
		log.info(`Starting to upload files to S3 - ${requestId}`);
		await Promise.all([
			uploadFileToS3(localVideoFilePath, `${requestId}.mp4`),
			uploadFileToS3(compressedOrCopiedFilePath, `${requestId}_compressed.mp4`),
			uploadScreenshotToS3(screenshotFilePath, `${requestId}.png`)
		]);

		execCallback(`ffprobe -v error -select_streams v:0 -show_entries stream=width,height,duration -of csv=s=x:p=0 "${croppedVideo.filePath}"`, async (error, output, stderr) => {
			if (error) {
				await publishToPubSub('download-from-url-to-api-failed', {error: 'Download from URL failed'}, userId.toString(), requestId);
				log.error(`Error getting video properties: ${error.message}`);
				return;
			}
			const [width, height, duration] = output.trim().split('x');
			const durationInSeconds = parseFloat(parseFloat(duration).toFixed(2));
			if (durationInSeconds > userDurationLimitSeconds) {
				const limit = userDurationLimitSeconds > 60 ? `${userDurationLimitSeconds / 60} minutes` : `${userDurationLimitSeconds} seconds`;
				await publishToPubSub('download-from-url-to-api-failed', {error: `Current upload limit is ${limit}`}, userId.toString(), requestId);
				return;
			}
			const fileWidth = parseInt(width, 10);
			const fileHeight = parseInt(height, 10);
			await updateUserUploadFields(requestId, {
				width: fileWidth,
				height: fileHeight,
				size: croppedVideo.size
			});
			await publishToPubSub('download-from-url-to-api-ready', {
				originalWidth: originalWidth,
				originalHeight: originalHeight,
				adjustedHeight: fileHeight,
				adjustedWidth: fileWidth,
				compressedWidth: compressedWidth,
				compressedHeight: compressedHeight,
				size: croppedVideo.size,
				title: videoTitle,
				duration: durationInSeconds,
				projectScreenshotUrl: cloudFrontUrl
			}, userId.toString(), requestId);
			await Promise.all([
				fs.promises.unlink(compressedOrCopiedFilePath),
				fs.promises.unlink(screenshotFilePath)
			]);
		});
	});
};

export const secondsToMSFormatWithHours = (seconds: number) => {
	const totalSeconds = Math.floor(seconds);
	const hundredths = Math.round((seconds - totalSeconds) * 100);

	const hours = Math.floor(totalSeconds / 3600);
	const mins = Math.floor((totalSeconds % 3600) / 60);
	const secs = totalSeconds % 60;

	const formattedHours = hours.toString().padStart(2, '0');
	const formattedMins = mins.toString().padStart(2, '0');
	const formattedSecs = secs.toString().padStart(2, '0');
	const formattedHundredths = hundredths.toString().padStart(2, '0');

	return `${formattedHours}:${formattedMins}:${formattedSecs}.${formattedHundredths}`;
};

export const getFirstScreenshotFromVideo = async (filePath: string, screenshotName: string, isAudioFile: boolean) => {
	const outputScreenshot = path.join(process.cwd(), incomingFilesPath, `${screenshotName}.png`);
	let ffmpegCmd: string[];

	if (isAudioFile) {
		ffmpegCmd = [
			'-f', 'lavfi',
			'-i', 'color=c=black:s=1080x1920',
			'-frames:v', '1',
			outputScreenshot
		];
	} else {
		ffmpegCmd = [
			'-i', filePath,
			'-vf', '"select=eq(n\\,0)"',
			'-vframes', '1',
			outputScreenshot
		];
	}

	await exec(`ffmpeg ${ffmpegCmd.join(' ')}`);
	return outputScreenshot;
};

const base1280 = 1280;
const base720 = 720;
export const hqVideoPixelsAmount = base1280 * base720;

export const convertBaseDimensions = (width: number, height: number): { width: number, height: number } => {
	const aspectRatio = width / height;
	const targetPixels = hqVideoPixelsAmount;

	let newWidth: number;
	let newHeight: number;

	if (width >= height) {
		newHeight = Math.sqrt(targetPixels / aspectRatio);
		newWidth = newHeight * aspectRatio;
	} else {
		newWidth = Math.sqrt(targetPixels * aspectRatio);
		newHeight = newWidth / aspectRatio;
	}

	// Round to nearest even integer
	newWidth = Math.round(newWidth / 2) * 2;
	newHeight = Math.round(newHeight / 2) * 2;

	// Adjust to ensure exact hqVideoPixelsAmount
	if (newWidth * newHeight !== targetPixels) {
		if (width >= height) {
			newWidth = targetPixels / newHeight;
		} else {
			newHeight = targetPixels / newWidth;
		}
	}

	return {
		width: Math.round(newWidth),
		height: Math.round(newHeight)
	};
};

export const compressVideo = async (inputFilePath: string, outputFilePath: string, adjustedWidth: number, adjustedHeight: number) => {
	const {width: convertedBaseWidth, height: convertedBaseHeight} = convertBaseDimensions(adjustedWidth, adjustedHeight);
	const heightRatio = convertedBaseHeight / adjustedHeight;
	const widthRatio = convertedBaseWidth / adjustedWidth;
	const compressedWidth = adjustedWidth * widthRatio;
	const compressedHeight = adjustedHeight * heightRatio;
	const cmd = `ffmpeg -i "${inputFilePath}" -vf scale=${compressedWidth}:${compressedHeight},fps=30 -crf 30 -preset superfast "${outputFilePath}"`;
	await execPromise(cmd);
	return {
		compressedWidth,
		compressedHeight
	};
};

export type Platform = 'twitter' | 'instagram' | 'tiktok' | 'facebook' | 'youtube';
export const supportedPlatforms: Platform[] = ['twitter', 'instagram', 'tiktok', 'facebook', 'youtube'];
export const getSocialMediaPlatform = (url: string): Platform | null => {
	if (url.includes('twitter.com') || url.includes('x.com')) {
		return 'twitter';
	} else if (url.includes('instagram.com')) {
		return 'instagram';
	} else if (url.includes('tiktok.com')) {
		return 'tiktok';
	} else if (url.includes('fb.watch') || url.includes('facebook.com')) {
		return 'facebook';
	} else if (url.includes('youtube.com') || url.includes('youtu.be')) {
		return 'youtube';
	} else {
		return null;
	}
};

const maxCharsPerLine = 12;
export const addLinebreaks = (segments: Segment[]) => {
	return segments.map(segment => {
		let charCount = 0;
		const updatedWords = segment.words.map((word, index) => {
			const updatedWord = { ...word };
			charCount += updatedWord.word.length;
			if (charCount > maxCharsPerLine && index < segment.words.length - 1) {
				updatedWord.linebreak = true;
				charCount = updatedWord.word.length;
			}
			return updatedWord;
		});

		return { ...segment, words: updatedWords };
	});
};