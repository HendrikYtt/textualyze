import {NextFunction, Request, Response} from 'express';
import {JsonWebTokenError} from 'jsonwebtoken';
import {TokenPayload, verifyToken} from './jwt';
import {BadRequestError, ForbiddenError, UnauthorizedError} from '../error';
import {getFrontendUser} from '../features/users/database';
import {FrontendUser} from '@hendrikytt/api-contracts';
import {adHocXToken} from '../config';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const protect = () => (req: Request<any>, res: Response, next: NextFunction) => {
	req.browser = req.get('X-Custom-Browser') || 'Unknown';
	req.device = req.get('X-Custom-Device') || 'Unknown';
	const token = validateToken(req);
	try {
		req.token = verifyToken(token);
		next();
	} catch (err) {
		throw new UnauthorizedError((err as JsonWebTokenError).message);
	}
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const protectAndValidate = () => async (req: Request<any>, res: Response, next: NextFunction) => {
	req.browser = req.get('Browser') || 'Unknown';
	req.device = req.get('Device') || 'Unknown';
	const tryoutUserId = parseInt((req.get('userid') || '')) || null;
	if (tryoutUserId) {
		req.user = await getFrontendUser(tryoutUserId);
		next();
		return;
	}
	const token = validateToken(req);
	try {
		const tokenPayload = verifyToken(token);
		const frontendUser = await getFrontendUser(tokenPayload.sub);
		if (!frontendUser) {
			return next(new BadRequestError('User not found'));
		}
		req.user = frontendUser;
		next();
	} catch (err) {
		throw new UnauthorizedError((err as JsonWebTokenError).message);
	}
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateToken = (req: any) => {
	const [, token] = req.headers.authorization?.split(' ') ?? [];
	if (!token) {
		throw new ForbiddenError();
	}
	return token;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const xTokenProtect = () => async (req: Request<any>, res: Response, next: NextFunction) => {
	const token = req.headers['x-token'];
	if (token !== adHocXToken) {
		throw new UnauthorizedError('Something went wrong.');
	}
	next();
};

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        interface Request {
            user: FrontendUser;
            browser: string;
            device: string;
			tryoutUserId: number | null;
            token: TokenPayload;
        }
    }
}
