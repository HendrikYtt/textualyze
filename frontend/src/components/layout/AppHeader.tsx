import React from 'react';
import {AppBar, Box, Drawer, Grid, IconButton, Toolbar, Typography} from '@mui/material';
import {colors} from '../../themes';
import {displayInfo, useHandleNavigation} from '../../utils/utils';
import {useAuth} from '../../contexts/UsersContext';
import {isSmallerThan1050px, isSmallerThanSm} from '../../hooks/is-compact';
import MenuIcon from '@mui/icons-material/Menu';
import {useLocation} from 'react-router-dom';
import {useTranscriptionContext} from '../../contexts/TranscriptionContext';
import '../../pages/styles.css';
import {appBarHeight, discordLink} from '../../const/ui';
import {useDialogContext} from '../../contexts/DialogContext';
import {UIButton} from '../ui/UIButton';
import {handleGAEvent} from '../../lib/google-analytics';
import {DashboardDropdown} from './DashboardDropdown';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {usePlans} from '../../contexts/PlansContext';

export const AppHeader = () => {
	const location = useLocation();
	const handleNavigation = useHandleNavigation();

	const isLandingPage = location.pathname === '/';

	const {
		isLoggedIn,
		isUserLoading,
		logout,
		isDrawerOpen,
		setIsDrawerOpen
	} = useAuth();

	const {
		currentSaleBannerHeight
	} = usePlans();

	const {
		isAppBarFilled
	} = useDialogContext();

	const smallerThanSm = isSmallerThanSm();
	const smallerThan1050px = isSmallerThan1050px();

	const logoutActions = async () => {
		setIsDrawerOpen(false);
		await logout();
		displayInfo('Logged out');
		await handleNavigation('/', false);
	};

	const logo = () => {
		return (
			<Typography
				fontWeight="800"
				variant="h6"
				component="p"
				onClick={() => {
					setIsDrawerOpen(false);
					handleNavigation('/', false);
				}}
				sx={{
					userSelect: 'none',
					cursor: 'pointer',
					letterSpacing: '2px',
					display: 'inline-block'
				}}
			>
				TEXTUALYZE
			</Typography>
		);
	};

	if (isUserLoading) {
		return;
	}

	return (
		<>
			<AppBar
				elevation={0}
				sx={{
					position: 'fixed',
					width: '100%',
					paddingX: '0px',
					height: `${appBarHeight}px`,
					marginTop: `${currentSaleBannerHeight}px`,
					backgroundColor: !isAppBarFilled ? 'transparent' : colors.background
				}}
			>
				<Toolbar sx={{height: '100%'}}>
					<Grid container>

						<Grid container item spacing={2} alignItems="center" direction="row" justifyContent="space-between" xs={12} sx={{
							pl: '24px',
							pr: '10px'
						}}>
							<Grid item>
								{logo()}
							</Grid>

							{!smallerThan1050px && (
								<Grid item container direction="row" xs justifyContent="right">
									<Grid item>
										<UIButton
											title="Blog"
											path="/blog"
											colorType="primary"
											variant="text"
											onClick={() => handleNavigation('/blog', false)}
											textColor={location.pathname === '/blog' ? colors.palette.primary : 'white'}
											underline={location.pathname === '/blog'}
											fontWeight={location.pathname === '/blog' ? '700' : '400'}
										/>
									</Grid>
									<Grid item>
										<UIButton
											title="Pricing"
											path="/pricing"
											colorType="primary"
											variant="text"
											onClick={() => handleNavigation('/pricing', false)}
											textColor={location.pathname === '/pricing' ? colors.palette.primary : 'white'}
											underline={location.pathname === '/pricing'}
											fontWeight={location.pathname === '/pricing' ? '700' : '400'}
										/>
									</Grid>
									<Grid
										sx={{
											display: 'flex',
											alignItems: 'center',
											px: '12px'
										}}
									>
										<div
											style={{
												marginBottom: '-5px',
												height: '32px',
												width: '2px',
												backgroundColor: '#ACA8C9',
											}}
										>

										</div>
									</Grid>
									{isLoggedIn && (
										<Grid item mr={2}>
											<UIButton
												title="Projects"
												path="/projects"
												colorType="primary"
												variant="text"
												onClick={() => handleNavigation('/projects', false)}
												textColor={location.pathname === '/projects' ? colors.palette.primary : 'white'}
												underline={location.pathname === '/projects'}
												fontWeight={location.pathname === '/projects' ? '700' : '400'}
											/>
										</Grid>
									)}
									{isLoggedIn && (
										<Grid item>
											<UIButton
												title="Transcribe"
												path="/transcribe"
												colorType="primary"
												variant="contained"
												onClick={() => handleNavigation('/transcribe', true)}
											>
												<ArrowForwardIcon sx={{ml: '8px', mb: '-2px'}} />
											</UIButton>
										</Grid>
									)}
									{isLoggedIn && (
										<Grid item ml={3} mr={3}>
											<DashboardDropdown />
										</Grid>
									)}
									{!isLoggedIn && (
										<>
											<Grid item mr={2}>
												<UIButton
													title="Login"
													path="/login"
													colorType="primary"
													variant="text"
													onClick={() => handleNavigation('/login', false)}
													bold={false}
												/>
											</Grid>

											<Grid item>
												<UIButton
													title="Sign Up"
													path="/signup"
													colorType="primary"
													variant="contained"
													onClick={() => handleNavigation('/signup', false)}
												/>
											</Grid>
										</>
									)}

								</Grid>
							)}

							{/*=====DRAWER=====*/}
							{smallerThan1050px && (
								<Grid item>
									<Grid container item alignItems="center">
										{isLoggedIn && (
											<Grid item mr={2}>
												<DashboardDropdown />
											</Grid>
										)}
										<Grid item>
											<IconButton
												onClick={() => {
													setIsDrawerOpen(true);
												}}
												size="large"
												edge={false}
												color="inherit"
												disableRipple
												sx={{
													backgroundColor: colors.palette.primary,
													mr: 2,
													borderRadius: '70px',
												}}
											>
												<MenuIcon/>
											</IconButton>
											<Drawer
												anchor="right"
												open={isDrawerOpen}
												onClick={() => {
													setIsDrawerOpen(false);
												}}
												sx={{
													'& .MuiDrawer-paper': {
														opacity: 0.90
													}
												}}
											>
												<Box
													width="100vw"
													role="presentation"
													sx={{
														height: '100%',
														backgroundColor: colors.background
													}}
												>
													<Grid container justifyContent="space-between" pl={2} alignItems="center" mt={2}>
														<Grid item ml={1}>
															{logo()}
														</Grid>
														<Grid item>
															<IconButton
																onClick={() => {
																	setIsDrawerOpen(false);
																}}
																size="large"
																edge={false}
																color="inherit"
																disableRipple
																sx={{
																	backgroundColor: colors.palette.primary,
																	mr: !smallerThanSm && isLandingPage ? '38px' : '26px',
																	borderRadius: '70px',
																}}
															>
																<CloseIcon/>
															</IconButton>
														</Grid>
													</Grid>

													<Box
														sx={{
															height: `calc(100% - ${120}px)`,
															display: 'flex',
															alignItems: 'center',
															justifyContent: 'center'
														}}
													>
														<Grid container rowSpacing={2} >
															<Grid container item xs={12} justifyContent="center">
																<UIButton
																	title="Blog"
																	onClick={() => {
																		setIsDrawerOpen(false);
																		handleNavigation('/blog', false);
																	}}
																	colorType="primary"
																	textColor={location.pathname === '/blog' ? colors.palette.primary : 'white'}
																	underline={location.pathname === '/blog'}
																	path="/blog"
																	variant="text"
																	fontWeight={location.pathname === '/blog' ? '700' : '400'}
																/>
															</Grid>
															<Grid container item xs={12} justifyContent="center">
																<UIButton
																	title="Pricing"
																	onClick={() => {
																		setIsDrawerOpen(false);
																		handleNavigation('/pricing', false);
																	}}
																	colorType="primary"
																	textColor={location.pathname === '/pricing' ? colors.palette.primary : 'white'}
																	underline={location.pathname === '/pricing'}
																	path="/pricing"
																	variant="text"
																	fontWeight={location.pathname === '/pricing' ? '700' : '400'}
																/>
															</Grid>
															{!isLoggedIn && (
																<>
																	<Grid container item xs={12} justifyContent="center">
																		<UIButton
																			title="Sign Up"
																			onClick={() => {
																				setIsDrawerOpen(false);
																				handleNavigation('/signup', false);
																			}}
																			colorType="primary"
																			variant="contained"
																		/>
																	</Grid>
																	<Grid container item xs={12} justifyContent="center">
																		<UIButton
																			title="Login"
																			onClick={() => {
																				setIsDrawerOpen(false);
																				handleNavigation('/login', false);
																			}}
																			colorType="primary"
																			variant="text"
																			textColor={colors.palette.primary}
																		/>
																	</Grid>
																</>
															)}

															{isLoggedIn && (
																<Grid container item xs={12} justifyContent="center">
																	<UIButton
																		title="Projects"
																		onClick={() => {
																			setIsDrawerOpen(false);
																			handleNavigation('/projects', false);
																		}}
																		colorType="primary"
																		textColor={location.pathname === '/projects' ? colors.palette.primary : 'white'}
																		underline={location.pathname === '/projects'}
																		path="/projects"
																		variant="text"
																		fontWeight={location.pathname === '/projects' ? '700' : '400'}
																	/>
																</Grid>
															)}
															{isLoggedIn && (
																<Grid container item xs={12} justifyContent="center">
																	<UIButton
																		title="Transcribe"
																		onClick={() => {
																			setIsDrawerOpen(false);
																			handleNavigation('/transcribe', true);
																		}}
																		colorType="primary"
																		variant="contained"
																	>
																		<ArrowForwardIcon />
																	</UIButton>
																</Grid>
															)}
															<Grid container item xs={12} justifyContent="center">
																{isLoggedIn && (
																	<UIButton
																		title="Logout"
																		onClick={async () => {
																			handleGAEvent('Logout');
																			await logoutActions();
																		}}
																		colorType="primary"
																		variant="text"
																		fontWeight={'400'}
																	/>
																)}
															</Grid>
														</Grid>
													</Box>
												</Box>
											</Drawer>
										</Grid>
									</Grid>
								</Grid>
							)}
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
		</>
	);
};
