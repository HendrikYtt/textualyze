import nodemailer, {Transporter} from 'nodemailer';
import {MailInterface} from '../../types';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import {log} from '../../lib/log';

export default class MailService {
	private static instance: MailService;
	private transporter: Transporter<SMTPTransport.SentMessageInfo> | undefined;

	private constructor() {}
	//INSTANCE CREATE FOR MAIL
	static getInstance() {
		if (!MailService.instance) {
			MailService.instance = new MailService();
		}
		return MailService.instance;
	}
	//CREATE A CONNECTION FOR LIVE
	async createConnection() {
		const auth: SMTPTransport.Options = {
			host: process.env.SMTP_HOST,
			port: parseInt(process.env.SMTP_PORT || '587'),
			secure: process.env.SMTP_TLS === 'yes' ? true : false,
			auth: {
				user: process.env.SMTP_USERNAME,
				pass: process.env.SMTP_PASSWORD,
			},
		};
		this.transporter = nodemailer.createTransport(auth);
	}
	//SEND MAIL
	async sendMail(
		options: MailInterface
	) {
		if (!this.transporter) {
			return;
		}
		return await this.transporter
			.sendMail({
				from: '"Textualyze" info@textualyze.com',
				to: options.to,
				cc: options.cc,
				bcc: options.bcc,
				subject: options.subject,
				text: options.text,
				html: options.html,
			})
			.then((info) => {
				return info;
			})
			.catch(e => {
				log.error(`error: ${e}`);
			});
	}
}