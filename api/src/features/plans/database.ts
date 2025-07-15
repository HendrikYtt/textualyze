import {knex} from '../../knex';
import {BillingInterval, Plan, PlanType} from '@hendrikytt/api-contracts';

export const getPlans = async (): Promise<Plan[]> => {
	return knex<Plan>('plans').orderBy('id');
};

export const getPlanByPlanTypeAndBillingInterval = async (planType: PlanType, billingInterval: BillingInterval): Promise<Plan | undefined> => {
	return knex<Plan>('plans').where({plan_type: planType, billing_interval: billingInterval}).first();
};
