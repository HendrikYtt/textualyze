import { Grid } from '@mui/material';
import {useState} from 'react';
import {UIToggle} from '../ui/UIToggle';
import {colors} from '../../themes';
import {UIButton} from '../ui/UIButton';
import * as React from 'react';
import {usePlans} from '../../contexts/PlansContext';
import {UIPrice} from '../ui/UIPrice';
import {lighten} from '@mui/material/styles';
import {PlanType} from '@hendrikytt/api-contracts';
import {capitalize, getPlanTypeIcon} from '../../utils/utils';
import {UIText} from '../ui/UIText';
import {isSmallerThanMd} from '../../hooks/is-compact';

interface Props {
	setSelectedPlanType: React.Dispatch<React.SetStateAction<PlanType>>;
	selectedPlanType: PlanType;
	setIsYearly: React.Dispatch<React.SetStateAction<boolean>>;
	isYearly: boolean;
	createIntent: (planType: PlanType) => Promise<void>;
}

export const ChoosePlan: React.FC<Props> = ({
	setSelectedPlanType,
	selectedPlanType,
	setIsYearly,
	isYearly,
	createIntent
}: Props) => {
	const smallerThanMd = isSmallerThanMd();
	const [currentlyLoadingPlan, setCurrentlyLoadingPlan] = useState<PlanType | null>(null);

	const {
		plans,
		isSaleCurrentlyActive
	} = usePlans();

	const yearlyPlans = plans.filter(p => p.billing_interval === 'ANNUALLY' && p.price > 0);
	const monthlyPlans = plans.filter(p => p.billing_interval === 'MONTHLY' && p.price > 0);

	const plansToDisplay = isYearly ? yearlyPlans : monthlyPlans;

	return (
		<div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					marginBottom: '20px',
				}}
			>
				<UIText
					variant={smallerThanMd ? 'h3' : 'h2'}
					component="h2"
					mb={3}
				>
					Select a plan
				</UIText>
				<UIToggle
					isInitialYearly={false}
					isYearly={isYearly}
					setIsYearly={setIsYearly}
					background={'#eae2e2'}
				/>
			</div>
			<Grid container rowGap={3} mt={4}>
				{plansToDisplay.map(p => {
					const isPlanSelected = selectedPlanType === p.plan_type;
					return (
						<Grid
							key={p.id}
							container
							justifyContent="space-between"
							alignItems="center"
							sx={{
								height: '70px',
								p: '10px',
								border: `3px solid ${isPlanSelected ? colors.green : 'transparent'}`,
								borderRadius: '8px',
								backgroundColor: isPlanSelected ? lighten(colors.green, 0.7) : 'white',
								'&:hover': {
									cursor: 'pointer'
								}
							}}
							onClick={() => {
								if (currentlyLoadingPlan) {
									return;
								}
								setSelectedPlanType(p.plan_type);
							}}
						>
							<Grid item>
								<div
									style={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center'
									}}
								>
									{getPlanTypeIcon(p.plan_type, '38px')}
									<UIText
										variant="h4"
										component="h2"
										ml={smallerThanMd ? '10px' : '16px'}
									>
										{capitalize(p.plan_type)}
									</UIText>
								</div>

							</Grid>
							<Grid item>
								<Grid container alignItems="center">
									<Grid item mr={smallerThanMd ? 1 : 2}>
										<UIPrice
											discountedPrice={isYearly ? 12 * p.discounted_price : p.discounted_price}
											isYearly={isYearly}
											planType={p.plan_type}
											price={isYearly ? 12 * p.price : p.price}
											isSaleCurrentlyActive={isSaleCurrentlyActive}
											variant={'h4'}
											billingIntervalFontSize={'13px'}
										/>
									</Grid>
									<Grid item>
										<UIButton
											title={'Select'}
											colorType={'primary'}
											backgroundColor="transparent"
											borderColor={colors.palette.primary}
											textColor={colors.palette.primary}
											isLoading={currentlyLoadingPlan === p.plan_type}
											disabled={currentlyLoadingPlan ? currentlyLoadingPlan !== p.plan_type : false}
											variant="contained"
											loadingSpinnerColor={colors.palette.primary}
											loadingSpinnerSize={15}
											minLoadingWidth={90}
											fontSize={smallerThanMd ? '14px' : '20px'}
											onClick={async () => {
												setCurrentlyLoadingPlan(p.plan_type);
												console.log('p.plan_type');
												await createIntent(p.plan_type);
											}}
											style={{
												maxHeight: smallerThanMd ? '30px' : '34px',
											}}
										/>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					);
				})}
			</Grid>
		</div>
	);
};