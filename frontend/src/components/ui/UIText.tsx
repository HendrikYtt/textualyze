import Typography, {TypographyProps} from '@mui/material/Typography';
import * as React from 'react';
import {isSmallerThanSm} from '../../hooks/is-compact';
import {SxProps} from '@mui/material';

export type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'display' | 'large' | 'small' | 'regular' | 'tiny';

interface Props extends Omit<TypographyProps, 'variant'> {
    variant: Variant;
    component?: React.ElementType;
    children: React.ReactNode;
	sx?: SxProps;
}

export const UIText: React.FC<Props> = ({
	variant,
	component,
	children,
	sx,
	...typographyProps
}) => {
	const smallerThanSm = isSmallerThanSm();

	const getFontSize = () => {
		if (variant === 'h1') {
			return smallerThanSm ? '26px' : '40px';
		} else if (variant === 'h2') {
			return smallerThanSm ? '24px' : '32px';
		} else if (variant === 'h3') {
			return smallerThanSm ? '22px' : '28px';
		} else if (variant === 'h4') {
			return smallerThanSm ? '18px' : '20px';
		} else if (variant === 'small') {
			return smallerThanSm ? '14px' : '16px';
		} else if (variant === 'regular') {
			return smallerThanSm ? '16px' : '18px';
		} else if (variant === 'tiny') {
			return smallerThanSm ? '12px' : '14px';
		}
	};

	const getLineHeight = () => {
		if (variant === 'h1') {
			return 'auto';
		} else if (variant === 'h2') {
			return smallerThanSm ? '40px' : 'auto';
		} else if (variant === 'h3') {
			return 'auto';
		} else if (variant === 'h4') {
			return 'auto';
		} else if (variant === 'small') {
			return '24px';
		}
	};

	const getFontWeight = () => {
		if (variant === 'h1' || variant === 'h2' || variant === 'h3' || variant === 'h4' || variant === 'display') {
			return '700';
		} else {
			return '400';
		}
	};

	return (
		<Typography component={component ? component : 'p'} fontSize={getFontSize()} lineHeight={getLineHeight()} fontWeight={getFontWeight()} color="black" sx={sx} {...typographyProps}>
			{children}
		</Typography>
	);
};