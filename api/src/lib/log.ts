import {createLogger, format, transports} from 'winston';
import {logger} from 'express-winston';

export const log = createLogger({
	level: 'debug',
	format: format.combine(
		format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss'
		}),
		format.printf(info => {
			let message = info.message;
			if (typeof message === 'object') {
				message = JSON.stringify(message, null, 4); // Formats the object nicely
			}
			return `${info.timestamp} ${info.level}: ${message}`;
		})
	),
	transports: [
		new transports.Console()
	],
});

export const expressLogger = logger({
	winstonInstance: log,
	expressFormat: true,
	skip: function (req, res) {
		return req.path === '/ping/liveness' || req.path === '/ping/readiness';
	}
});

