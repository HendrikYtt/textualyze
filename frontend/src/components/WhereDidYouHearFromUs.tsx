import {UISelect} from './ui/UISelect';
import React, {useState} from 'react';
import GoogleIcon from '../assets/images/GoogleIcon.png';
import XIcon from '../assets/svg/x_png.png';
import FacebookIcon from '../assets/svg/facebook_svg.svg';
import InstagramIcon from '../assets/svg/instagram_svg.svg';
import LinkedInIcon from '../assets/svg/linkedin_svg.svg';
import FriendIcon from '../assets/svg/friend_svg.svg';
import EmailIcon from '../assets/svg/email_svg.svg';
import {SelectChangeEvent} from '@mui/material';
import {updateHearFromUs} from '../api/user';
import {displaySuccess} from '../utils/utils';
import {useAuth} from '../contexts/UsersContext';

const whereDidYouHearFromUsOptions = [
	{
		title: 'Google',
		icon: GoogleIcon,
		size: 20
	},
	{
		title: 'X',
		icon: XIcon,
		size: 20,
	},
	{
		title: 'Facebook',
		icon: FacebookIcon,
		size: 20
	},
	{
		title: 'Instagram',
		icon: InstagramIcon,
		size: 20
	},
	{
		title: 'LinkedIn',
		icon: LinkedInIcon,
		size: 20
	},
	{
		title: 'Email',
		icon: EmailIcon,
		size: 20
	},
	{
		title: 'Friend',
		icon: FriendIcon,
		size: 20
	}
];

export const WhereDidYouHearFromUs = () => {
	const {
		notSignedUpUser,
		setNotSignedUpUser
	} = useAuth();

	const [selectedHearFromUs, setSelectedHearFromUs] = useState('');

	const handleHearFromUsChange = async (event: SelectChangeEvent) => {
		const selection = event.target.value as string;
		setSelectedHearFromUs(selection);
		if (notSignedUpUser) {
			await updateHearFromUs(selection, true);
			setNotSignedUpUser(prevState => {
				return {
					...prevState!,
					hear_from_us: selection
				};
			});
		} else {
			await updateHearFromUs(selection, false);
		}
		displaySuccess('Thanks for the feedback!');
	};

	return (
		<UISelect
			label="Where did you hear from us"
			options={whereDidYouHearFromUsOptions}
			selectedValue={selectedHearFromUs}
			onChange={handleHearFromUsChange}
		/>
	);
};