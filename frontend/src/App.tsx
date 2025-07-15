import React, {useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter, Navigate, Route, Routes, useLocation} from 'react-router-dom';
import {LandingPage} from './pages/LandingPage';
import {AppHeader} from './components/layout/AppHeader';
import {BaseLayout} from './components/layout/BaseLayout';
import {SignUpPage} from './pages/SignUpPage';
import {LoginPage} from './pages/LoginPage';
import {EmailSentPage} from './pages/EmailSentPage';
import {EmailVerificationPage} from './pages/EmailVerificationPage';
import {useAuth} from './contexts/UsersContext';
import {LoadingPage} from './pages/LoadingPage';
import {PricingPage} from './pages/PricingPage';
import {Footer} from './components/layout/Footer';
import {AreYouSureDialog} from './components/layout/AreYouSureDialog';
import TermsAndPrivacyPage from './pages/TermsAndPrivacyPage';
import {BlogPage} from './pages/BlogPage';
import {ArticlePage} from './pages/ArticlePage';
import {useTranscriptionContext} from './contexts/TranscriptionContext';
import {appBarHeight, drawerOverlayZIndex} from './const/ui';
import {Helmet} from 'react-helmet-async';
import {SaleBanner} from './components/layout/SaleBanner';
import {GA_LINK, GA_SCRIPT} from './lib/google-analytics';
import Illustration1 from './assets/svg/illustration-1.svg';
import Illustration2 from './assets/svg/illustration-2.svg';
import {
	isSmallerThan400px,
	isSmallerThanLg,
	isSmallerThanMd,
	isSmallerThanSm,
	isSmallerThanXl
} from './hooks/is-compact';
import {articlesData} from './articles/articlesData';
import {TranscriptionPage} from './pages/TranscriptionPage';
import {useDialogContext} from './contexts/DialogContext';
import {handleAreYouSureYouWantToLeave} from './utils/transcription';
import {DashboardPage} from './pages/DashboardPage';
import {svg1Properties, svg2Properties} from './utils/ui';
import {SmallTranscriptionHeader} from './components/layout/SmallTranscriptionHeader';
import {CrispChat} from './components/live-chat/CripChat';
import {FB_PIXEL_ID, META_PIXEL_SCRIPT, pageview} from './lib/fpixel';

