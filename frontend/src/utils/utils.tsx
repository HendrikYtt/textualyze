import {SelectionOptions} from '../types';
import {useNavigate} from 'react-router-dom';
import {closeSnackbar, enqueueSnackbar, SnackbarOrigin} from 'notistack';
import {HttpError} from '../api/config';
import {useTranscriptionContext} from '../contexts/TranscriptionContext';
import {accessTokenKey} from '../const/auth';
import {PlanType, SaleInfo} from '@hendrikytt/api-contracts';
import {IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FreeSvg from '../assets/svg/free_svg.svg';
import BasicSvg from '../assets/svg/basic_svg.svg';
import ProSvg from '../assets/svg/pro_svg.svg';
import * as React from 'react';

type CustomFilterFunc<T> = (inputValue: string, option?: T) => boolean;
export const customFilter: CustomFilterFunc<SelectionOptions> = (input, option) => {
	if (!option) {
		return false;
	}
	return (
		option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
		option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
	);
};

export const useHandleNavigation = () => {
	const navigate = useNavigate();
	const {willProgressBeLost} = useTranscriptionContext();
	const queryParams = new URLSearchParams(location.search);

	const action = queryParams.get('action');
	return async (nextPath: string | number, openInNewTab: boolean) => {
		const currentPath = location.pathname;
		if (typeof nextPath === 'number') {
			if (window.history.state && window.history.state.idx > 0) {
				// navigating back
				navigate(-1);
			} else {
				//login flow action
				navigate(`/${action}`, {replace: true});
			}
		} else if (currentPath !== nextPath) {
			if (currentPath === '/transcribe' && willProgressBeLost) {
				window.open(nextPath, '_blank');
			} else {
				if (nextPath.startsWith('/transcribe') && openInNewTab) {
					window.open(nextPath, '_blank');
				} else {
					navigate(nextPath);
				}
			}
		}
	};
};

const snackbarOrigin: SnackbarOrigin = {
	vertical: 'top',
	horizontal: 'center'
};

export const displayError = (e: unknown) => {
	const defaultErrorMsg = 'An unknown error occurred';
	let errorMsg;
	if (e instanceof Error) {
		errorMsg = e.message || defaultErrorMsg;
	} else if (e instanceof HttpError) {
		errorMsg = e.body.message || defaultErrorMsg;
	} else {
		errorMsg = defaultErrorMsg;
	}
	enqueueSnackbar(`Something went wrong. ${errorMsg}`, {
		variant: 'error',
		autoHideDuration: 4000,
		anchorOrigin: snackbarOrigin,
		action: (key) => (
			<IconButton size="small" aria-label="close" color="inherit" onClick={() => closeSnackbar(key)}>
				<CloseIcon fontSize="small" />
			</IconButton>
		)
	});
};

export const displaySuccess = (message: string) => {
	enqueueSnackbar(message, {
		variant: 'success',
		autoHideDuration: 2000,
		anchorOrigin: snackbarOrigin,
		action: (key) => (
			<IconButton size="small" aria-label="close" color="inherit" onClick={() => closeSnackbar(key)}>
				<CloseIcon fontSize="small" />
			</IconButton>
		)
	});
};

export const displayInfo = (message: string) => {
	enqueueSnackbar(message, {
		variant: 'info',
		autoHideDuration: 2000,
		anchorOrigin: snackbarOrigin,
		action: (key) => (
			<IconButton size="small" aria-label="close" color="inherit" onClick={() => closeSnackbar(key)}>
				<CloseIcon fontSize="small" />
			</IconButton>
		)
	});
};

export const getToken = () => {
	return localStorage.getItem(accessTokenKey);
};

export const capitalize = (text: string) => {
	return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const getPlanTypeIcon = (planType: PlanType, height: string) => {
	if (planType === 'FREE') {
		return <img src={FreeSvg} height={height} alt="Free plan icon"/>;
	} else if (planType === 'BASIC') {
		return <img src={BasicSvg} height={height} alt="Basic plan icon"/>;
	} else if (planType === 'PRO') {
		return <img src={ProSvg} height={height} alt="Pro plan icon"/>;
	}
};