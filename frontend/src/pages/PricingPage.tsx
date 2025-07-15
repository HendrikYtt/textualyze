import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {CircularProgress} from '@mui/material';
import {
	capitalize,
	displayError,
	displayInfo,
	displaySuccess,
	getPlanTypeIcon,
	useHandleNavigation
} from '../utils/utils';
import {colors} from '../themes';
import {tryoutUserId, useAuth} from '../contexts/UsersContext';
import {subscribe} from '../api/stripe';
import {BillingInterval, findKeyByPlanType, LookupKey, PlanType} from '@hendrikytt/api-contracts';
import {usePlans} from '../contexts/PlansContext';
import {useLocation} from 'react-router-dom';
import {SEO} from '../components/SEO/SEO';
import './styles.css';
import {isSmallerThanMd, isSmallerThanSm} from '../hooks/is-compact';
import {handleGAEvent} from '../lib/google-analytics';
import {UIButton} from '../components/ui/UIButton';
import {UIText} from '../components/ui/UIText';
import {UIToggle} from '../components/ui/UIToggle';
import {UIPrice} from '../components/ui/UIPrice';
import {PlanFeatures} from '../components/stripe/PlanFeatures';

export const PricingPage = () => {
	const location = useLocation();

	const {isLoggedIn, user} = useAuth();

	const {
		plans,
		isLoadingPlans,
		isSaleCurrentlyActive,
		hardCodedPlans
	} = usePlans();

	const handleNavigation = useHandleNavigation();

	const smallerThanSm = isSmallerThanSm();
	const smallerThanMd = isSmallerThanMd();

	const [isChoosePlanLoading, setIsChoosePlanLoading] = useState(false);
	const [isYearly, setIsYearly] = useState(false);

	const newlySelectedBillingInterval = useRef<BillingInterval | undefined>(undefined);
	const newlySelectedPlanId = useRef<number | undefined>(undefined);
	const newlySelectedPlanType = useRef<PlanType | undefined>(undefined);

	useEffect(() => {
		const queryParams = new URLSearchParams(location.search);
		const selectedPlanId = queryParams.get('selectedPlanId');

		const handleSelectedPlanId = async () => {
			if (selectedPlanId && user && plans.length > 0) {
				const url = new URL(window.location.href);
				url.searchParams.delete('selectedPlanId');
				window.history.replaceState(null, document.title, url.toString());

				const selectedPlan = plans.find(p => p.id === parseInt(selectedPlanId));
				if (!selectedPlan) {
					return;
				}
				newlySelectedPlanType.current = selectedPlan.plan_type;
				newlySelectedBillingInterval.current = selectedPlan.billing_interval;
				if (user.current_plan.id !== 6 && (parseInt(selectedPlanId) === user.current_plan.id || user.current_plan.id > parseInt(selectedPlanId))) {
					displayInfo('You already have premium plan');
					return;
				}
				handleGAEvent(`${newlySelectedPlanType.current!}_confirm`);
				await handleUpgradeOrPurchase();
			}
		};

		handleSelectedPlanId();
	}, []);

	const userHasPremiumPlan = user?.current_plan?.plan_type
		? ['BASIC', 'PRO'].includes(user?.current_plan?.plan_type as PlanType)
		: false;

	const handlePlanClick = async () => {
		if (newlySelectedPlanType.current === 'BASIC' || newlySelectedPlanType.current === 'PRO') {
			if (!isLoggedIn || !user) {
				handleNavigation(`/signup?selectedPlanId=${newlySelectedPlanId.current}`, false);
				displayInfo('You need to be authenticated first');
				return;
			}
			newlySelectedBillingInterval.current = isYearly ? 'ANNUALLY' : 'MONTHLY';
			handleGAEvent(`${newlySelectedPlanType.current!}_confirm`);
			await handleUpgradeOrPurchase();
			handleGAEvent(newlySelectedPlanType.current);
		} else {
			if (isLoggedIn) {
				handleNavigation('/transcribe', false);
			} else {
				handleNavigation('/login', false);
				displayInfo('You need to be authenticated first');
			}
		}
	};

	const handleUpgradeOrPurchase = async () => {
		if (!user || user.id === 999999 || !newlySelectedPlanType.current || !newlySelectedBillingInterval.current) {
			return;
		}
		try {
			setIsChoosePlanLoading(true);
			const data = await subscribe(
				user.email,
				newlySelectedPlanType.current,
				newlySelectedBillingInterval.current
			);
			setTimeout(() => {
				setIsChoosePlanLoading(false);
			}, 1500);
			if (data.url === '') {
				displaySuccess('Subscription updated!');
				handleNavigation('/transcribe', false);
				return;
			}
			window.location.href = data.url;
		} catch (e) {
			setIsChoosePlanLoading(false);
			displayError(e);
		}
	};

	const isCurrentPlanDisabled = (userPlanLookupKey: LookupKey | undefined, currentCardLookupKey: LookupKey) => {
		if (userPlanLookupKey === 'BASIC_MONTHLY' && currentCardLookupKey === 'BASIC_MONTHLY') {
			return true;
		}
		if (userPlanLookupKey === 'BASIC_ANNUALLY' &&
			(currentCardLookupKey === 'BASIC_MONTHLY' || currentCardLookupKey === 'BASIC_ANNUALLY' || currentCardLookupKey === 'PRO_MONTHLY')
		) {
			return true;
		}
		if (userPlanLookupKey === 'PRO_MONTHLY' &&
			(currentCardLookupKey === 'BASIC_MONTHLY' || currentCardLookupKey === 'BASIC_ANNUALLY' || currentCardLookupKey === 'PRO_MONTHLY')
		) {
			return true;
		}
		if (userPlanLookupKey === 'PRO_ANNUALLY') {
			return true;
		}
		return false;
	};

	return (
		<>
			<SEO path="/pricing" />
			<Box>
				<UIText variant="h1" sx={{color: 'white', textAlign: 'center', mb: '10px', lineHeight: '1.2'}}>
					Simple, transparent pricing
				</UIText>
				<Grid container alignItems="center" justifyContent="center" mb={3}>
					<Typography
						variant="body1"
						align="center"
					>
						Choose the plan that fits your needs
					</Typography>
				</Grid>
				<Grid container alignItems="center" justifyContent="center" mt={2} mb={smallerThanSm ? 4 : 14}>
					<Grid item>
						<UIToggle
							isInitialYearly={false}
							isYearly={isYearly}
							setIsYearly={setIsYearly}
						/>
					</Grid>
				</Grid>

				{isLoadingPlans && (
					<Grid container alignItems="center" justifyContent="center">
						<CircularProgress/>
					</Grid>
				)}
				{!isLoadingPlans && (
					<Grid container columnSpacing={smallerThanMd ? 0 : 1} sx={{
						backgroundColor: colors.paper.primary,
						borderRadius: '8px',
						py: '20px',
						px: '0px',
						mt: smallerThanMd ? '0px' : '48px'
					}}>
						{hardCodedPlans.map((plan) => {
							const price = isYearly ? plan.annualPrice * 12 : plan.monthlyPrice;
							const discountedPrice = isYearly ? plan.discountedAnnualPrice * 12 : plan.discountedMonthlyPrice;
							const saveAmount = isYearly ?
								(plan.annualPrice - plan.discountedAnnualPrice) * 12
								:
								plan.monthlyPrice - plan.discountedMonthlyPrice;
							const features = isYearly ? plan.annualFeatures : plan.monthlyFeatures;
							const isCurrentPlanPurchased = isYearly
								? user?.current_plan?.plan_type === plan.planType && user?.current_plan.billing_interval === 'ANNUALLY' && user?.id !== tryoutUserId
								: user?.current_plan?.plan_type === plan.planType && user?.current_plan.billing_interval === 'MONTHLY' && user?.id !== tryoutUserId;
							const currentLookupKey = isYearly
								? `${plan.planType}_ANNUALLY`
								: `${plan.planType}_MONTHLY`;
							return (
								<Grid item xs={12} md={4} key={plan.monthlyFeatures.join('')} sx={{
									mb: smallerThanMd ? '20px' : '0'
								}}>
									<Box
										sx={{
											backgroundColor: colors.paper.primary,
											height: (plan.planType === 'BASIC' && !smallerThanMd) ? '112%' : '104%',
											display: 'grid',
											gridTemplateRows: '25px 40px 80px 180px auto',
											rowGap: '0px',
											alignItems: 'start',
											justifyContent: 'center',
											py: 3,
											mx: '0px',
											transform: plan.planType === 'BASIC' ? `translateY(-${smallerThanMd ? '5' : '65'}px) translateX(${smallerThanMd ? 0 : -24}px)` : 'none',
											boxShadow: plan.planType === 'BASIC' ? `0px ${smallerThanMd ? '0' : '42'}px 34px 0px rgba(82, 67, 194, 0.30)` : 'none',
											borderRadius: '8px',
											pl: 0,
											width: !smallerThanMd && plan.planType === 'BASIC' ? '112%' : '100%'
										}}
									>

										<Box sx={{ gridRow: '1 / 2', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', alignSelf: 'start', position: 'relative' }}>
											{plan.planType !== 'FREE' && isSaleCurrentlyActive && (
												<Box sx={{
													backgroundColor: colors.yellow,
													color: 'black',
													px: '16px',
													py: '7px',
													borderRadius: '26px',
													boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.3)',
													typography: 'subtitle2',
													position: 'absolute',
													top: `${smallerThanMd ? '-10' : '0'}px`,
													right: '-10px'
												}}>
													<Typography fontSize="12px" sx={{ whiteSpace: 'nowrap' }}>
														<strong>
															{`YOU SAVE $${saveAmount}!`}
														</strong>
													</Typography>
												</Box>
											)}
										</Box>

										<Box sx={{gridRow: '2 / 3', display: 'flex', justifyContent: 'start', alignItems: 'center', alignSelf: 'start'}}>
											{getPlanTypeIcon(plan.planType, '38px')}
											<UIText
												variant="h3"
												component="h2"
												ml="6px"
											>
												{capitalize(plan.planType)}
											</UIText>
										</Box>
										<Box sx={{gridRow: '3 / 4', display: 'flex', alignItems: 'center', justifyContent: 'start', marginTop: '20px'}}>
											<UIPrice
												price={price}
												discountedPrice={discountedPrice}
												planType={plan.planType}
												isSaleCurrentlyActive={isSaleCurrentlyActive}
												isYearly={isYearly}
												variant={'h2'}
												billingIntervalFontSize={'17px'}
											/>
										</Box>

										<Box sx={{gridRow: '4 / 5', alignSelf: 'start'}}>
											{features.map((feature) => (
												<PlanFeatures
													key={feature}
													planType={plan.planType}
													feature={feature}
													themeColor={plan.themeColor}
												/>
											))}
										</Box>
										<Box sx={{gridRow: '5 / 6', alignSelf: 'end', display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
											{plan.planType === 'FREE' && (
												<UIButton
													title={isCurrentPlanPurchased ? 'Current plan' : plan.buttonText}
													colorType={plan.buttonColor}
													variant="contained"
													onClick={async () => {
														newlySelectedPlanType.current = plan.planType;
														const billingInterval = isYearly ? 'ANNUALLY' : 'MONTHLY';
														newlySelectedPlanId.current = findKeyByPlanType(newlySelectedPlanType.current, billingInterval);
														await handlePlanClick();

														if (typeof window.gtag_report_conversion === 'function') {
															window.gtag_report_conversion();
														}
													}}
													disabled={
														isCurrentPlanPurchased ||
														userHasPremiumPlan ||
														isCurrentPlanDisabled(user?.current_plan?.lookup_key, currentLookupKey as LookupKey) ||
														(newlySelectedPlanType.current !== plan.planType && isChoosePlanLoading)
													}
													backgroundColor="transparent"
													borderColor={userHasPremiumPlan ? 'transparent' : colors.palette.primary}
													textColor={colors.palette.primary}
													isLoading={newlySelectedPlanType.current === plan.planType && isChoosePlanLoading}
													loadingSpinnerColor={colors.palette.primary}
													style={{
														width: '210px'
													}}
												/>
											)}
											{plan.planType !== 'FREE' && (
												<UIButton
													title={isCurrentPlanPurchased ? 'Current plan' : plan.buttonText}
													colorType={plan.buttonColor}
													variant="contained"
													onClick={async () => {
														newlySelectedPlanType.current = plan.planType;
														const billingInterval = isYearly ? 'ANNUALLY' : 'MONTHLY';
														newlySelectedPlanId.current = findKeyByPlanType(newlySelectedPlanType.current, billingInterval);
														await handlePlanClick();

														if (typeof window.gtag_report_conversion === 'function') {
															window.gtag_report_conversion();
														}
													}}
													disabled={
														isCurrentPlanPurchased ||
														isCurrentPlanDisabled(user?.current_plan?.lookup_key, currentLookupKey as LookupKey) ||
														(newlySelectedPlanType.current !== plan.planType && isChoosePlanLoading)
													}
													isLoading={newlySelectedPlanType.current === plan.planType && isChoosePlanLoading}
													style={{
														width: '210px'
													}}
												/>
											)}
										</Box>
									</Box>
								</Grid>
							);
						})}
					</Grid>
				)}
			</Box>
		</>
	);
};