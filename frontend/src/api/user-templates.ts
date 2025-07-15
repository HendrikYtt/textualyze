import {http} from './config';
import {Styling, UserTemplate} from '@hendrikytt/api-contracts';

const basePath = '/user-templates';

export const getUserTemplates = async () => {
	return http.get<UserTemplate[]>(`${basePath}/`);
};

export const addUserTemplate = async (name: string, styling: Omit<Styling, 'id'>) => {
	return http.post<UserTemplate>(`${basePath}/`, {...styling, name});
};

export const deleteUserTemplate = async (id: number) => {
	return http.delete<UserTemplate>(`${basePath}/${id}`, {});
};