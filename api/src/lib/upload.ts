import multer from 'multer';
import path from 'path';
import {incomingFilesPath} from '../config';

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(process.cwd(), incomingFilesPath));
	},
	filename: (req, file, cb) => {
		const { requestId } = req.params;
		cb(null, `${requestId}.mp4`);
	}
});
export const upload = multer({ storage: storage });