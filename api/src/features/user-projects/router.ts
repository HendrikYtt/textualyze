import PromiseRouter from 'express-promise-router';
import {
	deleteUserProject,
	getUserProjectsByUserId,
	insertUserProject,
	updateUserProject,
	updateUserProjectName,
} from './database';
import {protectAndValidate} from '../../lib/auth';
import {NotFoundError} from '../../error';
import {UserProject} from '@hendrikytt/api-contracts';
import {getExpirationDate, getUserProjectByUserIdAndRequestIdOrThrow} from './service';

export const userProjectsRouter = PromiseRouter();

userProjectsRouter.get('/:requestId', protectAndValidate(), async (req, res) => {
	const requestId = req.params.requestId;
	const project = await getUserProjectByUserIdAndRequestIdOrThrow(req.user.id, requestId);
	res.status(200).json(project);
});

userProjectsRouter.get('/', protectAndValidate(), async (req, res) => {
	const userProjects = await getUserProjectsByUserId(req.user.id);
	res.status(200).json(userProjects);
});

userProjectsRouter.post('/', protectAndValidate(), async (req, res) => {
	const newProject = req.body as Omit<UserProject, 'created_at' | 'updated_at'>;
	newProject.expiration_date = getExpirationDate();
	const created = await insertUserProject({...newProject, user_id: req.user.id});
	res.status(200).json(created);
});

userProjectsRouter.put('/:requestId', protectAndValidate(), async (req, res) => {
	const requestId: string = req.params.requestId;
	const updated = await updateUserProject(requestId, req.body);
	if (!updated) {
		throw new NotFoundError('Could not update project');
	}
	res.status(200).json(updated);
});

userProjectsRouter.put('/name/:requestId', protectAndValidate(), async (req, res) => {
	const requestId: string = req.params.requestId;
	const updated = await updateUserProjectName(requestId, req.body.name);
	if (!updated) {
		throw new NotFoundError('Could not update project');
	}
	res.status(200).json(updated);
});

userProjectsRouter.delete('/:requestId', protectAndValidate(), async (req, res) => {
	const requestId: string = req.params.requestId;
	const deleted = await deleteUserProject(requestId);
	res.status(200).json(deleted);
});