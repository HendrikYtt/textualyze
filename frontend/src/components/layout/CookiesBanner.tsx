import { Grid, IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {colors} from '../../themes';
import {useAuth} from '../../contexts/UsersContext';
import {useHandleNavigation} from '../../utils/utils';
import CloseIcon from '@mui/icons-material/Close';
import {useEffect, useState} from 'react';

export const CookiesBanner = () => {
	const {
		isCookiesBannerShowing,
		acceptCookies,
		rejectCookies,
		setIsCookiesBannerShowing,
	} = useAuth();
	const handleNavigation = useHandleNavigation();

	const [bannerStyle, setBannerStyle] = useState({
		transition: 'transform 1s ease-out',
		transform: 'translateY(100%)'
	});

	useEffect(() => {
		if (isCookiesBannerShowing) {
			const timer = setTimeout(() => {
				setBannerStyle((prevState) => ({
					...prevState,
					transform: 'translateY(0)'
				}));
			}, 1500);

			return () => clearTimeout(timer);
		}
	}, [isCookiesBannerShowing]);

	return (
		<>
			{isCookiesBannerShowing && (
				<Grid container alignItems="center" style={{ ...bannerStyle, position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 2000, backgroundColor: 'white', padding: '10px' }}>
					<IconButton
						onClick={() => setIsCookiesBannerShowing(false)}
						style={{
							position: 'absolute',
							top: 0,
							right: 0,
						}}
					>
						<CloseIcon sx={{ color: 'black', fontSize: '12px' }} />
					</IconButton>
					<Grid item xs={12} sm={12} md={6} mb={{xs: 1, sm: 1, md: 0}} px={2}>
						<Typography fontSize="12px" color={colors.grey} textAlign={{xs: 'center', sm: 'center', md: 'start'}}>
							By clicking &apos;Accept Cookies&apos;, you agree to the storing of cookies on your device to enhance site usage and analyze site performance. <span onClick={() => handleNavigation('/terms-and-privacy', false)} style={{textDecoration: 'underline', cursor: 'pointer'}}>Cookie policy</span>
						</Typography>
					</Grid>
					<Grid container columnSpacing={1} item xs={12} sm={12} md={6} justifyContent="center">
						<Grid item>
							<Button
								variant="contained"
								onClick={() => {
									rejectCookies();
								}}
								sx={{
									borderRadius: '2px'
								}}
							>
								<Typography fontSize="12px">
									Reject Cookies
								</Typography>
							</Button>
						</Grid>
						<Grid item>
							<Button
								variant="contained"
								onClick={() => {
									acceptCookies();
								}}
								sx={{
									borderRadius: '2px'
								}}
							>
								<Typography fontSize="12px">
									Accept Cookies
								</Typography>
							</Button>
						</Grid>
					</Grid>
				</Grid>
			)}
		</>
	);
};
