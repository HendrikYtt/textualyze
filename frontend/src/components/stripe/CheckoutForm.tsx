import React, {useState} from 'react';
import {
	PaymentElement,
	useStripe,
	useElements
} from '@stripe/react-stripe-js';
import * as stripeJs from '@stripe/stripe-js';
import './styles.css';
import {isSmallerThanMd} from '../../hooks/is-compact';
import {object, string} from 'yup';
import {Field, FieldProps, Form, Formik} from 'formik';
import {FieldError} from '../transcription/common/FieldError';
import {createWithEmail} from '../../api/user';
import {displayError} from '../../utils/utils';
import {useUserProjects} from '../../contexts/UserProjectsContext';
import {useTranscriptionContext} from '../../contexts/TranscriptionContext';
import {accessTokenKey, emailKey} from '../../const/auth';
import {tryoutUserId, useAuth} from '../../contexts/UsersContext';

interface Props {
	amountToPay: number;
	selectedPlanId: number | undefined;
	paymentIntent: string | null;
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

export const CheckoutForm: React.FC<Props> = ({
	amountToPay,
	selectedPlanId,
	paymentIntent
}: Props) => {
	const smallerThanMd = isSmallerThanMd();

	const {user} = useAuth();

	const stripe = useStripe();
	const elements = useElements();
	const {addNewUserProject} = useUserProjects();
	const {
		adjustedFileData,
		unTouchedTranscription,
		requestId
	} = useTranscriptionContext();

	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (values: Values) => {

		if (!stripe || !elements || !selectedPlanId || !paymentIntent) {
			// Stripe.js hasn't yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return;
		}

		setIsLoading(true);

		try {
			const authenticateResponse = await createWithEmail(user?.id !== tryoutUserId ? user!.email : values.email, requestId, selectedPlanId, paymentIntent, user?.id !== tryoutUserId);
			localStorage.setItem(accessTokenKey, authenticateResponse.access_token);
			localStorage.removeItem(emailKey);
			if (requestId) {
				await addNewUserProject({name: adjustedFileData.name}, unTouchedTranscription);
			}

			const { error } = await stripe.confirmPayment({
				elements,
				confirmParams: {
					return_url: `${process.env.REACT_APP_FRONTEND_URL}/transcribe${requestId ? '/'+requestId : ''}`
				},
			});

			// This point will only be reached if there is an immediate error when
			// confirming the payment. Otherwise, your customer will be redirected to
			// your `return_url`. For some payment methods like iDEAL, your customer will
			// be redirected to an intermediate site first to authorize the payment, then
			// redirected to the `return_url`.
			if (error.type === 'card_error' || error.type === 'validation_error') {
				displayError(new Error(error.message));
			} else {
				displayError(new Error('An unexpected error occurred.'));
			}

			setIsLoading(false);
		} catch (e) {
			displayError(e);
			setIsLoading(false);
			return;
		}
	};

	const paymentElementOptions: stripeJs.StripePaymentElementOptions = {
		layout: 'tabs'
	};

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				marginTop: smallerThanMd ? '20px' : '0px'
			}}
		>
			<Formik
				initialValues={initialValues}
				validationSchema={user?.id !== tryoutUserId ? undefined : validationSchema}
				onSubmit={handleSubmit}
			>
				{({ errors, touched, isValid }) => {
					const isNotSignedUpAndEmailFieldIsInvalid = user?.id !== tryoutUserId ? false : (!isValid && touched.email);
					const isButtonDisabled = isLoading || !stripe || !elements || isNotSignedUpAndEmailFieldIsInvalid;

					return (
						<Form
							style={{
								marginTop: smallerThanMd ? '-20px' : 'auto',
								width: '100%',
								minWidth: '350px',
								alignSelf: 'center',
								borderRadius: '7px',
								padding: '0px 20px 0px 20px',
								marginBottom: 'auto',
							}}
						>
							<PaymentElement options={paymentElementOptions} />
							{user?.id === tryoutUserId && (
								<div style={{marginTop: '10px'}}>
									<label
										htmlFor="email"
										style={{
											fontSize: '14.88px',
											letterSpacing: '1.1px',
											fontWeight: '300',
											transition: 'transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
										}}
									>
										Email
									</label>
									<Field
										id="email"
										name="email"
										type="email"
										style={{
											marginTop: '4px',
											width: '100%',
											padding: '10px',
											backgroundColor: '#fff',
											borderRadius: '6px',
											height: '44.18px',
											fontSize: '16px',
											transition: 'background 0.15s ease, border 0.15s ease, box-shadow 0.15s ease, color 0.15s ease',
											border: touched.email && errors.email ? '2px solid rgb(223, 27, 65)' : '1px solid #e6e6e6',
											boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(0, 0, 0, 0.02)'
										}}
									/>
									<Field name="email">
										{({meta}: FieldProps) => (
											meta.touched && meta.error && (
												<FieldError
													errorMessage={meta.error}
													marginTop="3px"
													marginBottom="0px"
													fontSize={'15px'}
													showIcon={false}
													textColor={'rgb(223, 27, 65)'}
												/>
											)

										)}
									</Field>
								</div>
							)}
							<button disabled={isButtonDisabled}
								id="submit"
								style={{
									marginTop: '12px',
									background: '#0055DE',
									fontFamily: 'Arial, sans-serif',
									color: '#ffffff',
									borderRadius: '4px',
									border: 0,
									padding: '12px 16px',
									fontSize: '16px',
									fontWeight: 600,
									cursor: 'pointer',
									display: 'block',
									transition: 'all 0.2s ease',
									boxShadow: '0px 4px 5.5px 0px rgba(0, 0, 0, 0.07)',
									width: '100%',
								}}
							>
								<span id="button-text">
									{isLoading ? <div className="spinner"
													  id="spinner"></div> : `Subscribe now $${amountToPay} (USD)`}
								</span>
							</button>
						</Form>
					);
				}}

			</Formik>
		</div>
	);
};