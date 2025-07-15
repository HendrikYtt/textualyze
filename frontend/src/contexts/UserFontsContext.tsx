import {displayError} from '../utils/utils';
import {createContext, FC, ReactNode, useContext, useState} from 'react';
import {getUserFonts, UserFontWithS3Link} from '../api/user-fonts';
import {FontType} from '@hendrikytt/api-contracts';

const makeContext = <T,>(render: () => T) => {
	const MyContext = createContext<T>({} as T);

	const useMyContext = () => useContext(MyContext);

	const MyProvider: FC<{ children: ReactNode }> = ({ children }) => {
		const value = render();
		return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
	};

	return [MyProvider, useMyContext] as const;
};

export type FontSelectionOption = {
	id: number;
	label: string;
	value: string;
	fontType: FontType;
	s3FontLink: string;
	s3FontName: string;
	fontFileExtension: string;
}

export const defaultFontSelection: FontSelectionOption = {
	id: 0,
	label: 'The Bold Font',
	value: 'The Bold Font',
	fontType: 'Default fonts',
	s3FontName: 'The Bold Font',
	s3FontLink: '',
	fontFileExtension: 'ttf'
};

export const [UserFontsProvider, useUserFonts] = makeContext(() => {
	const [isLoadingUserFonts, setIsLoadingUserFonts] = useState(true);
	const [isUserFontsFreeDialogOpen, setIsUserFontsFreeDialogOpen] = useState(false);
	const [isUserFontsBasicDialogOpen, setIsUserFontsBasicDialogOpen] = useState(false);
	const [shouldValidateUserFontsCreation, setShouldValidateUserFontsCreation] = useState(false);

	const [currentFontSelectionOption, setCurrentFontSelectionOption] = useState<FontSelectionOption | null>(null);
	const [userFonts, setUserFonts] = useState<UserFontWithS3Link[]>([]);

	const fetchUserFonts = async () => {
		try {
			const fetchedUserFonts = await getUserFonts();
			//WHY I NEED TO DO THIS TO AVOID DUPLICATE FIELDS?!?!??!
			const newList: UserFontWithS3Link[] = [];
			fetchedUserFonts.forEach(font => {
				newList.push({ ...font });
			});
			setUserFonts(fetchedUserFonts);
			return newList;
		} catch (e) {
			displayError(e);
			setIsLoadingUserFonts(false);
		}
	};

	return {
		userFonts,
		fetchUserFonts,
		isLoadingUserFonts,
		isUserFontsFreeDialogOpen,
		setIsUserFontsFreeDialogOpen,
		isUserFontsBasicDialogOpen,
		setIsUserFontsBasicDialogOpen,
		shouldValidateUserFontsCreation,
		setShouldValidateUserFontsCreation,
		currentFontSelectionOption,
		setCurrentFontSelectionOption
	};
});