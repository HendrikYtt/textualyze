import PromiseRouter from 'express-promise-router';
import path from 'path';
import * as fs from 'fs';
import {
	TranscribeRequest,
	convertToSegmentedArrayWithMaxWords
} from '@hendrikytt/api-contracts';
import {protectAndValidate} from '../../lib/auth';
import {log} from '../../lib/log';
import {upsertUsage} from '../usages/database';
import {BadRequestError} from '../../error';
import {insertTranscription} from '../transcriptions/database';
import {knex} from '../../knex';
import {getCurrentMonthNumber, getCurrentYear} from '../../utils/utils';
import {
	compressVideo,
	cropVideo,
	downloadAndValidateFile, getFirstScreenshotFromVideo,
	hqVideoPixelsAmount,
	initialSegmentToSegmentV2,
	trimVideo
} from './service';
import {incomingFilesPath} from '../../config';
import {publishToPubSub} from '../../lib/redis';
import {
	getS3AudioFileUrl,
	getS3ScreenshotUrl,
	uploadAudioToS3,
	uploadFileToS3,
	uploadScreenshotToS3
} from '../s3/service';
import {insertUserUpload} from '../user-upload/database';
import {upload} from '../../lib/upload';
import {getUserUploadsByRequestIdOrThrow} from '../user-upload/service';
import {exec} from 'child_process';
import {TranscribeReadyMessage} from '@hendrikytt/api-contracts/dist/sockets';
import {generateDescription, transcribeMedia} from '../ai/service';
import {createDiarization} from '../diarization/requests';
import {insertNotSignedUpUser, updateNotSignedUpUser} from '../not-signed-up-users/database';
import {tryoutUserId} from '../users/router';
import {addIPAddress} from '../ip-addresses/service';

export const workerRouter = PromiseRouter();

