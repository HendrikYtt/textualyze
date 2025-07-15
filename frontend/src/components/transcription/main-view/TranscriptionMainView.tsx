import {Fab, Grid, Stack, Tooltip} from '@mui/material';
import {TranscriptionSettings} from './settings/TranscriptionSettings';
import {TranscriptionVideo} from './video/TranscriptionVideo';
import TranscriptionDrawer from '../common/TranscriptionDrawer';
import * as React from 'react';
import {useEffect} from 'react';
import {isSmallerThanMd} from '../../../hooks/is-compact';
import {useTranscriptionContext} from '../../../contexts/TranscriptionContext';
import {useAuth} from '../../../contexts/UsersContext';
import {dialogZIndex, transcriptionVideoCloseFabZIndex} from '../../../const/ui';
import {TranscriptionStyleButton} from '../common/TranscriptionStyleButton';
import {TranscriptionScriptButton} from '../common/TranscriptionScriptButton';
import {TranscriptionSocialsButton} from '../common/TranscriptionSocialsButton';
import {useUserProjects} from '../../../contexts/UserProjectsContext';
import {UpgradeDialog} from '../../layout/UpgradeDialog';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import CloseIcon from '@mui/icons-material/Close';
import {colors} from '../../../themes';
import {useTrimAndCropContext} from '../../../contexts/TrimAndCropContext';
import {isEqual} from 'lodash';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';

export const leftSideWidth = 80;
export const TranscriptionMainView = () => {
	const smallerThanMd = isSmallerThanMd();

	const {
		isDrawerOpen
	} = useAuth();

	const {resetTrimAndCropState} = useTrimAndCropContext();

	const {
		videoSrc,
		isTranscriptionStreamFinished,
		isConfigurationOpen,
		transcribingPercentage,
		revertChanges,
		resetTranscriptionsState,
		requestPayload,
		requestPayloadToRevertTo,
		future,
		past,
		undo,
		redo
	} = useTranscriptionContext();

	const {
		addNewProjectDialog,
		isUpgradeDialogOpen,
		setIsUpgradeDialogOpen,
	} = useUserProjects();

	useEffect(() => {
		if (transcribingPercentage >= 100 || isTranscriptionStreamFinished) {
			document.title = 'Textualyze - Transcript finished!';
			return;
		}
		document.title = `Textualyze - ${transcribingPercentage.toFixed(0)}% transcribed`;
	}, [transcribingPercentage, isTranscriptionStreamFinished]);

	const areEqual = isEqual(requestPayload.displayedTranscription, requestPayloadToRevertTo.requestPayload);

	return (
		<>
			{smallerThanMd && isTranscriptionStreamFinished && (
				<div>
					<Fab
						color="primary"
						size="small"
						sx={{
							position: 'absolute',
							top: 70,
							left: 15,
							zIndex: isDrawerOpen ? 1 : transcriptionVideoCloseFabZIndex,
							backgroundColor: 'white',
							border: `1px solid ${colors.palette.primary}`,
							'&:hover': {
								backgroundColor: 'white',
							},
						}}
						onClick={() => {
							resetTranscriptionsState();
							resetTrimAndCropState();
						}}
					>
						<Tooltip title="Close project" arrow placement="right-end" sx={{zIndex: dialogZIndex}}>
							<CloseIcon sx={{color: colors.palette.primary, backgroundColor: 'white'}}/>
						</Tooltip>
					</Fab>

					<Fab
						color="primary"
						size="small"
						sx={{
							position: 'absolute',
							top: 70,
							right: 115,
							zIndex: isDrawerOpen ? 1 : transcriptionVideoCloseFabZIndex,
							backgroundColor: past.length !== 0 ? 'white' : colors.grey,
							color: 'red',
							border: `1px solid ${past.length !== 0 ? colors.palette.primary : colors.grey}`,
							'&:hover': {
								backgroundColor: 'white',
							},
						}}
						onClick={() => {
							undo();
						}}
					>
						<Tooltip title="Undo (Ctrl + Z)" arrow placement="right-end" sx={{zIndex: dialogZIndex}}>
							<UndoIcon sx={{color: past.length !== 0 ? colors.palette.primary : colors.inputBorderGrey, backgroundColor: past.length !== 0 ? 'white' : colors.grey}}/>
						</Tooltip>
					</Fab>

					<Fab
						color="primary"
						size="small"
						sx={{
							position: 'absolute',
							top: 70,
							right: 65,
							zIndex: isDrawerOpen ? 1 : transcriptionVideoCloseFabZIndex,
							backgroundColor: future.length !== 0 ? 'white' : colors.grey,
							color: 'red',
							border: `1px solid ${future.length !== 0 ? colors.palette.primary : colors.grey}`,
							'&:hover': {
								backgroundColor: 'white',
							},
						}}
						onClick={() => {
							redo();
						}}
					>
						<Tooltip title="Redo (Ctrl + Y)" arrow placement="right-end" sx={{zIndex: dialogZIndex}}>
							<RedoIcon sx={{color: future.length !== 0 ? colors.palette.primary : colors.inputBorderGrey, backgroundColor: future.length !== 0 ? 'white' : colors.grey}}/>
						</Tooltip>
					</Fab>

					<Fab
						color="primary"
						size="small"
						sx={{
							position: 'absolute',
							top: 70,
							right: 15,
							zIndex: isDrawerOpen ? 1 : transcriptionVideoCloseFabZIndex,
							backgroundColor: !areEqual ? 'white' : colors.grey,
							color: 'red',
							border: `1px solid ${!areEqual ? colors.palette.primary : colors.grey}`,
							'&:hover': {
								backgroundColor: 'white',
							},
						}}
						onClick={() => {
							if (areEqual) {
								return;
							}
							revertChanges();
						}}
					>
						<Tooltip title="Revert changes" arrow placement="right-end" sx={{zIndex: dialogZIndex}}>
							<RotateLeftIcon sx={{color: !areEqual ? colors.palette.primary : colors.inputBorderGrey, backgroundColor: !areEqual ? 'white' : colors.grey}}/>
						</Tooltip>
					</Fab>
				</div>
			)}

			{smallerThanMd && (
				<Grid container>
					<Grid item xs={12}>
						{videoSrc !== '' && (
							<TranscriptionVideo />
						)}
					</Grid>
					<Grid container item alignItems="center" xs={12}>
						{!isDrawerOpen && !isConfigurationOpen && <TranscriptionDrawer />}
					</Grid>
				</Grid>
			)}
			{!smallerThanMd && (
				<Grid container>
					<Grid item sx={{width: `${leftSideWidth}px`, backgroundColor: 'white'}}>
						<Stack mt={2}>
							<TranscriptionScriptButton />
							<TranscriptionStyleButton />
							<TranscriptionSocialsButton />
						</Stack>
					</Grid>
					<Grid item xs={4.5}>
						<TranscriptionSettings />
					</Grid>
					<Grid container item alignItems="center" xs>
						{videoSrc !== '' && (
							<TranscriptionVideo />
						)}
					</Grid>
				</Grid>
			)}
			{addNewProjectDialog()}

			<UpgradeDialog
				title="save more projects"
				isUpgradeDialogOpen={isUpgradeDialogOpen}
				setIsUpgradeDialogOpen={setIsUpgradeDialogOpen}
			/>
		</>
	);
};