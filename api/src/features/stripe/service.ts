import {stripe} from './config';
import {FrontendUser, LookupKey} from '@hendrikytt/api-contracts';
import {BadRequestError} from '../../error';
import Stripe from 'stripe';

export const validateAndFetchSubscriptionId = async (user: FrontendUser, newPlanLookUpKey: LookupKey) => {
	const subscription = await getStripeSubscriptionByUser(user);
	if (!subscription) {
		return null;
	}
	if (subscription?.cancel_at_period_end === false) {
		validateNewPlanLookupKey(user.current_plan.lookup_key, newPlanLookUpKey);
	}
	return subscription;
};

const getStripeSubscriptionByUser = async (user: FrontendUser) => {
	if (!user.stripe_customer_id) {
		return null;
	}
	const subscriptionInfo = await stripe.subscriptions.list({
		customer: user.stripe_customer_id
	});
	return subscriptionInfo?.data[0];
};

const validateNewPlanLookupKey = (lookupKey: LookupKey, newPlanLookUpKey: LookupKey) => {
	if (lookupKey === 'BASIC_MONTHLY' && newPlanLookUpKey === 'BASIC_MONTHLY') {
		throw new BadRequestError('You can\'t subscribe to the same plan twice');
	}
	if (lookupKey === 'BASIC_ANNUALLY' &&
		(newPlanLookUpKey === 'BASIC_MONTHLY' || newPlanLookUpKey === 'BASIC_ANNUALLY' || newPlanLookUpKey === 'PRO_MONTHLY')
	) {
		throw new BadRequestError('You can\'t subscribe to this plan');
	}
	if (lookupKey === 'PRO_MONTHLY' &&
		(newPlanLookUpKey === 'BASIC_MONTHLY' || newPlanLookUpKey === 'BASIC_ANNUALLY' || newPlanLookUpKey === 'PRO_MONTHLY')
	) {
		throw new BadRequestError('You can\'t subscribe to this plan');
	}
	if (lookupKey === 'PRO_ANNUALLY') {
		throw new BadRequestError('You have the best plan already');
	}
};
