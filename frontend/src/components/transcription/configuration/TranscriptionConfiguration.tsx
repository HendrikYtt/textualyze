import Grid from '@mui/material/Grid';
import {TranscriptionUpload} from './TranscriptionUpload';
import {TranscriptionUploadLink} from './TranscriptionUploadLink';
import {Autocomplete, IconButton, InputAdornment, TextField} from '@mui/material';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import React, {useEffect, useState} from 'react';
import {
	convertToSegmentedArrayWithMaxWords
} from '@hendrikytt/api-contracts';
import {customFilter, displayError, displaySuccess, useHandleNavigation} from '../../../utils/utils';
import {
	defaultMaxWordsPerSegment,
	defaultTranscribeOption,
	useTranscriptionContext
} from '../../../contexts/TranscriptionContext';
import {transcribeMedia} from '../../../api/worker';
import {listenToSocketEvent} from '../../../api/sockets';
import {UIDialog} from '../../ui/UIDialog';
import {colors} from '../../../themes';
import {UIButton} from '../../ui/UIButton';
import '/node_modules/flag-icons/css/flag-icons.min.css';
import {useAuth} from '../../../contexts/UsersContext';
import {lighten} from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import {isSmallerThanMd, isSmallerThanSm} from '../../../hooks/is-compact';
import {ErrorMessage, TranscribeReadyMessage} from '@hendrikytt/api-contracts/dist/sockets';
import {UIText} from '../../ui/UIText';
import {getPreSigneUserUploadUrl} from '../../../api/s3';
import {useUserProjects} from '../../../contexts/UserProjectsContext';
import {autoDetect, languageOptions} from '@hendrikytt/api-contracts/dist/language';
import {getDiarizationByRequestId} from '../../../api/diarization';
import {addDiarization} from '../../../utils/diarization';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import {getNotSignedUpUser} from '../../../api/not-signed-up-users';

