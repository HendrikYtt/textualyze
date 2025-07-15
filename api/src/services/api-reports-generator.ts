import {log} from '../lib/log';
import {initDatabase} from '../knex';
import {stripe} from '../features/stripe/config';
import {DateTime} from 'luxon';
import {
	addDataToMainSheet,
	createOrUpdateSheetAndAddData,
	transformRevenueData
} from '../features/google-sheets/service';
import {startGoogleSheets} from '../features/google-sheets/config';
import {omit, sortBy} from 'lodash';
import cron from 'node-cron';
import {
	weeklyUserActions,
	monthUsages,
	monthUsagesPerUser,
	weeklyUserCounts,
	todayUsagesPerUser,
	todayUserActions,
	usersWhoHaveNoUsages,
	usersWhoHaveFreePlanAndUsages,
	payingUsers,
	payingUsersThatHaveLeft
} from '../features/google-sheets/database';
import Stripe from 'stripe';

export const excludedEmails = ['hendrik.utt@gmail.com', 'vares.kaarup@gmail.com', 'henzu97@gmail.com', 'textualyze@gmail.com', 'hendrik.utt@coolbet.com', 'vahilapsed2@gmail.com', 'hannamilk2002@gmail.com', 'mariaprojektid@gmail.com', 'evert.poom@gmail.com', 'tiinaytt@gmail.com'];

export const start = async () => {
	await generateReport();

	cron.schedule('0 * * * *', async () => {
		log.info('Running scheduled HOURLY report generation (every 1H)');
		await generateReport();
	});
};

const getAllPayments = async (): Promise<Stripe.PaymentIntent[]> => {
	try {
		const allPayments = await stripe.paymentIntents.list({
			limit: 100
		}).autoPagingToArray({ limit: 10000 });

		return allPayments;
	} catch (error) {
		console.error('Error fetching payments:', error);
		throw error;
	}
};

const generateReport = async () => {
	log.info('Starting report run.');
	await startGoogleSheets();
	try {
		await initDatabase();

		const customersData = await stripe.customers.list();
		const actualCustomers = customersData.data.filter(c => {
			if (c.email) {
				return !excludedEmails.includes(c.email);
			} else {
				return false;
			}
		});
		const subscriptionsData = await stripe.subscriptions.list();
		const paymentsData = await getAllPayments();
		const filteredPayments = paymentsData.filter(p => actualCustomers.map(c => c.id).includes(p.customer as string));
		const transformedRevenue = transformRevenueData(filteredPayments, actualCustomers);

		const usersWhoPay = await payingUsers();
		const activeCustomers = actualCustomers.map(c => {
			const subscription = subscriptionsData.data.find(s => s.customer === c.id);
			const planId = usersWhoPay.find((u: { [x: string]: string | null; }) => u['EMAIL'] === c.email)?.plan_id;
			return {
				email: c.email,
				plan: planId || 'X',
				isActive: !!subscription,
				createdAt: DateTime.fromMillis(c.created * 1000).toFormat('yyyy-MM-dd')
			};
		});

		const currentYear = new Date().getFullYear();
		for (let year = 2024; year <= currentYear; year++) {
			for (const month of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]) {
				const paddedMonth = month.toString().padStart(2, '0');
				const usagesPerUser = await monthUsagesPerUser(month, year);
				if (usagesPerUser) {
					await createOrUpdateSheetAndAddData(`${paddedMonth}-${year}`, usagesPerUser, 'A', 1);
				}
			}
		}

		await addDataToMainSheet(transformedRevenue, 'A');

		await addDataToMainSheet(sortBy(activeCustomers, 'createdAt'), 'E');

		const monthlyUsages = await monthUsages();
		await addDataToMainSheet(monthlyUsages, 'J');

		const userCountData = await weeklyUserCounts();
		await addDataToMainSheet(userCountData, 'M');

		const actionCounts = await weeklyUserActions();
		await addDataToMainSheet(actionCounts, 'Q');

		const noUsageUsers = await usersWhoHaveNoUsages();
		await createOrUpdateSheetAndAddData('USER_SEGMENTS', noUsageUsers, 'A', 2);

		const noPlanUsers = await usersWhoHaveFreePlanAndUsages();
		await createOrUpdateSheetAndAddData('USER_SEGMENTS', noPlanUsers, 'D', 2);

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		await createOrUpdateSheetAndAddData('USER_SEGMENTS', [...usersWhoPay.map((u: any) => omit(u, 'plan_id'))], 'G', 2);

		const usersWhoCancelledSubscription = await payingUsersThatHaveLeft();
		await createOrUpdateSheetAndAddData('USER_SEGMENTS', usersWhoCancelledSubscription, 'J', 2);

		await dailyReport();

		log.info('Report run finished.');
	} catch (error) {
		log.error(`ERROR, ${error}`);
	}
};

const dailyReport = async () => {
	const todayUsages = await todayUsagesPerUser();
	await createOrUpdateSheetAndAddData('DAILY', todayUsages, 'A', 1, true);

	const todayActionCounts = await todayUserActions();
	await createOrUpdateSheetAndAddData('DAILY', todayActionCounts, 'D', 1);
};