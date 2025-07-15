import {createContext, FC, ReactNode, useContext, useState} from 'react';

const makeContext = <T,>(render: () => T) => {
	const MyContext = createContext<T>({} as T);

	const useMyContext = () => useContext(MyContext);

	const MyProvider: FC<{ children: ReactNode }> = ({ children }) => {
		const value = render();
		return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
	};

	return [MyProvider, useMyContext] as const;
};

export const [DialogProvider, useDialogContext] = makeContext(() => {
	const [isAreYouSureDialogOpen, setIsAreYouSureDialogOpen] = useState(false);
	const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
	const [isAppBarFilled, setIsAppBarFilled] = useState(false);

	return {
		isAreYouSureDialogOpen,
		setIsAreYouSureDialogOpen,
		isLogoutDialogOpen,
		setIsLogoutDialogOpen,
		isAppBarFilled,
		setIsAppBarFilled
	};
});