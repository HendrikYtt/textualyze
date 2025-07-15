import {BillingInterval, PlanType, SubscribeResponse} from '@hendrikytt/api-contracts';
import {http} from './config';

const basePath = '/stripe';

export const subscribe = async (email: string, planType: PlanType, billingInterval: BillingInterval) => {
	return http.post<SubscribeResponse>(`${basePath}/subscribe`, {
		email,
		planType,
		billingInterval
	});
};

export const managePaymentDetails = async (returnUrlPath: string) => {
	return http.post<SubscribeResponse>(`${basePath}/payment-details`, {
		returnUrlPath
	});
};

export const createPaymentIntent = (planType: PlanType, billingInterval: BillingInterval) => {
	return http.post<{ clientSecret: string, paymentIntentId: string }>(`${basePath}/create-payment-intent`, {
		planType, billingInterval
	});
};
