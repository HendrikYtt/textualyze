export const getCurrentMonthNumber = () => {
	const today = new Date();
	return today.getMonth() + 1;
};

export const getCurrentYear = () => {
	const today = new Date();
	return today.getFullYear();
};

export const delay = (ms: number) => {
	return new Promise( resolve => setTimeout(resolve, ms) );
};