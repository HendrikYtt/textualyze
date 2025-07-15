import path from 'path';
import fs from 'fs';
import {log} from '../../lib/log';
import {deploySite, getRenderProgress} from '@remotion/lambda';
import {presignUrl, renderMediaOnLambda} from '@remotion/lambda/client';
import {getExportedFileName, RequestPayload} from '@hendrikytt/api-contracts';
import {publishToPubSub} from '../../lib/redis';
import {incomingRequestPayloadsPath} from '../../config';
import {generatePreSignedUrlForUserFont, generatePreSignedUrlForUserUpload} from '../s3/service';
import {ErrorMessage, RenderMessage} from '@hendrikytt/api-contracts/dist/sockets';
import {bucketName, functionName} from '../../services/api';

// max time to download video from S3 link while rendering
const timeoutInMs = 5 * 60 * 1000;

const localFilesPath = '/src/features/remotion/source/src';
export const render = async (requestId: string, userId: number, fileName: string) => {
	try {
		const requestPayloadPath = path.join(process.cwd(), incomingRequestPayloadsPath, `${requestId}.json`);
		const copiedRequestPayloadPath = path.join(process.cwd(), localFilesPath, 'requestPayload.json');

		const data = await fs.promises.readFile(requestPayloadPath, 'utf8');
		const requestPayload: RequestPayload = JSON.parse(data);

		await fs.promises.copyFile(requestPayloadPath, copiedRequestPayloadPath);
		log.info('Request payload copied successfully!');

		const { serveUrl } = await deploySite({
			bucketName,
			entryPoint: path.join(process.cwd(), `${localFilesPath}/index.ts`),
			region: 'us-east-1',
			siteName: requestId,
		});

		const framesPerLambda = Math.ceil((requestPayload.duration * 30) / 200);
		const exportedFileName = getExportedFileName(fileName, 'mp4');
		requestPayload.s3VideoLink = await generatePreSignedUrlForUserUpload(requestId, 'getObject', 'mp4', 'video/mp4', true, 5 * 60);
		if (requestPayload.logo && requestPayload.logo.imageUrl) {
			requestPayload.logo.imageUrl = await generatePreSignedUrlForUserUpload(`${requestId}_watermark_image`, 'getObject', 'jpg', 'image/jpeg', false, 5 * 60);
		}

		if (requestPayload.fontType === 'Your fonts') {
			requestPayload.s3FontLink = await generatePreSignedUrlForUserFont('getObject', 5 * 60, userId, requestPayload.styling.s3_font_name, requestPayload.fontFileExtension);
		}
		const { renderId } = await renderMediaOnLambda({
			region: 'us-east-1',
			functionName,
			serveUrl: serveUrl,
			composition: 'VideoWrapper',
			inputProps: {
				requestPayload: JSON.stringify(requestPayload)
			},
			codec: 'h264',
			imageFormat: 'jpeg',
			maxRetries: 1,
			framesPerLambda: (framesPerLambda > 5) ? framesPerLambda : 5,
			privacy: 'private',
			outName: exportedFileName,
			timeoutInMilliseconds: timeoutInMs,
			downloadBehavior: {type: 'download', fileName: null}
		});

		// eslint-disable-next-line no-constant-condition
		while (true) {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			const progress = await getRenderProgress({
				renderId,
				bucketName,
				functionName,
				region: 'us-east-1',
			});
			// log.info(progress.overallProgress);
			const renderPercentage = parseFloat((progress.overallProgress * 100).toFixed(2));
			await publishToPubSub('render-progress', {percentage: renderPercentage}, userId.toString(), requestId);
			if (progress.done) {
				log.info(`Render finished! ${progress.outputFile}`);
				break;
			}
			if (progress.fatalErrorEncountered) {
				const err = `Error encountered: ${JSON.stringify(progress.errors)}`;
				log.error(err);
				const error: ErrorMessage = {
					error: err
				};
				await publishToPubSub('render-failed', error, userId.toString(), requestId);
				return;
			}
		}

		const safeUrl = await presignUrl({
			region: 'us-east-1',
			bucketName: bucketName,
			objectKey: `renders/${renderId}/${exportedFileName}`,
			expiresInSeconds: 3600,
			checkIfObjectExists: false,
		});

		log.info(safeUrl);
		const messageToPublish: RenderMessage = {
			renderUrl: safeUrl
		};
		await publishToPubSub('render-ready', messageToPublish, userId.toString(), requestId);
	} catch (e) {
		const err = `Error encountered: ${JSON.stringify(e)}`;
		log.error(err);
		const error: ErrorMessage = {
			error: err
		};
		await publishToPubSub('render-failed', error, userId.toString(), requestId);
	}
};