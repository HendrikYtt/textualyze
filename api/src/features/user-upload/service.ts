import {getUserUploadsByRequestId} from './database';
import {NotFoundError} from '../../error';

export const getUserUploadsByRequestIdOrThrow = async (requestId: string) => {
	const entry = await getUserUploadsByRequestId(requestId);
	if (!entry) {
		throw new NotFoundError(`User upload not found, ${requestId}`);
	}
	return entry;
};