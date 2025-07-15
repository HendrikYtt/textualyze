import {UIButton} from '../ui/UIButton';
import {colors} from '../../themes';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {CircularProgress, IconButton} from '@mui/material';
import {exportDropdownZIndex} from '../../const/ui';
import {lighten} from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import {ChoosePlan} from './ChoosePlan';
import {Elements} from '@stripe/react-stripe-js';
import {CheckoutForm} from './CheckoutForm';
import {UIText} from '../ui/UIText';
import {PlanFeatures} from './PlanFeatures';
import {UIDialog} from '../ui/UIDialog';
import React, {useEffect, useState} from 'react';
import * as stripeJs from '@stripe/stripe-js';
import {isSmallerThanMd} from '../../hooks/is-compact';
import {usePlans} from '../../contexts/PlansContext';
import {PlanType} from '@hendrikytt/api-contracts';
import {loadStripe} from '@stripe/stripe-js';
import {createPaymentIntent} from '../../api/stripe';

const planDescriptions: Record<PlanType, string> = {
	'FREE': 'Free forever',
	'BASIC': 'Perfect for beginners',
	'PRO': 'Suited for content creators'
};

const stripePromise = process.env.REACT_APP_ENV === 'dev'
	? loadStripe('pk_test_51O6fsqL3QCOA0at3fCg1ZIZrT3NjATmu2zNZzHrnIJf4J4swDV4xCMvMeFK4QDfl4hMYGI1sXh0rG2uhleEPml6a00OBAjaV13')
	: loadStripe('pk_live_51O6fsqL3QCOA0at3dZqsxRRQq4TKhJ6zYyDO1KaVv5oYjIrtWvYIZpQN4uadaLBZmgNq9tJAhKDvZwHIqTPeees900xdy65euE');

