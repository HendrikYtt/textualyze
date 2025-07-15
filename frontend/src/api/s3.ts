import {browserAndDeviceHeaders, http} from './config';

const basePath = '/s3';

export const getPreSigneUserUploadUrl = async (requestId: string, objectType: 'putObject' | 'getObject', fileExtension: string, contentType: string, useCloudFrontForGet: boolean) => {
	return http.post<{ preSignedUrl: string }>(`${basePath}/user-upload`, {requestId, objectType, fileExtension, contentType, useCloudFrontForGet});
};

export const getPreSigneUserFontUrl = async (s3FontFileName: string, objectType: 'putObject' | 'getObject', fileExtension: string) => {
	return http.post<{ preSignedUrl: string }>(`${basePath}/user-font`, {s3FontFileName, objectType, fileExtension});
};

export const uploadFileToS3 = async (
	preSignedUrl: string,
	file: File
) => {
	const contentType = file.type || 'application/octet-stream';

	const response = await fetch(preSignedUrl, {
		method: 'PUT',
		headers: {
			'Content-Type': contentType,
			...browserAndDeviceHeaders()
		},
		body: file,
	});

	if (!response.ok) {
		throw new Error(`Failed to upload font file: ${response.statusText}`);
	}

	return response;
};