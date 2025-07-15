import {Container} from '@mui/system';
import React from 'react';
import {useLocation} from 'react-router-dom';
import {useAuth} from '../../contexts/UsersContext';
import {usePlans} from '../../contexts/PlansContext';

export const BaseLayout: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const location = useLocation();
	const {currentSaleBannerHeight} = usePlans();
	const isLandingPage = location.pathname === '/';
	const isTranscribePage = location.pathname.startsWith('/transcribe');
	const isLandingPageOrTranscribe = isLandingPage || isTranscribePage;

	const buffer = 96;

	return (
		<Container
			maxWidth={isLandingPageOrTranscribe ? false : 'lg'}
			disableGutters={isLandingPageOrTranscribe}
			component="div"
			sx={{
				pt: `${currentSaleBannerHeight+buffer}px`,
				pb: 12,
				'& > *:not(:last-child)': { mb: 1 },
				// overflowY: 'hidden',
				height: '100%'
			}}
		>
			{children}
		</Container>
	);
};
