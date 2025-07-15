import {Grid, IconButton, InputBase, LinearProgress, Paper} from '@mui/material';
import {Field, FieldProps, Form, Formik} from 'formik';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import React, {useEffect, useRef, useState} from 'react';
import {object, string} from 'yup';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import {useTranscriptionContext} from '../../../contexts/TranscriptionContext';
import {deleteSocketListener, emitSocketEvent, listenToSocketEvent} from '../../../api/sockets';
import {useAuth} from '../../../contexts/UsersContext';
import {downloadFromUrlToApi, getGlobalUrl} from '../../../api/worker';
import {displayError, displaySuccess} from '../../../utils/utils';
import {handleGAEvent} from '../../../lib/google-analytics';
import {colors} from '../../../themes';
import {constructProgressComponent} from '../../../utils/tsx-utils';
import {UpgradeDialog} from '../../layout/UpgradeDialog';
import {isSmallerThanSm} from '../../../hooks/is-compact';
import {UIText} from '../../ui/UIText';
import {UploadedFileInfo} from '../common/UploadedFileInfo';
import {darken} from '@mui/material/styles';
import {
	DownloadedFileFromUrlMessage,
	ErrorMessage,
	ProgressMessage,
	UploadCancelMessage
} from '@hendrikytt/api-contracts/dist/sockets';
import {useTrimAndCropContext} from '../../../contexts/TrimAndCropContext';
import {durationInSecondsToStringTimes} from '../../../utils/trim-and-crop';
import {FieldError} from '../common/FieldError';

interface Values {
	mediaLink: string;
}

const initialValues = {
	mediaLink: '',
};

const validationSchema = object({
	mediaLink: string().url('Please enter a valid URL').required('Media URL is required'),
});

