import {Button, Grid, Typography} from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import {colors} from '../../../themes';
import * as React from 'react';
import {useTranscriptionContext} from '../../../contexts/TranscriptionContext';
import {isSmallerThanMd} from '../../../hooks/is-compact';
import {lighten} from '@mui/material/styles';
import {leftSideWidth} from '../main-view/TranscriptionMainView';

export const TranscriptionSocialsButton = () => {
	const smallerThanMd = isSmallerThanMd();

	const {
		currentTab,
		setCurrentTab
	} = useTranscriptionContext();

	const condition = currentTab === 'socials';

	return (
		<Button
			onClick={() => {
				setCurrentTab('socials');
			}}
			sx={{
				borderRadius: 0,
				backgroundColor: condition ? colors.palette.primary : 'transparent',
				'&:hover': {
					backgroundColor: condition ? colors.palette.primary : lighten(colors.palette.primary, 0.8),
				},
				width: smallerThanMd ? '70px' : 'auto',
				height: smallerThanMd ? '58px' : `${leftSideWidth}px`
			}}
		>
			<Grid container item>
				<Grid
					container
					item
					justifyContent="center"
					xs={12}
				>
					<InstagramIcon
						style={{
							color: condition ? 'white' : colors.grey,
							fontSize: smallerThanMd ? '20px' : '30px'
						}}
					/>
				</Grid>
				<Grid item xs={12}>
					<Typography
						color={colors.grey}
						textAlign="center"
						fontWeight={condition ? 'bold' : '500'}
						fontSize={smallerThanMd ? '14px' : '16px'}
						sx={{
							position: 'relative',
							color: condition ? 'white' : colors.grey
						}}
					>
                        Socials
					</Typography>

				</Grid>
			</Grid>
		</Button>
	);

};