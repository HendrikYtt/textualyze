import PromiseRouter from 'express-promise-router';
import {deleteUserTemplate, getUserTemplatesByUserId, insertUserTemplate, updateUserTemplate} from './database';
import {protectAndValidate} from '../../lib/auth';
import {NotFoundError} from '../../error';

export const userTemplatesRouter = PromiseRouter();

userTemplatesRouter.get('/', protectAndValidate(), async (req, res) => {
	const templates = await getUserTemplatesByUserId(req.user.id);
	res.status(200).json(templates);
});

userTemplatesRouter.post('/', protectAndValidate(), async (req, res) => {
	const created = await insertUserTemplate({...req.body, user_id: req.user.id});
	res.status(200).json(created);
});

userTemplatesRouter.put('/:id', protectAndValidate(), async (req, res) => {
	const id = req.params.id;
	const updated = await updateUserTemplate(id, req.body);
	if (!updated) {
		throw new NotFoundError('Could not update template');
	}
	res.status(200).json(updated);
});

userTemplatesRouter.delete('/:id', protectAndValidate(), async (req, res) => {
	const id = req.params.id;
	const deleted = await deleteUserTemplate(id);
	res.status(200).json(deleted);
});