import {Grid, Typography} from '@mui/material';
import {colors} from '../../themes';
import CampaignIcon from '@mui/icons-material/Campaign';
import {useHandleNavigation} from '../../utils/utils';
import CloseIcon from '@mui/icons-material/Close';
import React, {useEffect, useState} from 'react';
import {useAuth} from '../../contexts/UsersContext';
import {saleBannerHeight} from '../../const/ui';
import {getShortMonthAndDay, getTimeUntilSaleEnd} from '../../utils/time';
import {isSmallerThanMd} from '../../hooks/is-compact';
import {usePlans} from '../../contexts/PlansContext';

export const SaleBanner = () => {
	const smallerThanMd = isSmallerThanMd();

	const {
		isDrawerOpen,
	} = useAuth();

	const {
		isSaleBannerOpen,
		saleInfo,
		closeSaleBanner,
	} = usePlans();

	const handleNavigation = useHandleNavigation();

	const [countdown, setCountdown] = useState('');

	useEffect(() => {
		if (!isSaleBannerOpen || (smallerThanMd && isDrawerOpen)) {
			return;
		}
		const updateCountdown = () => {
			if (saleInfo?.sale_end_date) {
				const timeUntilSaleEnd = getTimeUntilSaleEnd(`${saleInfo.sale_end_date}`);
				if (timeUntilSaleEnd === 'Time\'s up!') {
					closeSaleBanner(false);
				}
				setCountdown(timeUntilSaleEnd);
			}
		};

		updateCountdown();
		const intervalId = setInterval(updateCountdown, 1000);

		return () => clearInterval(intervalId);
	}, [saleInfo?.sale_end_date, smallerThanMd, isSaleBannerOpen]);

	return (
		<>
			{isSaleBannerOpen && (
				<Grid container item xs={12} alignItems="center" sx={{position: 'fixed', height: `${saleBannerHeight}px`, backgroundColor: '#FFCF46', zIndex: 1200}}>
					<Grid container item xs={1} justifyContent="end">
						<CampaignIcon style={{marginLeft: '5px', color: colors.font.secondary}}/>
					</Grid>
					<Grid item xs={10}>
						<Typography
							fontWeight="400"
							variant="h6"
							component="p"
							align="center"
							color={colors.font.secondary}
							sx={{
								fontSize: {xs: '14px', sm: '16px', md: '16px', lg: '20px', xl: '20px'}
							}}
						>
							<strong>AUTUMN SALE:</strong> Get 20% off on <i style={{cursor: 'pointer', textDecoration: 'underline'}} onClick={() => {handleNavigation('/pricing', false);}}>all plans</i> until {getShortMonthAndDay(`${saleInfo?.sale_end_date}`)}.<br/>
							<strong style={{cursor: 'pointer', textDecoration: 'underline'}} onClick={() => {handleNavigation('/pricing', false);}}>Hurry, only {`${countdown} left!` || ''}</strong>

						</Typography>
					</Grid>
					<Grid item xs={1}>
						<CloseIcon
							style={{color: colors.font.secondary}}
							onClick={() => {
								closeSaleBanner(true);
							}}
						/>
					</Grid>
				</Grid>
			)}
		</>
	);
};
