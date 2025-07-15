import {knex} from '../../knex';
import {PaymentIntent} from './types';

export const getPaymentIntentByPaymentIntentId = (paymentIntent: string) => {
	return knex('payment_intents').where({payment_intent_id: paymentIntent}).first();
};

export const insertPaymentIntent = (dataToInsert: Pick<PaymentIntent, 'payment_intent_id' |'plan_id' | 'email'>) => {
	return knex('payment_intents').insert(dataToInsert);
};