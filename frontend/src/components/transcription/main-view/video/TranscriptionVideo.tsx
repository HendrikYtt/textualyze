import {ButtonGroup, Grid, Tooltip} from '@mui/material';
import {Player} from '@remotion/player';
import {fpsConst} from '@hendrikytt/api-contracts/dist/remotion';
import * as React from 'react';
import {useTranscriptionContext} from '../../../../contexts/TranscriptionContext';
import {isSmallerThanMd, isSmallerThanSm, isSmallerThanXl} from '../../../../hooks/is-compact';
import {RemotionFrame} from '../../../remotion/RemotionFrame';
import {appBarHeight, dashboardDropdownZIndex, dialogZIndex, transcriptionVideoZIndex} from '../../../../const/ui';
import {useAuth} from '../../../../contexts/UsersContext';
import {isChrome, isEdge, isSafari} from 'react-device-detect';
import {useEffect, useState} from 'react';
import {UploadedFileInfo} from '../../common/UploadedFileInfo';
import {TranscriptionExport} from '../settings/TranscriptionExport';
import {useUserTemplates} from '../../../../contexts/UserTemplatesContext';
import {TranscriptionSaveProject} from '../settings/TranscriptionSaveProject';
import {useUserProjects} from '../../../../contexts/UserProjectsContext';
import {useTrimAndCropContext} from '../../../../contexts/TrimAndCropContext';
import {delay} from '../../../../utils/time';
import {UIButton} from '../../../ui/UIButton';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import {colors} from '../../../../themes';
import {isEqual} from 'lodash';

