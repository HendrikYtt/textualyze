import { calculateNewDimensions } from './trim-and-crop';
import { SelectedAspectRatio } from '../components/trim-and-crop/TrimAndCropConfiguration';

describe('trim-and-crop', () => {
	it('iphone video - Original ratio', () => {
		const width = 1080;
		const height = 1920;
		const aspectRatio: SelectedAspectRatio = 'Original';
		const { croppedHeight, croppedWidth } = calculateNewDimensions(width, height, aspectRatio);
		expect(croppedHeight).toStrictEqual(1920);
		expect(croppedWidth).toStrictEqual(1080);
	});

	it('iphone video - 16:9 ratio', () => {
		const width = 1080;
		const height = 1920;
		const aspectRatio: SelectedAspectRatio = '16:9';
		const { croppedHeight, croppedWidth } = calculateNewDimensions(width, height, aspectRatio);
		expect(croppedHeight).toStrictEqual(608);
		expect(croppedWidth).toStrictEqual(1080);
	});

	it('iphone video - 9:16 ratio', () => {
		const width = 1080;
		const height = 1920;
		const aspectRatio: SelectedAspectRatio = '9:16';
		const { croppedHeight, croppedWidth } = calculateNewDimensions(width, height, aspectRatio);
		expect(croppedHeight).toStrictEqual(1920);
		expect(croppedWidth).toStrictEqual(1080);
	});

	it('iphone video - 1:1 ratio', () => {
		const width = 1080;
		const height = 1920;
		const aspectRatio: SelectedAspectRatio = '1:1';
		const { croppedHeight, croppedWidth } = calculateNewDimensions(width, height, aspectRatio);
		expect(croppedHeight).toStrictEqual(1080);
		expect(croppedWidth).toStrictEqual(1080);
	});

	it('iphone video - 4:5 ratio', () => {
		const width = 1080;
		const height = 1920;
		const aspectRatio: SelectedAspectRatio = '4:5';
		const { croppedHeight, croppedWidth } = calculateNewDimensions(width, height, aspectRatio);
		expect(croppedHeight).toStrictEqual(1350);
		expect(croppedWidth).toStrictEqual(1080);
	});

	it('landscape video - Original ratio', () => {
		const width = 1920;
		const height = 1080;
		const aspectRatio: SelectedAspectRatio = 'Original';
		const { croppedHeight, croppedWidth } = calculateNewDimensions(width, height, aspectRatio);
		expect(croppedHeight).toStrictEqual(1080);
		expect(croppedWidth).toStrictEqual(1920);
	});

	it('landscape video - 16:9 ratio', () => {
		const width = 1920;
		const height = 1080;
		const aspectRatio: SelectedAspectRatio = '16:9';
		const { croppedHeight, croppedWidth } = calculateNewDimensions(width, height, aspectRatio);
		expect(croppedHeight).toStrictEqual(1080);
		expect(croppedWidth).toStrictEqual(1920);
	});

	it('landscape video - 9:16 ratio', () => {
		const width = 1920;
		const height = 1080;
		const aspectRatio: SelectedAspectRatio = '9:16';
		const { croppedHeight, croppedWidth } = calculateNewDimensions(width, height, aspectRatio);
		expect(croppedHeight).toStrictEqual(1080);
		expect(croppedWidth).toStrictEqual(608);
	});

	it('landscape video - 1:1 ratio', () => {
		const width = 1920;
		const height = 1080;
		const aspectRatio: SelectedAspectRatio = '1:1';
		const { croppedHeight, croppedWidth } = calculateNewDimensions(width, height, aspectRatio);
		expect(croppedHeight).toStrictEqual(1080);
		expect(croppedWidth).toStrictEqual(1080);
	});

	it('landscape video - 4:5 ratio', () => {
		const width = 1920;
		const height = 1080;
		const aspectRatio: SelectedAspectRatio = '4:5';
		const { croppedHeight, croppedWidth } = calculateNewDimensions(width, height, aspectRatio);
		expect(croppedHeight).toStrictEqual(1080);
		expect(croppedWidth).toStrictEqual(864);
	});
});