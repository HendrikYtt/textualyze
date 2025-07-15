import {InputAdornment, TextField} from '@mui/material';
import {colors} from '../../themes';
import React, {ReactNode} from 'react';
import {isSmallerThanMd} from '../../hooks/is-compact';

interface Props {
    placeHolder: string;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    disabled?: boolean;
	value: string | null;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const UITextField: React.FC<Props> = ({
	placeHolder,
	startIcon,
	endIcon,
	disabled,
	value,
	onChange
}: Props) => {
	const smallerThanMd = isSmallerThanMd();
	return (
		<TextField
			variant="outlined"
			placeholder={placeHolder}
			fullWidth
			value={value}
			onChange={onChange}
			disabled={disabled}
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						{startIcon}
					</InputAdornment>
				),
				endAdornment: (
					<InputAdornment position="end">
						{endIcon}
					</InputAdornment>
				)
			}}
			sx={{
				'& input': {color: 'text.secondary', fontSize: smallerThanMd ? '14px' : '18px'},
				'& .MuiOutlinedInput-root': {
					height: '40px',
					padding: 1,
					backgroundColor: colors.inputBgGrey,
					'&:hover': {
						backgroundColor: colors.inputBgGrey,
					},
					'&.Mui-focused': {
						backgroundColor: colors.inputBgGrey,
					},
					'& fieldset': {
						borderColor: colors.inputBorderGrey,
					},
					'&:hover fieldset': {
						borderColor: colors.inputBorderGrey,
					},
					'&.Mui-focused fieldset': {
						borderColor: colors.inputBorderGrey,
					},
				},
				'& input::placeholder': {
					color: colors.iconGrey
				},
			}}
		/>
	);
};