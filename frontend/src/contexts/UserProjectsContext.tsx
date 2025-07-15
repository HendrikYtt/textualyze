import {displayError, displayInfo, displaySuccess} from '../utils/utils';
import React, {createContext, FC, ReactNode, useCallback, useContext, useEffect, useRef, useState} from 'react';
import {Segment, UserProject} from '@hendrikytt/api-contracts';
import {
	addUserProject,
	AddUserProjectBody,
	getUserProjects,
	updateUserProject,
	updateUserProjectName
} from '../api/user-projects';
import {useTranscriptionContext} from './TranscriptionContext';
import {object, string} from 'yup';
import {Field, FieldProps, Form, Formik} from 'formik';
import {Grid, IconButton, InputBase, Paper} from '@mui/material';
import {UIText} from '../components/ui/UIText';
import {colors} from '../themes';
import {UIButton} from '../components/ui/UIButton';
import {UIDialog} from '../components/ui/UIDialog';
import { debounce } from 'lodash';
import {useAuth} from './UsersContext';
import {lighten} from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import {listenToSocketEvent} from '../api/sockets';
import {FieldError} from '../components/transcription/common/FieldError';

const makeContext = <T,>(render: () => T) => {
	const MyContext = createContext<T>({} as T);

	const useMyContext = () => useContext(MyContext);

	const MyProvider: FC<{ children: ReactNode }> = ({ children }) => {
		const value = render();
		return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
	};

	return [MyProvider, useMyContext] as const;
};

interface Values {
	name: string;
}

const minLength = 3;
const maxLength = 50;
const validationSchema = object({
	name: string()
		.required('Project name is required')
		.min(minLength, `Project name must be at least ${minLength} characters`)
		.max(maxLength, `Project name must not exceed ${maxLength} characters`),
});

const debounceTimeMs = 750;

