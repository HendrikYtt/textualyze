import {sign, verify} from 'jsonwebtoken';

const {
	// openssl rand -base64 80
	JWT_SECRET = 'va6JZtMkCjlz5EEnxZPJYB5lKBkGSYgBwS2IXqYz/ZZQZ15v8bQP/SmqFo4OekYzuGkXfsqzk7a8jssOwRxMuXJnckzBT7xlavkuAo8G0ec=',
	JWT_AUDIENCE = 'api',
	JWT_ISSUER = 'api',
} = process.env;

export type TokenPayload = { sub: number };

export const createAccessToken = (sub: number) => {
	return sign({ sub }, JWT_SECRET, { audience: JWT_AUDIENCE, issuer: JWT_ISSUER, expiresIn: '30d' });
};

export const verifyToken = (token: string) => {
	return verify(token, JWT_SECRET, { audience: JWT_AUDIENCE, issuer: JWT_ISSUER }) as unknown as TokenPayload;
};
