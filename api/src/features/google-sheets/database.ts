import {knex} from '../../knex';
import {excludedEmails} from '../../services/api-reports-generator';
import {UserActions, UserCounts} from './types';
import {createPeriod} from './service';
import {log} from '../../lib/log';

export const monthUsagesPerUser = async (month: number, year: number) => {
	const result = await knex.raw(`
        SELECT
            u.email,
            us.transcribed_seconds
        FROM usages us
        JOIN users u ON u.id = us.user_id
        WHERE u.email NOT IN (${excludedEmails.map(email => '?').join(', ')})
        AND us.month = ?
        AND us.year = ?
        ORDER BY us.transcribed_seconds DESC
    `, [...excludedEmails, month, year]);

	const rowData = result.rows;
	if (rowData.length === 0) {
		return;
	}
	return rowData;
};

export const monthUsages = async () => {
	const currentYear = new Date().getFullYear();

	const result = await knex.raw(`
        SELECT
            TO_CHAR(DATE_TRUNC('month', DATE(year::text || '-' || LPAD(month::text, 2, '0') || '-01')), 'YYYY-MM') AS year_month,
            CAST(SUM(transcribed_seconds) AS BIGINT) AS transcribed_seconds
        FROM usages us
        JOIN users u ON u.id = us.user_id
        WHERE u.email NOT IN (${excludedEmails.map(email => '?').join(', ')})
        AND DATE(year::text || '-' || LPAD(month::text, 2, '0') || '-01') >= '2024-01-01'
        AND DATE(year::text || '-' || LPAD(month::text, 2, '0') || '-01') <= DATE(?)
        GROUP BY year_month
        ORDER BY year_month
    `, [...excludedEmails, `${currentYear}-12-31`]);

	const transformedRows = result.rows.map((row: { year_month: string; transcribed_seconds: number; }) => ({
		month: row.year_month,
		transcribedSeconds: Number(row.transcribed_seconds)
	}));

	return transformedRows;
};

export const usersWhoHaveNoUsages = async () => {
	const result = await knex.raw(`
	SELECT
		u.id AS "CONTACT ID",
		u.email AS "EMAIL"
	FROM users u
	LEFT JOIN usages us ON us.user_id = u.id
	WHERE us.id IS NULL
	ORDER BY u.id ASC;
	`);
	return result.rows;
};

export const usersWhoHaveFreePlanAndUsages = async () => {
	const result = await knex.raw(`
	SELECT
		u.id AS "CONTACT ID",
		u.email AS "EMAIL"
	FROM users u
	JOIN usages us ON us.user_id = u.id
	WHERE u.plan_id = 1
	AND email NOT IN (${excludedEmails.map(email => '?').join(', ')})
	GROUP BY u.id, u.email
	ORDER BY u.id ASC;
	`, [...excludedEmails]);
	return result.rows;
};

export const payingUsers = async () => {
	const result = await knex.raw(`
	SELECT
		u.id AS "CONTACT ID",
		u.email AS "EMAIL",
		u.plan_id
	FROM users u
	JOIN usages us ON us.user_id = u.id
	WHERE u.plan_id != 1
	AND email NOT IN (${excludedEmails.map(email => '?').join(', ')})
	AND u.subscription_cancel_at IS NULL
	GROUP BY u.id, u.email
	ORDER BY u.id ASC;
	`, [...excludedEmails]);
	return result.rows;
};

export const payingUsersThatHaveLeft = async () => {
	const result = await knex.raw(`
	SELECT
		u.id AS "CONTACT ID",
		u.email AS "EMAIL"
	FROM users u
	JOIN usages us ON us.user_id = u.id
	WHERE u.plan_id != 1
	AND email NOT IN (${excludedEmails.map(email => '?').join(', ')})
	AND u.subscription_cancel_at IS NOT NULL
	GROUP BY u.id, u.email
	ORDER BY u.id ASC;
	`, [...excludedEmails]);
	return result.rows;
};