export const [UserProjectsProvider, useUserProjects] = makeContext(() => {
	const {
		user
	} = useAuth();

	const {
		requestPayload,
		adjustedFileData,
		setWillProgressBeLost,
		unTouchedTranscription,
		longestSegmentLength,
		maxWordsPerSegment,
		projectScreenshotUrl
	} = useTranscriptionContext();

	const initialValues = {
		name: adjustedFileData.name
	};

	const [isUpgradeDialogOpen, setIsUpgradeDialogOpen] = useState(false);

	const [currentUserProject, setCurrentUserProject] = useState<UserProject | null>(null);
	const [userProjectToUpdate, setUserProjectToUpdate] = useState<UserProject | null>(null);
	const [isAddNewUserProjectDialogOpen, setIsAddNewUserProjectDialogOpen] = useState(false);
	const [isCurrentProjectSaved, setIsCurrentProjectSaved] = useState(false);

	const [isLoadingUserProjects, setIsLoadingUserProjects] = useState(true);
	const [isUserProjectsFreeDialogOpen, setIsUserProjectsFreeDialogOpen] = useState(false);
	const [isUserProjectsBasicDialogOpen, setIsUserProjectsBasicDialogOpen] = useState(false);
	const [isAllChangesSavedTooltipOpen, setIsAllChangesSavedTooltipOpen] = useState(false);
	const [shouldValidateUserProjectsCreation, setShouldValidateUserProjectsCreation] = useState(false);

	const [userProjects, setUserProjects] = useState<UserProject[]>([]);

	const [isSavingUserProjectLoading, setIsSavingUserProjectLoading] = useState(false);
	const [isUpdatingUserProjectLoading, setIsUpdatingUserProjectLoading] = useState(false);

	const areUserProjectsFetched = useRef(false);

	useEffect(() => {
		currentUserProjectRef.current = currentUserProject;
	}, [currentUserProject]);

	useEffect(() => {
		requestPayloadRef.current = requestPayload;
	}, [requestPayload]);

	useEffect(() => {
		maxWordsPerSegmentRef.current = maxWordsPerSegment;
	}, [maxWordsPerSegment]);

	const debouncedSaveFunction = useCallback(
		debounce(async () => {
			await autoSaveProject();
		}, debounceTimeMs),
		[]
	);

	useEffect(() => {
		if (isCurrentProjectSaved) {
			debouncedSaveFunction();
		}
		return () => {
			debouncedSaveFunction.cancel();
		};
	}, [currentUserProject?.auto_scroll_script, isCurrentProjectSaved, requestPayload, debouncedSaveFunction]);

	const fetchUserProjects = async () => {
		try {
			const fetchedUserProjects = await getUserProjects();
			setUserProjects(fetchedUserProjects);
		} catch (e) {
			displayError(e);
		}
		setIsLoadingUserProjects(false);
	};

	const fetchInitialUserProjects = async () => {
		if (areUserProjectsFetched.current) {
			return;
		}
		await fetchUserProjects();
		if (user) {
			listenToSocketEvent('user-projects-update', async () => {
				await fetchUserProjects();
			}, user.id.toString(), null);
		}

		areUserProjectsFetched.current = true;
	};

	const addNewUserProject = async (values: Values, originalSegments?: Segment[]) => {
		try {
			if (!projectScreenshotUrl) {
				return;
			}
			const newProject: AddUserProjectBody = {
				request_id: requestPayload.requestId,
				name: values.name,
				request_payload: requestPayload,
				untouched_transcription: originalSegments ? originalSegments : unTouchedTranscription,
				longest_segment_length: longestSegmentLength.current,
				current_max_words_per_segment: maxWordsPerSegment,
				screenshot_url: projectScreenshotUrl,
				auto_scroll_script: true
			};
			setIsSavingUserProjectLoading(true);
			const createdProject = await addUserProject(newProject);
			setCurrentUserProject(createdProject);
			displaySuccess('Project saved successfully!');
			history.replaceState(null, '', `/transcribe/${createdProject.request_payload.requestId}`);
			setWillProgressBeLost(false);
			setIsCurrentProjectSaved(true);
			await fetchUserProjects();
		} catch (e) {
			displayError(e);
		}
		setIsAddNewUserProjectDialogOpen(false);
		setIsSavingUserProjectLoading(false);
	};

	const autoSaveProject = async () => {
		try {
			const project = currentUserProjectRef.current;
			if (!project) {
				return;
			}
			setIsUpdatingUserProjectLoading(true);
			const updatedProject = await updateUserProject(project.request_id, {
				name: project.name,
				request_payload: requestPayloadRef.current,
				current_max_words_per_segment: maxWordsPerSegmentRef.current,
				auto_scroll_script: project.auto_scroll_script
			});
			setIsUpdatingUserProjectLoading(false);
			setCurrentUserProject(updatedProject);
		} catch (e) {
			displayError(e);
		}
	};

	const updateProjectName = async (values: Values) => {
		try {
			if (!userProjectToUpdate) {
				return;
			}
			setIsUpdatingUserProjectLoading(true);
			if (values.name !== userProjectToUpdate?.name) {
				await updateUserProjectName(userProjectToUpdate.request_id, values.name);
			}
			setIsUpdatingUserProjectLoading(false);
			setIsAddNewUserProjectDialogOpen(false);
			displaySuccess('Project updated successfully!');
			await fetchUserProjects();
		} catch (e) {
			displayError(e);
		}
	};

	const validateAddNewProject = () => {
		if (!user) {
			return;
		}
		if (user.current_plan.plan_type === 'FREE') {
			setIsUpgradeDialogOpen(true);
			return;
		}
		if (user.current_plan.plan_type === 'BASIC' && userProjects.length >= user.current_plan.user_project_limit) {
			setIsUpgradeDialogOpen(true);
			return;
		}
		if (user.current_plan.plan_type === 'PRO' && userProjects.length >= user.current_plan.user_project_limit) {
			displayInfo('You have reached projects limit, delete some in the Projects page to save new ones');
			return;
		}
		setIsAddNewUserProjectDialogOpen(true);
	};

	const currentUserProjectRef = useRef(currentUserProject);
	const requestPayloadRef = useRef(requestPayload);
	const maxWordsPerSegmentRef = useRef(maxWordsPerSegment);

	const addNewProjectDialog = () => {
		return (
			<UIDialog
				open={isAddNewUserProjectDialogOpen}
				title="Save project"
				topRightElement={
					<IconButton
						aria-label="close"
						onClick={() => {setIsAddNewUserProjectDialogOpen(false);}}
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
						<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => addNewUserProject(values)}>
							{(formik) => {
								return (
									<Form>
										<Grid container item alignItems="center" xs={12} height="70px">
											<Grid item xs={12}>
												<UIText
													variant="small"
													mb={1}
												>
													Project name
												</UIText>
											</Grid>
											<Paper
												elevation={0}
												sx={{
													p: '2px 4px',
													display: 'flex',
													alignItems: 'center',
													backgroundColor: colors.inputBgGrey,
													border: `1px solid ${(!formik.isValid && formik.touched.name) ? 'red' : colors.inputBorderGrey}`,
													height: '56px',
													width: '100%'
												}}
											>
												<Field name="name">
													{({ field, meta }: FieldProps) => (
														<InputBase
															{...field}
															sx={{
																ml: 1,
																flex: 1,
																color: 'black',
																'& .MuiInputBase-input::placeholder': {
																	fontSize: '14px'
																},
															}}
															placeholder="Enter your new project name here"
															error={meta.touched && !!meta.error}
														/>
													)}
												</Field>
											</Paper>
										</Grid>
										<Grid item xs={12} sx={{p: 0, mt: 3}}>
											<Field name="name">
												{({ meta }: FieldProps) => (
													meta.touched && meta.error && (
														<FieldError
															errorMessage={meta.error}
															marginTop="0px"
															marginBottom="-12px"
														/>
													)
												)}
											</Field>
										</Grid>
										<Grid container item xs={12} justifyContent="center" mt={1}>
											<UIButton
												title="Save"
												colorType="primary"
												variant="contained"
												type="submit"
												onClick={() => {}}
												disabled={!formik.isValid && formik.touched.name}
												isLoading={isSavingUserProjectLoading}
											/>
										</Grid>
									</Form>
								);
							}}
						</Formik>
					</>
				}
			/>
		);
	};

	const saveProjectDialog = () => {
		return (
			<UIDialog
				open={isAddNewUserProjectDialogOpen}
				title="Save project"
				topRightElement={
					<IconButton
						aria-label="close"
						onClick={() => {setIsAddNewUserProjectDialogOpen(false);}}
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
						<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={updateProjectName}>
							{(formik) => {
								return (
									<Form>
										<Grid container item alignItems="center" xs={12} height="70px">
											<Grid item xs={12}>
												<UIText
													variant="small"
													mb={1}
												>
													Project name
												</UIText>
											</Grid>
											<Paper
												elevation={0}
												sx={{
													p: '2px 4px',
													display: 'flex',
													alignItems: 'center',
													backgroundColor: colors.inputBgGrey,
													border: `1px solid ${(!formik.isValid && formik.touched.name) ? 'red' : colors.inputBorderGrey}`,
													height: '56px',
													width: '100%'
												}}
											>
												<Field name="name">
													{({ field, meta }: FieldProps) => (
														<InputBase
															{...field}
															sx={{
																ml: 1,
																flex: 1,
																color: 'black',
																'& .MuiInputBase-input::placeholder': {
																	fontSize: '14px'
																},
															}}
															placeholder="Enter your project name here"
															error={meta.touched && !!meta.error}
														/>
													)}
												</Field>
											</Paper>
										</Grid>
										<Grid item xs={12} sx={{p: 0, mt: 3}}>
											<Field name="name">
												{({ meta }: FieldProps) => (
													meta.touched && meta.error && (
														<FieldError
															errorMessage={meta.error}
															marginTop="0px"
															marginBottom="-12px"
														/>
													)
												)}
											</Field>
										</Grid>
										<Grid container item xs={12} justifyContent="center" mt={1}>
											<UIButton
												title="Save"
												colorType="primary"
												variant="contained"
												type="submit"
												onClick={() => {}}
												disabled={!formik.isValid && formik.touched.name}
												isLoading={isUpdatingUserProjectLoading}
											/>
										</Grid>
									</Form>
								);
							}}
						</Formik>
					</>
				}
			/>
		);
	};

	return {
		userProjects,
		fetchUserProjects,
		fetchInitialUserProjects,
		isLoadingUserProjects,
		isUserProjectsFreeDialogOpen,
		setIsUserProjectsFreeDialogOpen,
		isUserProjectsBasicDialogOpen,
		setIsUserProjectsBasicDialogOpen,
		shouldValidateUserProjectsCreation,
		setShouldValidateUserProjectsCreation,
		isAddNewUserProjectDialogOpen,
		setIsAddNewUserProjectDialogOpen,
		userProjectToUpdate,
		setUserProjectToUpdate,
		isCurrentProjectSaved,
		setIsCurrentProjectSaved,
		isSavingUserProjectLoading,
		setIsSavingUserProjectLoading,
		addNewProjectDialog,
		isAllChangesSavedTooltipOpen,
		setIsAllChangesSavedTooltipOpen,
		isUpdatingUserProjectLoading,
		currentUserProject,
		setCurrentUserProject,
		saveProjectDialog,
		isUpgradeDialogOpen,
		setIsUpgradeDialogOpen,
		validateAddNewProject,
		addNewUserProject
	};
});