import {Field, FieldProps} from 'formik';
import {InputAdornment, TextField} from '@mui/material';
import React, {ReactNode} from 'react';
import {isSmallerThanMd} from '../../hooks/is-compact';
import {colors} from '../../themes';

interface Props {
    title: string;
    placeHolder: string;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
	disabled?: boolean
}

export const UIField: React.FC<Props> = ({
	title,
	placeHolder,
	startIcon,
	endIcon,
	disabled
}: Props) => {
	const smallerThanMd = isSmallerThanMd();

	return (
		<Field name={title}>
			{({ field, meta }: FieldProps) => (
				<TextField
					{...field}
					variant="outlined"
					placeholder={placeHolder}
					fullWidth
					error={meta.touched && !!meta.error}
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
			)}
		</Field>
	);
};