import {Grid, IconButton} from '@mui/material';
import {colors} from '../../themes';
import {lighten} from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import {UIDialog} from '../ui/UIDialog';
import React, {useEffect, useRef, useState} from 'react';
import {isSmallerThanMd, isSmallerThanSm} from '../../hooks/is-compact';
import {useTranscriptionContext} from '../../contexts/TranscriptionContext';
import {fpsConst} from '@hendrikytt/api-contracts/dist/remotion';
import {Player} from '@remotion/player';
import {TrimAndCropConfiguration} from './TrimAndCropConfiguration';
import {TrimAndCropFrame} from '../remotion/TrimAndCropFrame';
import {useTrimAndCropContext} from '../../contexts/TrimAndCropContext';
import {UIButton} from '../ui/UIButton';
import {displayError, displayInfo} from '../../utils/utils';
import {FrontendUser} from '@hendrikytt/api-contracts/src';
import {delay, getCurrentMonthNumber, getCurrentYear} from '../../utils/time';
import {getFileSizeInMB} from '../../utils/file-media';
import {usePlans} from '../../contexts/PlansContext';
import {tryoutUserId, useAuth} from '../../contexts/UsersContext';
import {UpgradeDialog} from '../layout/UpgradeDialog';
import {TrimAndCropAspectRatio} from './TrimAndCropAspectRatio';
import {PaymentWall} from '../stripe/PaymentWall';

