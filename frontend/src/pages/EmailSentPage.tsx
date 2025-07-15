import {Button, Grid, Link, Paper, Typography} from '@mui/material';
import React from 'react';
import EmailSentIcon from '../assets/images/EmailSent.png';
import {useHandleNavigation} from '../utils/utils';
import {GmailSVG} from '../assets/GmailSVG';
import {OutlookSVG} from '../assets/OutlookSVG';

export const EmailSentPage = () => {
	const handleNavigation = useHandleNavigation();

	return (
		<Paper
			sx={{
				padding: 3,
				width: '350px',
				mx: 'auto',
				mt: 5,
				borderRadius: '8px',
				boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
			}}>
			<Grid container justifyContent="center" direction="column" alignItems="center" spacing={2}>
				{/* Email Icon with Checkmark */}
				<Grid item>
					<img
						src={EmailSentIcon}
						height={200}
						alt="Google logo"
					/>
				</Grid>

				{/* Email Sent Text */}
				<Grid item>
					<Typography fontWeight="700" variant="h5" textAlign="center" color="text.secondary">Login link was sent to your inbox!</Typography>
				</Grid>

				{/* Open Gmail and Open Outlook buttons */}
				<Grid item container spacing={1} justifyContent="center">
					<Grid item xs={12}>
						<Button
							variant="outlined"
							fullWidth
							onClick={() => window.open('https://gmail.com/', '_blank')}
						>
							<Grid container alignItems="center" justifyContent="center">
								<Grid item alignItems="center" display="flex">
									<GmailSVG/>
								</Grid>
								<Grid item xs>
									<Typography sx={{textAlign: 'center'}} color="text.secondary">Open Gmail</Typography>
								</Grid>
								<Grid item style={{flexBasis: '24px', flexGrow: 0}}>
									{/* This is an empty placeholder that takes up the same space as the icon */}
								</Grid>
							</Grid>
						</Button>
					</Grid>

					<Grid item xs={12}>
						<Button
							variant="outlined"
							fullWidth
							onClick={() => window.open('https://outlook.com/', '_blank')}
							sx={{justifyContent: 'center'}}
						>
							<Grid container alignItems="center" justifyContent="center">
								<Grid item alignItems="center" display="flex">
									<OutlookSVG/>
								</Grid>
								<Grid item xs>
									<Typography sx={{textAlign: 'center'}} color="text.secondary">Open Outlook</Typography>
								</Grid>
								<Grid item style={{flexBasis: '24px', flexGrow: 0}}>
									{/* This is an empty placeholder that takes up the same space as the icon */}
								</Grid>
							</Grid>
						</Button>
					</Grid>
				</Grid>

				<Grid item>
					<Typography variant="body2" textAlign="center" sx={{opacity: 0.8}} color="text.secondary">Can&apos;t find the email?
						Don&apos;t forget to check your spam folder.</Typography>
				</Grid>
				<Grid item>
					<Typography variant="body2" textAlign="center" sx={{opacity: 0.8}} color="text.secondary">
						Wrong email?{' '}<Link sx={{userSelect: 'none', cursor: 'pointer'}} onClick={() => {
							handleNavigation(-1, false);
						}}>Try again</Link>
					</Typography>
				</Grid>
			</Grid>
		</Paper>
	);
};
