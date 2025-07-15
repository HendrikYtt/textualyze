import React, {ReactNode, useState} from 'react';
import { Button, ButtonProps, CircularProgress, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { darken } from '@mui/material/styles';
import { SxProps, Theme } from '@mui/material/styles';
import { colors } from '../../themes';

interface Props extends Omit<ButtonProps, 'color'> {
	title: string;
	colorType: 'primary' | 'secondary';
	variant: 'text' | 'contained';
	onClick: React.MouseEventHandler<HTMLButtonElement>;
	path?: string;
	textColor?: string;
	backgroundColor?: string;
	borderColor?: string;
	isLoading?: boolean;
	children?: ReactNode;
	bold?: boolean;
	underline?: boolean;
	fontSize?: string;
	removeSpacing?: boolean;
	disablePadding?: boolean;
	borderRadius?: string;
	height?: string;
	textUnderlineOffset?: string;
	fontWeight?: string;
	loadingSpinnerColor?: string;
	loadingSpinnerSize?: number;
	minLoadingWidth?: number;
	contentBeforeText?: boolean;
	isFlaming?: boolean;
	sx?: SxProps<Theme>;
}

export const UIButton: React.FC<Props> = ({
	title,
	colorType,
	variant,
	onClick,
	path,
	textColor,
	backgroundColor,
	borderColor,
	isLoading,
	bold = true,
	underline,
	children,
	fontSize,
	disabled,
	removeSpacing,
	disablePadding,
	borderRadius,
	height,
	textUnderlineOffset,
	fontWeight,
	loadingSpinnerColor,
	loadingSpinnerSize,
	minLoadingWidth,
	contentBeforeText,
	isFlaming = false,
	sx,
	...buttonProps
}: Props) => {
	const location = useLocation();
	const [hasButtonBeenClicked, setHasButtonBeenClicked] = useState(false);

	const isCurrentPath = location.pathname === path;
	const isTextVariant = variant === 'text';
	const isContainedVariant = variant === 'contained';
	const underlineOffset = textUnderlineOffset ? textUnderlineOffset : '12px';

	const buttonBackgroundColor = () => {
		if (backgroundColor) {
			return backgroundColor;
		}
		if (colorType === 'primary') {
			return colors.palette.primary;
		} else if (colorType === 'secondary') {
			return colors.palette.secondary;
		}
	};

	const buttonHoverBackgroundColor = () => {
		if (backgroundColor) {
			return backgroundColor === 'transparent' ? 'transparent' : darken(backgroundColor, 0.1);
		}
		if (colorType === 'primary') {
			return '#C63756';
		} else if (colorType === 'secondary') {
			return '#1f2287';
		}
	};

	const fontProps = () => ({
		'& span': {
			fontSize: fontSize ? fontSize : '18px',
			fontWeight: isCurrentPath || bold ? 'bold' : '700',
			letterSpacing: 0.2,
			py: removeSpacing ? '0px' : '2px',
			textDecoration: underline ? 'underline' : 'none'
		},
		...spacingProps()
	});

	const spacingProps = () => {
		if (removeSpacing) {
			return {
				padding: 0,
				margin: 0,
			};
		} else {
			return {};
		}
	};

	const textVariantProps = {
		transition: 'all 0.1s ease',
		color: textColor
			? textColor
			: isCurrentPath ? colors.palette.primary : colors.font.primary,
		textDecoration: isCurrentPath ? 'underline' : 'none',
		textDecorationThickness: isCurrentPath ? '3px' : '0px',
		textUnderlineOffset: isCurrentPath ? underlineOffset : 'none',
		'&:hover': {
			backgroundColor: 'transparent',
			textDecorationLine: 'underline',
			textDecorationThickness: '3px',
			textUnderlineOffset: underlineOffset,
			color: colors.palette.primary,
		},
		...fontProps()
	};

	const containedVariantProps = {
		transition: 'all 0.1s ease',
		color: textColor ? textColor : 'white',
		backgroundColor: buttonBackgroundColor(),
		'&:hover': {
			backgroundColor: buttonHoverBackgroundColor(),
			boxShadow: borderColor && borderColor !== 'transparent' ? `inset 0 0 0 2px ${darken(borderColor, 0.1)}` : 'none',
		},
		'&:disabled': {
			color: '#989a98',
			backgroundColor: '#E0E0E0'
		},
		padding: disablePadding ? 0 : 'auto',
		borderRadius: borderRadius ? borderRadius : 'auto',
		boxShadow: borderColor && borderColor !== 'transparent' ? `inset 0 0 0 2px ${borderColor}` : 'none',
		...fontProps()
	};

	const sxProps = () => {
		if (isTextVariant) {
			return textVariantProps;
		} else if (isContainedVariant) {
			return containedVariantProps;
		}
	};

	const hasButtonBeenClickedAndIsFlaming = !isLoading && !disabled && !hasButtonBeenClicked && isFlaming;

	return (
		<Button
			variant={variant}
			size="large"
			onMouseDown={(event) => {
				if (!path) {
					return;
				}
				if (event.button === 1) {
					window.open(path, '_blank');
				}
			}}
			onClick={(event) => {
				setHasButtonBeenClicked(true);
				onClick(event);
			}}
			{...buttonProps}
			disabled={disabled}
			id={hasButtonBeenClickedAndIsFlaming ? 'special-button' : ''}
			className={hasButtonBeenClickedAndIsFlaming ? 'btn btn-anim' : ''}
			sx={{
				...sxProps(),
				...sx,
				height: height ? height : 'auto',
				...(isLoading && {
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					minWidth: `${minLoadingWidth || 120}px`,
					minHeight: `${loadingSpinnerSize || 48}px`,
				}),

				...(hasButtonBeenClickedAndIsFlaming && {
					'&:hover': {
						animation: 'none',
						transition: 'none',
						'&::before, &::after': {
							animation: 'none',
							opacity: 0,
							transition: 'none',
						},
					},
				}),
			}}
		>
			{isLoading ? (
				<CircularProgress sx={{color: loadingSpinnerColor || colors.paper.primary}} size={loadingSpinnerSize || 24} />
			) : (
				<>
					{contentBeforeText && children}
					<Typography component="span" sx={{fontWeight: `${fontWeight} !important`}}>
						{title}
					</Typography>
					{!contentBeforeText && children}
				</>
			)}
		</Button>
	);
};