export const TranscriptionUploadLink = () => {
	const smallerThanSm = isSmallerThanSm();

	const {user} = useAuth();

	const {
		setIsTrimAndCropOpen,
		setTrimmedEndMinutes,
		setTrimmedEndSeconds,
		setTrimmedEndHundredths,
		isFileTrimmedAndCropped,
		setIsFileTrimmedAndCropped,
		setLinkAudio,
		setPreviewDimensions
	} = useTrimAndCropContext();

	const {
		setWillProgressBeLost,
		setRequestPayload,
		setVideoSrc,
		setAdjustedFileData,
		adjustedFileData,
		requestId,
		resetTranscriptionsState,
		handleRemoveVideo,
		resetFileUpload,
		isLinkUploading,
		setIsLinkUploading,
		isLinkUploadFinished,
		setIsLinkUploadFinished,
		isRemoveUploadedFileLinkLoading,
		setIsRemoveUploadedFileLinkLoading,
		setDownloadFromUrlToApiPercentage,
		isUploading,
		setOriginalFileData,
		requestPayload,
		globalVideoLinkSrc,
		setGlobalVideoLinkSrc,
		setProjectScreenshotUrl,
		downloadFromUrlToApiPercentage
	} = useTranscriptionContext();

	const [isUpgradeDialogOpen, setIsUpgradeDialogOpen] = useState(false);

	const isUploadCanceled = useRef(false);

	const [urlJustBecameValid, setUrlJustBecameValid] = useState(false);

	const handleLinkUpload = async (
		values: Values
	) => {
		try {
			isUploadCanceled.current = false;
			resetFileUpload();
			setDownloadFromUrlToApiPercentage(0);

			setIsLinkUploading(true);
			const {
				audioUrl,
				originalHeight: videoHeight,
				previewHeight,
				originalWidth: videoWidth,
				previewWidth,
				duration: videoDuration,
				previewUrl: previewUrl,
				title,
				globalLinkUrl
			} = await getGlobalUrl(values.mediaLink);
			setAdjustedFileData(prevState => {
				return {
					...prevState,
					name: title
				};
			});
			setPreviewDimensions(prevState => {
				return {
					previewHeight: previewHeight || videoHeight,
					previewWidth: previewWidth || videoWidth
				};
			});
			setGlobalVideoLinkSrc(globalLinkUrl ? globalLinkUrl : values.mediaLink);
			setLinkAudio(audioUrl);
			setVideoSrc(previewUrl);
			const {minutes, seconds, hundredths} = durationInSecondsToStringTimes(videoDuration);
			setTrimmedEndMinutes(minutes);
			setTrimmedEndSeconds(seconds);
			setTrimmedEndHundredths(hundredths);
			setOriginalFileData(prevState => {
				return {
					...prevState,
					height: videoHeight,
					width: videoWidth,
					duration: videoDuration,
				};
			});
			setRequestPayload(prevState => {
				return {
					...prevState,
					uploadType: 'link'
				};
			});
			setWillProgressBeLost(true);
			if (!isUploadCanceled.current) {
				setIsTrimAndCropOpen(true);
			}
		} catch (error) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const err = error as any;
			if (err.message === 'Video duration is longer than basic plan limit') {
				setIsLinkUploading(false);
				setIsUpgradeDialogOpen(true);
				resetTranscriptionsState();
				setDownloadFromUrlToApiPercentage(0);
				return;
			} else if (err.message === 'Video duration is longer than pro plan limit') {
				setIsLinkUploading(false);
				setIsUpgradeDialogOpen(true);
				resetTranscriptionsState();
				setDownloadFromUrlToApiPercentage(0);
				return;
			} else {
				setIsLinkUploading(false);
				displayError(error);
				resetTranscriptionsState();
				setDownloadFromUrlToApiPercentage(0);
			}
		}
	};

	useEffect(() => {
		const downloadToApi = async (userId: string, requestId: string) => {
			try {
				await downloadFromUrlToApi(requestId, globalVideoLinkSrc, adjustedFileData.name, {...adjustedFileData, isAudioFile: false});
			} catch (e) {
				displayError(e);
				setIsLinkUploading(false);
				deleteListeners(userId, requestId);
			}
		};

		if (requestId && isFileTrimmedAndCropped && user && requestPayload.uploadType === 'link') {
			const userId = user.id.toString();
			handleUploadCancel(userId, requestId);
			handleDownloadPercentage(userId, requestId);
			handleDownloadReady(userId, requestId);
			handleDownloadFailed(userId, requestId);
			downloadToApi(userId, requestId);

			setIsFileTrimmedAndCropped(false);
		}
	}, [requestId, isFileTrimmedAndCropped, user, requestPayload]);

	const handleUploadCancel = (userId: string, rId: string) => {
		listenToSocketEvent('upload-cancel', (data) => {
			if (rId === (data as unknown as UploadCancelMessage).data) {
				isUploadCanceled.current = true;
				deleteSocketListener('download-from-url-to-api-progress', userId, rId);
				deleteSocketListener('download-from-url-to-api-ready', userId, rId);
				deleteSocketListener('download-from-url-to-api-failed', userId, rId);
			}
		}, userId, rId);
	};

	const handleDownloadPercentage = (userId: string, rId: string) => {
		listenToSocketEvent('download-from-url-to-api-progress', (data) => {
			if (!isUploadCanceled.current) {
				const percentage = (data as unknown as ProgressMessage).percentage;
				setDownloadFromUrlToApiPercentage(percentage);
			}
		}, userId, rId);
	};

	const handleDownloadReady = (userId: string, rId: string) => {
		listenToSocketEvent('download-from-url-to-api-ready', async (data) => {
			if (!isUploadCanceled.current) {
				const message = (data as unknown as DownloadedFileFromUrlMessage);
				setWillProgressBeLost(true);

				setAdjustedFileData(prevState => ({
					...prevState,
					name: message.title,
					duration: message.duration,
					size: message.size,
					width: message.originalWidth,
					height: message.originalHeight,
					adjustedHeight: message.adjustedHeight,
					adjustedWidth: message.adjustedWidth,
					adjustedEndTime: message.duration,
					compressedHeight: message.compressedHeight,
					compressedWidth: message.compressedWidth
				}));
				setRequestPayload(prevState => ({
					...prevState,
					requestId: rId,
					originalFileExtension: 'mp4',
					duration: message.duration,
					size: message.size,
					width: message.originalWidth,
					height: message.originalHeight,
					adjustedHeight: message.adjustedHeight,
					adjustedWidth: message.adjustedWidth,
					adjustedEndTime: message.duration,
					compressedHeight: message.compressedHeight,
					compressedWidth: message.compressedWidth
				}));
				setProjectScreenshotUrl(message.projectScreenshotUrl);
				setIsLinkUploading(false);
				displaySuccess('Media downloaded from link successfully');
				handleGAEvent('Submit-file');
				setIsLinkUploadFinished(true);
			}
		}, userId, rId);
	};

	const deleteListeners = (userId: string, requestId: string) => {
		deleteSocketListener('download-from-url-to-api-progress', userId, requestId);
		deleteSocketListener('download-from-url-to-api-ready', userId, requestId);
		deleteSocketListener('download-from-url-to-api-failed', userId, requestId);
	};

	const handleDownloadFailed = (userId: string, rId: string) => {
		listenToSocketEvent('download-from-url-to-api-failed', async (data) => {
			if (!isUploadCanceled.current) {
				const err = (data as unknown as ErrorMessage).error;
				displayError(new Error(err));
				setIsLinkUploading(false);
			}
		}, userId, rId);
	};

	const cancelUpload = async () => {
		isUploadCanceled.current = true;
		try {
			if (user && requestId) {
				emitSocketEvent('upload-cancel', requestId, user.id.toString());
				resetTranscriptionsState();
			}
		} catch (e) {
			displayError(e);
		}
		setIsLinkUploading(false);
	};

	const isValidURL = (value: string) => {
		try {
			new URL(value);
			return true;
		} catch (_) {
			return false;
		}
	};

	return (
		<>
			<Grid container>
				<Grid item xs={12}>
					<UIText
						variant="tiny"
						component="h2"
						mt={2}
					>
						Or upload via URL link
					</UIText>
				</Grid>
				{!isLinkUploading && !isLinkUploadFinished && (
					<Grid item xs={12}>
						<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleLinkUpload} validateOnChange={true} validateOnMount={true}>
							{(formik) => {
								const isButtonDisabled = (!formik.isValid && formik.touched.mediaLink) || isLinkUploading || isUploading;

								if (isValidURL(formik.values.mediaLink)) {
									setUrlJustBecameValid(true);
								} else {
									setUrlJustBecameValid(false);
								}

								return (
									<Form>
										<Grid container item alignItems="center" xs={12} pt="4px" height="70px">
											<Paper
												elevation={0}
												sx={{
													p: '2px 4px',
													display: 'flex',
													alignItems: 'center',
													backgroundColor: colors.inputBgGrey,
													border: `1px solid ${(!formik.isValid && formik.touched.mediaLink) ? 'red' : colors.inputBorderGrey}`,
													height: '56px',
													width: '100%'
												}}
											>
												<InsertLinkIcon sx={{color: colors.grey, ml: 1}} />
												<Field name="mediaLink">
													{({ field, meta }: FieldProps) => (
														<InputBase
															{...field}
															sx={{
																ml: 1,
																flex: 1,
																color: 'text.secondary',
																'& .MuiInputBase-input::placeholder': {
																	fontSize: '16px'
																},
															}}
															placeholder="Enter your URL here"
															disabled={isLinkUploading}
															error={meta.touched && !!meta.error}
														/>
													)}
												</Field>
												<IconButton
													type="submit"
													disabled={isButtonDisabled}
													sx={{
														p: '6px'
													}}
												>
													<KeyboardReturnIcon
														sx={{
															color: urlJustBecameValid ? 'white' : colors.palette.primary,
															borderRadius: '50%',
															fontSize: '32px',
															p: '4px',
															border: `1px solid ${colors.palette.primary}`,
															transition: 'background-color 0.3s ease',
															backgroundColor: urlJustBecameValid ? colors.palette.primary : 'transparent',
															'&:hover': {
																color: urlJustBecameValid ? 'white' : darken(colors.palette.primary, 0.15),
																borderColor: urlJustBecameValid ? colors.palette.primary : darken(colors.palette.primary, 0.15),
																backgroundColor: urlJustBecameValid ? colors.palette.primary : 'transparent'
															},
															...(isButtonDisabled ? {
																color: darken(colors.inputBgGrey, 0.25),
																borderColor: darken(colors.inputBgGrey, 0.25),
															} : {}),
														}}
													/>
												</IconButton>
											</Paper>
										</Grid>
										<Grid item xs={12} sx={{m: 0, p: 0}}>
											<Field name="mediaLink">
												{({ meta }: FieldProps) => (
													adjustedFileData.duration === 0 && meta.touched && meta.error && (
														<FieldError
															errorMessage={meta.error}
															marginTop="0px"
															marginBottom="-12px"
														/>
													)
												)}
											</Field>
										</Grid>
									</Form>
								);
							}}
						</Formik>
					</Grid>
				)}
				{isLinkUploading && (
					<Grid container item alignItems="start" xs={12} pt={1} height="70px">
						<Grid item sx={{flexGrow: 1}}>
							{constructProgressComponent(downloadFromUrlToApiPercentage, colors.font.secondary)}
						</Grid>
						<Grid item>
							{downloadFromUrlToApiPercentage < 100 && (
								<IconButton
									color="primary"
									type="submit"
									sx={{ mt: '14px' }}
									onClick={cancelUpload}
								>
									<CloseIcon sx={{color: colors.grey}} />
								</IconButton>
							)}
						</Grid>
					</Grid>
				)}
				{!isLinkUploading && isLinkUploadFinished && (
					<Grid container height="70px" mb={smallerThanSm ? 2 : 0}>
						{!isRemoveUploadedFileLinkLoading && (
							<UploadedFileInfo
								fontColor={'#6B6B6B'}
								height="auto"
								onClick={() => {
									handleRemoveVideo(setIsRemoveUploadedFileLinkLoading);
									if (user && requestId) {
										deleteSocketListener('download-from-url-to-api-progress', user.id.toString(), requestId);
										deleteSocketListener('download-from-url-to-api-ready', user.id.toString(), requestId);
										deleteSocketListener('download-from-url-to-api-failed', user.id.toString(), requestId);
									}
								}}
								isHighlighted
							/>
						)}
						{isRemoveUploadedFileLinkLoading && (
							<Grid container item rowSpacing={2} alignItems="center" height="70px">
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
			</Grid>

			<UpgradeDialog
				title="upload it larger files"
				isUpgradeDialogOpen={isUpgradeDialogOpen}
				setIsUpgradeDialogOpen={setIsUpgradeDialogOpen}
			/>
		</>
	);
};