import {Grid, IconButton, Typography} from '@mui/material';
import {colors} from '../../themes';
import React from 'react';
import {UIDialog} from '../ui/UIDialog';
import {UIButton} from '../ui/UIButton';
import {lighten} from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PlanIcons from '../../assets/svg/PlanIcons.svg';
import {UIText} from '../ui/UIText';

interface Props {
	title: string;
    isUpgradeDialogOpen: boolean;
    setIsUpgradeDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UpgradeDialog: React.FC<Props> = ({ title, isUpgradeDialogOpen, setIsUpgradeDialogOpen }) => {
	return (
		<UIDialog
			open={isUpgradeDialogOpen}
			maxWidth="700px"
			title={''}
			topRightElement={
				<IconButton
					aria-label="close"
					onClick={() => setIsUpgradeDialogOpen(false)}
					sx={{
						position: 'absolute',
						right: 14,
						top: 14,
						color: 'white',
						backgroundColor: colors.palette.primary,
						'&:hover': {
							backgroundColor: lighten(colors.palette.primary, 0.15),
						}
					}}
				>
					<CloseIcon />
				</IconButton>
			}
			content={
				<Grid container alignItems="center" justifyContent="center" rowSpacing={1}>
					<Grid item xs={12} sx={{ textAlign: 'center', mb: 2 }}>
						<img src={PlanIcons} alt="Plan icons" style={{ maxWidth: '100%', height: 'auto' }}/>
					</Grid>
					<Grid item xs={12} mb={2}>
						<UIText
							variant="h3"
							sx={{color: 'black', textAlign: 'center'}}
						>
							Upgrade plan to {title}
						</UIText>
					</Grid>
					<Grid item xs={12} mb={2}>
						<UIText
							variant="small"
							sx={{color: 'black', textAlign: 'center'}}
						>
							Unlock the full potential of our platform with an upgraded plan! Enjoy exclusive features designed to enhance your productivity.
						</UIText>
					</Grid>
					<Grid container item xs={12} justifyContent="center" mb={2}>
						<UIButton
							title="Compare plans"
							colorType="primary"
							variant="contained"
							textColor="white"
							onClick={() => {
								window.open('/pricing', '_blank');
								setIsUpgradeDialogOpen(false);
							}}
						>
							<ArrowForwardIcon sx={{mb: '-4px'}}/>
						</UIButton>
					</Grid>
				</Grid>
			}
		/>
	);
};