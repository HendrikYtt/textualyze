import React, {useEffect, useRef, useState} from 'react';
import {
	Button,
	Divider,
	Grid,
	Link,
	Paper,
	Typography
} from '@mui/material';
import GoogleIcon from '../assets/images/GoogleIcon.png';
import {displayError, displayInfo, displaySuccess, useHandleNavigation} from '../utils/utils';
import EmailIcon from '@mui/icons-material/Email';
import {colors, theme} from '../themes';
import {Field, FieldProps, Form, Formik} from 'formik';
import {object, string} from 'yup';
import {authenticateWithGoogle, sendEmail} from '../api/user';
import {useGoogleLogin} from '@react-oauth/google';
import {useAuth} from '../contexts/UsersContext';
import {useLocation, useNavigate} from 'react-router-dom';
import {UIField} from './ui/UIField';
import {UIButton} from './ui/UIButton';
import {HttpError} from '../api/config';
import {isSmallerThanSm} from '../hooks/is-compact';
import {UIText} from './ui/UIText';
import {FieldError} from './transcription/common/FieldError';

interface Props {
	title: string;
	introText: string;
	action: 'Sign up' | 'Login';
	secondaryText: string;
	secondaryAction: string;
	otherRoute: string;
	actionRoute: string;
}

interface Values {
	email: string;
}

const initialValues = {
	email: '',
};

const validationSchema = object({
	email: string().email('Please enter a valid email').required('Email is required'),
});

type GoogleUser = {
	access_token: string;
}

const yellow = '#FEF9C3';
const brown = '#703E11';

