import PromiseRouter from 'express-promise-router';
import Stripe from 'stripe';
import {log} from '../../lib/log';
import {BadRequestError} from '../../error';
import {protectAndValidate} from '../../lib/auth';
import {getUserByEmail, getUserByStripeId, updateUser} from '../users/database';
import {getPlanByPlanTypeAndBillingInterval, getPlans} from '../plans/database';
import {findKeyByPlanType, LookupKey, PlanType, SubscribeResponse} from '@hendrikytt/api-contracts';
import {knex} from '../../knex';
import {stripe} from './config';
import {validateAndFetchSubscriptionId} from './service';
import {getSaleInfo} from '../sale-info/database';
import {access_token, executeEventRequest, pixel_id} from '../../lib/meta-conversions-api';

import {
	Content,
	CustomData,
	EventRequest,
	UserData,
	ServerEvent
} from 'facebook-nodejs-business-sdk';
import {getPaymentIntentByPaymentIntentId} from '../payment-intent/database';

export const stripeRouter = PromiseRouter();

const couponId60Test = 'qQoMrJcD'; // [TEST] 60% - https://dashboard.stripe.com/test/coupons/qQoMrJcD

const couponId20Live = 'mp84kJpn'; //20% - https://dashboard.stripe.com/coupons/mp84kJpn
const couponId60Live = '6hQeYTdx'; //60% - https://dashboard.stripe.com/coupons/6hQeYTdx

const discountCoupon = process.env.NODE_ENV === 'dev'
	? couponId20Live
	: couponId60Test;

stripeRouter.post('/webhook', async (req, res) => {
	const reqBody = req.body;
	const signature = req.headers['stripe-signature'];
	console.log('signature', signature);
	const requestType = reqBody.type;
	switch (requestType) {
	case 'checkout.session.completed': {
		const email = reqBody.data.object.customer_details.email;
		const subscriptionId = reqBody.data.object.subscription;
		if (!subscriptionId) {
			res.status(200).json({message: 'no subscription id'});
			return;
		}
		const subscription = await stripe.subscriptions.retrieve(subscriptionId);
		const lookupKey = subscription.items.data[0].price.lookup_key;
		if (!lookupKey) {
			res.status(200).json({message: 'invalid plan type'});
			return;
		}
		const user = await getUserByEmail(email);
		if (!user) {
			res.status(200).json({message: 'no user found'});
			return;
		}
		const planType = lookupKey.split('_')[0];
		const billingInterval = lookupKey.split('_')[1];
		const plan = await getPlanByPlanTypeAndBillingInterval(planType as PlanType, billingInterval as 'MONTHLY' | 'ANNUALLY');
		if (!plan) {
			res.status(200).json({message: 'no plan found'});
			return;
		}
		const customerId = reqBody.data.object.customer;
		await knex.transaction(async (trx) => {
			const updatedUser = await updateUser(user?.email, {
				stripeCustomerId: customerId,
				planId: plan.id,
				subscriptionCancelAt: null
			}, trx);
			log.info(updatedUser);
		});
		res.status(200).json({message: 'ok'});
		break;
	}
	case 'customer.subscription.updated': {
		const updateObject = reqBody.data.object;
		const customerId = updateObject.customer;
		const user = await getUserByStripeId(customerId);
		if (user) {
			if (updateObject.cancel_at_period_end) {
				const updatedUser = await updateUser(user.email, {
					subscriptionCancelAt: new Date(updateObject.cancel_at * 1000)
				});
				log.info(updatedUser);
			} else {
				const updatedUser = await updateUser(user.email, {
					subscriptionCancelAt: null
				});
				log.info(updatedUser);
			}
		}
		res.status(200).json({message: 'ok'});
		break;
	}
	case 'customer.subscription.deleted': {
		res.status(200).json({message: 'ok'});
		break;
	}
	case 'payment_intent.created': {
		res.status(200).json({message: 'ok'});
		break;
	}
	case 'payment_intent.succeeded': {
		res.status(200).json({message: 'ok'});
		break;
	}
	case 'charge.succeeded': {
		const paymentIntent = await getPaymentIntentByPaymentIntentId(reqBody.data.object.payment_intent);
		if (paymentIntent) {
			const updatedUser = await updateUser(paymentIntent.email, {planId: paymentIntent.plan_id});
			const paymentMethodId = reqBody.data.object.payment_method;
			const createdCustomer = await stripe.customers.create({
				email: updatedUser.email,
				invoice_settings: {
					default_payment_method: paymentMethodId,
				},
				payment_method: paymentMethodId,
				address: {
					country: reqBody.data.object.billing_details.address.country
				},

			});

			const plans = await getPlans();
			const plan = plans.find(p => p.id === updatedUser.plan_id)!;

			const lookupKey = `${plan.plan_type}_${plan.billing_interval}`;
			const prices = await stripe.prices.list({
				lookup_keys: [lookupKey],
			});
			if (prices.data.length === 0) {
				throw new BadRequestError('Could not find price');
			}
			const newPrice = prices.data[0];
			const newPriceId = newPrice.id;

			await stripe.subscriptions.create({
				customer: createdCustomer.id,
				items: [
					{
						price: newPriceId,
						quantity: 1
					}
				]
			});
			await updateUser(paymentIntent.email, {stripeCustomerId: createdCustomer.id});
		}
		res.status(200).json({message: 'ok'});
		break;
	}
	default:
		log.info(`Unhandled event type ${requestType}`);
		res.status(200).json({message: 'ok'});
	}
});

