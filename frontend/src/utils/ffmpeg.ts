import {toBlobURL} from '@ffmpeg/util';
import {FFmpeg} from '@ffmpeg/ffmpeg';
import React from 'react';

export const takeScreenshots = async (fetchedFile: Uint8Array, fileDuration: number, screenshotsAmount: number, setScreenShots: React.Dispatch<React.SetStateAction<string[]>>) => {
	const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.2/dist/umd';
	const ffmpeg = new FFmpeg();
	const coreURL = await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript');

	const wasmURL = await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm');
	await ffmpeg.load({
		wasmURL,
		coreURL
	});
	const inputFile = 'input_video.webm';
	await ffmpeg.writeFile(inputFile, fetchedFile);

	const interval = fileDuration / (screenshotsAmount + 1);

	for (let i = 0; i < screenshotsAmount; i++) {
		const screenshotTime = interval * (i + 1);
		const outputFile = `screenshot_${i}.jpg`;

		const cmd = [
			'-ss', `${screenshotTime.toFixed(2)}`,
			'-i', inputFile,
			'-frames:v', '1',
			'-q:v', '31',
			'-vf', 'scale=iw/10:ih/10',
			outputFile,
		];
		await ffmpeg.exec(cmd);

		const data = await ffmpeg.readFile(outputFile);
		const file = new File([data], outputFile, {type: 'image/jpeg'});
		const asUrl = URL.createObjectURL(file);
		setScreenShots(prevState => [...prevState, asUrl]);
	}

	if (fileDuration % interval !== 0) {
		const lastOutputFile = 'screenshot_last.jpg';
		const adjustedTime = (fileDuration - 0.04).toFixed(2);

		await ffmpeg.exec([
			'-ss', adjustedTime,
			'-i', inputFile,
			'-frames:v', '1',
			'-q:v', '31',
			'-vf', 'scale=iw/10:ih/10',
			lastOutputFile,
		]);

		const lastData = await ffmpeg.readFile(lastOutputFile);
		const file = new File([lastData], lastOutputFile, {type: 'image/jpeg'});
		const asUrl = URL.createObjectURL(file);
		setScreenShots(prevState => [...prevState, asUrl]);
	}
	ffmpeg.terminate();
};

export const getFileDetails = async (fetchedFile: Uint8Array) => {
	const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.2/dist/umd';
	const ffmpeg = new FFmpeg();
	const coreURL = await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript');

	const wasmURL = await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm');
	await ffmpeg.load({
		wasmURL,
		coreURL
	});

	const inputFile = 'input_video.webm';
	await ffmpeg.writeFile(inputFile, fetchedFile);

	let output = '';

	ffmpeg.on('log', ({ message }) => {
		output += message + '\n';
		// console.log('message', message);
	});

	await ffmpeg.exec(['-i', inputFile]);

	const durationRegex = /Duration: (\d{2}):(\d{2}):(\d{2}\.\d{2})/;
	const resolutionRegex = /, (\d+)x(\d+)/;
	const rotationRegex = /displaymatrix: rotation of (-?\d+\.\d+) degrees/;

	const durationMatch = output.match(durationRegex);
	const resolutionMatch = output.match(resolutionRegex);
	const rotationMatch = output.match(rotationRegex);

	let duration, width, height;

	if (durationMatch) {
		const hours = parseInt(durationMatch[1], 10);
		const minutes = parseInt(durationMatch[2], 10);
		const seconds = parseFloat(durationMatch[3]);
		duration = hours * 3600 + minutes * 60 + seconds;
	}

	if (resolutionMatch) {
		const dim1 = parseInt(resolutionMatch[1], 10);
		const dim2 = parseInt(resolutionMatch[2], 10);

		if (rotationMatch) {
			const rotation = parseFloat(rotationMatch[1]);
			if (Math.abs(rotation) === 90 || Math.abs(rotation) === 270) {
				width = Math.min(dim1, dim2);
				height = Math.max(dim1, dim2);
			} else {
				width = Math.max(dim1, dim2);
				height = Math.min(dim1, dim2);
			}
		} else if (dim1 < dim2) {
			width = dim1;
			height = dim2;
		} else {
			// If no rotation info, assume landscape
			width = Math.max(dim1, dim2);
			height = Math.min(dim1, dim2);
		}
	}

	ffmpeg.terminate();

	return { duration: duration!, width: width!, height: height! };
};