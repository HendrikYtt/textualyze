import {Dialog, DialogActions, DialogContent, DialogTitle, Typography} from '@mui/material';
import React, {ReactNode} from 'react';
import {dialogZIndex, userSelectNone} from '../../const/ui';
import {isSmallerThanSm} from '../../hooks/is-compact';

interface Props {
    open: boolean;
    title: string;
    content?: ReactNode;
    actions?: ReactNode;
	maxWidth?: string;
	blur?: boolean;
	paddingTop?: string;
	titleFontSize?: string;
	topRightElement?: ReactNode;
	topLeftElement?: ReactNode;
	borderRadius?: string;
	zIndex?: number;
	removeHorizontalMargin?: boolean;
	fullScreen?: boolean;
	horizontalMargin?: string;
	verticalMargin?: string;
	backgroundColor?: string;
	padding?: string;
}

export const UIDialog: React.FC<Props> = ({
	open,
	title,
	content,
	actions,
	maxWidth,
	blur,
	paddingTop,
	titleFontSize,
	topRightElement,
	topLeftElement,
	borderRadius,
	zIndex,
	removeHorizontalMargin,
	fullScreen,
	horizontalMargin,
	verticalMargin,
	backgroundColor,
	padding
}) => {
	const smallerThanSm = isSmallerThanSm();

	return (
		<Dialog
			open={open}
			aria-labelledby='dialog-title'
			aria-describedby='dialog-description'
			fullWidth
			fullScreen={fullScreen}
			sx={{
				px: horizontalMargin,
				py: verticalMargin,
				minWidth: '325px',
				'.MuiDialog-paper': {
					maxWidth: maxWidth ? maxWidth : '600px',
					width: smallerThanSm ? '100vw' : '100%',
					borderRadius: borderRadius ? borderRadius : '8px',
					mx: !smallerThanSm || removeHorizontalMargin ? 0 : '16px',
					backgroundColor: backgroundColor || 'white',
					p: 0
				},
				backdropFilter: blur ? 'blur(4px)' : 'none',
				zIndex: `${zIndex ? zIndex : dialogZIndex} !important`,
			}}
		>
			<DialogTitle id='dialog-title' sx={{
				textAlign: 'center',
				position: 'relative'
			}}>
				{topLeftElement}
				<Typography fontWeight="700" fontSize={titleFontSize ? titleFontSize : '1.5rem'} mt={paddingTop} px={4} style={{...userSelectNone}}>
					{title}
				</Typography>
				{topRightElement}
			</DialogTitle>
			<DialogContent sx={{p: padding || 'auto'}}>
				{content}
			</DialogContent>
			{actions && (
				<DialogActions>
					{actions}
				</DialogActions>
			)}
		</Dialog>
	);
};