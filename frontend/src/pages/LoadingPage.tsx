import {CircularProgress, Grid} from '@mui/material';
import React from 'react';

export const LoadingPage = () => {
	return (
		<Grid container alignItems="center" justifyContent="center" style={{height: '100vh'}}>
			<CircularProgress/>
		</Grid>
	);
};