stripeRouter.post<unknown, SubscribeResponse>('/subscribe', protectAndValidate(), async (req, res) => {
	const newPlanType = req.body.planType;
	const billingInterval = req.body.billingInterval;
	const email = req.body.email;
	if (!newPlanType || !billingInterval || !email) {
		throw new BadRequestError('Email, planType, billingInterval and userId must be provided');
	}

	const frontendUser = req.user;
	if (frontendUser.email !== email) {
		throw new BadRequestError('Emails do not match');
	}

	const userPlan = frontendUser.current_plan;
	if (userPlan?.plan_type === newPlanType && userPlan?.billing_interval === billingInterval) {
		throw new BadRequestError('User already has this plan');
	}

	const lookupKey = `${newPlanType}_${billingInterval}`;
	const prices = await stripe.prices.list({
		lookup_keys: [lookupKey],
	});
	if (prices.data.length === 0) {
		throw new BadRequestError('Could not find price');
	}
	const newPrice = prices.data[0];
	const newPriceId = newPrice.id;

	const current_timestamp = Math.floor(new Date().getTime() / 1000);

	const userData = (new UserData())
		.setEmails([req.user.email])
		.setClientIpAddress(req.connection.remoteAddress!)
		.setClientUserAgent(req.headers['user-agent']!);

	const content = (new Content())
		.setId(newPrice.lookup_key!)
		.setQuantity(1);

	const customData = (new CustomData())
		.setContents([content])
		.setCurrency('usd')
		.setValue(newPrice.unit_amount! / 100);

	const serverEvent = (new ServerEvent())
		.setEventName('Plan checkout')
		.setEventTime(current_timestamp)
		.setUserData(userData)
		.setCustomData(customData)
		.setEventSourceUrl('https://textualyze.com/pricing')
		.setActionSource('website');

	const eventsData = [serverEvent];
	const eventRequest = (new EventRequest(access_token, pixel_id))
		.setEvents(eventsData);

	await executeEventRequest(eventRequest);

	const subscription = await validateAndFetchSubscriptionId(frontendUser, lookupKey as LookupKey);

	if (subscription) {
		await knex.transaction(async (trx) => {
			const saleInfo = await getSaleInfo();
			if (!saleInfo) {
				throw new BadRequestError('Something went wrong');
			}
			await updateUser(frontendUser.email, {
				planId: findKeyByPlanType(newPlanType, billingInterval)
			}, trx);
			const params: Stripe.SubscriptionUpdateParams = {
				items: [{
					id: subscription.items.data[0].id,
					price: newPriceId,
				}],
				proration_behavior: 'always_invoice',
			};
			if (saleInfo.is_active && saleInfo.sale_end_date > new Date()) {
				params.coupon = discountCoupon;
			}
			await stripe.subscriptions.update(subscription.id, params);
		});
		await updateUser(frontendUser.email, {subscriptionCancelAt: null});
		res.status(200).json({url: ''});
		return;
	} else {
		const saleInfo = await getSaleInfo();
		if (!saleInfo) {
			throw new BadRequestError('Something went wrong');
		}
		const params: Stripe.Checkout.SessionCreateParams = {
			payment_method_types: ['card'],
			mode: 'subscription',
			line_items: [
				{
					price: newPriceId,
					quantity: 1
				}
			],
			success_url: `${process.env.FRONTEND_URL}/transcribe?success=1`,
			cancel_url: `${process.env.FRONTEND_URL}/pricing`,
		};

		if (frontendUser.stripe_customer_id) {
			params.customer = frontendUser.stripe_customer_id;
		} else {
			params.customer_email = email;
		}
		if (saleInfo.is_active && saleInfo.sale_end_date > new Date()) {
			params.discounts = [
				{
					coupon: discountCoupon
				}
			];
		}
		const session = await stripe.checkout.sessions.create(params);
		if (!session.url) {
			throw new BadRequestError('Could not create checkout session');
		}
		res.status(200).json({url: session.url});
		return;
	}
});

stripeRouter.post<unknown, SubscribeResponse>('/payment-details', protectAndValidate(), async (req, res) => {
	const frontendUser = req.user;
	const returnUrlPath = req.body.returnUrlPath;
	if (!frontendUser?.stripe_customer_id) {
		res.status(200).json({
			url: ''
		});
		return;
	}
	const session = await stripe.billingPortal.sessions.create({
		customer: frontendUser.stripe_customer_id,
		return_url: `${process.env.FRONTEND_URL}${returnUrlPath}`
	});
	return res.status(200).json({url: session.url});
});

stripeRouter.post('/create-payment-intent', async (req, res) => {
	const planType = req.body.planType;
	const billingInterval = req.body.billingInterval;

	const lookupKey = `${planType}_${billingInterval}`;
	const prices = await stripe.prices.list({
		lookup_keys: [lookupKey],
	});
	if (prices.data.length === 0) {
		throw new BadRequestError('Could not find price');
	}
	const newPrice = prices.data[0];

	const paymentIntent = await stripe.paymentIntents.create({
		setup_future_usage: 'off_session',
		amount: newPrice.unit_amount!,
		currency: 'usd',
		// In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
		automatic_payment_methods: {
			enabled: true
		}
	});

	res.send({
		clientSecret: paymentIntent.client_secret,
		paymentIntentId: paymentIntent.id,
	});
});