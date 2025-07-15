import {isSmallerThanMd} from '../../../hooks/is-compact';
import {CurrentStyleTab, useTranscriptionContext} from '../../../contexts/TranscriptionContext';
import {Button, Grid, Typography} from '@mui/material';
import {colors} from '../../../themes';
import * as React from 'react';
import {underlineStyle} from './shared';

interface Props {
	styleTab: CurrentStyleTab
}

export const TranscriptionStyleTabButton: React.FC<Props> = ({
	styleTab
}) => {
	const smallerThanMd = isSmallerThanMd();

	const {
		currentStyleTab,
		setCurrentStyleTab
	} = useTranscriptionContext();

	const condition = currentStyleTab === styleTab;

	return (
		<Button
			onClick={() => {
				setCurrentStyleTab(styleTab);
			}}
			sx={{
				borderRadius: 1,
				mb: smallerThanMd ? 0 : 1
			}}
		>
			<Grid container item>
				<Grid item xs={12}>
					<Typography
						color={colors.grey}
						textAlign="center"
						fontWeight={condition ? 'bold' : '500'}
						fontSize={smallerThanMd ? '14px' : '16px'}
						sx={{
							position: 'relative',
							color: condition ? colors.palette.primary : colors.grey,
							...underlineStyle(true, condition, -8)
						}}
					>
						{styleTab}
					</Typography>

				</Grid>
			</Grid>

		</Button>
	);
};