export const TranscriptionVideo = () => {

	const smallerThanMd = isSmallerThanMd();
	const smallerThanSm = isSmallerThanSm();
	const smallerThanXl = isSmallerThanXl();

	const {
		isAddNewUserTemplateDialogOpen
	} = useUserTemplates();

	const {
		isDrawerOpen
	} = useAuth();

	const {resetTrimAndCropState} = useTrimAndCropContext();

	const [hasVideoInitialized, setHasVideoInitialized] = useState(false);

	const {
		adjustedFileData,
		videoSrc,
		playerRef,
		requestPayload,
		resetTranscriptionsState,
		isTranscriptionStreamFinished,
		isTranscriptionDrawerOpen,
		isConfigurationOpen,
		isSelectTranslateOpen,
		drawerBleeding,
		isFontSelectionOpen,
		isiPhoneRatio,
		past,
		future,
		undo,
		redo,
		requestPayloadToRevertTo,
		revertChanges
	} = useTranscriptionContext();

	const {
		isAllChangesSavedTooltipOpen
	} = useUserProjects();

	useEffect(() => {
		const adjustPlayer = async () => {
			if (playerRef.current && smallerThanMd && !hasVideoInitialized) {
				setHasVideoInitialized(true);
				playerRef.current.mute();
				playerRef.current.play();
				await delay(300);
				playerRef.current.pause();
				playerRef.current.unmute();
				playerRef.current.seekTo(0);
			}
		};
		adjustPlayer();
	}, [playerRef.current, hasVideoInitialized]);

	const getVideoZIndex = () => {
		return (
			!smallerThanSm
			|| isSelectTranslateOpen
			|| isConfigurationOpen
			|| isDrawerOpen
			|| isAddNewUserTemplateDialogOpen
			|| isAllChangesSavedTooltipOpen
			|| isFontSelectionOpen
		)
			? 1
			: transcriptionVideoZIndex;
	};

	const {adjustedHeight, adjustedWidth, compressedWidth, compressedHeight, duration} = adjustedFileData;

	const getMaxHeight = () => {
		if (smallerThanMd && isTranscriptionDrawerOpen) {
			return '25svh';
		}
		if (smallerThanMd) {
			let addition = 0;
			if (isEdge) {
				addition = 20;
			} else if (isSafari) {
				addition = 20;
			} else if (isChrome) {
				addition = 0;
				if (isiPhoneRatio) {
					addition = 30;
				}
			}
			return `calc(100svh - ${appBarHeight + drawerBleeding + addition}px)`;
		} else if (!smallerThanMd && smallerThanXl) {
			return `calc(100vh - ${appBarHeight + 90}px - 3vh)`;
		} else {
			return `calc(100vh - ${appBarHeight + 90 + 100}px)`;
		}
	};

	return (
		<Grid container item justifyContent="center" sx={{height: '100%'}}>
			<Grid
				container
				item
				justifyContent="center"
				xs={12}
				sx={{
					px: {
						xs: 2,
						md: 4
					},
					pb: {
						xs: 0,
						md: 6
					},
					pt: {
						xs: 0,
						md: 2
					}
				}}
				style={{
					maxWidth: '100vw',
					maxHeight: getMaxHeight(),
					aspectRatio: `${adjustedWidth / adjustedHeight}`
				}}
			>
				{isTranscriptionStreamFinished && (
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							...(smallerThanMd
								? {
									position: 'fixed',
									top: '10px',
									right: '16px',
									justifyContent: 'flex-end',
									columnGap: '8px',
									zIndex: dashboardDropdownZIndex
								}
								: {
									width: '100%',
									justifyContent: 'space-between',
									marginTop: '12px',
									marginBottom: '8px'
								}
							)
						}}
					>
						{/* Left Side Content (Large Screens) */}
						{!smallerThanMd && (
							<>
								<div style={{display: 'flex', alignItems: 'center', columnGap: '16px'}}>
									<TranscriptionSaveProject/>
								</div>
								<div style={{display: 'flex', alignItems: 'center', columnGap: '8px'}}>
									<Tooltip title="Undo (Ctrl + Z)" arrow placement="top">
										<span>
											<UIButton
												title={''}
												disabled={past.length === 0}
												onClick={undo}
												colorType="primary"
												textColor={colors.palette.primary}
												borderColor={colors.palette.primary}
												backgroundColor="transparent"
												variant="contained"
												sx={{
													m: 0,
													py: 0.25,
													minHeight: '34px',
													height: '34px',
													minWidth: '36px',
													width: '36px',
												}}
											>
												<UndoIcon/>
											</UIButton>
										</span>
									</Tooltip>
									<Tooltip title="Redo (Ctrl + Y)" arrow placement="top">
										<span>
											<UIButton
												title={''}
												disabled={future.length === 0}
												onClick={redo}
												colorType="primary"
												textColor={colors.palette.primary}
												borderColor={colors.palette.primary}
												backgroundColor="transparent"
												variant="contained"
												sx={{
													m: 0,
													py: 0.25,
													minHeight: '34px',
													height: '34px',
													minWidth: '36px',
													width: '36px',
												}}
											>
												<RedoIcon/>
											</UIButton>
										</span>
									</Tooltip>

									{/* Revert Button */}
									<Tooltip title="Revert changes to initial" arrow placement="top">
										<span>
											<UIButton
												title="Revert"
												colorType="primary"
												variant="contained"
												backgroundColor="transparent"
												borderColor={colors.palette.primary}
												textColor={colors.palette.primary}
												onClick={revertChanges}
												disabled={isEqual(
													requestPayload,
													requestPayloadToRevertTo.requestPayload
												)}
												fontSize="14px"
												sx={{
													maxHeight: '34px',
													marginLeft: '8px',
												}}
											>

											</UIButton>
										</span>
									</Tooltip>
								</div>
							</>
						)}

						{/* Right Side Content */}
						<div style={{display: 'flex', alignItems: 'center', columnGap: '16px'}}>
							{smallerThanMd && <TranscriptionSaveProject/>}
							<TranscriptionExport/>
						</div>
					</div>
				)}

				<Player
					ref={playerRef}
					component={RemotionFrame}
					durationInFrames={Math.ceil(duration * fpsConst)}
					compositionWidth={compressedWidth}
					compositionHeight={compressedHeight}
					fps={fpsConst}
					controls
					inputProps={{
						requestPayload: JSON.stringify(requestPayload),
						videoSrc: videoSrc
					}}
					style={{
						width: !smallerThanMd && smallerThanXl ? '95%' : '100%',
						zIndex: getVideoZIndex(),
						height: !smallerThanMd && smallerThanXl ? '95%' : '100%'
					}}
				/>
				<Grid container item sx={{
					alignSelf: 'flex-end',
					marginBottom: '-20px',
					width: !smallerThanMd && smallerThanXl ? '95%' : '100%'
				}}>
					{!smallerThanMd && (
						<UploadedFileInfo
							fontColor={'#6B6B6B'}
							height="70px"
							closeDisabled={!isTranscriptionStreamFinished}
							onClick={() => {
								resetTranscriptionsState();
								resetTrimAndCropState();
							}}
							isHighlighted={false}
						/>
					)}
				</Grid>
			</Grid>

		</Grid>
	)
	;
};
