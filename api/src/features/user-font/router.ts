import PromiseRouter from 'express-promise-router';
import {protectAndValidate} from '../../lib/auth';
import {NotFoundError} from '../../error';
import {BulkInsertUserFont, deleteUserFont, getUserFontsByUserId, bulkInsertUserFont, updateUserFont} from './database';
import {generatePreSignedUrlForUserFont} from '../s3/service';

export const userFontsRouter = PromiseRouter();

userFontsRouter.get('/', protectAndValidate(), async (req, res) => {
	const userFonts = await getUserFontsByUserId(req.user.id);
	const userFontsWithS3Link = await Promise.all(userFonts.map(async font => {
		const preSignedUrl = await generatePreSignedUrlForUserFont(
			'getObject',
			24 * 60 * 60,
			req.user.id,
			font.s3_font_name,
			font.file_extension,
		);
		return {
			...font,
			s3_font_link: preSignedUrl
		};
	}));
	res.status(200).json(userFontsWithS3Link);
});

userFontsRouter.post('/', protectAndValidate(), async (req, res) => {
	const userFonts = (req.body.userFonts as BulkInsertUserFont).map(font => {
		return {
			...font,
			user_id: req.user.id
		};
	});
	const created = await bulkInsertUserFont(userFonts);
	res.status(200).json(created);
});

userFontsRouter.delete('/:id', protectAndValidate(), async (req, res) => {
	const id = req.params.id;
	const deleted = await deleteUserFont(id);
	res.status(200).json(deleted);
});