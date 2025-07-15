import {
	CircularProgress,
	Grid,
	LinearProgress,
	Typography
} from '@mui/material';
import React from 'react';
import Box from '@mui/material/Box';
import {UserTemplate} from '@hendrikytt/api-contracts';

const constructProgressBar = (percentage: number) => {
	if (percentage < 1) {
		return <LinearProgress/>;
	} else if (percentage >= 1 && percentage < 100) {
		return <LinearProgress variant='determinate' value={percentage}/>;
	} else {
		return <LinearProgress/>;
	}
};

const constructProgressText = (percentage: number) => {
	if (percentage < 1) {
		return 'Initializing';
	} else if (percentage >= 1 && percentage < 100) {
		return `${percentage.toFixed(0)}% complete`;
	} else {
		return 'Processing, please wait a few moments';
	}
};

export const constructProgressComponent = (percentage: number, textColor: string) => {
	return (
		<Grid container item direction="row" alignItems="center" spacing={1}>
			<Grid item xs={12}>
				<Box display="flex" alignItems="center" justifyContent="start">
					<Typography variant="body1" component="div" align="center" color={textColor} style={{ marginRight: '8px' }}>
						{constructProgressText(percentage)}
					</Typography>
					{percentage > 0 && percentage < 100 && <CircularProgress size={20}/>}
				</Box>
			</Grid>
			<Grid item xs={12}>
				{constructProgressBar(percentage)}
			</Grid>
		</Grid>
	);
};
