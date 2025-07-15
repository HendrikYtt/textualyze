import {baseApiUrl, browserAndDeviceHeaders, http} from './config';
import {
	MessageResponse,
	TranscribeRequest
} from '@hendrikytt/api-contracts';
import {getToken} from '../utils/utils';
import {AdjustedFileData} from '../types';
import React from 'react';
import {listenToSocketEvent} from './sockets';
import {throttle} from 'lodash';
import {SocketEvent, UploadCancelMessage } from '@hendrikytt/api-contracts/dist/sockets';

export const uploadCanceledError = 'Upload canceled by the user for some reason';

const basePath = '/worker';

type GlobalUrlResponse = {
	audioUrl: string | null,
	originalWidth: number,
	previewWidth: number | null,
	originalHeight: number
	previewHeight: number | null,
	duration: number,
	previewUrl: string,
	title: string,
	globalLinkUrl: string | null
};

export const getGlobalUrl = async (url: string) => {
	return http.post<GlobalUrlResponse>(`${basePath}/get-global-url`, {url});
};

export const downloadFromUrlToApi = async (requestId: string, videoUrl: string, videoTitle: string, uploadFileToApiBody: UploadFileToApiBody) => {
	return http.post<MessageResponse>(`${basePath}/download-from-url-to-api/${requestId}`, {videoUrl, videoTitle, ...uploadFileToApiBody});
};

export const transcribeMedia = async (transcribeRequest: TranscribeRequest) => {
	return http.post<MessageResponse>(`${basePath}/transcribe-media-v2`, transcribeRequest);
};

export type DescriptionLength = 'regular' | 'short' | 'long'
export const generateDescription = async (transcriptText: string, descriptionLength: DescriptionLength) => {
	return http.post<MessageResponse>(`${basePath}/generate-description`, {transcriptText, descriptionLength});
};

export type UploadFileToApiBody = Omit<AdjustedFileData, 'name'> & { isAudioFile: boolean };
export const uploadFileToApi = async (
	file: File | null,
	uploadFileToApiBody: UploadFileToApiBody,
	requestId: string,
	setUploadingPercentage: React.Dispatch<React.SetStateAction<number>>,
	userId: string,
	setWillProgressBeLost: React.Dispatch<React.SetStateAction<boolean>>
) => {
	return new Promise((resolve, reject) => {
		const formData = new FormData();
		formData.append('file', file!);
		formData.append('uploadFileToApiBody', JSON.stringify(uploadFileToApiBody));

		const xhr = new XMLHttpRequest();
		xhr.open('POST', `${baseApiUrl}${basePath}/upload-file/${requestId}`, true);
		xhr.setRequestHeader('Authorization', `Bearer ${getToken()}`);
		if (userId === '999999') {
			xhr.setRequestHeader('userid', userId);
		}
		const {Browser, Device} = browserAndDeviceHeaders();
		xhr.setRequestHeader('Browser', Browser);
		xhr.setRequestHeader('Device', Device);

		xhr.upload.onprogress = throttle((event: ProgressEvent) => {
			if (event.lengthComputable) {
				const percentComplete = (event.loaded / event.total) * 100;
				setUploadingPercentage(parseFloat(percentComplete.toFixed(2)));
			}
		}, 500);

		xhr.onload = () => {
			if (xhr.status >= 200 && xhr.status < 300) {
				resolve(xhr.response);
			} else {
				const err = JSON.parse(xhr.responseText);
				setWillProgressBeLost(false);
				reject(new Error(err.message));
			}
		};

		const cleanUp = async () => {
			xhr.upload.onprogress = null;
			xhr.onload = null;
			xhr.onerror = null;
			xhr.abort();
		};

		const handleCancel = async (data: SocketEvent) => {
			if (requestId === (data as unknown as UploadCancelMessage).data) {
				await cleanUp();
				setWillProgressBeLost(false);
			}
		};

		listenToSocketEvent('upload-cancel', handleCancel, userId, requestId);

		xhr.onerror = () => {
			setWillProgressBeLost(false);
			reject(new Error('Network error'));
		};

		xhr.send(formData); // send FormData instead of just the file
	});
};
