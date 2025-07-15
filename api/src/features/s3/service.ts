import {GetObjectCommand, PutObjectCommand, S3Client} from '@aws-sdk/client-s3';
import {getSignedUrl} from '@aws-sdk/s3-request-presigner';
import fs from 'fs';

const region = process.env.AWS_REGION;
const userUploadsBucketName = process.env.AWS_USER_UPLOADS_BUCKET_NAME;
const userFontsBucketName = process.env.AWS_USER_FONTS_BUCKET_NAME;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

export const s3Client = new S3Client({
	region,
	credentials: {
		accessKeyId: accessKeyId!,
		secretAccessKey: secretAccessKey!
	},
});

const userUploadCloudfrontUrl = 'https://d34z9b7y2k2zj7.cloudfront.net';
const userProjectScreenshotCloudfrontUrl = 'https://d10gnh4b5dukc8.cloudfront.net';

export const generatePreSignedUrlForUserUpload = async (
	requestId: string,
	objectType: 'putObject' | 'getObject',
	fileExtension: string,
	contentType: string,
	useCloudFrontForGet: boolean,
	expiresInSeconds = 60
) => {
	let command;
	if (objectType === 'getObject') {
		if (useCloudFrontForGet) {
			return `${userUploadCloudfrontUrl}/${requestId}.${fileExtension}`;
		} else {
			command = new GetObjectCommand(
				{
					Bucket: userUploadsBucketName,
					Key: `${requestId}.${fileExtension}`
				}
			);
		}

	} else if (objectType === 'putObject') {
		command = new PutObjectCommand(
			{
				Bucket: userUploadsBucketName,
				Key: `${requestId}.${fileExtension}`,
				ContentType: contentType
			}
		);
	} else {
		throw new Error(`Unsupported operation: ${objectType}`);
	}

	return getSignedUrl(s3Client, command, { expiresIn: expiresInSeconds });
};

export const generatePreSignedUrlForUserFont = async (
	objectType: 'putObject' | 'getObject',
	expiresInSeconds = 60,
	userId: number,
	s3FontFileName: string,
	fileExtension: string,
) => {
	let command;
	if (objectType === 'getObject') {
		command = new GetObjectCommand(
			{
				Bucket: userFontsBucketName,
				Key: `userId-${userId}/${s3FontFileName}.${fileExtension}`,
			}
		);
	} else if (objectType === 'putObject') {
		command = new PutObjectCommand(
			{
				Bucket: userFontsBucketName,
				Key: `userId-${userId}/${s3FontFileName}.${fileExtension}`,
				ContentType: 'application/octet-stream'
			}
		);
	} else {
		throw new Error(`Unsupported operation: ${objectType}`);
	}

	return getSignedUrl(s3Client, command, { expiresIn: expiresInSeconds });
};

export const uploadFileToS3 = async (filePath: string, fileName: string) => {
	const fileStream = fs.createReadStream(filePath);
	const command = new PutObjectCommand({
		Bucket: userUploadsBucketName,
		Key: fileName,
		Body: fileStream,
	});

	return await s3Client.send(command);
};

export const uploadAudioToS3 = async (filePath: string, fileName: string) => {
	const fileStream = fs.createReadStream(filePath);
	const command = new PutObjectCommand({
		Bucket: 'textualyze-audio-files',
		Key: fileName,
		Body: fileStream,
	});

	return await s3Client.send(command);
};

export const uploadScreenshotToS3 = async (filePath: string, fileName: string) => {
	const fileStream = fs.createReadStream(filePath);
	const command = new PutObjectCommand({
		Bucket: 'textualyze-user-projects-screenshots',
		Key: fileName,
		Body: fileStream,
	});

	return await s3Client.send(command);
};

export const getS3AudioFileUrl = (requestId: string) => {
	return `https://textualyze-audio-files.s3.eu-north-1.amazonaws.com/${requestId}.mp3`;
};

export const getS3ScreenshotUrl = (requestId: string) => {
	return `${userProjectScreenshotCloudfrontUrl}/${requestId}.png`;
};