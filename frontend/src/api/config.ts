import {io, Socket} from 'socket.io-client';
import {getToken} from '../utils/utils';
import {SocketEvent} from '@hendrikytt/api-contracts/dist/sockets';
import {currentlyJoinedRooms, joinRoom, leaveRoom, subscribedJoinedRooms} from './sockets';
import {browserName, deviceType, getUA, mobileVendor} from 'react-device-detect';

export let baseApiUrl: string;
export let baseFrontendUrl: string;
export let apiSocket: Socket;

export type SocketCallback = (data: SocketEvent) => void;

export const initializeConfig = () => {
	baseApiUrl = window.REACT_APP_API_URL || process.env.REACT_APP_API_URL || '';
	baseFrontendUrl = window.REACT_APP_FRONTEND_URL || process.env.REACT_APP_FRONTEND_URL || '';
	const apiWebsocketPath = window.REACT_APP_API_WS_PATH || process.env.REACT_APP_API_WS_PATH || '';
	const transports = window.REACT_APP_WS_TRANSPORTS || process.env.REACT_APP_WS_TRANSPORTS || '';
	const env = process.env.REACT_APP_ENV || '';

	if (env === 'dev') {
		apiSocket = io(baseApiUrl);
	} else {
		apiSocket = io(`${baseApiUrl}`, {
			path: apiWebsocketPath,
			transports: [transports],
		});
	}
	// this triggers when api shuts down (for example old api pod during update)
	apiSocket.on('disconnect', (reason) => {
		console.log(`api disconnected: ${reason}`);
		currentlyJoinedRooms.forEach((room) => {
			leaveRoom(room);
		});
		currentlyJoinedRooms.clear();
	});

	// this triggers on api re-connection (for example new api pod starts)
	apiSocket.on('connect', () => {
		subscribedJoinedRooms.forEach(({ eventName, callback, targetRoom }) => {
			if (targetRoom && targetRoom?.split(':').length > 1 && !currentlyJoinedRooms.has(targetRoom)) {
				joinRoom(targetRoom);
			}
			apiSocket.on(eventName, callback);
		});
	});

};

export const browserAndDeviceHeaders = () => {
	return {
		'Browser': browserName,
		'Device': deviceType
	};
};

export const createHttp = () => {
	const baseUrl = window.REACT_APP_API_URL || process.env.REACT_APP_API_URL || '';

	const makeRequest = async <T>(path: string, method: string, body?: unknown) => {
		const token = getToken();
		const response = await fetch(`${baseUrl}${path}`, {
			method,
			headers: {
				'Content-Type': 'application/json',
				...(token && { Authorization: `Bearer ${token}` }),
				...(!token && { userid: '999999' }),
				...browserAndDeviceHeaders()
			},
			...(!!body && { body: JSON.stringify(body) }),
		});

		let responseBody: unknown;
		try {
			responseBody = await response.json();
			// eslint-disable-next-line no-empty
		} catch {}

		if (!response.ok) {
			throw new HttpError(response.status, responseBody as HttpError['body']);
		}
		return responseBody as Promise<T>;
	};

	return {
		get: <T>(path: string) => makeRequest<T>(path, 'GET'),
		post: <T>(path: string, body: unknown) => makeRequest<T>(path, 'POST', body),
		delete: <T>(path: string, body: unknown) => makeRequest<T>(path, 'DELETE', body),
		put: <T>(path: string, body: unknown) => makeRequest<T>(path, 'PUT', body),
	};
};

export class HttpError<T = unknown> {
	constructor(public status: number, public body: { message: string; details: T }) {}
}

export const http = createHttp();

