import PromiseRouter from 'express-promise-router';
import {protectAndValidate} from '../../lib/auth';
import {generatePreSignedUrlForUserFont, generatePreSignedUrlForUserUpload} from './service';
import {log} from '../../lib/log';

export const s3Router = PromiseRouter();

s3Router.post('/user-upload', protectAndValidate(), async (req, res) => {
	const requestId = req.body.requestId;
	const objectType = req.body.objectType;
	const fileExtension = req.body.fileExtension;
	const contentType = req.body.contentType;
	const useCloudFrontForGet = req.body.useCloudFrontForGet;
	const preSignedUrl = await generatePreSignedUrlForUserUpload(
		requestId,
		objectType,
		fileExtension,
		contentType,
		useCloudFrontForGet,
		24 * 60 * 60
	);
	res.status(200).json({preSignedUrl: preSignedUrl});
});

s3Router.post('/user-font', protectAndValidate(), async (req, res) => {
	const s3FontFileName = req.body.s3FontFileName;
	const objectType = req.body.objectType;
	const fileExtension = req.body.fileExtension;
	const preSignedUrl = await generatePreSignedUrlForUserFont(
		objectType,
		24 * 60 * 60,
		req.user.id,
		s3FontFileName,
		fileExtension,
	);
	res.status(200).json({preSignedUrl: preSignedUrl});
});
