import {Grid, Slider, TextField, Typography} from '@mui/material';
import * as React from 'react';
import {useTranscriptionContext} from '../../../contexts/TranscriptionContext';
import {userSelectNone} from '../../../const/ui';
import {colors} from '../../../themes';
import {isSmallerThanMd} from '../../../hooks/is-compact';

interface Props {
	title: string;
	requestPayloadStylingField?: 'position' | 'word_spacing' | 'fontSize';
	value?: number;
	onChange?: (value: number) => void;
	minValue: number;
	maxValue: number;
	unit: string | null;
	disabled: boolean;
	width?: number;
	step?: number;
	showSlider: boolean;
}

export const TranscriptionStyleSlider: React.FC<Props> = ({
	title,
	requestPayloadStylingField,
	value,
	onChange,
	minValue,
	maxValue,
	unit,
	disabled,
	width,
	step,
	showSlider
}: Props) => {
	const smallerThanMd = isSmallerThanMd();

	const {
		requestPayload,
		setRequestPayload
	} = useTranscriptionContext();

	const setPayload = (newValue: number | number[]) => {
		if (requestPayloadStylingField) {
			if (requestPayloadStylingField === 'position' || requestPayloadStylingField === 'fontSize') {
				setRequestPayload((prevState) => {
					return {
						...prevState,
						[requestPayloadStylingField]: newValue
					};
				});
			} else {
				setRequestPayload((prevState) => {
					return {
						...prevState,
						styling: {
							...prevState.styling,
							[requestPayloadStylingField]: newValue as number
						}
					};
				});
			}
		} else {
			if (onChange) {
				onChange(newValue as number);
			}
		}
	};

	const updateValue = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element> |  React.KeyboardEvent<HTMLDivElement>) => {
		const target = event.target as HTMLInputElement;
		const newValue = Number(target.value);
		if (newValue >= minValue && newValue <= maxValue) {
			setPayload(newValue);
		} else if (newValue < minValue) {
			setPayload(minValue);
		} else if (newValue > maxValue) {
			setPayload(maxValue);
		}
	};

	const styleValue = () => {
		if (!requestPayloadStylingField) {
			return;
		}
		if (requestPayloadStylingField === 'position' || requestPayloadStylingField === 'fontSize') {
			return requestPayload[requestPayloadStylingField];
		}
		return requestPayload.styling[requestPayloadStylingField as 'word_spacing'];
	};

	const largeWidth = width ?? 100;
	return (
		<div style={{
			...userSelectNone
		}}
		>
			<Grid item xs={12}>
				<Typography fontWeight="500" color={colors.darkGrey} fontSize="13px">
					{title}
				</Typography>
			</Grid>
			<Grid container item xs={12} sx={{height: '40px', flexWrap: 'nowrap'}}>
				<Grid item>
					<TextField
						type="number"
						value={styleValue() ?? value}
						onChange={(event) => {
							const newValue = Number(event.target.value);
							setPayload(newValue);
						}}
						fullWidth
						onBlur={(event) => {
							updateValue(event);
						}}
						onKeyDown={(event) => {
							if (event.key === 'Enter') {
								updateValue(event);
								event.preventDefault();
							}
						}}
						InputProps={{
							inputProps: {
								min: minValue,
								max: maxValue
							}
						}}
						disabled={disabled}
						sx={{
							'& .MuiOutlinedInput-root': {
								height: '40px',
								width: unit ? `${largeWidth * 0.8}px` : `${largeWidth}px`,
								borderRadius: '4px'
							}
						}}
					/>
				</Grid>
				{unit && (
					<Grid item>
						<Typography fontWeight="400" color="black" ml={1} mt={1}>
							{unit}
						</Typography>
					</Grid>
				)}

			</Grid>

			{showSlider && (
				<Grid item xs={12} sx={{height: '20px'}}>
					<Slider
						size="small"
						aria-label="Small"
						valueLabelDisplay="auto"
						value={styleValue() ?? value}
						onChange={(event, value) => {
							setPayload(value);
						}}
						disabled={disabled}
						min={minValue}
						max={maxValue}
						step={step || 1}
						sx={{
							width: `${largeWidth}px`,
							ml: '5px',
							mt: `${smallerThanMd ? -10 : 0}px`
						}}
					/>
				</Grid>
			)}
		</div>
	);
};