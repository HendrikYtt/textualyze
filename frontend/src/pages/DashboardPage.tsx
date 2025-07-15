import Box from '@mui/material/Box';
import { Helmet } from 'react-helmet-async';
import * as React from 'react';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import {IconButton, InputAdornment, TextField} from '@mui/material';
import { UIText } from '../components/ui/UIText';
import { isSmallerThanMd } from '../hooks/is-compact';
import SearchIcon from '@mui/icons-material/Search';
import { colors } from '../themes';
import { useEffect } from 'react';
import { useUserProjects } from '../contexts/UserProjectsContext';
import {UIButton} from '../components/ui/UIButton';
import {UIDialog} from '../components/ui/UIDialog';
import {displayError, displayInfo, useHandleNavigation} from '../utils/utils';
import {deleteUserProject} from '../api/user-projects';
import {useTranscriptionContext} from '../contexts/TranscriptionContext';
import {useAuth} from '../contexts/UsersContext';
import {lighten} from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import {formatTime} from '../utils/time';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export const DashboardPage = () => {
	const {
		user
	} = useAuth();

	const handleNavigation = useHandleNavigation();
	
	const smallerThanMd = isSmallerThanMd();

	const {
		setAdjustedFileData
	} = useTranscriptionContext();

	const {
		fetchInitialUserProjects,
		isLoadingUserProjects,
		userProjects,
		fetchUserProjects,
		saveProjectDialog,
		setIsAddNewUserProjectDialogOpen,
		setUserProjectToUpdate,
	} = useUserProjects();

	const [searchTerm, setSearchTerm] = useState('');

	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [isDeleteLoading, setIsDeleteLoading] = useState(false);
	const [projectIdToDelete, setProjectIdToDelete] = useState<string | null>(null);

	const deleteProject = async () => {
		if (!projectIdToDelete) {
			return;
		}
		try {
			setIsDeleteLoading(true);
			await deleteUserProject(projectIdToDelete);
			setIsDeleteDialogOpen(false);
			displayInfo('Project deleted');
			await fetchUserProjects();
		} catch (e) {
			displayError(e);
		}
		setIsDeleteLoading(false);
	};

	useEffect(() => {
		fetchInitialUserProjects();
	}, []);

	const filteredProjects = searchTerm
		? userProjects.filter(project =>
			project.name.toLowerCase().includes(searchTerm.toLowerCase())
		)
		: userProjects;

	const formatDate = (isoDateString: string): string => {
		const currentDate = new Date(isoDateString);
		return currentDate.toLocaleString('en-GB', {
			year: 'numeric',
			month: 'short',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: false
		});
	};

	const formatExpiresIn = (isoDateString: string): string => {
		const currentDate = new Date();
		const targetDate = new Date(isoDateString);

		const differenceInMilliseconds = targetDate.getTime() - currentDate.getTime();

		const days = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));

		return `${days} days`;
	};

	return (
		<>
			<Helmet>
				<title>Textualyze - Projects</title>
			</Helmet>
			<Grid container justifyContent="center">
				<UIText variant="h1" sx={{color: 'white'}}>
					Projects
				</UIText>
			</Grid>
			<Box
				mt={smallerThanMd ? 4 : 6}
				px="20px"
				pb={3}
				sx={{
					backgroundColor: 'white',
					borderRadius: '12px',
					height: userProjects.length === 0 ? '500px' : 'auto',
					display: 'flex',
					alignItems: userProjects.length === 0 ? 'center' : 'start',
					justifyContent: 'center'
				}}
			>
				{userProjects.length === 0 && !isLoadingUserProjects && (
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							flexDirection: 'column'
						}}
					>
						<UIText variant="regular" mb={2}>
								You don&apos;t have any saved projects
						</UIText>
						<UIButton
							title="Transcribe"
							path={'/transcribe'}
							colorType="primary"
							variant="contained"
							onClick={() => {
								handleNavigation('/transcribe', true);
							}}
						>
							<ArrowForwardIcon />
						</UIButton>
					</div>
				)}
				{filteredProjects.length > 0 && (
					<Grid container>
						<Grid container>
							<Grid item xs={12}>
								<UIText variant="regular" pt={2} mb={smallerThanMd ? 1 : 2}>
									My Projects {user && user.current_plan.user_project_limit > 0 ? `(${userProjects.length}/${user?.current_plan.user_project_limit})` : ''}
								</UIText>
							</Grid>
							<Grid item xs={12}>
								<Grid container justifyContent="start">
									<TextField
										variant="outlined"
										placeholder="Search"
										fullWidth
										onChange={(e) => setSearchTerm(e.target.value)}
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													<SearchIcon sx={{ color: colors.grey, mr: '5px', mt: '3px' }} />
												</InputAdornment>
											),
										}}
									/>
								</Grid>
							</Grid>
						</Grid>

						<Grid container justifyContent={userProjects.length === 0 ? 'center' : 'start'} mt={3}
							  style={{
								  gridGap: '10px'
							  }}
						>
							{filteredProjects.map(project => {
								return (
									<Grid
										key={project.request_id}
										container
										item
										xs={12}
										sm={12}
										md={5.925}
										lg={3.925}
										sx={{
											backgroundColor: colors.inputBgGrey,
											border: `1px solid ${colors.inputBorderGrey}`,
											borderRadius: '8px',
											position: 'relative',
											height: '110px',
											px: 2,
											py: 1,
											'&:hover': {
												cursor: 'pointer'
											}
										}}
										onClick={() => {
											handleNavigation(`/transcribe/${project.request_payload.requestId}`, true);
										}}
									>
										<div
											style={{
												position: 'absolute',
												top: 0,
												right: 0,
												display: 'flex',
												flexDirection: 'row',
												justifyContent: 'flex-end',
												alignItems: 'center',
												columnGap: '10px',
												padding: '4px'
											}}
										>
											<IconButton
												sx={{
													m: 0,
													p: 0,
												}}
												onClick={(event) => {
													event.stopPropagation();
													setUserProjectToUpdate(project);
													setProjectIdToDelete(project.request_id);
													setIsDeleteDialogOpen(true);
													setAdjustedFileData(prevState => {
														return {
															...prevState,
															name: project.name
														};
													});
												}}
											>
												<CloseIcon
													sx={{
														color: colors.palette.primary,
														fontSize: '32px',
														'&:hover': {
															cursor: 'pointer'
														}
													}}
												/>
											</IconButton>
										</div>
										<Grid
											item
											sx={{
												backgroundColor: '#dbdbe8',
												height: '90px',
												width: '90px',
												minWidth: '90px',
												maxWidth: '90px',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
												borderRadius: '4px',
												position: 'relative'
											}}
										>
											<img
												src={project.screenshot_url}
												alt="Project screenshot"
												style={{
													maxWidth: '100%',
													maxHeight: '100%',
													width: 'auto',
													height: 'auto',
													objectFit: 'contain',
												}}
											/>
											<div
												style={{
													position: 'absolute',
													bottom: '4px',
													right: '4px',
													fontSize: '12px',
													color: 'white',
													backgroundColor: 'rgba(0, 0, 0, 0.5)',
													padding: '2px 4px',
													borderRadius: '2px',
												}}
											>
												{formatTime(project.request_payload.duration, true)}
											</div>
										</Grid>
										<Grid item xs container direction="column" alignItems="center" justifyContent="center" pl={1}>
											<Grid
												container
											>
												<Grid item>
													<p style={{
														maxWidth: smallerThanMd ? '150px' : '210px',
														whiteSpace: 'nowrap',
														overflow: 'hidden',
														textOverflow: 'ellipsis',
														color: 'black',
														margin: 0,
														padding: 0,
														fontSize: smallerThanMd ? '16px' : '18px',
														fontWeight: '600',
														textDecoration: 'underline'
													}}>
														{project.name}
													</p>
												</Grid>
											</Grid>
											<Grid
												container
												justifyContent="space-between"
												alignItems="center"
											>
												<UIText variant="tiny">
													{formatDate(`${project.created_at}`)}
												</UIText>

											</Grid>
											<Grid container>
												<UIText
													variant="tiny"
													color={
														(() => {
															const expiresIn = formatExpiresIn(`${project.expiration_date}`);
															const match = expiresIn.match(/(\d+)/);
															const days = match ? parseInt(match[1]) : Infinity;
															return days < 3 ? 'red' : colors.grey;
														})()
													}
												>
													Expires in {formatExpiresIn(`${project.expiration_date}`)}
												</UIText>
											</Grid>
										</Grid>
									</Grid>
								);
							})}
						</Grid>
					</Grid>
				)}

			</Box>

			<UIDialog
				open={isDeleteDialogOpen}
				title="Are you sure?"
				topRightElement={
					<IconButton
						aria-label="close"
						onClick={() => setIsDeleteDialogOpen(false)}
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
					</>
				}
				actions={
					<Grid container item xs={12} justifyContent="center" mt={1}>
						<UIButton
							title="Delete"
							colorType="primary"
							variant="contained"
							type="submit"
							onClick={async () => {
								await deleteProject();
							}}
							isLoading={isDeleteLoading}
						/>
					</Grid>
				}
			/>
			{saveProjectDialog()}
		</>
	);
};
