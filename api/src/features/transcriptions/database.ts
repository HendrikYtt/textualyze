import {Transcription} from '@hendrikytt/api-contracts';
import {Knex} from 'knex';
import {knex} from '../../knex';
import {BadRequestError, NotFoundError} from '../../error';
import {publishToPubSub} from '../../lib/redis';

export const getTranscriptionByRequestId = async (requestId: string): Promise<Transcription | undefined> => {
	return knex<Transcription>('transcriptions').where({request_id: requestId}).first();
};

export const insertTranscription = async (transcription: Omit<Transcription, 'export_count' | 'translated_languages' | 'created_at' | 'updated_at'>, trx: Knex.Transaction | Knex = knex): Promise<Transcription> => {
	const rows = await trx<Transcription>('transcriptions').insert(transcription).onConflict().ignore().returning('*');
	await publishToPubSub('users-update', 'update', rows[0].user_id.toString(), null);
	return rows[0];
};

export const incrementTranscriptionExportCount = async (requestId: string, trx: Knex.Transaction | Knex = knex): Promise<Transcription> => {
	const rows = await trx<Transcription>('transcriptions')
		.where({ request_id: requestId })
		.update({
			updated_at: knex.fn.now(),
			export_count: trx.raw('?? + 1', 'export_count'),
		})
		.returning('*');

	if (rows.length === 0) {
		throw new BadRequestError('Transcription not found');
	}
	await publishToPubSub('users-update', 'update', rows[0].user_id.toString(), null);
	return rows[0];
};

export const addTranscriptionTranslatedLanguage = async (requestId: string, targetLanguage: string, trx: Knex.Transaction | Knex = knex): Promise<Transcription> => {
	return trx.transaction(async (trx) => {
		const [transcription] = await trx<Transcription>('transcriptions')
			.where({ request_id: requestId })
			.select('translated_languages');

		if (!transcription) {
			throw new NotFoundError('Transcription not found');
		}

		const updatedLanguages = [...transcription.translated_languages, targetLanguage];

		const [updatedTranscription] = await trx<Transcription>('transcriptions')
			.where({ request_id: requestId })
			.update({
				updated_at: knex.fn.now(),
				translated_languages: updatedLanguages
			})
			.returning('*');
		await publishToPubSub('users-update', 'update', updatedTranscription.user_id.toString(), null);
		return updatedTranscription;
	});
};

export const updateTranscriptionUserIdByRequestId = (requestId: string, userId: number, trx: Knex.Transaction | Knex = knex) => {
	return trx('transcriptions').update({user_id: userId}).where({request_id: requestId}).returning('*');
};