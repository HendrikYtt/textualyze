import {apiSocket, SocketCallback} from './config';
import {SocketEvent} from '@hendrikytt/api-contracts/dist/sockets';

type ListenerConfig = {
	eventName: SocketEvent;
	callback: SocketCallback;
	targetRoom: string | null;
};
//keep track of rooms that span from initial page load until page refresh
export const subscribedJoinedRooms = new Map<string, ListenerConfig>();
//keep track of rooms that span from initial page load until api pod changes
export const currentlyJoinedRooms: Set<string> = new Set();

export const listenToSocketEvent = (
	eventName: SocketEvent,
	callback: SocketCallback,
	roomId: string | null,
	requestId: string | null
) => {
	const targetRoom = requestId
		? `${eventName}:${roomId}:${requestId}`
		: roomId ? `${eventName}:${roomId}` : eventName;

	//this triggers on the initial load, also when starting to listen new socket events
	if (!subscribedJoinedRooms.has(targetRoom)) {
		const config = { eventName, callback, targetRoom };
		if (roomId && !currentlyJoinedRooms.has(targetRoom)) {
			joinRoom(targetRoom);
		}
		apiSocket.on(eventName, callback);
		subscribedJoinedRooms.set(targetRoom, config);
	}

	return () => {
		if (subscribedJoinedRooms.has(targetRoom)) {
			leaveRoom(targetRoom);
			apiSocket.off(eventName, callback);
			subscribedJoinedRooms.delete(targetRoom);
		}
	};
};

export const emitSocketEvent = (
	eventName: SocketEvent,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data: any,
	roomId: string | null
): void => {
	if (roomId) {
		apiSocket.emit(eventName, { room: roomId, data });
	} else {
		apiSocket.emit(eventName, data);
	}
};

export const deleteSocketListener = (eventName: SocketEvent, roomId: string, requestId: string | null) => {
	const targetRoom = requestId
		? `${eventName}:${roomId}:${requestId}`
		: `${eventName}:${roomId}`;
	apiSocket.off(eventName);
	leaveRoom(targetRoom);
	subscribedJoinedRooms.delete(targetRoom);
};

export const joinRoom = (room: string): void => {
	currentlyJoinedRooms.add(room);
	apiSocket.emit('joinRoom', room);
};

export const leaveRoom = (room: string): void => {
	currentlyJoinedRooms.delete(room);
	apiSocket.emit('leaveRoom', room);
};