function RouterComponent() {
	const location = useLocation();
	const isLandingPage = location.pathname === '/';
	const isTranscribePage = location.pathname.startsWith('/transcribe');

	const smallerThan400px = isSmallerThan400px();
	const smallerThanSm = isSmallerThanSm();
	const smallerThanMd = isSmallerThanMd();
	const smallerThanLg = isSmallerThanLg();
	const smallerThanXl = isSmallerThanXl();

	const {
		isUserLoading,
		isLoggedIn,
		areCookiesEnabled
	} = useAuth();

	const {
		isTranscriptionDrawerOpen,
		setIsTranscriptionDrawerOpen,
		isConfigurationOpen,
		willProgressBeLost
	} = useTranscriptionContext();

	const {
		setIsAppBarFilled
	} = useDialogContext();

	const [isMetaPixelLoaded, setIsMetaPixelLoaded] = useState(false);

	useEffect(() => {
		if (process.env.REACT_APP_ENV === 'dev' && !document.title.includes('[DEV]')) {
			document.title = `[DEV] ${document.title}`;
		}
	}, [document.title]);

	useEffect(() => {
		if (isTranscribePage) {
			document.body.style.overflow = 'hidden';
		}

		return () => {
			document.body.style.overflow = '';
		};
	}, [isTranscribePage]);

	const triggerHeight = isLandingPage ? 40 : 20; // the scroll position where the color should change

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > triggerHeight) {
				setIsAppBarFilled(true);
			} else {
				setIsAppBarFilled(false);
			}
		};

		// Add scroll event listener
		window.addEventListener('scroll', handleScroll);

		// Remove event listener on cleanup
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	useEffect(() => {
		const checkMetaPixelLoaded = () => {
			if (window.metaPixelLoaded) {
				setIsMetaPixelLoaded(true);
			} else {
				setTimeout(checkMetaPixelLoaded, 100);
			}
		};

		checkMetaPixelLoaded();
	}, []);

	useEffect(() => {
		if (isMetaPixelLoaded) {
			pageview();
		}
	}, [location.pathname, isMetaPixelLoaded]);



	useEffect(() => {
		if (willProgressBeLost) {
			window.addEventListener('beforeunload', handleAreYouSureYouWantToLeave);
		} else {
			window.removeEventListener('beforeunload', handleAreYouSureYouWantToLeave);
		}

		return () => {
			window.removeEventListener('beforeunload', handleAreYouSureYouWantToLeave);
		};
	}, [willProgressBeLost]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

	const HeaderController = () => {
		if (smallerThanMd && isTranscribePage) {
			return <SmallTranscriptionHeader />;
		} else if (location.pathname !== '/email') {
			return <AppHeader />;
		} else {
			return null;
		}
	};

	const svg1Props = svg1Properties(
		smallerThan400px,
		smallerThanSm,
		smallerThanMd,
		smallerThanLg,
		smallerThanXl,
	);

	const svg2Props = svg2Properties(
		smallerThan400px,
		smallerThanSm,
		smallerThanMd,
		smallerThanLg,
		smallerThanXl,
		isLandingPage
	);

	const getMinHeight = () => {
		return isTranscribePage && smallerThanSm
			? `calc(100svh - ${appBarHeight + 25}px)`
			: `calc(100vh - ${appBarHeight-5}px)`;
	};

	const getHeight = () => {
		return isTranscribePage && smallerThanSm
			? `calc(100svh - ${appBarHeight + 25}px)`
			: 'auto';
	};

	const analyticsScripts = () => {
		return (
			<>
				{/*Google Analytics*/}
				<script async src={GA_LINK}></script>
				<script>
					{GA_SCRIPT}
				</script>

				{/*Meta Pixel*/}
				<noscript>
					{`
					   <img
						  height="1"
						  width="1"
						  style="display:none"
						  src="https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1"
					   />
				   `}
				</noscript>
				<script>
					{META_PIXEL_SCRIPT}
				</script>
			</>
		);
	};

	const senjaScript = () => {
		return (
			<script src="https://widget.senja.io/widget/76632d71-02a1-4924-a04b-647d761e4f94/platform.js"
				type="text/javascript" async></script>
		);
	};

	let images = `url(${Illustration1})`;
	let sizes = `${svg1Props.width}%`;
	let repeats = 'no-repeat';
	let positions = `left ${svg1Props.top}%`;
	if (!smallerThanMd) {
		images = `${images}, url(${Illustration2})`;
		sizes = `${sizes}, ${svg2Props.width}%`;
		repeats = `${repeats}, no-repeat`;
		positions = `${positions}, right ${svg2Props.top1}%`;
	}

	return (
		<div style={
			isLandingPage ? {
				backgroundImage: images,
				backgroundSize: sizes,
				backgroundRepeat: repeats,
				backgroundPosition: positions,
				width: '100%',
			} : {
				backgroundImage: `url(${Illustration2})`,
				backgroundSize: `${svg2Props.width}%`,
				backgroundRepeat: 'no-repeat',
				backgroundPosition: `right ${svg2Props.top2}%`,
				width: '100%',
			}
		}>
			{isUserLoading ? (
				<LoadingPage/>
			) : (
				<>
					<Helmet>
						{/* Google Analytics */}
						<>
							{senjaScript()}
							{areCookiesEnabled && process.env.REACT_APP_ENV !== 'dev'
								?
								analyticsScripts()
								:
								(
									<>
										<noscript>
											{`
											   <img
												  height="1"
												  width="1"
												  style="display:none"
												  src="https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1"
											   />
										   `}
										</noscript>
										<script>
											{META_PIXEL_SCRIPT}
										</script>
									</>
								)}
						</>
					</Helmet>
					<CrispChat />
					<SaleBanner/>
					<HeaderController/>
					<main style={{
						minHeight: getMinHeight(),
						height: getHeight()
					}}>
						<BaseLayout>
							<Routes>
								<Route path="/" element={<LandingPage/>}/>
								<Route path="/signup" element={!isLoggedIn ? <SignUpPage/> : <Navigate to="/"/>}/>
								<Route path="/login" element={!isLoggedIn ? <LoginPage/> : <Navigate to="/"/>}/>
								<Route path="/terms-and-privacy" element={<TermsAndPrivacyPage />}/>
								<Route path="/pricing" element={<PricingPage/>}/>
								<Route path="/email-sent" element={!isLoggedIn ? <EmailSentPage/> : <Navigate to="/"/>}/>
								<Route path="/email" element={<EmailVerificationPage/>}/>
								<Route path="/blog" element={<BlogPage articles={articlesData} />}/>
								<Route path="/transcribe" element={<TranscriptionPage />}/>
								{articlesData.map((article, index) => (
									<Route key={index} path={article.path} element={<ArticlePage articles={articlesData} />} />
								))}

								<Route path="/projects" element={
									isLoggedIn
										?
										<DashboardPage/>
										:
										<Navigate to="/"/>
								}/>

								<Route path="/transcribe/:paramRequestId" element={
									isLoggedIn
										?
										<TranscriptionPage/>
										:
										<Navigate to="/"/>
								}/>


								<Route path="*" element={<Navigate to="/"/>}/>
							</Routes>
						</BaseLayout>
						{/*<CookiesBanner />*/}
						<AreYouSureDialog/>
					</main>
					{(!isTranscribePage || !smallerThanMd) && (
						<Footer />
					)}
				</>
			)}
			{!isConfigurationOpen && smallerThanMd && !isTranscriptionDrawerOpen && isTranscribePage && (<div
				onTouchStart={() => {
					setIsTranscriptionDrawerOpen(true);
				}}
				style={{
					position: 'fixed',
					bottom: 0,
					left: 0,
					right: 0,
					height: '90px',
					background: 'transparent',
					zIndex: drawerOverlayZIndex,
				}}>
			</div>)}
		</div>
	);
}

function App() {
	return (
		<BrowserRouter>
			<RouterComponent/>
		</BrowserRouter>
	);
}

export default App;
