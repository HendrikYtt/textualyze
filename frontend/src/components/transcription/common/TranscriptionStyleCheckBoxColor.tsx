import {Checkbox, Grid, Typography} from '@mui/material';
import {ColorPicker} from 'antd';
import * as React from 'react';
import {useCallback, useState} from 'react';
import { useTranscriptionContext } from '../../../contexts/TranscriptionContext';
import {colors} from '../../../themes';
import {debounce} from 'lodash';
import {RequestPayload} from '@hendrikytt/api-contracts';

interface Props {
	title?: string;
	requestPayloadStylingField: 'font_color' | 'background_color' | 'outline_color' | 'highlight_color';
	showCheckbox: boolean;
	defaultColor: string;
}

export const TranscriptionStyleCheckBoxColor: React.FC<Props> = ({
	title,
	requestPayloadStylingField,
	showCheckbox,
	defaultColor
}) => {
	const {
		requestPayload,
		setRequestPayload
	} = useTranscriptionContext();

	const [color, setColor] = useState(requestPayload.styling[requestPayloadStylingField]);

	const debouncedSetRequestPayload = useCallback(
		debounce((newPayload: React.SetStateAction<RequestPayload>) => {
			setRequestPayload(newPayload);
		}, 25),
		[setRequestPayload]
	);

	const [previousColor, setPreviousColor] = useState<string | null>(null);

	return (
		<>
			{title &&
				<Grid item>
					<Typography fontWeight="500" color={colors.darkGrey} fontSize="13px">
						{title}
					</Typography>
				</Grid>
			}

			<Grid container spacing={0} alignItems="center"
				  sx={{
					  flexWrap: 'nowrap',
					  '& .ant-color-picker-color-block': {
						  width: '90px !important',
						  maxHeight: '23px !important',
						  height: '23px !important',
					  },
					  '& .custom-color-picker .ant-color-picker-trigger.ant-color-picker-lg': {
						  width: '90px !important',
						  maxHeight: '23px !important',
						  height: '23px !important',
					  },
					  '& .custom-color-picker .ant-color-picker-trigger.ant-color-picker-lg.ant-color-picker-trigger-disabled': {
						  width: '90px !important',
						  maxHeight: '23px !important',
						  height: '23px !important',
					  },
					  '& :where(.css-dev-only-do-not-override-zg0ahe).ant-color-picker-trigger.ant-color-picker-lg': {
						  width: '90px !important',
						  maxHeight: '23px !important',
						  height: '23px !important',
					  },
					  '@media screen and (max-width: 767px)': {
						  '& .ant-color-picker-color-block, & .ant-color-picker-trigger.ant-color-picker-lg': {
							  maxHeight: '23px !important',
							  height: '23px !important',
						  }
					  },
					  '@supports (-webkit-touch-callout: none)': {
						  '& .ant-color-picker-color-block, & .ant-color-picker-trigger.ant-color-picker-lg': {
							  maxHeight: '23px !important',
							  height: '23px !important',
						  }
					  }
				  }}>
				{showCheckbox && (
					<Grid item xs="auto" sx={{ padding: 0, margin: 0 }}>
						<Checkbox
							checked={requestPayload.styling[requestPayloadStylingField] !== null}
							onChange={(event) => {
								const checked = event.target.checked;
								if (checked) {
									setRequestPayload((prevState) => {
										return {
											...prevState,
											styling: {
												...prevState.styling,
												[requestPayloadStylingField]: previousColor || defaultColor
											}
										};
									});
								} else {
									setRequestPayload((prevState) => {
										setPreviousColor(prevState.styling[requestPayloadStylingField]);
										return {
											...prevState,
											styling: {
												...prevState.styling,
												[requestPayloadStylingField]: null
											}
										};
									});

								}
							}}
							sx={{
								'& .MuiSvgIcon-root': {
									fontSize: 25
								},
								padding: 0,
								margin: 0,
								color: colors.palette.secondary,
								'&.Mui-checked': {
									color: colors.palette.secondary,
								},
							}}
						/>
					</Grid>
				)}
				<Grid item xs="auto" sx={{ padding: 0, margin: 0, mb: '-8px',}}>
					<ColorPicker
						placement="bottom"
						size="large"
						disabled={requestPayload.styling[requestPayloadStylingField] === null}
						value={color}
						onChange={(value, hex) => {
							setColor(hex);
							debouncedSetRequestPayload(prevState => ({
								...prevState,
								styling: {
									...prevState.styling,
									[requestPayloadStylingField]: hex
								}
							}));
						}}
					/>
				</Grid>
			</Grid>
		</>
	);
};