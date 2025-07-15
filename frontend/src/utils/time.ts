export const formatTime = (totalSeconds: number, omitMilliseconds = false): string => {
	const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
	const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
	const seconds = Math.floor(totalSeconds % 60).toString().padStart(2, '0');
	const milliseconds = Math.round((totalSeconds % 1) * 1000).toString().padStart(3, '0');

	if (omitMilliseconds) {
		return `${hours}:${minutes}:${seconds}`;
	} else {
		return `${hours}:${minutes}:${seconds}.${milliseconds}`;
	}
};

export const getCurrentMonthNumber = () => {
	const today = new Date();
	return today.getMonth() + 1;
};

export const getCurrentYear = () => {
	const today = new Date();
	return today.getFullYear();
};

export const msFormatToSeconds = (timeString: string): number | null => {
	const timeFormatRegex = /^\d{2}:\d{2}\.\d{2}$/;
	if (!timeFormatRegex.test(timeString)) {
		return null;
	}
	if (timeString === '00:00.00') {
		return 0;
	}

	const [minutesAndSeconds, hundredths] = timeString.split('.');
	const [minutes, seconds] = minutesAndSeconds.split(':').map(Number);

	const totalHundredths = (minutes * 60 + seconds) * 100 + parseInt(hundredths, 10);
	return totalHundredths / 100;
};

export const getTimeUntilSaleEnd = (targetDateString: string): string => {
	const targetDate = new Date(targetDateString);
	const now = new Date();
	const diff = targetDate.getTime() - now.getTime();

	if (diff <= 0) {
		return 'Time\'s up!';
	}

	const days = Math.floor(diff / (1000 * 60 * 60 * 24));
	const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
	const minutes = Math.floor((diff / (1000 * 60)) % 60);
	const seconds = Math.floor((diff / 1000) % 60);

	const timeParts = [];
	if (days > 0) timeParts.push(`${days}d`);
	if (hours > 0 || days > 0) timeParts.push(`${hours}h`); // Include hours if days are present
	if (minutes > 0 || hours > 0 || days > 0) timeParts.push(`${minutes}m`); // Include minutes if hours or days are present
	timeParts.push(`${seconds}s`); // Always include seconds

	return timeParts.join(' ');
};

export const getShortMonthAndDay = (dateString: string): string => {
	const date = new Date(dateString);
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	const month = months[date.getMonth()];
	const day = date.getDate();

	return `${month} ${day}`;
};

export const delay = (ms: number) => {
	return new Promise( resolve => setTimeout(resolve, ms) );
};