let intervalId: string | number | NodeJS.Timeout | undefined;
export const TranscriptionConfiguration = () => {

	const handleNavigation = useHandleNavigation();

	const {
		user,
		isLoggedIn,
		setNotSignedUpUser
	} = useAuth();

	const smallerThanMd = isSmallerThanMd();
	const smallerThanSm = isSmallerThanSm();

	const {
		adjustedFileData,
		resetTranscriptionsState,
		requestId,
		setUnTouchedTranscription,
		longestSegmentLength,
		isTranscriptionStreamFinished,
		setIsTranscriptionStreamFinished,
		isConfigurationOpen,
		setIsConfigurationOpen,
		setIsTranscriptionDrawerOpen,
		setTranscribingPercentage,
		setRequestPayload,
		setVideoSrc,
		setShouldRedirect,
		isUploading,
		isUploadFinished,
		uploadingPercentage,
		isLinkUploading,
		isLinkUploadFinished,
		downloadFromUrlToApiPercentage,
		videoSrc,
		setRequestPayloadToRevertTo,
		requestPayload,
		setAssignedSpeakers,
		selectedTranscribeOption,
		setSelectedTranscribeOption,
		shouldSkipUndoRedoFlow
	} = useTranscriptionContext();

	const {
		setIsCurrentProjectSaved,
		addNewUserProject,
		userProjects
	} = useUserProjects();

	const [isStartLoading, setIsStartLoading] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		if (isUploadFinished || uploadingPercentage >= 100 || !isUploading) {
			document.title = 'Textualyze';
			return;
		}
		document.title = `Textualyze - ${uploadingPercentage.toFixed(0)}% uploaded`;
	}, [uploadingPercentage, isUploadFinished, isUploading]);

	useEffect(() => {
		if (isLinkUploadFinished || downloadFromUrlToApiPercentage >= 100 || !isLinkUploading) {
			document.title = 'Textualyze';
			return;
		}
		document.title = `Textualyze - ${downloadFromUrlToApiPercentage.toFixed(0)}% uploaded`;
	}, [downloadFromUrlToApiPercentage, isLinkUploadFinished, isLinkUploading]);

	useEffect(() => {
		setIsCurrentProjectSaved(false);
		setShouldRedirect(false);
	}, []);

	useEffect(() => {
		if (isTranscriptionStreamFinished) {
			setTranscribingPercentage(100);
		}

		return () => {
			if (intervalId) {
				clearInterval(intervalId);
			}
		};
	}, [isTranscriptionStreamFinished]);

	const initiateTranscribing = async () => {
		if (!requestId) {
			return;
		}

		try {
			setIsStartLoading(true);
			URL.revokeObjectURL(videoSrc);
			setVideoSrc('');
			setIsStartLoading(false);
			setIsConfigurationOpen(false);
			const resp = await getPreSigneUserUploadUrl(`${requestId}_compressed`, 'getObject', 'mp4', 'video/mp4', true);
			setVideoSrc(resp.preSignedUrl);
			await startTranscribing();
			setTranscribingPercentage(1);
			intervalId = setInterval(() => {
				const increment = 100 / (adjustedFileData.duration / 3);
				setTranscribingPercentage(prevPercentage => {
					if (prevPercentage + increment < 96) {
						return prevPercentage + increment;
					} else {
						clearInterval(intervalId);
						return prevPercentage;
					}
				});
			}, 1000);
		} catch (e) {
			resetTranscriptionsState();
			setIsStartLoading(false);
			displayError(e);
		}
	};

	const startTranscribing = async () => {
		if (!requestId || !user) {
			displayError(new Error('No request id'));
			return;
		}
		try {
			setIsTranscriptionDrawerOpen(true);
			const userId = user.id.toString();
			handleTranscriptionReadyV2(userId, requestId);
			handleTranscriptionFailed(userId, requestId);
			await transcribeMedia({requestId: requestId, language: requestPayload.language, fileDuration: requestPayload.duration});
		} catch (error) {
			resetTranscriptionsState();
			displayError(error);
		}
	};

	const handleTranscriptionFailed = (userId: string, rId: string) => {
		listenToSocketEvent('transcribe-failed', (data) => {
			const message = (data as unknown as ErrorMessage).error;
			resetTranscriptionsState();
			displayError(new Error(message));
		}, userId, rId);
	};

	const handleTranscriptionReadyV2 = (userId: string, rId: string) => {
		listenToSocketEvent('transcribe-ready', async (data) => {
			setIsTranscriptionStreamFinished(true);
			const transcribeReadyMessageV2 = (data as unknown as TranscribeReadyMessage);
			const {
				longestSegmentLength: longestLength,
				originalSegments,
				modifiedSegments,
				language
			} = transcribeReadyMessageV2;
			longestSegmentLength.current = longestLength;

			const converted = convertToSegmentedArrayWithMaxWords(originalSegments, originalSegments, defaultMaxWordsPerSegment);

			setRequestPayload(prevState => {
				setRequestPayloadToRevertTo({
					requestPayload: {
						...prevState,
						displayedTranscription: converted
					},
					wordsPerLine: defaultMaxWordsPerSegment
				});
				return {
					...prevState,
					displayedTranscription: modifiedSegments,
					language: language
				};
			});
			shouldSkipUndoRedoFlow.current = true;
			setUnTouchedTranscription(originalSegments);

			setTranscribingPercentage(100);
			displaySuccess('Transcription is ready!');

			if (!isLoggedIn) {
				const notSignedUpUser = await getNotSignedUpUser();
				setNotSignedUpUser(notSignedUpUser);
			}

			if (user && user.current_plan.plan_type !== 'FREE' && user.current_plan.user_project_limit > userProjects.length) {
				await addNewUserProject({name: adjustedFileData.name}, originalSegments);
			}

			listenToSocketEvent('diarization-finished', async () => {
				const diarization = await getDiarizationByRequestId(rId);
				if (diarization.content && diarization.is_finished) {
					setRequestPayload(prevState => {
						const {
							displayedTranscription,
							assignedSpeakers
						} = addDiarization(prevState.displayedTranscription, diarization.content!);
						shouldSkipUndoRedoFlow.current = true;
						setAssignedSpeakers(assignedSpeakers);
						return {
							...prevState,
							displayedTranscription: displayedTranscription
						};
					});
				}
			}, userId, rId);

			listenToSocketEvent('diarization-failed', async () => {

			}, userId, rId);
		}, userId, rId);
	};

	return (
		<>
			{isConfigurationOpen && (
				<UIDialog
					open={isConfigurationOpen}
					title="Upload media"
					maxWidth="700px"
					actions={<></>}
					blur
					zIndex={1200}
					paddingTop="24px"
					borderRadius="8px"
					titleFontSize={smallerThanMd ? '24px' : '26px'}
					topRightElement={
						(!isStartLoading && !isUploading && !isLinkUploading) ? (
							<IconButton
								aria-label="close"
								onClick={() => {handleNavigation('/projects', false);}}
								sx={{
									position: 'absolute',
									right: 14,
									top: 14,
									color: 'white',
									backgroundColor: colors.palette.primary,
									height: '48px',
									width: '48px',
									'&:hover': {
										backgroundColor: lighten(colors.palette.primary, 0.15),
									}
								}}
							>
								<CloseIcon />
							</IconButton>
						) : (<></>)
					}
					content={
						<Grid container>
							<Grid item xs={12}>
								<TranscriptionUpload />
							</Grid>
							{/*<Grid item xs={12}>*/}
							{/*	<TranscriptionUploadLink/>*/}
							{/*</Grid>*/}
							<Grid item xs={12}>
								<UIText
									variant="regular"
									component="h2"
									mt={2}
									mb="12px"
								>
									2. Choose video language
								</UIText>
							</Grid>
							<Grid container item alignItems="center" justifyContent="space-between" rowSpacing={2}>
								<Grid item xs={12} sm={8} md={6}>
									<Autocomplete
										open={isOpen}
										onOpen={() => setIsOpen(true)}
										onClose={() => setIsOpen(false)}
										options={languageOptions}
										defaultValue={selectedTranscribeOption}
										getOptionLabel={(option) => option.label}
										isOptionEqualToValue={(option, value) => option.value === value.value}
										renderInput={(params) => (
											<TextField
												{...params}
												InputProps={{
													...params.InputProps,
													style: {paddingRight: '0px'},
													startAdornment: (
														<InputAdornment position="start">
															{selectedTranscribeOption.value === autoDetect
																? (<AutoFixHighIcon sx={{color: colors.grey, marginLeft: '5px', marginRight: '-5px'}} />)
																: (<span className={`fi fi-${selectedTranscribeOption.countryCode}`} style={{marginTop: '3px', marginLeft: '8px'}}></span>)
															}
														</InputAdornment>
													),
													endAdornment: (
														<InputAdornment position="end">
															<div style={{
																display: 'flex',
																alignItems: 'center',
																marginRight: '8px'
															}}>
																{isOpen ? (
																	<KeyboardArrowUpOutlinedIcon sx={{color: colors.iconGrey}} />
																) : (
																	<KeyboardArrowDownOutlinedIcon sx={{color: colors.iconGrey}} />
																)}
															</div>
														</InputAdornment>
													)
												}}
											/>
										)}
										renderOption={(props, option) => (
											<li {...props}>
												{option.value === autoDetect ? (
													<AutoFixHighIcon sx={{color: colors.grey, marginLeft: '3px', marginRight: '10px'}} />
												) : (
													<span className={`fi fi-${option.countryCode}`} style={{
														height: '20px',
														width: '30px',
														marginRight: '10px',
													}}></span>
												)}
												{option.label}
											</li>
										)}
										onChange={(_, option) => {
											setSelectedTranscribeOption(option || defaultTranscribeOption);
											setRequestPayload(prevState => ({
												...prevState,
												language: option ? option.value : 'en',
											}));
										}}
										disableClearable
										filterOptions={(options, { inputValue }) => {
											return options.filter(option => customFilter(inputValue, option));
										}}
										sx={{
											'& .MuiOutlinedInput-root': {
												'& .MuiInputBase-input': {
													height: 'calc(100% - 20px)'
												},
											},
											'& .MuiAutocomplete-endAdornment': {
												'& .MuiSvgIcon-root': {
													color: colors.grey,
												},
											},
										}}
									/>
								</Grid>
								<Grid container={smallerThanSm} item justifyContent={smallerThanMd ? 'center' : 'end'} mt="8px" mb="-8px">
									<UIButton
										title="Start editing"
										colorType="primary"
										variant="contained"
										disabled={(adjustedFileData.duration === 0) || !isUploadFinished && !isLinkUploadFinished || isStartLoading}
										onClick={async () => {
											await initiateTranscribing();
										}}
										isLoading={isStartLoading}
										isFlaming={true}
									/>
								</Grid>
							</Grid>
						</Grid>
					}
				/>
			)}

		</>

	);
};