import {
	Avatar,
	Box,
	CircularProgress,
	Grid,
	IconButton,
	LinearProgress,
	Menu,
	MenuItem,
	Typography
} from '@mui/material';
import {colors} from '../../themes';
import {capitalize, displayError, displayInfo, getPlanTypeIcon, useHandleNavigation} from '../../utils/utils';
import {UIButton} from '../ui/UIButton';
import {handleGAEvent} from '../../lib/google-analytics';
import React, {useState} from 'react';
import {useAuth} from '../../contexts/UsersContext';
import CloseIcon from '@mui/icons-material/Close';
import {managePaymentDetails} from '../../api/stripe';
import {useLocation} from 'react-router-dom';
import {isSmallerThanSm} from '../../hooks/is-compact';
import {dashboardDropdownZIndex} from '../../const/ui';
import {useMenu} from '../../hooks/use-menu';

export const DashboardDropdown = () => {
	const {
		user,
		logout,
		setIsDrawerOpen
	} = useAuth();

	const location = useLocation();
	const smallerThanSm = isSmallerThanSm();

	const {
		handleMenuClose,
		handleMenuClick,
		anchorEl
	} = useMenu();

	const currentPath = location.pathname;

	const handleNavigation = useHandleNavigation();

	const [isLoadingPaymentDetails, setIsLoadingPaymentDetails] = useState(false);

	const openPaymentDetails = async () => {
		setIsLoadingPaymentDetails(true);
		try {
			const session = await managePaymentDetails(currentPath);
			window.open(session.url, '_self');
			setTimeout(() => {
				setIsLoadingPaymentDetails(false);
			}, 1500);
		} catch (e) {
			displayError(e);
			setIsLoadingPaymentDetails(false);
			return;
		}
	};

	const logoutActions = async () => {
		setIsDrawerOpen(false);
		await logout();
		displayInfo('Logged out');
		await handleNavigation('/', false);
	};

	const currentMonthUsage = () => {
		const date = new Date();
		const currentYear = date.getFullYear();
		const currentMonth = date.getMonth() + 1;
		return user?.usages.find(usage => usage.month === currentMonth && usage.year === currentYear);
	};

	const currentMonthPercentage = () => {
		const currentUsage = currentMonthUsage();
		if (!currentUsage) {
			return 0;
		}
		const used = currentUsage.transcribed_seconds;
		const total = user!.current_plan.transcribed_seconds_monthly_limit;
		return parseFloat(((used / total) * 100).toFixed(2));
	};

	const currentMonthUsageAndPercentage = () => {
		const currentUsage = currentMonthUsage();
		if (!currentUsage) {
			return '0%';
		}
		const used = currentUsage.transcribed_seconds;
		return `${(used / 60).toFixed(2)} min (${currentMonthPercentage()}%)`;
	};

	const currentMonthAndYear = () => {
		const date = new Date();
		const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short' };
		return date.toLocaleDateString('en-US', options);
	};

	const getUserIcon = () => {
		if (!user) {
			return null;
		}
		return (
			<>
				{user.profile_picture_url ? (
					<Avatar src={user.profile_picture_url} sx={{height: '48px', width: '48px'}}/>
				) : (
					<Avatar sx={{ color: 'white', backgroundColor: colors.palette.primary, height: '48px', width: '48px' }}>{user.email.charAt(0).toUpperCase()}</Avatar>
				)}
			</>
		);
	};

	const isDropdownOpen = Boolean(anchorEl);

	if (!user) {
		return null;
	}

	return (
		<>
			<IconButton
				onClick={handleMenuClick}
				size="large"
				edge="start"
				color="inherit"
				aria-label="menu"
				sx={{
					borderRadius: '70px',
					p: 0,
				}}
			>
				{isDropdownOpen ? (
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							height: '48px',
							width: '48px'
						}}
					>
						<CloseIcon />
					</div>

				) : (
					getUserIcon()
				)}

			</IconButton>
			<div style={{ position: 'relative' }}>
				<div style={{
					position: 'absolute',
					right: 14,
					top: -5,
					width: 0,
					height: 0,
					borderLeft: '10px solid transparent',
					borderRight: '10px solid transparent',
					borderBottom: '10px solid white',
					opacity: isDropdownOpen ? 1 : 0,
					transition: 'opacity 0.2s ease-in-out',
				}} />
				<Menu
					id="menu-appbar"
					anchorEl={anchorEl}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					keepMounted
					transformOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					open={isDropdownOpen}
					onClose={handleMenuClose}
					sx={{
						'& .MuiMenu-list': {
							padding: '0'
						},
						'& .MuiPaper-root': {
							borderRadius: '4px',
							marginTop: '52px',
							marginLeft: '0px',
							boxShadow: 'none'
						},
						zIndex: dashboardDropdownZIndex,
					}}
				>
					<MenuItem disableRipple sx={{padding: 0, cursor: 'default'}}>
						<Box
							sx={{
								height: '98px',
								width: '358px',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center'
							}}
						>
							<Grid container item sx={{paddingX: '24px'}} alignItems="center">
								<Grid item sx={{marginRight: smallerThanSm ? '15px' : '24px'}}>
									{getUserIcon()}
								</Grid>
								<Grid item>
									<Typography color="black" fontWeight="700" fontSize="18px">
										{user?.email}
									</Typography>
								</Grid>
							</Grid>
						</Box>
					</MenuItem>
					<MenuItem disableRipple sx={{padding: 0, cursor: 'default'}}>
						<Box
							sx={{
								width: '358px',
								borderTop: '1px solid rgba(204, 204, 204, 0.7)',
								borderBottom: '1px solid rgba(204, 204, 204, 0.7)',
								padding: '24px'
							}}
						>
							<>
								<Grid container rowSpacing={1} alignItems="center">
									<Grid item xs={12}>
										<Typography color={colors.grey} fontSize="14px">
											Plan type
										</Typography>
									</Grid>
									<Grid item xs={6}>
										<Grid container alignItems="center">
											<Grid item mb={-1}>
												{getPlanTypeIcon(user.current_plan.plan_type, '32px')}
											</Grid>
											<Grid item ml={1}>
												<Typography color="black" fontSize="16px">
													{capitalize(user.current_plan.plan_type) + ' plan'}
												</Typography>
											</Grid>
										</Grid>

									</Grid>
									<Grid container item xs={6} justifyContent="end">
										{user.current_plan.plan_type !== 'PRO' && (
											<UIButton
												title="Upgrade"
												colorType="secondary"
												variant="text"
												textColor={colors.palette.primary}
												underline={true}
												fontSize="16px"
												onClick={() => {
													handleNavigation('/pricing', false);
												}}
											/>
										)}
									</Grid>
								</Grid>
								<Grid container mt={4} alignItems="center">
									<Grid item xs={12}>
										<Typography color={colors.font.secondary} fontSize="14px">
											Payments
										</Typography>
									</Grid>
									<Grid container item justifyContent="space-between" alignItems="center">
										<Grid item>
											<Typography color="black" fontSize="16px">
												{capitalize(user.current_plan.billing_interval)}
											</Typography>
										</Grid>
										{user.current_plan.plan_type !== 'FREE' && user.stripe_customer_id && (
											<Grid item>
												{!isLoadingPaymentDetails
													?
													<UIButton
														title="Manage payments"
														colorType="secondary"
														variant="text"
														textColor={colors.palette.primary}
														underline={true}
														fontSize="16px"
														onClick={openPaymentDetails}
													/>
													:
													<CircularProgress size={20}/>
												}
											</Grid>
										)}
									</Grid>
								</Grid>
								<Grid container mt={2}>
									<Grid item xs={12} mb={1}>
										<Typography color={colors.font.secondary} fontSize="14px">
											Current usage
										</Typography>
									</Grid>
									<Grid item xs={6} color="black">
										{currentMonthAndYear()}
									</Grid>
									<Grid item xs={6} color="black" ml={-1}>
										<Typography textAlign="end">
											{currentMonthUsageAndPercentage()}
										</Typography>
									</Grid>
									<Grid item xs={12} mt="5px">
										<LinearProgress
											variant='determinate'
											value={currentMonthPercentage()}
											sx={{
												height: '10px',
												borderRadius: '5px',
												'& .MuiLinearProgress-bar': {
													borderRadius: '5px'
												},
											}}
										/>
									</Grid>
								</Grid>
							</>
						</Box>
					</MenuItem>
					<MenuItem disableRipple sx={{padding: 0, cursor: 'default'}}>
						<Box
							sx={{
								height: '80px',
								width: '358px',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center'
							}}
						>
							<UIButton
								title="Logout"
								colorType="primary"
								variant="contained"
								onClick={async () => {
									handleGAEvent('Logout');
									await logoutActions();
								}}
							/>
						</Box>
					</MenuItem>
				</Menu>
			</div>
		</>
	);
};