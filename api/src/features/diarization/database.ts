import {Knex} from 'knex';
import {knex} from '../../knex';
import {Diarization, DiarizationContent} from '@hendrikytt/api-contracts';

export const getDiarizationByJobId = async (jobId: string, trx: Knex.Transaction | Knex = knex): Promise<Diarization | undefined> => {
	return trx<Diarization>('diarizations').where({job_id: jobId}).first();
};

export const getDiarizationByRequestId = async (requestId: string, trx: Knex.Transaction | Knex = knex): Promise<Diarization | undefined> => {
	return trx<Diarization>('diarizations').where({request_id: requestId}).first();
};

export const insertDiarization = async (diarization: Omit<Diarization, 'created_at' | 'updated_at'>, trx: Knex.Transaction | Knex = knex): Promise<Diarization> => {
	const rows = await trx<Diarization>('diarizations').insert(diarization).returning('*');
	return rows[0];
};

type FieldsToUpdate = {
    content?: DiarizationContent[];
    isFinished?: boolean;
};

export const updateDiarizationFields = async (jobId: string, fieldsToUpdate: FieldsToUpdate, trx: Knex.Transaction | Knex = knex): Promise<Diarization | undefined> => {
	const {
		content,
		isFinished
	} = fieldsToUpdate;
	const rows = await trx<Diarization>('diarizations')
		.update(
			{
				updated_at: knex.fn.now(),
				content: content,
				is_finished: isFinished
			}
		)
		.where({job_id: jobId})
		.returning('*');
	return rows[0];
};
