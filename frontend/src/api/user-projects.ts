import {http} from './config';
import {UserProject} from '@hendrikytt/api-contracts';

const basePath = '/user-projects';

export const getUserProjects = async () => {
	return http.get<UserProject[]>(`${basePath}/`);
};

export const getUserProjectByRequestId = async (requestId: string) => {
	return http.get<UserProject>(`${basePath}/${requestId}`);
};

export type AddUserProjectBody = Omit<UserProject, 'user_id' | 'expiration_date' | 'created_at' | 'updated_at'>;
export const addUserProject = async (userTemplate: AddUserProjectBody) => {
	return http.post<UserProject>(`${basePath}/`, {...userTemplate});
};

export type UpdateUserProjectBody = Omit<UserProject, 'request_id' | 'user_id' | 'untouched_transcription' | 'longest_segment_length' | 'screenshot_url' | 'expiration_date' | 'created_at' | 'updated_at'>;
export const updateUserProject = async (requestId: string, userProjectBody: UpdateUserProjectBody) => {
	return http.put<UserProject>(`${basePath}/${requestId}`, {...userProjectBody});
};

export const updateUserProjectName = async (requestId: string, name: string) => {
	return http.put<UserProject>(`${basePath}/name/${requestId}`, {name});
};

export const deleteUserProject = async (requestId: string) => {
	return http.delete<UserProject>(`${basePath}/${requestId}`, {});
};