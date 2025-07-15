import {Box, LinearProgress, Typography} from '@mui/material';
import Grid from '@mui/material/Grid';
import React, {useEffect, useState} from 'react';
import {isSmallerThanSm} from '../../../hooks/is-compact';
import {tryoutUserId, useAuth} from '../../../contexts/UsersContext';
import {useTranscriptionContext} from '../../../contexts/TranscriptionContext';
import {displayError, displaySuccess} from '../../../utils/utils';
import {supportedMediaTypes} from '../../../const/transcription';
import {getFileSizeInMB, getMediaProperties, isAudioFileType, VideoProperties} from '../../../utils/file-media';
import {emitSocketEvent, listenToSocketEvent} from '../../../api/sockets';
import {UploadReadyMessage} from '@hendrikytt/api-contracts/dist/sockets';
import {uploadCanceledError, uploadFileToApi} from '../../../api/worker';
import {handleGAEvent} from '../../../lib/google-analytics';
import {colors} from '../../../themes';
import {UIButton} from '../../ui/UIButton';
import {constructProgressComponent} from '../../../utils/tsx-utils';
import {UIText} from '../../ui/UIText';
import {darken} from '@mui/material/styles';
import {UploadedFileInfo} from '../common/UploadedFileInfo';
import {useTrimAndCropContext} from '../../../contexts/TrimAndCropContext';
import {FrontendUser} from '@hendrikytt/api-contracts/src';
import {useFileUpload} from '../../../hooks/use-file-upload';

