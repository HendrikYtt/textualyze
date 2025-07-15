import {getUserProjectByUserIdAndRequestId} from './database';
import {NotFoundError} from '../../error';
import {generatePreSignedUrlForUserUpload} from '../s3/service';
import {DateTime} from 'luxon';

export const getUserProjectByUserIdAndRequestIdOrThrow = async (userId: number, requestId: string) => {
	const project = await getUserProjectByUserIdAndRequestId(userId, requestId);
	if (!project) {
		throw new NotFoundError('Project not found');
	}
	project.request_payload.s3VideoLink = await generatePreSignedUrlForUserUpload(`${requestId}_compressed`, 'getObject', 'mp4', 'video/mp4', true, 24 * 60 * 60);
	if (project.request_payload.logo && project.request_payload.logo.imageUrl) {
		project.request_payload.logo.imageUrl = await generatePreSignedUrlForUserUpload(`${requestId}_watermark_image`, 'getObject', 'jpg', 'image/jpeg', false, 24 * 60 * 60);
	}
	return project;
};

export const getExpirationDate = () => {
	const currentDate = DateTime.now();
	return currentDate.plus({days: 8}).toJSDate();
};