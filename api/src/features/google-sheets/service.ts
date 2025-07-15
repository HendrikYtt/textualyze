import { google } from 'googleapis';
import {auth} from './config';
import Stripe from 'stripe';
import {DateTime} from 'luxon';
import { Revenue} from './types';
import {log} from '../../lib/log';

const spreadsheetId = '1i-G8oo4cIeuUVdG7MfJq_SK3E526d-2pviw53398Eeg';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addDataToMainSheet = async (data: any[], startLetter: string): Promise<void> => {
	const sheets = google.sheets({ version: 'v4', auth });

	const headers = Object.keys(data[0]);
	const values = [
		headers,
		...data.map(item => headers.map(header => item[header] ?? ''))
	];

	const endColumn = String.fromCharCode(startLetter.charCodeAt(0) + headers.length - 1);
	const endRow = values.length;
	const range = `${startLetter}1:${endColumn}${endRow}`;

	try {
		const result = await sheets.spreadsheets.values.update({
			spreadsheetId,
			range,
			valueInputOption: 'RAW',
			requestBody: {
				values
			}
		});
	} catch (err) {
		log.error('The API returned an error: ' + err);
	}
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createOrUpdateSheetAndAddData = async (sheetTitle: string, data: any[], startLetter: string, startNumber: number, deleteExisting: boolean = false) => {
	const sheets = google.sheets({version: 'v4', auth});

	try {
		const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
		const existingSheet = spreadsheet.data.sheets?.find(sheet => sheet.properties?.title === sheetTitle);

		let sheetId;

		if (!existingSheet) {
			// Step 2: If the sheet doesn't exist, create a new one
			const addSheetResponse = await sheets.spreadsheets.batchUpdate({
				spreadsheetId: spreadsheetId,
				requestBody: {
					requests: [{
						addSheet: {
							properties: {
								title: sheetTitle,
							},
						},
					}],
				},
			});

			sheetId = addSheetResponse.data.replies?.[0].addSheet?.properties?.sheetId;
			if (!sheetId) {
				log.error('Failed to get new sheet ID');
				return;
			}
		} else {
			sheetId = existingSheet.properties?.sheetId;
		}

		// Transform the data into a 2D array
		const headers = Object.keys(data[0]);
		const values = [
			headers,
			...data.map(item => headers.map(header => item[header]))
		];

		if (deleteExisting) {
			// Clear the existing data in the columns where new data will be inserted
			const endLetter = String.fromCharCode(startLetter.charCodeAt(0) + headers.length - 1);
			await sheets.spreadsheets.values.clear({
				spreadsheetId: spreadsheetId,
				range: `${sheetTitle}!${startLetter}:${endLetter}`,
			});
		}

		// Step 3: Update the values in the sheet
		const updateResponse = await sheets.spreadsheets.values.update({
			spreadsheetId: spreadsheetId,
			range: `${sheetTitle}!${startLetter}${startNumber}`,
			valueInputOption: 'RAW',
			requestBody: {
				values: values,
			},
		});

		return sheetId;
	} catch (err) {
		log.error('The API returned an error: ' + err);
		throw err;
	}
};

export const createPeriod = (start: string, end: string): string => {
	return `${formatDate(start)} to ${formatDate(end)}`;
};
const formatDate = (dateStr: string): string => {
	const date = new Date(dateStr);
	return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
};

export const transformRevenueData = (filteredPayments: Stripe.PaymentIntent[], actualCustomers: Stripe.Customer[]): Revenue[] => {
	const revenueByMonth: { [key: string]: number } = filteredPayments
		.map(f => ({
			email: actualCustomers.find(a => a.id === f.customer)?.email,
			amount: f.amount / 100,
			createdAt: DateTime.fromMillis(f.created * 1000)
		}))
		.reduce<{ [key: string]: number }>((acc, { amount, createdAt }) => {
			const monthKey = createdAt.toFormat('yyyy-MM');
			acc[monthKey] = (acc[monthKey] || 0) + amount;
			return acc;
		}, {});

	let cumulativeRevenue = 0;
	const sortedMonths = Object.keys(revenueByMonth).sort();

	const transformedData: Revenue[] = sortedMonths.map(month => {
		cumulativeRevenue += revenueByMonth[month];
		return {
			month,
			monthlyRevenue: revenueByMonth[month],
			cumulativeRevenue
		};
	});

	return transformedData;
};