export const TranscriptionUpload = () => {
	const {isLoggedIn, user} = useAuth();

	const smallerThanSm = isSmallerThanSm();

	const {validateFileTypeAndResetState, handleExampleVideo} = useFileUpload();

	const {
		resetTrimAndCropState,
		isFileTrimmedAndCropped,
		setIsFileTrimmedAndCropped,
	} = useTrimAndCropContext();

	const {
		requestPayload,
		requestId,
		adjustedFileData,
		setAdjustedFileData,
		setWillProgressBeLost,
		isUploading,
		setIsUploading,
		setRequestPayload,
		adjustedFile,
		isUploadFinished,
		setIsUploadFinished,
		isRemoveUploadedFileLoading,
		setIsRemoveUploadedFileLoading,
		setUploadingPercentage,
		handleRemoveVideo,
		isLinkUploading,
		setProjectScreenshotUrl,
		uploadingPercentage
	} = useTranscriptionContext();

	const [isDragging, setIsDragging] = useState(false);

	useEffect(() => {
		if (requestId && user && isFileTrimmedAndCropped && requestPayload.uploadType === 'local') {
			handleUpload(user);
		}
	}, [requestId, user, isFileTrimmedAndCropped, requestPayload.uploadType]);

	const handleUpload = async (user: FrontendUser) => {
		if (!requestId) {
			displayError(new Error('Request id must be set'));
			return;
		}
		if (user.id !== tryoutUserId && !adjustedFile) {
			displayError(new Error('File must be set'));
			return;
		}
		try {
			await uploadFileToApi(adjustedFile, {...adjustedFileData, isAudioFile: requestPayload.isAudioFile}, requestId, setUploadingPercentage, user.id.toString(), setWillProgressBeLost);

			const userId = user.id.toString();

			listenToSocketEvent('upload-ready', async (data) => {
				const msg = data as unknown as UploadReadyMessage;
				setAdjustedFileData(prevState => {
					return {
						...prevState,
						duration: msg.adjustedFileDuration,
						size: msg.adjustedFileSize,
						compressedHeight: msg.compressedHeight,
						compressedWidth: msg.compressedWidth,
						adjustedHeight: msg.adjustedHeight,
						adjustedWidth: msg.adjustedWidth
					};
				});

				setRequestPayload(prevState => {
					return {
						...prevState,
						compressedHeight: msg.compressedHeight,
						compressedWidth: msg.compressedWidth,
						duration: msg.adjustedFileDuration,
						adjustedHeight: msg.adjustedHeight,
						adjustedWidth: msg.adjustedWidth
					};
				});

				setProjectScreenshotUrl(msg.projectScreenshotUrl);
				setIsUploading(false);
				displaySuccess('File uploaded!');
				handleGAEvent('Choose-your-file');
				setIsUploadFinished(true);
				setIsFileTrimmedAndCropped(false);

			}, userId, requestId);

			listenToSocketEvent('upload-failed', async () => {
				setIsUploading(false);
				setUploadingPercentage(0);
				displayError(new Error('Upload failed'));
			}, userId, requestId);
		} catch (e) {
			setIsUploading(false);
			setUploadingPercentage(0);
			if (e instanceof Error && e.message === uploadCanceledError) {
				return;
			}
			displayError(e);
		}
	};

	const handleUploadCancel = async () => {
		try {
			if (user && requestId) {
				emitSocketEvent('upload-cancel', requestId, user.id.toString());
			}
		} catch (e) {
			displayError(e);
		}
		setIsUploading(false);
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(false);
		if (isLinkUploading) {
			return;
		}

		const files = e.dataTransfer.files;
		validateFileTypeAndResetState(files[0]);
	};

	const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	const onDragEnter = () => {
		setIsDragging(true);
	};

	const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		if (e.currentTarget.contains(e.relatedTarget as Node)) {
			return;
		}
		setIsDragging(false);
	};

	const fileDurationLimit = () => {
		if (!user) {
			return;
		}
		const timeMeasurement = user.current_plan.plan_type === 'FREE' ? ' seconds' : ' minutes';
		return `${(user.current_plan.plan_type === 'FREE' ? user.current_plan.upload_limit_seconds : user.current_plan.upload_limit_seconds / 60)}${timeMeasurement}`;
	};

	return (
		<>
			<Grid container>
				<Grid item xs={12}>
					<UIText
						variant="regular"
						component="h2"
						mb={smallerThanSm ? 0 : 1}
						mt="8px"
					>
						1. Upload file
					</UIText>
				</Grid>
				<Grid container item xs={12} justifyContent="center">
					<div
						onDrop={handleDrop}
						onDragOver={dragOver}
						onDragEnter={onDragEnter}
						onDragLeave={onDragLeave}
						style={{
							padding: '10px',
							backgroundImage: smallerThanSm ? 'none' : 'url("data:image/svg+xml,%3csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3e%3crect width=\'100%25\' height=\'100%25\' fill=\'none\' stroke=\'grey\' stroke-width=\'4\' stroke-dasharray=\'6%2c 14\' stroke-dashoffset=\'0\' stroke-linecap=\'square\'/%3e%3c/svg%3e")',
							height: smallerThanSm ? '100px' : '230px',
							borderRadius: '5px',
							width: '100%',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
							opacity: isLinkUploading ? 0.8 : 1,
							backgroundColor: smallerThanSm ? 'transparent' : isDragging && !isLinkUploading ? darken(colors.inputBgGrey, 0.2) : colors.inputBgGrey
						}}
					>
						{!isUploading && !isUploadFinished && (
							<>
								<Box
									sx={{
										display: 'flex',
										alignItems: 'center',
										'& p': {
											color: isLinkUploading ? colors.grey : 'inherit'
										},
									}}>
									{isLoggedIn && !smallerThanSm && (<Typography variant="h6" fontSize="18px" sx={{marginRight: '-6px', color: colors.darkGrey}}>
										Drag and drop your file here or
									</Typography>)}
									<UIButton
										title="Choose file"
										colorType="primary"
										variant="text"
										textColor={colors.palette.primary}
										component={isLinkUploading ? 'p' : 'label'}
										onClick={() => {}}
										underline
										fontSize="18px"
									>
										<input
											type="file"
											hidden
											accept="video/*,audio/*"
											onChange={(e) => {
												if (isLinkUploading) {
													return;
												}
												const files = e.target.files;
												if (!files) {
													return;
												}
												validateFileTypeAndResetState(files[0]);
												e.target.value = '';
											}}
										/>
									</UIButton>
									{!isLoggedIn && (<Typography variant="h6" fontSize="18px" sx={{marginLeft: '-6px', marginRight: '-6px', color: colors.darkGrey}}>
										Or
									</Typography>)}
									{!isLoggedIn && (
										<UIButton
											title="Try example"
											colorType="primary"
											variant="text"
											textColor={colors.palette.primary}
											component={isLinkUploading ? 'p' : 'label'}
											onClick={() => {
												handleExampleVideo();
											}}
											underline
											fontSize="18px"
										/>
									)}
								</Box>
								<Typography fontSize="12px" sx={{color: colors.darkGrey}}>
									File duration limit: {fileDurationLimit()}
								</Typography>
								<Typography fontSize="12px" sx={{color: colors.darkGrey}}>
									File size limit: {user?.current_plan.upload_limit_mb}MB
								</Typography>
							</>
						)}
						{isUploading && (
							<Grid container rowSpacing={3} mt={1}>
								<Grid item xs={12}>
									{constructProgressComponent(uploadingPercentage, colors.font.secondary)}
								</Grid>
								<Grid container item justifyContent="end">
									<Grid item>
										{uploadingPercentage < 100 && (
											<UIButton
												title="Cancel"
												colorType="primary"
												variant="text"
												onClick={handleUploadCancel}
												textColor={colors.font.secondary}
											/>
										)}
									</Grid>
								</Grid>
							</Grid>
						)}
						{!isUploading && isUploadFinished && (
							<Grid container>
								{!isRemoveUploadedFileLoading && (
									<UploadedFileInfo
										fontColor={'#6B6B6B'}
										height="auto"
										onClick={() => {
											resetTrimAndCropState();
											handleRemoveVideo(setIsRemoveUploadedFileLoading);
										}}
										isHighlighted
									/>
								)}
								{isRemoveUploadedFileLoading && (
									<Grid container item rowSpacing={2} alignItems="center">
										<Grid item>
											<Typography>
												Removing file
											</Typography>
										</Grid>
										<Grid item xs={12}>
											<LinearProgress />
										</Grid>
									</Grid>
								)}
							</Grid>
						)}
					</div>
				</Grid>
			</Grid>


		</>
	);
};