export const RegistrationForm: React.FC<Props> = ({
	title,
	introText,
	action,
	secondaryText,
	secondaryAction,
	otherRoute,
	actionRoute
}) => {
	const location = useLocation();
	const navigate = useNavigate();

	const smallerThanSm = isSmallerThanSm();

	const handleNavigation = useHandleNavigation();
	const {
		setEmailToLocalStorage,
		login
	} = useAuth();

	const [isLoading, setIsLoading] = useState(false);
	const [googleUser, setGoogleUser] = useState<GoogleUser | null>(null);
	const [showInAppBrowserBanner, setShowInAppBrowserBanner] = useState(false);

	const planId = useRef<number | null>(null);

	const googleLogin = useGoogleLogin({
		onSuccess: (codeResponse) => {
			setGoogleUser(codeResponse);
		},
		onError: (error) => {
			displayError(error);
			setIsLoading(false);
		},
		onNonOAuthError: () => {
			displayError(new Error('Unknown error occurred'));
			setIsLoading(false);
		}
	});

	useEffect(() => {
		const queryParams = new URLSearchParams(location.search);
		const selectedPlanId = queryParams.get('selectedPlanId');
		if (selectedPlanId) {
			planId.current = parseInt(selectedPlanId);
		}
	}, []);

	useEffect(() => {
		const loginWithGoogle = async () => {
			if (googleUser) {
				try {
					const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleUser.access_token}`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${googleUser.access_token}`,
							Accept: 'application/json'
						},
					});
					const res = await response.json();
					const email = res.email;
					if (!email) {
						displayError(new Error('could not get email'));
						setIsLoading(false);
						return;
					}
					const profilePictureUrl = res.picture;
					const data = await authenticateWithGoogle(email, actionRoute, profilePictureUrl);
					login(data.access_token);
					if (planId.current) {
						handleNavigation(`/pricing?selectedPlanId=${planId.current}`, false);
					} else {
						navigate('/transcribe', {replace: true});
					}
					displaySuccess('Authenticated successfully!');
					setIsLoading(false);
				} catch (e) {
					setIsLoading(false);
					const err = e as HttpError;
					if (err.status === 404) {
						displayInfo('You need to sign up first');
						handleNavigation('/signup', false);
					} else {
						displayError(e);
					}
				}
			}
		};
		loginWithGoogle();
	}, [googleUser]);

	useEffect(() => {
		const inAppBrowser = detectInAppBrowser();
		if (inAppBrowser) {
			setShowInAppBrowserBanner(true);
		}
	}, []);

	const loginWithEmail = async (values: Values) => {
		setIsLoading(true);
		try {
			if (planId.current) {
				await sendEmail(values.email, actionRoute, planId.current);
			} else {
				await sendEmail(values.email, actionRoute, null);
			}
			setEmailToLocalStorage(values.email);
			handleNavigation(`/email-sent?action=${actionRoute}`, false);
		} catch (e) {
			const err = e as HttpError;
			if (err.status === 404) {
				displayInfo('You need to sign up first');
				handleNavigation('/signup', false);
			} else {
				displayError(e);
			}
		}
		setIsLoading(false);
	};

	const detectInAppBrowser = () => {
		const ua = navigator.userAgent || navigator.vendor || window.opera;

		if (ua.indexOf('FBAN') > -1 || ua.indexOf('FBAV') > -1) {
			return 'Facebook';
		}

		if (ua.indexOf('Instagram') > -1) {
			return 'Instagram';
		}

		if (ua.indexOf('LinkedIn') > -1) {
			return 'LinkedIn';
		}

		if (ua.indexOf('WhatsApp') > -1) {
			return 'WhatsApp';
		}

		if (/MicroMessenger/i.test(ua)) {
			return 'WeChat';
		}

		return null;
	};

	return (
		<>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<UIText variant="h1" sx={{color: 'white', textAlign: 'center', lineHeight: '1.2'}}>
						{title}
					</UIText>
				</Grid>
				<Grid item xs={12}>
					<Typography component="h2" variant="body1" textAlign="center">
						{introText}
					</Typography>
				</Grid>
			</Grid>
			<Grid container justifyContent="center" mt={smallerThanSm ? 4 : 6}>
				<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={loginWithEmail}>
					{(formik) => {
						return (
							<Form>
								<Paper
									sx={{
										pb: 4,
										pt: 5,
										paddingX: {xs: 3, sm: 4, md: 6, lg: 8 },
										width: {xs: '350px', sm: '450px', md: '500px', lg: '525px', xl: '550px'},
										mx: 'auto',
										borderRadius: '8px',
										boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
									}}>
									<Grid container justifyContent="center" direction="column">
										<Grid item mb={action === 'Login' ? 2 : 1}>
											<Typography textAlign="center" fontWeight="700" component="h3" variant="h4" color="text.secondary">
												{action}
											</Typography>
										</Grid>
										{showInAppBrowserBanner && (
											<Grid
												item
												xs={12}
												mb={2}
												sx={{
													backgroundColor: yellow,
													color: brown,
													padding: 2.5,
													fontWeight: 500
												}}
											>
												Please Note that Google {action} will not work in social media web browsers. To {action} using Google, please visit <br/>
												<a href="https://textualyze.com" target="_blank" rel="noreferrer" style={{color: brown, textDecoration: 'underline'}}>https://textualyze.com </a>
												on your regular browser.
											</Grid>
										)}
										<Grid item my={1}>
											<Button
												variant="outlined"
												fullWidth
												startIcon={
													<img
														src={GoogleIcon}
														height={30}
														width={30}
														loading="lazy"
														title="Google logo"
														alt="Google logo"
													/>}
												onClick={() => {
													setIsLoading(true);
													googleLogin();
												}}
												sx={{
													height: '48px',
													backgroundColor: '#F8F8FC',
													borderColor: '#ACA8C9'
												}}
											>
												<Typography color={colors.grey} fontWeight="bold" fontSize="18px">
													{action}{' '}with Google
												</Typography>
											</Button>
										</Grid>
										<Grid item my={1}>
											<Divider
												sx={{
													'&:before': {
														borderTop: '1px solid #ACA8C9'
													},
													'&:after': {
														borderTop: '1px solid #ACA8C9'
													},
												}}
											>
												<Typography component="p" variant="subtitle2" fontSize="12px" textAlign="center" color="#ACA8C9">
													OR
												</Typography>
											</Divider>
										</Grid>
										<Grid item xs={12} mt={0} mb="4px">
											<UIText
												variant="tiny"
												sx={{color: colors.grey}}
											>
												Email
											</UIText>
										</Grid>
										<Grid item>
											<UIField
												title="email"
												placeHolder="Enter your email address"
												startIcon={<EmailIcon sx={{color: colors.grey, mr: '5px', mt: '3px'}} />}
											/>
										</Grid>
										<Grid item xs={12}>
											<Field name="email">
												{({ meta }: FieldProps) => (
													meta.touched && meta.error && (
														<FieldError
															errorMessage={meta.error}
															marginTop="4px"
															marginBottom="0px"
														/>
													)
												)}
											</Field>
										</Grid>
										<Grid item my={2}>
											<UIButton
												title={`${action} with email`}
												fullWidth
												disabled={isLoading || (!formik.isValid && formik.touched.email)}
												isLoading={isLoading}
												type="submit"
												colorType="primary"
												variant="contained"
												onClick={() => {}}
												height="48px"
											/>
										</Grid>
										<Grid item mt={2} mb={1}>
											<Typography variant="body2" textAlign="center" color={theme.palette.secondary.contrastText}>
												By proceeding, you agree to our{' '}
												<Link
													sx={{color: 'inherit', userSelect: 'none', cursor: 'pointer'}}
													onClick={() => {
														handleNavigation('/terms-and-privacy', false);
													}}
												>
													Terms and Privacy Policy
												</Link>.
											</Typography>
										</Grid>
										<Grid item mt={1} mb={1}>
											<Typography variant="body2" textAlign="center" color={theme.palette.secondary.contrastText}>
												{secondaryText}{' '}
												<Link
													onClick={() => {
														handleNavigation(otherRoute, false);
													}}
													sx={{userSelect: 'none', cursor: 'pointer'}}
												>
													{secondaryAction}
												</Link>
											</Typography>
										</Grid>
									</Grid>
								</Paper>
							</Form>
						);
					}}
				</Formik>
			</Grid>
		</>
	);
};
