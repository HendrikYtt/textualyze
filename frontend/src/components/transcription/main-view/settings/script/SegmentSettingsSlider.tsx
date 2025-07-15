import {Grid, Slider, TextField} from '@mui/material';
import * as React from 'react';
import {useTranscriptionContext} from '../../../../../contexts/TranscriptionContext';
import {userSelectNone} from '../../../../../const/ui';
import {isSmallerThanMd} from '../../../../../hooks/is-compact';
import {UIText} from '../../../../ui/UIText';

interface Props {
    title: string;
    requestPayloadStylingField?: 'position' | 'word_spacing' | 'fontSize';
    value?: number;
    onChange?: (value: number) => void;
    minValue: number;
    maxValue: number;
    unit: string;
    disabled: boolean;
}

export const SegmentSettingsSlider: React.FC<Props> = ({
	title,
	requestPayloadStylingField,
	value,
	onChange,
	minValue,
	maxValue,
	unit,
	disabled
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

	return (
		<Grid
			container
			alignItems="start"
			style={{
				...userSelectNone
			}}
		>
			<Grid container alignItems="baseline" columnSpacing={1}>
				<Grid item xs={6}>
					<UIText
						variant="tiny"
						sx={{color: 'black'}}
					>
						{title}
					</UIText>
				</Grid>
				<Grid item xs={6}>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							flexDirection: 'column'
						}}
					>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<TextField
								type="number"
								value={styleValue() ?? value}
								onChange={(event) => {
									const newValue = Number(event.target.value);
									setPayload(newValue);
								}}
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
										padding: '0',
										height: '30px',
										width: '50px'
									},
									'& .MuiOutlinedInput-input': {
										padding: '0',
										paddingLeft: '3px',
									},
									height: '30px',
									mr: '3px'
								}}
							/>
							<UIText
								variant="tiny"
								sx={{color: 'black'}}
							>
								{unit}
							</UIText>
						</div>

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
							sx={{
								width: '70px',
								ml: '5px',
								mt: smallerThanMd ? '-10px' : '-5px'
							}}
						/>
					</div>

				</Grid>
			</Grid>


		</Grid>
	);
};