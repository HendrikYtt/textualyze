import {NotSignedUpUser} from '@hendrikytt/api-contracts';
import {http} from './config';

const basePath = '/not-signed-up-users';

export const getNotSignedUpUser = async () => {
	return http.get<NotSignedUpUser | null>(`${basePath}/`);
};
