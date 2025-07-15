import nodeFetch from 'node-fetch';
import {BadRequestError} from '../../error';
import {Platform} from './service';

export const getWorkingSocialMediaURL = async (url: string, platform: Platform, id: string) => {
	const response = await nodeFetch('https://fastdl.app/api/convert', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			'url': url,
			'ts': 1715941855512,
			'_ts': 1715876181234,
			'_tsc': 0,
			'_s': '5c12770ec99b77aad943681d93f6b8e191402350f8973c205d0e1e9182e1c786'
		}),
	});
	if (response.status !== 200) {
		const headers = {
			'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
		};

		const raw = `platform=${platform}&url=${url}&title=video&id=${id}&ext=mp4&note=1080p`;

		const requestOptions: RequestInit = {
			method: 'POST',
			headers: headers,
			body: raw,
			redirect: 'follow'
		};

		const resp = await fetch(`https://yt1ss.pro/mates/en/convert?id=${id}`, requestOptions);
		if (resp.status !== 200) {
			throw new BadRequestError('Could not get URL');
		}
		const data = await resp.json();
		return data.downloadUrlX;
	}
	const data = await response.json();
	const convertedUrl = data.url[0].url;
	return convertedUrl;
};
