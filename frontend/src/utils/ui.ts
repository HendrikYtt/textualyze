export const svg1Properties = (
	smallerThan400px: boolean,
	smallerThanSm: boolean,
	smallerThanMd: boolean,
	smallerThanLg: boolean,
	smallerThanXl: boolean
) => {
	if (smallerThan400px) {
		return {top: -5, width: 130};
	} else if (smallerThanSm) {
		return {top: -5, width: 100};
	} else if (smallerThanMd) {
		return {top: -5, width: 75};
	} else if (smallerThanLg) {
		return {top: -5, width: 60};
	} else if (smallerThanXl) {
		return {top: -5, width: 55};
	} else {
		return {top: -40, width: 60};
	}
};

export const svg2Properties = (
	smallerThan400px: boolean,
	smallerThanSm: boolean,
	smallerThanMd: boolean,
	smallerThanLg: boolean,
	smallerThanXl: boolean,
	forLandingPage: boolean
) => {
	if (smallerThan400px) {
		if (forLandingPage) {
			return {top1: 12, top2: 100, width: 160};
		} else {
			return {top1: 12, top2: 0, width: 200};
		}
	} else if (smallerThanSm) {
		if (forLandingPage) {
			return {top1: 12, top2: 100, width: 130};
		} else {
			return {top1: 12, top2: -10, width: 200};
		}
	} else if (smallerThanMd) {
		if (forLandingPage) {
			return {top1: 12, top2: 100, width: 140};
		} else {
			return {top1: 12, top2: -20, width: 230};
		}
	} else if (smallerThanLg) {
		if (forLandingPage) {
			return {top1: 12, top2: 120, width: 120};
		} else {
			return {top1: 12, top2: -50, width: 120};
		}
	} else if (smallerThanXl) {
		if (forLandingPage) {
			return {top1: 12, top2: 150, width: 100};
		} else {
			return {top1: 12, top2: -50, width: 110};
		}
	} else {
		if (forLandingPage) {
			return {top1: 12, top2: 290, width: 100};
		} else {
			return {top1: 12, top2: -20, width: 110};
		}
	}
};