export const greyAreaOverlay = 'rgba(60,61,89,0.6)';
export const greyAreaTimeline = 'rgba(60,61,89,0.9)';
export const TrimAndCrop = () => {
	const {
		isTrimAndCropOpen,
		setIsTrimAndCropOpen,
		trimmedStartTime,
		trimmedEndTime,
		trimAndCropPlayerRef,
		resetTrimAndCropState,
		isContinueLoading,
		setIsContinueLoading,
		setIsFileTrimmedAndCropped,
		previewDimensions
	} = useTrimAndCropContext();

	const {user} = useAuth();

	const {
		videoSrc,
		requestPayload,
		resetTranscriptionsState,
		resetFileUpload,
		setRequestPayload,
		setRequestId,
		adjustedFileData,
		setAdjustedFileData,
		originalFile,
		setAdjustedFile,
		originalCropDimensions,
		currentXOffset,
		currentYOffset,
		originalFileData,
		setIsConfigurationOpen,
		setWillProgressBeLost
	} = useTranscriptionContext();

	const {
		plans,
		proAnnualPlan
	} = usePlans();

	const [isUpgradeDialogOpen, setIsUpgradeDialogOpen] = useState(false);
	const [isPaymentWallOpen, setIsPaymentWallOpen] = useState(false);

	const smallerThanMd = isSmallerThanMd();
	const smallerThanSm = isSmallerThanSm();

	const videoWidth = previewDimensions?.previewWidth || originalFileData.width;
	const videoHeight = previewDimensions?.previewHeight || originalFileData.height;

	const originalVideoDurationInFrames = Math.ceil(originalFileData.duration * fpsConst);
	const trimmedVideoStartInFrames = Math.floor(fpsConst * trimmedStartTime);
	const trimmedVideoEndInFrames = Math.floor(Math.min(trimmedEndTime, originalFileData.duration) * fpsConst) - 1;

	useEffect(() => {
		setIsConfigurationOpen(false);
		const adjustPlayer = async () => {
			if (trimAndCropPlayerRef.current && smallerThanMd) {
				trimAndCropPlayerRef.current.mute();
				trimAndCropPlayerRef.current.play();
				await delay(300);
				trimAndCropPlayerRef.current.pause();
				trimAndCropPlayerRef.current.unmute();
				trimAndCropPlayerRef.current.seekTo(0);
			}
		};
		adjustPlayer();
	}, [trimAndCropPlayerRef.current]);

	const validateFileSizeAndDuration = (user: FrontendUser) => {
		const isLocalFile = requestPayload.uploadType === 'local';
		if (!originalFile && isLocalFile) {
			displayError(new Error('No file provided'));
			return;
		}
		setIsContinueLoading(true);
		const adjustedDuration = trimmedEndTime - trimmedStartTime;

		const uploadSizeLimit = user.current_plan.upload_limit_mb;
		const uploadDurationLimit = user.current_plan.upload_limit_seconds;
		if (!uploadSizeLimit || !uploadDurationLimit) {
			displayError(new Error('Could not fetch file limits'));
			setIsContinueLoading(false);
			return;
		}

		if (adjustedDuration > uploadDurationLimit) {
			if (adjustedDuration < proAnnualPlan.upload_limit_seconds) {
				if (user.current_plan.plan_type === 'FREE' || user.id === tryoutUserId) {
					setIsPaymentWallOpen(true);
					setWillProgressBeLost(false);
					return;
				}
				setIsUpgradeDialogOpen(true);
				setIsContinueLoading(false);
				return;
			} else {
				const limit = uploadDurationLimit / 60;
				let limitAsString = `${limit} minutes`;
				if (limit) {
					limitAsString = `${uploadDurationLimit} seconds`;
				}
				displayError(new Error(`File duration (${(adjustedDuration / 60).toFixed(2)} min) exceeds upload limit of ${limitAsString}`));
				setIsContinueLoading(false);
				return;
			}
		}
		const currentUsage = user.usages.find(usage => usage.month === getCurrentMonthNumber() && usage.year === getCurrentYear());
		const plan = plans.find(p => p.id === user.current_plan.id);
		if (currentUsage && plan && currentUsage.transcribed_seconds + adjustedDuration > plan.transcribed_seconds_monthly_limit) {
			setIsUpgradeDialogOpen(true);
			displayInfo(`File duration + current month usage exceeds current month usage limit of ${(plan.transcribed_seconds_monthly_limit / 60).toFixed(2)} minutes`);
			setIsContinueLoading(false);
			return;
		}

		if (isLocalFile) {
			setAdjustedFile(originalFile);
		}
		let xOffset: number;
		const originalWidth = originalFileData.width;
		const widthRatio = originalWidth / previewDimensions!.previewWidth;
		if (!currentXOffset.current && originalCropDimensions.current.width !== originalWidth) {
			xOffset = (originalWidth - originalCropDimensions.current.width) / 2;
		} else {
			xOffset = currentXOffset.current! * widthRatio;
		}

		let yOffset: number;
		const originalHeight = originalFileData.height;
		const heightRatio = originalHeight / previewDimensions!.previewHeight;
		if (!currentYOffset.current && originalCropDimensions.current.height !== originalHeight) {
			yOffset = (originalHeight - originalCropDimensions.current.height) / 2;
		} else {
			yOffset = currentYOffset.current! * heightRatio;
		}

		const sizeMB = isLocalFile ? getFileSizeInMB(originalFile!) : 0;

		setAdjustedFileData(prevState => {
			return {
				...prevState,
				width: originalFileData.width,
				height: originalFileData.height,
				size: sizeMB,
				adjustedWidth: originalCropDimensions.current.width,
				adjustedHeight: originalCropDimensions.current.height,
				xOffset: xOffset,
				yOffset: yOffset,
				adjustedStartTime: trimmedStartTime,
				adjustedEndTime: trimmedEndTime,
				duration: originalFileData.duration
			};
		});

		const fileExtension = adjustedFileData.name.split('.').pop() || '.mp4';
		const rId = crypto.randomUUID();
		setRequestId(rId);
		setRequestPayload(prevState => ({
			...prevState,
			requestId: rId,
			originalFileExtension: fileExtension,
			width: originalWidth,
			height: originalHeight,
			duration: adjustedDuration,
			size: sizeMB,
			adjustedWidth: originalCropDimensions.current.width,
			adjustedHeight: originalCropDimensions.current.height,
			xOffset: xOffset,
			yOffset: yOffset,
			adjustedStartTime: trimmedStartTime,
			adjustedEndTime: trimmedEndTime
		}));
		setIsTrimAndCropOpen(false);
		setIsConfigurationOpen(true);
		setIsContinueLoading(false);
		setIsFileTrimmedAndCropped(true);
	};

	const validateExampleFile = () => {
		setIsContinueLoading(true);
		const adjustedDuration = trimmedEndTime - trimmedStartTime;

		let xOffset: number;
		const originalWidth = originalFileData.width;
		const widthRatio = originalWidth / previewDimensions!.previewWidth;
		if (!currentXOffset.current && originalCropDimensions.current.width !== originalWidth) {
			xOffset = (originalWidth - originalCropDimensions.current.width) / 2;
		} else {
			xOffset = currentXOffset.current! * widthRatio;
		}

		let yOffset: number;
		const originalHeight = originalFileData.height;
		const heightRatio = originalHeight / previewDimensions!.previewHeight;
		if (!currentYOffset.current && originalCropDimensions.current.height !== originalHeight) {
			yOffset = (originalHeight - originalCropDimensions.current.height) / 2;
		} else {
			yOffset = currentYOffset.current! * heightRatio;
		}

		const sizeMB = 197;

		setAdjustedFileData(prevState => {
			return {
				...prevState,
				width: originalFileData.width,
				height: originalFileData.height,
				size: sizeMB,
				adjustedWidth: originalCropDimensions.current.width,
				adjustedHeight: originalCropDimensions.current.height,
				xOffset: xOffset,
				yOffset: yOffset,
				adjustedStartTime: trimmedStartTime,
				adjustedEndTime: trimmedEndTime,
				duration: originalFileData.duration
			};
		});

		const fileExtension = adjustedFileData.name.split('.').pop() || '.mp4';
		const rId = crypto.randomUUID();
		setRequestId(rId);
		setRequestPayload(prevState => ({
			...prevState,
			requestId: rId,
			originalFileExtension: fileExtension,
			width: originalWidth,
			height: originalHeight,
			duration: adjustedDuration,
			size: sizeMB,
			adjustedWidth: originalCropDimensions.current.width,
			adjustedHeight: originalCropDimensions.current.height,
			xOffset: xOffset,
			yOffset: yOffset,
			adjustedStartTime: trimmedStartTime,
			adjustedEndTime: trimmedEndTime
		}));
		setIsTrimAndCropOpen(false);
		setIsConfigurationOpen(true);
		setIsContinueLoading(false);
		setIsFileTrimmedAndCropped(true);
	};

	return (
		<UIDialog
			open={isTrimAndCropOpen}
			title="Trim and Crop"
			actions={<></>}
			blur
			maxWidth="800px"
			zIndex={1200}
			paddingTop="24px"
			borderRadius="8px"
			titleFontSize={smallerThanMd ? '22px' : '26px'}
			topRightElement={
				<IconButton
					aria-label="close"
					onClick={() => {
						setIsTrimAndCropOpen(false);
						resetTranscriptionsState();
						resetTrimAndCropState();
						resetFileUpload();
					}}
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
				<>
					{isTrimAndCropOpen && (
						<div>
							{!requestPayload.isAudioFile && <TrimAndCropAspectRatio />}
							<div
								style={{
									height: '800px', // this is overridden by maxHeight, but needed to display some content
									marginTop: '8px',
									maxHeight: smallerThanSm ? '30vh' : '40vh',
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								{!isContinueLoading && <Player
									ref={trimAndCropPlayerRef}
									component={TrimAndCropFrame}
									inFrame={trimmedVideoStartInFrames < trimmedVideoEndInFrames ? trimmedVideoStartInFrames : Math.max(0, trimmedVideoEndInFrames - fpsConst)}
									outFrame={trimmedEndTime === 0 ? originalVideoDurationInFrames - 1 : trimmedVideoEndInFrames}
									durationInFrames={originalVideoDurationInFrames}
									compositionWidth={videoWidth}
									compositionHeight={videoHeight}
									fps={fpsConst}
									inputProps={{
										isAudio: requestPayload.isAudioFile,
										videoSrc: videoSrc,
										videoWidth: videoWidth,
										videoHeight: videoHeight
									}}
									style={{
										width: '100%',
										height: '100%',
									}}
								/>}
							</div>

							<div style={{height: '30%'}}>
								<TrimAndCropConfiguration/>
							</div>
							<Grid container item justifyContent={smallerThanMd ? 'center' : 'end'} columnSpacing={1} pr={smallerThanMd ? 2 : 0} mt={smallerThanMd ? 0.5 : 0} mb={smallerThanMd ? 0 : -2}>
								<Grid item>
									<div
										style={!smallerThanMd ? {
											display: 'flex',
											justifyContent: 'end'
										} : {}}
									>
										<UIButton
											title="Continue"
											colorType="primary"
											variant="contained"
											fontSize="17px"
											disabled={isContinueLoading}
											isFlaming={true}
											onClick={async () => {
												if (!user) {
													displayError(new Error('No user'));
													return;
												}

												if (user.id === tryoutUserId && !originalFile) {
													validateExampleFile();
												} else {
													validateFileSizeAndDuration(user);
												}
											}}
											isLoading={isContinueLoading}
										/>
									</div>

								</Grid>
							</Grid>
						</div>
					)}

					<UpgradeDialog
						title="upload larger files"
						isUpgradeDialogOpen={isUpgradeDialogOpen}
						setIsUpgradeDialogOpen={setIsUpgradeDialogOpen}
					/>

					{isPaymentWallOpen && (
						<PaymentWall
							isPaymentWallOpen={isPaymentWallOpen}
							setIsPaymentWallOpen={setIsPaymentWallOpen}
						/>
					)}
				</>
			}
		/>
	);
};