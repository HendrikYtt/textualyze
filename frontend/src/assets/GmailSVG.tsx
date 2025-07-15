import {Box, SxProps, Theme} from '@mui/material';
import React from 'react';

type GmailSVGProps = {
    sx?: SxProps<Theme>;
};

export const GmailSVG: React.FC<GmailSVGProps> = ({sx}) => {
	return (
		<Box display="flex" alignItems="center" sx={sx}>
			<svg fill="none" height="24" viewBox="0 0 25 19" width="24" xmlns="http://www.w3.org/2000/svg"
				 className="sc-bgqQcB gvEExp">
				<path
					d="m2.38637 18.5048h3.81818v-9.27278l-5.45455-4.09091v11.72729c0 .9055.73364 1.6364 1.63637 1.6364z"
					fill="#4285f4"></path>
				<path d="m19.2959 18.5048h3.8182c.9055 0 1.6364-.7337 1.6364-1.6364v-11.72729l-5.4546 4.09091"
					  fill="#34a853"></path>
				<path d="m19.2959 2.14101v7.09092l5.4546-4.09091v-2.18182c0-2.023648-2.31-3.177287-3.9273-1.963648"
					  fill="#fbbc04"></path>
				<path d="m6.2041 9.23203v-7.09092l6.5455 4.9091 6.5454-4.9091v7.09092l-6.5454 4.90907"
					  fill="#ea4335"></path>
				<path
					d="m.75 2.9592v2.18182l5.45455 4.09091v-7.09092l-1.52726-1.145458c-1.62001-1.213639-3.92729-.06-3.92729 1.963648z"
					fill="#c5221f"></path>
			</svg>
		</Box>
	);
};