export const weeklyUserActions = async () => {
	const startDate = new Date('2024-03-25');
	const endDate = new Date(startDate);
	endDate.setDate(endDate.getDate() + 7);

	const allResults = [];

	while (startDate < new Date()) {
		const query = knex.raw(`
			SELECT
				COUNT(uu.id) AS upload_count,
				COUNT(t.request_id) AS transcription_count,
				SUM(CASE WHEN t.export_count > 0 THEN 1 ELSE 0 END) AS video_export_count,
				COUNT(*) FILTER (WHERE cardinality(t.translated_languages) > 0) AS translated_languages_count,
				? AS start_date,
        		? AS end_date
			FROM user_uploads uu
			JOIN users u ON u.id = uu.user_id
			LEFT JOIN transcriptions t ON t.request_id::uuid = uu.request_id::uuid
			WHERE u.email NOT IN (${excludedEmails.map(email => '?').join(', ')})
            AND uu.created_at >= ?
            AND uu.created_at < ?
			ORDER BY upload_count DESC
		`, [startDate, endDate, ...excludedEmails, startDate, endDate]);

		const result = await query;

		const rowData = result.rows;
		allResults.push(rowData);

		startDate.setDate(startDate.getDate() + 7);
		endDate.setDate(endDate.getDate() + 7);
	}
	const modifiedData = allResults.flatMap(item => item.map((entry: UserActions) => ({
		period: createPeriod(entry.start_date, entry.end_date),
		upload_count: Number(entry.upload_count),
		transcription_count: Number(entry.transcription_count),
		video_export_count: Number(entry.video_export_count),
		translated_languages_count: Number(entry.translated_languages_count)
	})));


	return modifiedData;
};

export const weeklyUserCounts = async (): Promise<UserCounts[]> => {
	const startDate = new Date('2024-03-25');
	const endDate = new Date(startDate);
	endDate.setDate(endDate.getDate() + 7);
	const countData: UserCounts[] = [];

	while (startDate < new Date()) {
		const result = await knex.raw(`
            SELECT COUNT(*) as count
            FROM users u
            WHERE u.email NOT IN (${excludedEmails.map(email => '?').join(', ')})
            AND u.created_at < ?
        `, [...excludedEmails, endDate]);

		const rowData = result.rows;
		if (rowData.length > 0) {
			const period = `${startDate.toISOString().split('T')[0].slice(5).replace('-', '/')} to ${endDate.toISOString().split('T')[0].slice(5).replace('-', '/')}`;
			const userCount = Number(rowData[0].count); // Ensure count is a number
			countData.push({ period, userCount });
		}

		startDate.setDate(startDate.getDate() + 7);
		endDate.setDate(endDate.getDate() + 7);
	}

	return countData;
};

export const todayUsagesPerUser = async () => {
	const today = new Date();
	const result = await knex.raw(`
        SELECT
			u.email,
			SUM(uu.duration) AS transcribed_seconds
		FROM transcriptions t
		JOIN users u ON u.id = t.user_id
		JOIN user_uploads uu ON uu.request_id = t.request_id::varchar
        WHERE u.email NOT IN (${excludedEmails.map(email => '?').join(', ')})
        AND DATE(t.created_at) = DATE(?)
        GROUP BY u.email
        ORDER BY transcribed_seconds DESC
    `, [...excludedEmails, today]);

	const rowData = result.rows;
	const modifiedData = rowData.map((entry: { email: string; transcribed_seconds: number; }) => ({
		email: entry.email,
		transcribedSeconds: Number(entry.transcribed_seconds.toFixed(2))
	}));

	if (modifiedData.length === 0) {
		return [{
			email: null,
			transcribedSeconds: null
		}];
	}

	return modifiedData;
};

export const todayUserActions = async () => {
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const tomorrow = new Date(today);
	tomorrow.setDate(tomorrow.getDate() + 1);

	const query = knex.raw(`
        SELECT
            COUNT(uu.id) AS upload_count,
            COUNT(t.request_id) AS transcription_count,
            SUM(CASE WHEN t.export_count > 0 THEN 1 ELSE 0 END) AS video_export_count,
            COUNT(*) FILTER (WHERE cardinality(t.translated_languages) > 0) AS translated_languages_count
        FROM user_uploads uu
        JOIN users u ON u.id = uu.user_id
        LEFT JOIN transcriptions t ON t.request_id::uuid = uu.request_id::uuid
        WHERE u.email NOT IN (${excludedEmails.map(email => '?').join(', ')})
            AND uu.created_at >= ?
            AND uu.created_at < ?
        ORDER BY upload_count DESC
    `, [...excludedEmails, today, tomorrow]);

	const result = await query;

	const rowData = result.rows;

	const modifiedData = rowData.map((entry: UserActions) => ({
		upload_count: Number(entry.upload_count),
		transcription_count: Number(entry.transcription_count),
		video_export_count: Number(entry.video_export_count),
		translated_languages_count: Number(entry.translated_languages_count)
	}));

	return modifiedData;
};

export const getPayingUsers = () => {
	const query = knex.raw(`
		SELECT *
		FROM users
		WHERE email NOT IN (${excludedEmails.map(email => '?').join(', ')})
		AND plan_id != 1
		ORDER BY updated_at DESC
    `, [...excludedEmails]);
};