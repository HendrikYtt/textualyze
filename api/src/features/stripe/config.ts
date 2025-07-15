import Stripe from 'stripe';

export const stripe = process.env.NODE_ENV === 'dev'
	? new Stripe('<STRIPE_TEST_KEY>')
	: new Stripe('<STRIPE_PROD_KEY>');
