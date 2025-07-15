import {Grid} from '@mui/material';
import React from 'react';
import {useTranscriptionContext} from '../../../../contexts/TranscriptionContext';
import {isSmallerThanMd} from '../../../../hooks/is-compact';
import {TranscriptionScriptButton} from '../../common/TranscriptionScriptButton';
import {TranscriptionStyleButton} from '../../common/TranscriptionStyleButton';
import {TranscriptionSocialsButton} from '../../common/TranscriptionSocialsButton';

export const TranscriptionSettingsTabs = () => {

	const smallerThanMd = isSmallerThanMd();

	const {
		isiPhoneRatio
	} = useTranscriptionContext();

	return (
		<Grid
			container
			item
			alignItems="center"
			justifyContent="center"
			xs={12}
			sx={{
				pl: 1,
				pr: 3,
				height: '75px',
				borderBottom: smallerThanMd ? '1px solid #D7D7D7' : 'none',
				borderTop: !smallerThanMd ? '1px solid #D7D7D7' : 'none'
			}}
		>
			<Grid container item xs={1.5}></Grid>
			<Grid
				container
				item
				xs={3}
				justifyContent="center"
			>
				<TranscriptionScriptButton />
			</Grid>
			<Grid
				container
				item
				xs={3}
				justifyContent="center"
			>
				<TranscriptionStyleButton />
			</Grid>
			<Grid
				container
				item
				xs={3}
				justifyContent="center"
			>
				<TranscriptionSocialsButton />
			</Grid>
			<Grid container item xs={1.5}></Grid>
		</Grid>
	);
};