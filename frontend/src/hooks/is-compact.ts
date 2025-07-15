import {useMediaQuery, useTheme} from '@mui/material';

//400px
export const isSmallerThan400px = () => {
	return useMediaQuery('(max-width:400px)');
};

//600px
export const isSmallerThanSm = () => {
	const theme = useTheme();
	return useMediaQuery(theme.breakpoints.down('sm'));
};

//900px
export const isSmallerThanMd = () => {
	const theme = useTheme();
	return useMediaQuery(theme.breakpoints.down('md'));
};

//1050px
export const isSmallerThan1050px = () => {
	return useMediaQuery('(max-width:1050px)');
};

//1200px
export const isSmallerThanLg = () => {
	const theme = useTheme();
	return useMediaQuery(theme.breakpoints.down('lg'));
};

//1536px
export const isSmallerThanXl = () => {
	const theme = useTheme();
	return useMediaQuery(theme.breakpoints.down('xl'));
};
