import {AdjustedFileData, SelectionOptions, UploadedFile} from '../types';
import {TranscribeRequest} from '@hendrikytt/api-contracts';

export const supportedMediaTypes = [
	'audio/mp3',
	'audio/mpeg',
	'audio/wav',
	'audio/aac',
	'audio/ogg',
	'audio/flac',
	'video/mp4',
	'video/webm',
	'video/quicktime',
	'video/x-matroska',
	'video/x-m4v',
	'video/avi',
	'video/mpeg',
	'video/x-msvideo',
	'video/x-ms-wmv',
];

export const defaultUploadedFile: UploadedFile = {
	name: '',
	duration: 0,
	size: 0,
	width: 0,
	height: 0
};

export const defaultAdjustedFileData: AdjustedFileData = {
	...defaultUploadedFile,
	adjustedHeight: 0,
	adjustedWidth: 0,
	xOffset: 0,
	yOffset: 0,
	adjustedStartTime: 0,
	adjustedEndTime: 0,
	compressedWidth: 0,
	compressedHeight: 0
};

export const drawerPercentage = 60;

export const addNewFont = 'Add new font';

export const fontOptions: SelectionOptions[] = [
	{
		label: addNewFont,
		value: addNewFont,
	},
	{
		label: 'Cabin',
		value: 'Cabin',
	},
	{
		label: 'Fira Sans Condensed',
		value: 'Fira Sans Condensed',
	},
	{
		label: 'GT Walsheim',
		value: 'GT Walsheim',
	},
	{
		label: 'Indie Flower',
		value: 'Indie Flower',
	},
	{
		label: 'Josefin Sans',
		value: 'Josefin Sans',
	},
	{
		label: 'MrBeast',
		value: 'MrBeast',
	},
	{
		label: 'Nunito',
		value: 'Nunito',
	},
	{
		label: 'Opinion',
		value: 'Opinion',
	},
	{
		label: 'Plus Jakarta Sans',
		value: 'Plus Jakarta Sans',
	},
	{
		label: 'Poppins',
		value: 'Poppins',
	},
	{
		label: 'Roboto',
		value: 'Roboto',
	},
	{
		label: 'The Bold Font',
		value: 'The Bold Font',
	},
	{
		label: 'Tinos',
		value: 'Tinos',
	},
];
