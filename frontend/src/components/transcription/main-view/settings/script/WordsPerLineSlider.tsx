import { Grid, Slider, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { useTranscriptionContext } from '../../../../../contexts/TranscriptionContext';
import { RequestPayloadNumberKey } from '../../../common/type-defs';
import { userSelectNone } from '../../../../../const/ui';
import {isSmallerThanMd} from '../../../../../hooks/is-compact';

interface Props {
	title: string;
	requestPayloadField?: RequestPayloadNumberKey;
	value?: number;
	onChange?: (value: number) => void;
	minValue: number;
	maxValue: number;
	disabled: boolean;
}

export const WordsPerLineSlider: React.FC<Props> = ({
	title,
	requestPayloadField,
	value,
	onChange,
	minValue,
	maxValue,
	disabled
}: Props) => {
	const smallerThanMd = isSmallerThanMd();

	const {
		requestPayload,
		setRequestPayload
	} = useTranscriptionContext();

	const handlePayloadChange = (newValue: number | number[]) => {
		if (requestPayloadField) {
			setRequestPayload((prevState) => ({
				...prevState,
				[requestPayloadField]: newValue
			}));
		} else {
			if (onChange) {
				onChange(newValue as number);
			}
		}
	};

	const updateValue = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element> | React.KeyboardEvent<HTMLDivElement>) => {
		const target = event.target as HTMLInputElement;
		const newValue = Number(target.value);
		if (newValue >= minValue && newValue <= maxValue) {
			handlePayloadChange(newValue);
		} else if (newValue < minValue) {
			handlePayloadChange(minValue);
		} else if (newValue > maxValue) {
			handlePayloadChange(maxValue);
		}
	};

	return (
		<div style={{ ...userSelectNone }}>
			{smallerThanMd && (
				<Typography fontWeight="400" color="black" fontSize="13px">
					{title}
				</Typography>
			)}

			<Grid container item flexDirection="column" xs={12} sx={{ height: '100%', flexWrap: 'nowrap', alignItems: 'start' }}>
				{!smallerThanMd && (
					<Typography fontWeight="400" color="black" fontSize="13px">
						{title}
					</Typography>
				)}
				<TextField
					type="number"
					value={requestPayloadField ? requestPayload[requestPayloadField] : value}
					onChange={(event) => {
						const newValue = Number(event.target.value);
						handlePayloadChange(newValue);
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
							padding: 1,
							'& > fieldset': {
								margin: 0
							}
						},
						'& .MuiInputBase-input': {
							padding: 0,
							marginLeft: '5px'
						},
						'input[type=number]::-webkit-inner-spin-button': {
							opacity: 1
						}
					}}
				/>

				{smallerThanMd && (
					<Slider
						size="small"
						aria-label="Small"
						valueLabelDisplay="auto"
						value={requestPayloadField ? requestPayload[requestPayloadField] : value}
						onChange={(event, value) => {
							handlePayloadChange(value);
						}}
						disabled={disabled}
						min={minValue}
						max={maxValue}
						sx={{ width: '90%', ml: '6px', mr: '4px', mt: '-30px'}}
					/>
				)}
			</Grid>
		</div>
	);
};
