import {CircularProgress, Grid, Typography} from '@mui/material';
import {colors} from '../../themes';
import React, {useState} from 'react';
import {useDialogContext} from '../../contexts/DialogContext';
import {useTranscriptionContext} from '../../contexts/TranscriptionContext';
import {displayError} from '../../utils/utils';
import {UIDialog} from '../ui/UIDialog';
import {UIButton} from '../ui/UIButton';

export const AreYouSureDialog = () => {
	const {isAreYouSureDialogOpen, setIsAreYouSureDialogOpen} = useDialogContext();
	const {requestId, setWillProgressBeLost} = useTranscriptionContext();
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async () => {
		try {
			setWillProgressBeLost(false);
			if (requestId) {
				setIsLoading(true);
			}
		} catch (e) {
			displayError(e);
		}
		setIsAreYouSureDialogOpen(false);
		setIsLoading(false);
	};

	return (
		<UIDialog
			open={isAreYouSureDialogOpen}
			title="Are you sure?"
			content={
				<Grid container direction="row" alignItems="center">
					<Grid item>
						<Typography variant="h6" component="div">
							You will lose all progress
						</Typography>
					</Grid>
				</Grid>
			}
			actions={isLoading ? (
				<Grid container alignItems="center" justifyContent="center">
					<CircularProgress/>
				</Grid>
			) : (
				<>
					<UIButton
						title="No"
						colorType="primary"
						variant="text"
						onClick={() => {setIsAreYouSureDialogOpen(false);}}
						textColor={colors.font.secondary}
					/>
					<UIButton
						title="Yes"
						colorType="primary"
						variant="text"
						onClick={handleSubmit}
						textColor={colors.font.secondary}
					/>
				</>
			)}
		/>
	);
};