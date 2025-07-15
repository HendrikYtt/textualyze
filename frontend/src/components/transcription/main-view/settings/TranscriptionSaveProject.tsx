import {UIButton} from '../../../ui/UIButton';
import React from 'react';
import {useUserProjects} from '../../../../contexts/UserProjectsContext';
import {UpgradeDialog} from '../../../layout/UpgradeDialog';
import {colors} from '../../../../themes';
import {getPlanTypeIcon} from '../../../../utils/utils';
import {useAuth} from '../../../../contexts/UsersContext';
import {LinearProgress} from '@mui/material';
import Typography from '@mui/material/Typography';
import {userSelectNone} from '../../../../const/ui';
import CloudDoneOutlinedIcon from '@mui/icons-material/CloudDoneOutlined';
import {isSmallerThanSm} from '../../../../hooks/is-compact';

export const TranscriptionSaveProject = () => {
	const smallerThanSm = isSmallerThanSm();

	const {
		addNewProjectDialog,
		isUpgradeDialogOpen,
		setIsUpgradeDialogOpen,
		validateAddNewProject,
		isCurrentProjectSaved,
		isUpdatingUserProjectLoading
	} = useUserProjects();

	const {user} = useAuth();

	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center'
			}}
		>
			{!isCurrentProjectSaved && (
				<>
					<UIButton
						title="Save project"
						colorType="primary"
						variant="contained"
						backgroundColor="transparent"
						borderColor={colors.palette.primary}
						textColor={colors.palette.primary}
						onClick={validateAddNewProject}
						fontSize="14px"
					>
						{user?.current_plan.plan_type !== 'PRO' && (
							<div
								style={{
									marginTop: '-2px',
									marginBottom: '-10px',
									marginLeft: '3px'
								}}
							>
								{getPlanTypeIcon('PRO', '28px')}
							</div>
						)}

					</UIButton>
					{addNewProjectDialog()}

					<UpgradeDialog
						title="save more projects"
						isUpgradeDialogOpen={isUpgradeDialogOpen}
						setIsUpgradeDialogOpen={setIsUpgradeDialogOpen}
					/>
				</>
			)}
			{isCurrentProjectSaved && (
				<div
					style={{
						width: '180px'
					}}
				>
					{isUpdatingUserProjectLoading && (
						<LinearProgress />
					)}
					{!isUpdatingUserProjectLoading && (
						<>
							<Typography color={colors.grey}>
								<span style={{
									display: 'inline-flex',
									alignItems: 'center',
									justifyContent: 'center',
									fontWeight: 700,
									fontSize: smallerThanSm ? '12px' : '14px',
									...userSelectNone,
								}}>
									All changes saved
									<CloudDoneOutlinedIcon sx={{ ml: '6px', color: colors.grey }} />
								</span>
							</Typography>
						</>
					)}
				</div>
			)}
		</div>

	);
};