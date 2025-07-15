import {isSmallerThanMd} from '../../../hooks/is-compact';
import {useTranscriptionContext} from '../../../contexts/TranscriptionContext';
import {Button, Grid, Typography} from '@mui/material';
import SubtitlesOutlinedIcon from '@mui/icons-material/SubtitlesOutlined';
import {colors} from '../../../themes';
import * as React from 'react';
import {lighten} from '@mui/material/styles';
import {leftSideWidth} from '../main-view/TranscriptionMainView';

export const TranscriptionScriptButton = () => {
	const smallerThanMd = isSmallerThanMd();

	const {
		currentTab,
		setCurrentTab
	} = useTranscriptionContext();

	const condition = currentTab === 'script';

	return (
		<Button
			onClick={() => {
				setCurrentTab('script');
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
					<SubtitlesOutlinedIcon
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
                        Script
					</Typography>
				</Grid>
			</Grid>

		</Button>
	);
};