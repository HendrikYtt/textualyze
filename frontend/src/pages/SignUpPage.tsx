import React from 'react';
import {RegistrationForm} from '../components/RegistrationForm';
import {SEO} from '../components/SEO/SEO';

export const SignUpPage = () => {
	return (
		<>
			<SEO path="/signup" />
			<RegistrationForm
				title="Create a free account"
				introText="The ultimate video captions service that offers unparalleled speed and simplicity"
				action="Sign up"
				secondaryText="Already have an account?"
				secondaryAction="Login"
				otherRoute="/login"
				actionRoute="signup"
			></RegistrationForm>
		</>
	);
};
