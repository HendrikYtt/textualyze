import {http} from './config';
import {UserFont} from '@hendrikytt/api-contracts';

const basePath = '/user-fonts';

export type UserFontWithS3Link = UserFont & {s3_font_link: string};
export const getUserFonts = async () => {
	return http.get<UserFontWithS3Link[]>(`${basePath}/`);
};

export type AddUserFontBody = Omit<UserFont, 'id' | 'user_id' | 'created_at' | 'updated_at'>;
export const addUserFonts = async (userFonts: AddUserFontBody[]) => {
	return http.post<UserFont>(`${basePath}/`, {userFonts});
};

export const deleteUserFont = async (id: number) => {
	return http.delete<UserFont>(`${basePath}/${id}`, {});
};