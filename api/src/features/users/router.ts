import PromiseRouter from 'express-promise-router';
import {getFrontendUser, getUserByEmail, getUsersCount, insertUser, updateUser} from './database';
import {AuthenticationSession} from '../../types';
import MailService from '../mailer/service';
import {addMinutes, generateOOBCode, handleIpAddress, isTestUser} from './service';
import {
	addAuthenticationSession,
	deleteAuthenticationSessionByOobCode,
	getAuthenticationSessionByOobCode
} from '../mailer/database';
import {BadRequestError, NotFoundError} from '../../error';
import {loginEmailTemplate} from '../../templates/login-template';
import {AuthenticateResponse, FrontendUser, MessageResponse} from '@hendrikytt/api-contracts';
import {createAccessToken} from '../../lib/jwt';
import {protect, protectAndValidate} from '../../lib/auth';
import {getCache, setCache} from '../../lib/redis';
import {updateNotSignedUpUser} from '../not-signed-up-users/database';
import {updateTranscriptionUserIdByRequestId} from '../transcriptions/database';
import {knex} from '../../knex';
import {stripe} from '../stripe/config';
import {insertPaymentIntent} from '../payment-intent/database';

export const usersRouter = PromiseRouter();

usersRouter.get<unknown, FrontendUser>('/me', protect(), async (req, res) => {
	const userId = req.token.sub;
	if (!userId) {
		throw new BadRequestError('User id must be provided');
	}
	let frontendUser: FrontendUser;
	const cachedUser = await getCache('users', userId);
	if (cachedUser) {
		frontendUser = JSON.parse(cachedUser);
	} else {
		frontendUser = await getFrontendUser(userId);
		if (!frontendUser) {
			throw new NotFoundError('User does not exist');
		}

		await setCache('users', userId, frontendUser);
	}
	res.json(frontendUser);
});

usersRouter.post<unknown, MessageResponse>('/send-email', async (req, res) => {
	const email = req.body.email;
	const action = req.body.action;
	const selectedPlanId = req.body.selectedPlanId;

	if (action === 'login') {
		const user = await getUserByEmail(email);
		if (!user) {
			throw new NotFoundError('Email does not exist');
		}
	}

	const oobCode = generateOOBCode(16);
	let continueUrl = '';
	if (selectedPlanId) {
		continueUrl = `/pricing?selectedPlanId=${selectedPlanId}`;
	} else {
		continueUrl = '/';
	}
	const baseUrl = process.env.FRONTEND_URL;
	const link = `${baseUrl}/email?oobCode=${oobCode}&continueUrl=${continueUrl}&action=${action}`;
	const emailTemplate = loginEmailTemplate(link, baseUrl || 'https://textualyze.com');

	const session: Omit<AuthenticationSession, 'id' | 'created_at'> = {
		email: email,
		oob_code: oobCode,
		expires_at: addMinutes(new Date(), 1)
	};
	await addAuthenticationSession(session);
	const mailService = MailService.getInstance();
	const info = await mailService.sendMail({
		to: email,
		subject: 'Your Textualyze Login Link is Here',
		html: emailTemplate,
	});
	if (info?.accepted[0] === email) {
		res.status(200).json({message: 'ok'});
	} else {
		throw new BadRequestError('Could not send email');
	}
});

usersRouter.post<unknown, AuthenticateResponse>('/authenticate', async (req, res) => {
	const email = req.body.email;
	const oobCode = req.body.oobCode;
	const action = req.body.action;
	const ipAddress = req.ip;

	const session = await getAuthenticationSessionByOobCode(oobCode);
	if (!session) {
		throw new BadRequestError('No session found');
	}
	if (session.expires_at < new Date()) {
		await deleteAuthenticationSessionByOobCode(oobCode);
		throw new BadRequestError('Session has expired');
	}

	let accessToken: string;
	await deleteAuthenticationSessionByOobCode(oobCode);
	const existingUser = await getUserByEmail(email);
	if (action === 'login') {
		if (!existingUser) {
			throw new NotFoundError('Email does not exist');
		}
		await handleIpAddress(ipAddress, existingUser);
		accessToken = createAccessToken(existingUser.id);
		return res.status(200).json({access_token: accessToken});
	} else if (action === 'signup') {
		const isTest = await isTestUser(email);
		const newUser = await insertUser({
			email: email,
			stripe_customer_id: null,
			plan_id: isTest ? 5 : 1,
			subscription_cancel_at: null,
			profile_picture_url: null,
			ip_addresses: ipAddress ? [ipAddress] : []
		});
		const user = newUser || existingUser;
		if (!user) {
			throw new BadRequestError('Could not create or find user');
		}

		await handleIpAddress(ipAddress, existingUser);
		const accessToken = createAccessToken(user.id);
		return res.status(200).json({access_token: accessToken});
	} else {
		throw new BadRequestError('Invalid action');
	}
});