interface Props {
    isPaymentWallOpen: boolean;
    setIsPaymentWallOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PaymentWall: React.FC<Props> = ({
	isPaymentWallOpen,
	setIsPaymentWallOpen
}: Props) => {

	const {
		hardCodedPlans,
		isSaleCurrentlyActive,
		plans
	} = usePlans();

	const smallerThanMd = isSmallerThanMd();

	const [isIntentCreatingLoading, setIsIntentCreatingLoading] = useState(true);
	const [isYearly, setIsYearly] = useState(false);
	const [selectedPlanType, setSelectedPlanType] = useState<PlanType>('BASIC');
	const [clientSecret, setClientSecret] = useState<string>('');
	const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

	useEffect(() => {
		const createDefaultIntent = async () => {
			await createIntent('BASIC');
		};
		createDefaultIntent();
	}, []);

	const createIntent = async (planType: PlanType) => {
		setIsIntentCreatingLoading(true);
		const {clientSecret, paymentIntentId} = await createPaymentIntent(planType, isYearly ? 'ANNUALLY' : 'MONTHLY');
		setClientSecret(clientSecret);
		setPaymentIntent(paymentIntentId);
		setIsIntentCreatingLoading(false);
	};
    
	const getAmountToPay = () => {
		if (isYearly) {
			if (isSaleCurrentlyActive) {
				return 12 * currentHardCodedPlan.discountedAnnualPrice;
			} else {
				return 12 * currentHardCodedPlan.annualPrice;
			}
		} else {
			if (isSaleCurrentlyActive) {
				return currentHardCodedPlan.discountedMonthlyPrice;
			} else {
				return currentHardCodedPlan.monthlyPrice;
			}
		}
	};

	const options: stripeJs.StripeElementsOptions = {
		clientSecret,
	};

	const currentHardCodedPlan = hardCodedPlans.find(p => p.planType === selectedPlanType)!;
	const featuresToShow = isYearly ? currentHardCodedPlan.annualFeatures : currentHardCodedPlan.monthlyFeatures;

	const currentRegularPlan = plans.find(p => p.plan_type === selectedPlanType && (isYearly ? p.billing_interval === 'ANNUALLY' : p.billing_interval === 'MONTHLY'));

	return (
		<UIDialog
			open={isPaymentWallOpen}
			title=""
			fullScreen
			maxWidth={'1200px'}
			verticalMargin={smallerThanMd ? '10px' : '20px'}
			backgroundColor={'#f7f7f7'}
			padding={`0px ${smallerThanMd ? 10 : 0}px 0px ${smallerThanMd ? 10 : 20}px`}
			topLeftElement={
				<>
					{clientSecret && (
						<UIButton
							title="Choose plan"
							colorType="primary"
							variant="text"
							textColor={colors.palette.primary}
							onClick={() => {
								setClientSecret('');
								setIsYearly(false);
							}}
							removeSpacing
							contentBeforeText={true}
							fontSize="16px"
							sx={{
								position: 'absolute',
								top: '14px',
								left: smallerThanMd ? '-10px' : '10px',
								zIndex: 1,
								py: 1,
								px: 3,
							}}
						>
							<ArrowBackIcon sx={{color: colors.palette.primary}}/>
						</UIButton>
					)}
				</>
			}
			topRightElement={
				<IconButton
					aria-label="close"
					onClick={() => {
						setClientSecret('');
						setIsPaymentWallOpen(false);
						setIsYearly(true);
					}}
					sx={{
						position: 'absolute',
						right: 14,
						top: 14,
						color: 'white',
						backgroundColor: colors.palette.primary,
						zIndex: exportDropdownZIndex,
						'&:hover': {
							backgroundColor: lighten(colors.palette.primary, 0.15),
						}
					}}
				>
					<CloseIcon />
				</IconButton>
			}
			content={<>
				<Grid container pt={4} columnSpacing={2} justifyContent={'space-between'} sx={{
					height: smallerThanMd ? 'auto' : '100%',
					'& iframe': {
						height: smallerThanMd ? '300px !important' : 'auto' //stripe payment element (iframe)
					},
				}}>
					<Grid item xs={12} md={6.8}>
						{isIntentCreatingLoading && (
							<Grid container alignItems="center" justifyContent="center" style={{height: '100px'}}>
								<CircularProgress/>
							</Grid>
						)}
						{!clientSecret && !isIntentCreatingLoading && (
							<ChoosePlan
								setSelectedPlanType={setSelectedPlanType}
								selectedPlanType={selectedPlanType}
								isYearly={isYearly}
								setIsYearly={setIsYearly}
								createIntent={createIntent}
							/>
						)}
						{clientSecret && !isIntentCreatingLoading && (
							<Elements options={options} stripe={stripePromise}>
								<CheckoutForm
									selectedPlanId={currentRegularPlan?.id}
									amountToPay={getAmountToPay()}
									paymentIntent={paymentIntent}
								/>
							</Elements>
						)}
					</Grid>
					{smallerThanMd && (
						<Grid item xs={12}>
							<div
								style={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									flexDirection: 'column',
									height: '100%',
									marginTop: '20px'
								}}
							>
								<div
									style={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'start',
										flexDirection: 'column',
									}}
								>
									<UIText
										variant={'h2'}
										mb={1}
									>
										{currentHardCodedPlan.planType}
									</UIText>
									<UIText
										variant={'regular'}
										mb={1}
									>
										{planDescriptions[currentHardCodedPlan.planType]}
									</UIText>
									<div>
										{featuresToShow.map((feature) => (
											<PlanFeatures
												key={feature}
												planType={currentHardCodedPlan.planType}
												feature={feature}
												themeColor={currentHardCodedPlan.themeColor}
											/>
										))}
									</div>
								</div>
							</div>
						</Grid>
					)}

					{!smallerThanMd && (
						<Grid item md={5} pt={4} sx={{
							backgroundColor: 'white',
							height: '100%',
							borderRadius: '8px',
							boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px'
						}}>
							<div
								style={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'start',
									flexDirection: 'column',
									padding: '0px 0px 0px 40px'
								}}
							>
								<div
									style={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'start',
										flexDirection: 'column'
									}}
								>
									<UIText
										variant={'h2'}
										mb={2}
									>
										{currentHardCodedPlan.planType}
									</UIText>
									<UIText
										variant={'regular'}
										mb={2}
									>
										{planDescriptions[currentHardCodedPlan.planType]}
									</UIText>
									<div
										style={{
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
											flexDirection: 'column'
										}}
									>
										<div>
											{featuresToShow.map((feature) => (
												<PlanFeatures
													key={feature}
													planType={currentHardCodedPlan.planType}
													feature={feature}
													themeColor={currentHardCodedPlan.themeColor}
												/>
											))}
										</div>
									</div>
								</div>
							</div>
						</Grid>
					)}

				</Grid>
			</>}
			actions={
				<div></div>
			}
		/>
	);
};