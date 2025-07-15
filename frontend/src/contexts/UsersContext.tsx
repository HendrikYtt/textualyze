import {createContext, FC, ReactNode, useContext, useEffect, useRef, useState} from 'react';
import {googleLogout} from '@react-oauth/google';
import {decodeToken} from 'react-jwt';
import {getTryoutUser, getUser} from '../api/user';
import {displayError, getToken} from '../utils/utils';
import {FrontendUser} from '@hendrikytt/api-contracts/src';
import {deleteSocketListener, listenToSocketEvent} from '../api/sockets';
import {
	accessTokenKey,
	areCookiesEnabledKey,
	emailKey,
	hideCookiesBannerKey,
	oneDayInSeconds
} from '../const/auth';
import {NotSignedUpUser} from '@hendrikytt/api-contracts';

const makeContext = <T,>(render: () => T) => {
	const MyContext = createContext<T>({} as T);

	const useMyContext = () => useContext(MyContext);

	const MyProvider: FC<{ children: ReactNode }> = ({ children }) => {
		const value = render();
		return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
	};

	return [MyProvider, useMyContext] as const;
};

export const tryoutUserId = 999999;
const tryoutUserIdAsString = tryoutUserId.toString();

export const [AuthProvider, useAuth] = makeContext(() => {
	const [accessToken, setAccessToken] = useState<string | null>(null);

	const [isCookiesBannerShowing, setIsCookiesBannerShowing] = useState(true);
	const [areCookiesEnabled, setAreCookiesEnabled] = useState(false);

	const [isBillingLoading, setIsBillingLoading] = useState(true);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const [isUserLoading, setIsUserLoading] = useState(true);

	const [user, setUser] = useState<FrontendUser | null>(null);
	const [notSignedUpUser, setNotSignedUpUser] = useState<NotSignedUpUser | null>(null);

	const isFetchingUser = useRef(false);
	const hasRealUserBeenFetched = useRef(false);

	const isLoggedIn = !!accessToken;

	useEffect(() => {
		initializeCookies();
		initAuth();

		const handleStorageChange = (event: StorageEvent) => {
			if (event.key === accessTokenKey && !event.newValue) {
				logout();
			}
		};

		window.addEventListener('storage', handleStorageChange);
		return () => {
			window.removeEventListener('storage', handleStorageChange);
		};
	}, [accessToken]);

	const initAuth = async () => {
		setIsUserLoading(true);
		const token = getToken();
		if (!token) {
			if (hasRealUserBeenFetched.current) {
				setIsUserLoading(false);
				deleteSocketListener('users-update', tryoutUserIdAsString, null);
				return;
			}
			await fetchTryoutUser();
			setIsUserLoading(false);
			listenToSocketEvent('users-update', async () => {
				if (isFetchingUser.current) {
					return;
				}
				await fetchTryoutUser();
			}, tryoutUserIdAsString, null);
			setIsUserLoading(false);
			return;
		}

		const remainingTime = calculateRemainingTime(token);
		if (remainingTime <= 0) {
			localStorage.removeItem(accessTokenKey);
			setIsUserLoading(false);
			return;
		}
		deleteSocketListener('users-update', tryoutUserIdAsString, null);
		setAccessToken(token);
		try {
			if (isFetchingUser.current) {
				return;
			}
			const frontendUser = await fetchUser();
			const userId = frontendUser.id.toString();
			setIsUserLoading(false);
			listenToSocketEvent('users-update', async () => {
				if (isFetchingUser.current) {
					return;
				}
				await fetchUser();
			}, userId, null);

		} catch (e) {
			displayError(e);
			localStorage.removeItem(accessTokenKey);
			window.open('/', '_self');
			return;
		}
	};

	const fetchUser = async () => {
		hasRealUserBeenFetched.current = true;
		isFetchingUser.current = true;
		const frontendUser = await getUser();
		isFetchingUser.current = false;
		setUser(frontendUser);
		return frontendUser;
	};

	const fetchTryoutUser = async () => {
		const frontendUser = await getTryoutUser();
		setUser(frontendUser);
		return frontendUser;
	};

	const login = (token: string) => {
		setAccessToken(token);
		localStorage.setItem(accessTokenKey, token);
		localStorage.removeItem(emailKey);
	};

	const logout = async () => {
		googleLogout();
		setAccessToken(null);
		setUser(null); // Make sure to clear the user as well
		localStorage.removeItem(emailKey);
		localStorage.removeItem(accessTokenKey);
		setIsUserLoading(false);
		window.location.href = `${process.env.REACT_APP_FRONTEND_URL}`;
		if (user) {
			const userId = user.id.toString();
			deleteSocketListener('users-update', userId, null);
		}
	};

	const setEmailToLocalStorage = (email: string) => {
		localStorage.setItem(emailKey, email);
	};



	const initializeCookies = () => {
		const areEnabled = getItemWithTTL(areCookiesEnabledKey);
		setAreCookiesEnabled(areEnabled === 'true');
		const showCookiesBanner = getItemWithTTL(hideCookiesBannerKey);
		const isShowing = showCookiesBanner === 'false' || showCookiesBanner === null;
		setIsCookiesBannerShowing(isShowing);
	};

	const acceptCookies = () => {
		setIsCookiesBannerShowing(false);
		setAreCookiesEnabled(true);
		setItemWithTTL(areCookiesEnabledKey, 'true', oneDayInSeconds);
		setItemWithTTL(hideCookiesBannerKey, 'true', oneDayInSeconds);
	};

	const rejectCookies = () => {
		setIsCookiesBannerShowing(false);
		setAreCookiesEnabled(false);
		setItemWithTTL(areCookiesEnabledKey, 'false', oneDayInSeconds);
		setItemWithTTL(hideCookiesBannerKey, 'true', oneDayInSeconds);
	};

	return {
		user,
		logout,
		login,
		isUserLoading,
		isLoggedIn,
		setEmailToLocalStorage,
		isDrawerOpen,
		setIsDrawerOpen,
		isCookiesBannerShowing,
		setIsCookiesBannerShowing,
		areCookiesEnabled,
		setAreCookiesEnabled,
		acceptCookies,
		rejectCookies,
		isBillingLoading,
		setIsBillingLoading,
		notSignedUpUser,
		setNotSignedUpUser
	};
});

const calculateRemainingTime = (token: string | undefined) => {
	if (!token) {
		return 0;
	}

	const decodedToken: TokenPayload | null = decodeToken(token);
	if (decodedToken === null) {
		return 0;
	}

	const currentTime = Math.floor(new Date().getTime() / 1000);
	return decodedToken.exp - currentTime;
};

class TokenPayload {
	aud: string;
	exp: number;
	iat: number;
	iss: string;
	sub: number;

	constructor(aud: string, exp: number, iat: number, iss: string, sub: number) {
		this.aud = aud;
		this.exp = exp;
		this.iat = iat;
		this.iss = iss;
		this.sub = sub;
	}
}

const setItemWithTTL = (key: string, value: string, ttl: number) => {
	const now = new Date();
	const item = {
		value: value,
		expiry: now.getTime() + ttl * 1000,
	};
	localStorage.setItem(key, JSON.stringify(item));
};

const getItemWithTTL = (key: string) => {
	const itemStr = localStorage.getItem(key);
	if (!itemStr) {
		return null;
	}

	const item = JSON.parse(itemStr);
	const now = new Date();

	if (now.getTime() > item.expiry) {
		localStorage.removeItem(key);
		return null;
	}

	return item.value;
};