usersRouter.post<unknown, AuthenticateResponse>('/authenticate-with-google', async (req, res) => {
	const email = req.body.email;
	const action = req.body.action;
	const profilePictureUrl = req.body.profilePictureUrl;

	const ipAddress = req.ip;
	// const ipAddress = '90.190.37.197';

	let accessToken: string;
	const existingUser = await getUserByEmail(email);
	if (action === 'login') {
		if (!existingUser) {
			throw new NotFoundError('Email not found');
		}
		await handleIpAddress(ipAddress, existingUser);
		accessToken = createAccessToken(existingUser.id);
		return res.status(200).json({access_token: accessToken});
	} else if (action === 'signup') {
		if (!existingUser) {
			const isTest = await isTestUser(email);
			const newUser = await insertUser({
				email: email,
				stripe_customer_id: null,
				plan_id: isTest ? 5 : 1,
				subscription_cancel_at: null,
				profile_picture_url: profilePictureUrl,
				ip_addresses: ipAddress ? [ipAddress] : []
			});
			accessToken = createAccessToken(newUser.id);
		} else {
			accessToken = createAccessToken(existingUser.id);
		}
		await handleIpAddress(ipAddress, existingUser);
		return res.status(200).json({access_token: accessToken});
	} else {
		throw new BadRequestError('Invalid action');
	}
});

export const tryoutUserId = 999999;
usersRouter.get<unknown, FrontendUser>('/tryout-user', async (req, res) => {
	const tryoutUser = await getFrontendUser(tryoutUserId);

	res.json(tryoutUser);
});

usersRouter.post<unknown, MessageResponse>('/hear-from-us', protectAndValidate(), async (req, res) => {
	const hearFromUs = req.body.hearFromUs;
	const forNotSignedUpUser: boolean = req.body.forNotSignedUpUser;
	const ipAddress = req.ip;

	if (!ipAddress) {
		return res.status(200).json({message: 'ok'});
	}
	
	if (forNotSignedUpUser) {
		await updateNotSignedUpUser(ipAddress, {hearFromUs: hearFromUs});
	} else {
		await updateUser(req.user.email, {hearFromUs: hearFromUs});
	}

	res.status(200).json({message: 'ok'});
});

usersRouter.post<unknown, AuthenticateResponse>('/create-with-email', async (req, res) => {
	const email = req.body.email as string;
	const requestId: string | undefined = req.body.requestId;
	const paymentIntent = req.body.paymentIntent as string;
	const selectedPlanId = req.body.selectedPlanId as number;
	const isSignedUpUser = req.body.isSignedUpUser as boolean;

	const user = await getUserByEmail(email);
	if (isSignedUpUser && !user) {
		throw new BadRequestError('No user found');
	} else if (!isSignedUpUser && user) {
		throw new BadRequestError('Email already exists');
	}

	await knex.transaction(async (trx) => {
		const createdUser = isSignedUpUser 
			? user
			: await insertUser({
				email: email,
				stripe_customer_id: null,
				plan_id: 1,
				subscription_cancel_at: null,
				profile_picture_url: null,
				ip_addresses: req.ip ? [req.ip] : []
			}, trx);

		await insertPaymentIntent({email: email, payment_intent_id: paymentIntent, plan_id: selectedPlanId});
		if (requestId) {
			await updateTranscriptionUserIdByRequestId(requestId, createdUser!.id, trx);
		}
		const accessToken = createAccessToken(createdUser!.id);
		return res.status(200).json({access_token: accessToken});
	});
});

export const usersCount = {
	count: 0
};

usersRouter.get<unknown, { count: number }>('/get-count', async (req, res) => {
	return res.status(200).json({count: usersCount.count});
});
