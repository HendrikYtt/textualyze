import * as React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Grid, Link, SxProps, Theme} from '@mui/material';
import {useHandleNavigation} from '../../utils/utils';
import {FaDiscord, FaLinkedin} from 'react-icons/fa';
import {MdOutlineMailOutline} from 'react-icons/md';
import {discordLink} from '../../const/ui';

type CopyrightProps = {
    sx?: SxProps<Theme>;
};

const Copyright: React.FC<CopyrightProps> = () => {
	const handleNavigation = useHandleNavigation();

	return (
		<Typography
			fontSize="12px"
			variant="body2"
			color="text.primary"
			align="center"
			onClick={() => {
				handleNavigation('/', false);
			}}
		>
			{'Copyright © Textualyze '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
};

export const Footer = () => {
	const handleNavigation = useHandleNavigation();

	const isTranscribePage = location.pathname.startsWith('/transcribe');

	return (
		<Container
			maxWidth="md"
			component="footer"
			sx={{
				paddingBottom: '5px',
				height: '88px'
			}}
		>

			{(!isTranscribePage) && (
				<>
					<Grid container justifyContent="center" spacing={2} mb={1}>
						<Grid item>
							<Link href="https://www.linkedin.com/company/textualyze/" target="_blank" sx={{ color: 'white' }}>
								<FaLinkedin size={25}/>
							</Link>
						</Grid>
						<Grid item>
							<Link href="mailto:info@textualyze.com" sx={{ color: 'white' }}>
								<MdOutlineMailOutline size={25}/>
							</Link>
						</Grid>
					</Grid>
					<Typography
						variant="body2"
						fontSize="12px"
						component="div"
						align="center"
						onClick={() => {
							handleNavigation('/terms-and-privacy', false);
						}}
						sx={{
							textDecoration: 'underline',
							'&:hover': {
								cursor: 'pointer'
							},
						}}>
						Terms and Privacy Policy
					</Typography>
					<Copyright />
				</>
			)}

		</Container>
	);
};