workerRouter.post('/upload-file/:requestId', protectAndValidate(), upload.single('file'), async (req, res) => {
	const frontendUser = req.user;
	const isTryoutUser = frontendUser.id === tryoutUserId;
	if (!req.file && !isTryoutUser) {
		throw new BadRequestError('No file uploaded.');
	}

	const reqBody = JSON.parse(req.body.uploadFileToApiBody);
	const duration: number = reqBody.duration;
	const size: number = reqBody.size;
	const width: number = reqBody.width;
	const height: number = reqBody.height;
	const adjustedWidth: number = reqBody.adjustedWidth;
	const adjustedHeight: number = reqBody.adjustedHeight;
	const xOffset: number = reqBody.xOffset || 0;
	const yOffset: number = reqBody.yOffset || 0;
	const adjustedStartTime: number = reqBody.adjustedStartTime || 0;
	const adjustedEndTime: number = reqBody.adjustedEndTime || 0;
	const isAudioFile: boolean = reqBody.isAudioFile;

	const requestId = req.params.requestId;
	const ipAddress = req.ip || null;

	res.status(202).send({ message: 'Request accepted, processing started.' });
	try {
		if (isTryoutUser) {
			await insertNotSignedUpUser({
				device: req.device,
				browser: req.browser,
				has_exported: false,
				has_uploaded: true,
				has_transcribed: false,
				ip_address: ipAddress,
				hear_from_us: null
			});
		}
		if (ipAddress) {
			await addIPAddress(ipAddress);
		}
		if (isTryoutUser && !req.file) {
			const originalAgo = path.join(process.cwd(), incomingFilesPath, 'example_video.mp4');
			const copiedFile = path.join(process.cwd(), incomingFilesPath, `${requestId}.mp4`);
			await fs.promises.copyFile(originalAgo, copiedFile);
		}
		const trimmedVideo = await trimVideo(`${requestId}.mp4`, requestId, adjustedStartTime, adjustedEndTime, duration, size, req.user.id, 'local');
		const croppedVideo = await cropVideo(trimmedVideo.fileName, requestId, width, height, adjustedWidth, adjustedHeight, xOffset, yOffset, req.user.id, 'local');

		const compressedOrCopiedFilePath = path.join(process.cwd(), incomingFilesPath, `${requestId}_compressed.mp4`);
		let compressedWidth;
		let compressedHeight;
		const currentPixelsAmount = adjustedWidth * adjustedHeight;
		if (!isTryoutUser && !isAudioFile && currentPixelsAmount > hqVideoPixelsAmount) {
			({compressedWidth, compressedHeight} = await compressVideo(croppedVideo.filePath, compressedOrCopiedFilePath, adjustedWidth, adjustedHeight));
			log.info('Video scaled and saved successfully.');
		} else {
			compressedWidth = adjustedWidth;
			compressedHeight = adjustedHeight;
			await fs.promises.copyFile(croppedVideo.filePath, compressedOrCopiedFilePath);
			log.info('Video copied successfully.');
		}

		const adjustedDuration = adjustedEndTime - adjustedStartTime;
		const screenshotFilePath = await getFirstScreenshotFromVideo(croppedVideo.filePath, requestId, isAudioFile);

		const uploadTasks = [
			uploadFileToS3(croppedVideo.filePath, `${requestId}.mp4`),
			uploadFileToS3(compressedOrCopiedFilePath, `${requestId}_compressed.mp4`),
			uploadScreenshotToS3(screenshotFilePath, `${requestId}.png`)
		];

		await Promise.all(uploadTasks);

		const userId = req.user.id.toString();
		await insertUserUpload({
			user_id: req.user.id,
			request_id: requestId,
			upload_type: 'local',
			original_video_url: null,
			duration: duration,
			size: size,
			width: width,
			height: height,
			browser: req.browser,
			device: req.device
		});

		const cloudFrontUrl = getS3ScreenshotUrl(requestId);
		await publishToPubSub(
			'upload-ready',
			{
				adjustedFileDuration: adjustedDuration,
				adjustedFileSize: croppedVideo.size,
				compressedWidth: compressedWidth,
				compressedHeight: compressedHeight,
				projectScreenshotUrl: cloudFrontUrl,
				adjustedWidth: croppedVideo.adjustedWidth,
				adjustedHeight: croppedVideo.adjustedHeight
			},
			userId,
			requestId
		);
		await fs.promises.unlink(compressedOrCopiedFilePath);
		screenshotFilePath && await fs.promises.unlink(screenshotFilePath);
	} catch (error) {
		log.error(`Upload failed: ${error}`);
		await publishToPubSub('upload-failed', { error: 'Upload failed' }, req.user.id.toString(), requestId);
		return;
	}
});

workerRouter.post('/download-from-url-to-api/:id', protectAndValidate(), async (req, res) => {
	const requestId: string = req.params.id;
	const reqBody = req.body;
	const duration: number = reqBody.duration;
	const width: number = reqBody.width;
	const height: number = reqBody.height;
	const videoUrl: string = reqBody.videoUrl;
	const videoTitle: string = reqBody.videoTitle;
	const adjustedWidth: number = reqBody.adjustedWidth;
	const adjustedHeight: number = reqBody.adjustedHeight;
	const xOffset: number = reqBody.xOffset || 0;
	const yOffset: number = reqBody.yOffset || 0;
	const adjustedStartTime: number = reqBody.adjustedStartTime || 0;
	const adjustedEndTime: number = reqBody.adjustedEndTime || 0;

	const userDurationLimitSeconds = req.user.current_plan.upload_limit_seconds;
	if ((adjustedEndTime - adjustedStartTime) > userDurationLimitSeconds) {
		const videoDuration = `${duration > 60 ? (duration / 60).toFixed(2) + ' minutes' : duration + ' seconds' }`;
		const userLimit = userDurationLimitSeconds;
		const limitDuration = `${userLimit > 60 ? (userLimit / 60).toFixed(2) + ' minutes' : userLimit + ' seconds' }`;
		throw new BadRequestError(`Video duration in the URL (${videoDuration}) is longer than the limit (${limitDuration})`);
	}
	await insertUserUpload({
		user_id: req.user.id,
		request_id: requestId,
		upload_type: 'link',
		original_video_url: videoUrl,
		duration: duration,
		size: 0,
		width: 0,
		height: 0,
		browser: req.browser,
		device: req.device
	});
	res.status(202).send({ message: 'Request accepted, processing started.' });
	try {
		await downloadAndValidateFile(
			requestId,
			videoUrl,
			req.user.id,
			userDurationLimitSeconds,
			videoTitle,
			adjustedStartTime,
			adjustedEndTime,
			width,
			height,
			adjustedWidth,
			adjustedHeight,
			xOffset,
			yOffset
		);
	} catch (e) {
		log.error(e);
		await publishToPubSub('download-from-url-to-api-failed', {error: 'Download from URL failed'}, req.user.id.toString(), requestId);
	}
});

