import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {useTranscriptionContext} from '../contexts/TranscriptionContext';
import {TranscriptionMainView} from '../components/transcription/main-view/TranscriptionMainView';
import {TranscriptionConfiguration} from '../components/transcription/configuration/TranscriptionConfiguration';
import {Helmet} from 'react-helmet-async';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {appBarHeight} from '../const/ui';
import {useLocation, useParams} from 'react-router-dom';
import {getUserProjectByRequestId} from '../api/user-projects';
import {displayError, displaySuccess, useHandleNavigation} from '../utils/utils';
import {useUserProjects} from '../contexts/UserProjectsContext';
import {CircularProgress} from '@mui/material';
import {defaultFontSelection, FontSelectionOption, useUserFonts} from '../contexts/UserFontsContext';
import {applyFont} from '../utils/transcription';
import {useTrimAndCropContext} from '../contexts/TrimAndCropContext';
import {TrimAndCrop} from '../components/trim-and-crop/TrimAndCrop';
import {getDiarizationByRequestId} from '../api/diarization';
import {addDiarization} from '../utils/diarization';
import {useAuth} from '../contexts/UsersContext';
import {useFileUpload} from '../hooks/use-file-upload';

export const TranscriptionPage = () => {
	const location = useLocation();
	const handleNavigation = useHandleNavigation();

	const {isLoggedIn, notSignedUpUser} = useAuth();

	const { paramRequestId } = useParams();

	const {handleExampleVideo} = useFileUpload();

	const {
		requestPayload,
		isConfigurationOpen,
		setIsConfigurationOpen,
		setRequestPayload,
		setVideoSrc,
		setIsTranscriptionStreamFinished,
		setAdjustedFileData,
		shouldRedirect,
		setShouldRedirect,
		setUnTouchedTranscription,
		longestSegmentLength,
		setMaxWordsPerSegment,
		setRequestId,
		setRequestPayloadToRevertTo,
		setAssignedSpeakers
	} = useTranscriptionContext();

	const {
		isTrimAndCropOpen
	} = useTrimAndCropContext();

	const {
		setIsCurrentProjectSaved,
		setCurrentUserProject,
		fetchInitialUserProjects
	} = useUserProjects();

	const {
		userFonts,
		fetchUserFonts,
		setCurrentFontSelectionOption
	} = useUserFonts();

	const [isLoadingProject, setIsLoadingProject] = useState(true);

	useEffect(() => {
		const queryParams = new URLSearchParams(location.search);
		const exampleVideo = queryParams.get('exampleVideo');

		if (exampleVideo) {
			const url = new URL(window.location.href);
			url.searchParams.delete('exampleVideo');
			window.history.replaceState(null, document.title, url.toString());
			handleExampleVideo();
		}
	}, []);

	useEffect(() => {
		const url = new URL(window.location.href);
		const urlParams = new URLSearchParams(url.search);
		const paymentIntent = urlParams.get('payment_intent');

		if (paymentIntent) {
			console.log('notSignedUpUser', notSignedUpUser);
			url.search = '';
			window.history.replaceState({}, '', url.toString());
			displaySuccess('Plan purchased successfully!');
		}
		if (isLoggedIn) {
			fetchInitialUserProjects();
			fetchUserFonts();
		}
	}, []);

	useEffect(() => {
		const fetchUserProject = async () => {
			if (paramRequestId) {
				try {
					setIsConfigurationOpen(false);
					setIsLoadingProject(true);
					const project = await getUserProjectByRequestId(paramRequestId);
					setCurrentUserProject(project);
					const diarization = await getDiarizationByRequestId(project.request_payload.requestId);
					if (diarization?.content && diarization.is_finished) {
						const {displayedTranscription, assignedSpeakers} = addDiarization(project.request_payload.displayedTranscription, diarization.content);
						setAssignedSpeakers(assignedSpeakers);
						project.request_payload.displayedTranscription = displayedTranscription;
					}

					setRequestPayload(project.request_payload);
					setVideoSrc(project.request_payload.s3VideoLink);
					setIsTranscriptionStreamFinished(true);
					setAdjustedFileData({
						name: project.name,
						width: project.request_payload.width,
						height: project.request_payload.height,
						size: project.request_payload.size,
						duration: project.request_payload.duration,
						adjustedWidth: project.request_payload.adjustedWidth || project.request_payload.width || 1080,
						adjustedHeight: project.request_payload.adjustedHeight || project.request_payload.height || 1920,
						xOffset: project.request_payload.xOffset || 0,
						yOffset: project.request_payload.yOffset || 0,
						adjustedStartTime: project.request_payload.adjustedStartTime,
						adjustedEndTime: project.request_payload.adjustedEndTime,
						compressedHeight: project.request_payload.compressedHeight,
						compressedWidth: project.request_payload.compressedWidth
					});
					setUnTouchedTranscription(project.untouched_transcription);
					setIsCurrentProjectSaved(true);
					longestSegmentLength.current = project.longest_segment_length;
					setMaxWordsPerSegment(project.current_max_words_per_segment);
					setRequestPayloadToRevertTo({
						requestPayload: project.request_payload,
						wordsPerLine: project.current_max_words_per_segment
					});
					setRequestId(project.request_payload.requestId);
				} catch (e) {
					displayError(e);
					handleNavigation('/transcribe', false);
				}
			}
			setIsLoadingProject(false);
		};
		fetchUserProject();

	}, [paramRequestId]);

	useEffect(() => {
		if (shouldRedirect) {
			setShouldRedirect(false);
			handleNavigation('/transcribe', false);
		}
	}, [shouldRedirect]);

	useEffect(() => {
		if (userFonts.length === 0 && requestPayload.fontType === 'Your fonts') {
			setCurrentFontSelectionOption(defaultFontSelection);
			return;
		}
		const userFont = userFonts.find(font => font.s3_font_name === requestPayload.styling.s3_font_name);
		const currentValue: FontSelectionOption = {
			id: userFont?.id || defaultFontSelection.id,
			label: requestPayload.styling.font_family,
			value: requestPayload.styling.font_family,
			fontType: requestPayload.fontType,
			s3FontName: requestPayload.styling.s3_font_name || defaultFontSelection.s3FontName,
			s3FontLink: userFont?.s3_font_link || '',
			fontFileExtension: requestPayload.fontFileExtension
		};
		applyFont(currentValue);
		setCurrentFontSelectionOption(currentValue);
	}, [requestPayload, userFonts]);

	return (
		<>
			<Helmet>
				<title>Textualyze</title>
			</Helmet>
			<Box
				px={{
					xs: '0px',
					md: '20px'
				}}
			>
				{isLoadingProject && (
					<Grid container justifyContent="center" alignItems="center" sx={{height: `calc(100vh - ${appBarHeight}px - 40px)`}}>
						<CircularProgress size={40} />
					</Grid>
				)}
				{!isLoadingProject && (
					<>
						{!isConfigurationOpen && !isTrimAndCropOpen && (
							<Grid
								container
								sx={{
									backgroundColor: {
										xs: 'transparent',
										md: '#E7E7EB',
										maxHeight: `calc(100vh - ${appBarHeight+25}px)`,
										overflow: 'hidden'
									},
									borderRadius: '20px',
								}}
							>
								<Grid item xs={12}>
									<TranscriptionMainView />
								</Grid>
							</Grid>
						)}
						{isConfigurationOpen && !paramRequestId && (
							<TranscriptionConfiguration/>
						)}
						{isTrimAndCropOpen && !paramRequestId && (
							<TrimAndCrop/>
						)}
					</>
				)}
			</Box>
		</>
	);
};