import {getPlans} from '../api/plans';
import {displayError, displayInfo} from '../utils/utils';
import {createContext, FC, ReactNode, useContext, useEffect, useState} from 'react';
import {Plan, PlanType, SaleInfo} from '@hendrikytt/api-contracts';
import {listenToSocketEvent} from '../api/sockets';
import {getSaleInfo} from '../api/sale-info';
import {saleBannerHeight} from '../const/ui';
import {hideSaleBannerUntilKey} from '../const/auth';
import {useAuth} from './UsersContext';
import {colors} from '../themes';

export type PricingPlan = {
	planType: PlanType,
	monthlyPrice: number,
	annualPrice: number,
	discountedMonthlyPrice: number;
	discountedAnnualPrice: number;
	monthlyFeatures: string[],
	annualFeatures: string[],
	buttonText: string,
	buttonVariant: string,
	themeColor: string,
	buttonColor: 'primary',
	textColor?: string
}

const makeContext = <T,>(render: () => T) => {
	const MyContext = createContext<T>({} as T);

	const useMyContext = () => useContext(MyContext);

	const MyProvider: FC<{ children: ReactNode }> = ({ children }) => {
		const value = render();
		return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
	};

	return [MyProvider, useMyContext] as const;
};

export const [PlansProvider, usePlans] = makeContext(() => {
	const isTranscribePage = location.pathname.startsWith('/transcribe');

	const {user} = useAuth();

	const [isLoadingPlans, setIsLoadingPlans] = useState(true);
	const [plans, setPlans] = useState<Plan[]>([]);

	const [currentSaleBannerHeight, setCurrentSaleBannerHeight] = useState(saleBannerHeight);
	const [isSaleBannerOpen, setIsSaleBannerOpen] = useState(false);
	const [saleInfo, setSaleInfo] = useState<SaleInfo | null>(null);

	useEffect(() => {
		if (!saleInfo) {
			setIsSaleBannerOpen(false);
			setCurrentSaleBannerHeight(0);
			return;
		}
		if (isSaleCurrentlyActive && !shouldSaleBannerBeHiddenForUser(isTranscribePage)) {
			setIsSaleBannerOpen(true);
			setCurrentSaleBannerHeight(saleBannerHeight);
		} else {
			setIsSaleBannerOpen(false);
			setCurrentSaleBannerHeight(0);
		}
	}, [saleInfo, isSaleBannerOpen, user, isTranscribePage]);

	useEffect(() => {
		initSaleInfo();
		initPlans();
	}, []);

	const saleBannerHideDurationSeconds = 3600;
	const closeSaleBanner = (setItemToLocalStorage: boolean) => {
		if (setItemToLocalStorage) {
			const now = new Date();
			const oneHourLater = new Date(now.getTime() + saleBannerHideDurationSeconds * 1000).toISOString(); // Convert to ISO string
			localStorage.setItem(hideSaleBannerUntilKey, oneHourLater);
		}
		setIsSaleBannerOpen(false);
		setCurrentSaleBannerHeight(0);
	};

	const shouldSaleBannerBeHiddenForUser = (isTranscribePage: boolean) => {
		if (isTranscribePage) {
			return true;
		}
		if (user?.current_plan.plan_type === 'PRO') {
			return true;
		}
		const hideUntil = localStorage.getItem(hideSaleBannerUntilKey);
		if (!hideUntil) {
			return false;
		}
		return new Date().getTime() < new Date(hideUntil).getTime();
	};

	const fetchPlans = async () => {
		try {
			const plans = await getPlans();
			if (plans.length === 0) {
				displayInfo('Plans are not available currently. Please try again later.');
				return;
			}
			setPlans(plans);
		} catch (e) {
			displayError(e);
		}
		setIsLoadingPlans(false);
	};

	const initPlans = async () => {
		await fetchPlans();
		listenToSocketEvent('plans-update', async () => {
			await fetchPlans();
		}, null, null);
	};

	const initSaleInfo = async () => {
		const info = await getSaleInfo();
		setSaleInfo(info);
		listenToSocketEvent('sale-info-update', async () => {
			await fetchSaleInfo();
		}, null, null);
	};

	const fetchSaleInfo = async () => {
		const saleInfo = await getSaleInfo();
		if (!isSaleActive(saleInfo)) {
			setSaleInfo(null);
			return null;
		}
		setSaleInfo(saleInfo);
		return saleInfo;
	};

	const isSaleActive = (saleInfo: SaleInfo | null) => {
		if (!saleInfo) {
			return false;
		}
		return saleInfo.is_active && new Date(saleInfo?.sale_end_date) > new Date();
	};

	const isSaleCurrentlyActive = isSaleActive(saleInfo);

	const freePlan = plans[0];
	const basicMonthlyPlan = plans[1];
	const basicAnnualPlan = plans[2];
	const proMonthlyPlan = plans[3];
	const proAnnualPlan = plans[4];

	const hardCodedPlans: PricingPlan[] = plans && [
		{
			planType: freePlan?.plan_type,
			monthlyPrice: freePlan?.price,
			annualPrice: freePlan?.price,
			discountedMonthlyPrice: freePlan?.discounted_price,
			discountedAnnualPrice: freePlan?.discounted_price,
			monthlyFeatures: [
				`${freePlan?.transcribed_seconds_monthly_limit} sec of captions a month`,
				`Export videos up to ${freePlan?.upload_limit_seconds} sec`,
			],
			annualFeatures: [
				`${freePlan?.transcribed_seconds_monthly_limit} sec of captions a month`,
				`Export videos up to ${freePlan?.upload_limit_seconds} sec`,
			],
			buttonText: 'Start transcribing',
			buttonVariant: 'contained',
			buttonColor: 'primary',
			textColor: colors.paper.primary,
			themeColor: colors.lightBlue
		},
		{
			planType: basicMonthlyPlan?.plan_type,
			monthlyPrice: basicMonthlyPlan?.price,
			annualPrice: basicAnnualPlan?.price,
			discountedMonthlyPrice: basicMonthlyPlan?.discounted_price,
			discountedAnnualPrice: basicAnnualPlan?.discounted_price,
			monthlyFeatures: [
				`${basicMonthlyPlan?.transcribed_seconds_monthly_limit ? basicMonthlyPlan?.transcribed_seconds_monthly_limit / 60 : 0} min of captions a month`,
				`Export videos up to ${basicMonthlyPlan?.upload_limit_seconds / 60} min`,
				`Save up to ${basicMonthlyPlan?.user_templates_count_limit} style templates`,
				`Save up to ${basicMonthlyPlan?.user_project_limit} projects`,
			],
			annualFeatures: [
				`${basicAnnualPlan?.transcribed_seconds_monthly_limit ? basicAnnualPlan?.transcribed_seconds_monthly_limit / 60 : 0} min of captions a month`,
				`Export videos up to ${basicAnnualPlan?.upload_limit_seconds / 60} min`,
				`Save up to ${basicAnnualPlan?.user_templates_count_limit} style templates`,
				`Save up to ${basicAnnualPlan?.user_project_limit} projects`,
			],
			buttonText: 'Choose plan',
			buttonVariant: 'contained',
			buttonColor: 'primary',
			textColor: colors.paper.primary,
			themeColor: colors.green
		},
		{
			planType: proMonthlyPlan?.plan_type,
			monthlyPrice: proMonthlyPlan?.price,
			annualPrice: proAnnualPlan?.price,
			discountedMonthlyPrice: proMonthlyPlan?.discounted_price,
			discountedAnnualPrice: proAnnualPlan?.discounted_price,
			monthlyFeatures: [
				`${proMonthlyPlan?.transcribed_seconds_monthly_limit ? proMonthlyPlan?.transcribed_seconds_monthly_limit / 60 : 0} min of captions a month`,
				`Export videos up to ${proMonthlyPlan?.upload_limit_seconds / 60} min`,
				`Save up to ${proMonthlyPlan?.user_templates_count_limit} style templates`,
				`Save up to ${proMonthlyPlan?.user_project_limit} projects`,
				'Add your own custom fonts',
				'Translate subtitles'
			],
			annualFeatures: [
				`${proAnnualPlan?.transcribed_seconds_monthly_limit ? proAnnualPlan?.transcribed_seconds_monthly_limit / 60 : 0} min of captions a month`,
				`Export videos up to ${proAnnualPlan?.upload_limit_seconds / 60} min`,
				`Save up to ${proAnnualPlan?.user_templates_count_limit} style templates`,
				`Save up to ${proAnnualPlan?.user_project_limit} projects`,
				'Add your own custom fonts',
				'Translate subtitles'
			],
			buttonText: 'Choose plan',
			buttonVariant: 'contained',
			buttonColor: 'primary',
			textColor: colors.paper.primary,
			themeColor: colors.gold
		},
	];

	return {
		plans,
		fetchPlans,
		isLoadingPlans,
		freePlan,
		basicMonthlyPlan,
		basicAnnualPlan,
		proMonthlyPlan,
		proAnnualPlan,
		isSaleCurrentlyActive,
		isSaleBannerOpen,
		saleInfo,
		closeSaleBanner,
		currentSaleBannerHeight,
		hardCodedPlans
	};
});