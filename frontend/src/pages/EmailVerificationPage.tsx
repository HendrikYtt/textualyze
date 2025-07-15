import React, {useEffect} from 'react';
import {displayError, displaySuccess, useHandleNavigation} from '../utils/utils';
import {LoadingPage} from './LoadingPage';
import {authenticate} from '../api/user';
import {useLocation, useNavigate} from 'react-router-dom';
import {useAuth} from '../contexts/UsersContext';

export const EmailVerificationPage = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const {login, user} = useAuth();
	const handleNavigation = useHandleNavigation();

	useEffect(() => {
		const queryParams = new URLSearchParams(location.search);
		const oobCode = queryParams.get('oobCode');
		const continueUrl = queryParams.get('continueUrl');
		const email = localStorage.getItem('emailForSignIn');
		const action = queryParams.get('action');
		if (!oobCode || !continueUrl || !email || !action) {
			displayError(new Error('URL is expired or invalid'));
			handleNavigation('/', false);
			return;
		}

		const signIn = async () => {
			try {
				const data = await authenticate(email, oobCode, action);
				login(data.access_token);
				navigate(continueUrl, {replace: true});
				displaySuccess('Authenticated successfully!');
			} catch (e) {
				displayError(e);
				handleNavigation('/transcribe', false);
			}
		};

		signIn();
	}, [user]);

	return (
		<LoadingPage/>
	);
};