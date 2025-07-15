import {FrontendUser} from '@hendrikytt/api-contracts/src';
import {AuthenticateResponse, MessageResponse, User} from '@hendrikytt/api-contracts';
import {http} from './config';

const basePath = '/user';

export const getUser = async () => {
	return http.get<FrontendUser>(`${basePath}/me`);
};

export const getTryoutUser = async () => {
	return http.get<FrontendUser>(`${basePath}/tryout-user`);
};

export const authenticate = async (email: string, oobCode: string, action: string) => {
	return http.post<AuthenticateResponse>(`${basePath}/authenticate`, {email, oobCode, action});
};

export const authenticateWithGoogle = async (email: string, action: string, profilePictureUrl: string) => {
	return http.post<AuthenticateResponse>(`${basePath}/authenticate-with-google`, {email, action, profilePictureUrl});
};

export const sendEmail = async (email: string, action: string, selectedPlanId: number | null) => {
	return http.post<MessageResponse>(`${basePath}/send-email`, {email, action, selectedPlanId});
};

export const updateHearFromUs = async (hearFromUs: string, forNotSignedUpUser: boolean) => {
	return http.post<MessageResponse>(`${basePath}/hear-from-us`, {hearFromUs, forNotSignedUpUser});
};

export const createWithEmail = async (email: string, requestId: string | undefined, selectedPlanId: number, paymentIntent: string, isSignedUpUser: boolean) => {
	return http.post<AuthenticateResponse>(`${basePath}/create-with-email`, {email, requestId, selectedPlanId, paymentIntent, isSignedUpUser});
};

export const getUsersCount = () => {
	return http.get<{ count: number }>(`${basePath}/get-count`);
};