import {displayError} from '../utils/utils';
import {createContext, FC, ReactNode, useContext, useRef, useState} from 'react';
import {UserTemplate} from '@hendrikytt/api-contracts';
import {getUserTemplates} from '../api/user-templates';

const makeContext = <T,>(render: () => T) => {
	const MyContext = createContext<T>({} as T);

	const useMyContext = () => useContext(MyContext);

	const MyProvider: FC<{ children: ReactNode }> = ({ children }) => {
		const value = render();
		return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
	};

	return [MyProvider, useMyContext] as const;
};

export const [UserTemplatesProvider, useUserTemplates] = makeContext(() => {
	const [isAddNewUserTemplateDialogOpen, setIsAddNewUserTemplateDialogOpen] = useState(false);
	const [isLoadingUserTemplates, setIsLoadingUserTemplates] = useState(true);
	const [isUserTemplatesFreeDialogOpen, setIsUserTemplatesFreeDialogOpen] = useState(false);
	const [isUserTemplatesBasicDialogOpen, setIsUserTemplatesBasicDialogOpen] = useState(false);
	const [shouldValidateUserTemplatesCreation, setShouldValidateUserTemplatesCreation] = useState(false);

	const [userTemplates, setUserTemplates] = useState<UserTemplate[]>([]);

	const areUserTemplatesFetched = useRef(false);

	const fetchUserTemplates = async () => {
		try {
			const fetchedUserTemplates = await getUserTemplates();
			setUserTemplates(fetchedUserTemplates);
		} catch (e) {
			displayError(e);
		}
		setIsLoadingUserTemplates(false);
	};

	const fetchInitialUserTemplates = async () => {
		if (areUserTemplatesFetched.current) {
			return;
		}
		await fetchUserTemplates();
		areUserTemplatesFetched.current = true;
	};

	return {
		userTemplates,
		fetchUserTemplates,
		fetchInitialUserTemplates,
		isLoadingUserTemplates,
		isUserTemplatesFreeDialogOpen,
		setIsUserTemplatesFreeDialogOpen,
		isUserTemplatesBasicDialogOpen,
		setIsUserTemplatesBasicDialogOpen,
		shouldValidateUserTemplatesCreation,
		setShouldValidateUserTemplatesCreation,
		isAddNewUserTemplateDialogOpen,
		setIsAddNewUserTemplateDialogOpen,
	};
});