const defaultMaxWordsPerSegment = 5;
workerRouter.post('/transcribe-media-v2', protectAndValidate(), async (req, res) => {
	const ipAddress = req.ip;
	const {
		requestId,
		fileDuration,
		language
	} = req.body as TranscribeRequest;

	const frontendUser = req.user;
	if (frontendUser.id !== tryoutUserId) {
		await getUserUploadsByRequestIdOrThrow(requestId);
	}
	const currentUsage = frontendUser.usages.find(usage => usage.month === getCurrentMonthNumber() && usage.year === getCurrentYear());
	if (currentUsage && currentUsage.transcribed_seconds + fileDuration > frontendUser.current_plan.transcribed_seconds_monthly_limit) {
		throw new BadRequestError('User has reached monthly transcription limit');
	}

	const localFilePath = path.join(process.cwd(), incomingFilesPath, `${requestId}.mp4`);
	const mp3FilePath = path.join(process.cwd(), incomingFilesPath, `${requestId}.mp3`);

	res.status(202).send({ message: 'Request accepted, processing started.' });

	exec(`ffmpeg -i "${localFilePath}" -vn -ar 44100 -ac 2 -b:a 192k "${mp3FilePath}"`, async (error, stdout, stderr) => {
		if (error) {
			log.error(`Transcribing failed: ${error}`);
			await publishToPubSub('transcribe-failed', {error: 'Transcribing failed'}, req.user.id.toString(), requestId);
		}
		await uploadAudioToS3(mp3FilePath, `${requestId}.mp3`);
		const audioUrl = getS3AudioFileUrl(requestId);
		createDiarization(audioUrl, requestId);

		try {
			const lemonFoxResp = await transcribeMedia(mp3FilePath, language);
			const {segments: originalSegments, longestSegmentLength} = initialSegmentToSegmentV2(lemonFoxResp);
			// const resp = await generateImage(originalSegments[0]);
			// console.log(resp);
			// const withEmojis = await assignEmojisV2(originalSegments);
			const converted = convertToSegmentedArrayWithMaxWords(originalSegments, originalSegments, defaultMaxWordsPerSegment);
			const transcribeReadyMessage: TranscribeReadyMessage = {
				longestSegmentLength: longestSegmentLength,
				originalSegments: originalSegments,
				modifiedSegments: converted,
				language: lemonFoxResp.language
			};
			await publishToPubSub('transcribe-ready', transcribeReadyMessage, frontendUser.id.toString(), requestId);
			await knex.transaction(async (trx) => {
				await insertTranscription({request_id: requestId, user_id: frontendUser.id, browser: req.browser, device: req.device}, trx);
				const asInteger = Math.round(fileDuration);
				await upsertUsage(frontendUser.id, asInteger, trx);
				if (frontendUser.id === tryoutUserId && ipAddress) {
					await updateNotSignedUpUser(ipAddress, {hasTranscribed: true}, trx);
					await addIPAddress(ipAddress, trx);
				}
			});
		} catch (error) {
			log.error(`Transcribing failed: ${error}`);
			await publishToPubSub('transcribe-failed', {error: 'Transcribing failed'}, req.user.id.toString(), requestId);
		}
		await Promise.all([
			fs.promises.unlink(localFilePath),
			fs.promises.unlink(mp3FilePath)
		]);
	});
});

workerRouter.post('/generate-description', protectAndValidate(), async (req, res) => {
	const transcriptText = req.body.transcriptText;
	const descriptionLength = req.body.descriptionLength;
	const msg = await generateDescription(transcriptText, descriptionLength);
	return res.status(200).json({message: msg});
});