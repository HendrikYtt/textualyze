import React from 'react';
import {RegistrationForm} from '../components/RegistrationForm';
import {SEO} from '../components/SEO/SEO';

export const LoginPage = () => {
	return (
		<>
			<SEO path="/login" />
			<RegistrationForm
				title="Welcome back to Textualyze"
				introText="Login to your account to start adding captions to your videos"
				action="Login"
				secondaryText="Don't have an account?"
				secondaryAction="Sign up"
				otherRoute="/signup"
				actionRoute="login"
			></RegistrationForm>
		</>
	);
};
