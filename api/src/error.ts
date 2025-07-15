import {NextFunction, Request, Response} from 'express';
import {log} from './lib/log';

export class BaseError extends Error {
	constructor(
		public message: string,
		public code: number,
		public details?: unknown
	) {
		super();
	}
}

export class BadRequestError extends BaseError {
	constructor(message: string, details?: unknown) {
		super(message, 400, details);
	}
}

export class UnauthorizedError extends BaseError {
	constructor(message = 'UnauthorizedError', details?: unknown) {
		super(message, 401, details);
	}
}

export class ForbiddenError extends BaseError {
	constructor(message = 'ForbiddenError', details?: unknown) {
		super(message, 403, details);
	}
}

export class NotFoundError extends BaseError {
	constructor(message = 'NotFoundError', details?: unknown) {
		super(message, 404, details);
	}
}

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
	log.error({ message: `${err.message} - URL: ${req.originalUrl}`});
	if (err instanceof BadRequestError || err instanceof UnauthorizedError || err instanceof ForbiddenError || err instanceof NotFoundError) {
		return res.status(err.code).json({ message: err.message.replace('Error: ', '') });
	}

	return res.status(500).json({ message: 'Internal Server Error' });
};
