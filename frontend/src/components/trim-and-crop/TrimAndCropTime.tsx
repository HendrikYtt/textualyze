import {TextField} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {colors} from '../../themes';

type BorderType = 'left' | 'right' | 'none';
interface Props {
    value: string;
	border: BorderType;
	onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => string;
}

export const TrimAndCropTime: React.FC<Props> = ({
	value,
	border,
	onBlur
}) => {
	const [localValue, setLocalValue] = useState(value);

	useEffect(() => {
		if (value !== localValue) {
			setLocalValue(value);
		}
	}, [value]);

	const getBorderStyles = (border: BorderType) => {
		switch (border) {
		case 'left':
			return {
				borderBottomLeftRadius: '4px',
				borderTopLeftRadius: '4px',
				borderTopRightRadius: '0px',
				borderBottomRightRadius: '0px',
			};
		case 'right':
			return {
				borderBottomLeftRadius: '0px',
				borderTopLeftRadius: '0px',
				borderTopRightRadius: '4px',
				borderBottomRightRadius: '4px',
			};
		case 'none':
		default:
			return {
				borderBottomLeftRadius: '0px',
				borderTopLeftRadius: '0px',
				borderTopRightRadius: '0px',
				borderBottomRightRadius: '0px',
			};
		}
	};

	return (
		<TextField
			type="number"
			value={localValue}
			onChange={(e) => {setLocalValue(e.target.value);}}
			onBlur={(e) => {
				const val = onBlur(e);
				if (val !== localValue) {
					setLocalValue(val);
				}
			}}
			InputProps={{
				style: { fontSize: '16px', height: '35px', width: '35px', padding: 0, backgroundColor: colors.inputBgGrey },
				inputProps: {
					style: { padding: 0, textAlign: 'center', color: 'black'}
				}
			}}
			sx={{
				mb: '-12px',
				'& input': {backgroundColor: colors.inputBgGrey, fontSize: '16px'},
				'& .MuiInputBase-root': {
					height: '35px'
				},
				'& .MuiInput-input': {
					height: '35px',
				},
				width: '35px',
				'& .MuiOutlinedInput-root': {
					'& fieldset': {
						borderColor: colors.inputBorderGrey,
						...getBorderStyles(border)
					},
					'&:hover fieldset': {
						borderColor: colors.inputBorderGrey,
					},
					'&.Mui-focused fieldset': {
						borderColor: colors.inputBorderGrey,
					}
				},
				'input[type=number]::-webkit-inner-spin-button': {
					WebkitAppearance: 'none',
					margin: 0,
				},
				'input[type=number]::-webkit-outer-spin-button': {
					WebkitAppearance: 'none',
					margin: 0,
				},
				// Firefox
				'input[type=number]': {
					MozAppearance: 'textfield',
					'&::-webkit-outer-spin-button': {
						opacity: 0,
					},
					'&::-webkit-inner-spin-button': {
						opacity: 0,
					},
				},
				// Microsoft Edge
				'input[type=number]::-ms-clear': {
					display: 'none',
				},
				'input[type=number]::-ms-reveal': {
					display: 'none',
				},
			}}
		/>
	);
};