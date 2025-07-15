import {Box, Button, Checkbox, Grid, Typography} from '@mui/material';
import * as React from 'react';
import { useTranscriptionContext } from '../../../contexts/TranscriptionContext';
import {colors} from '../../../themes';
import {ColorPicker} from 'antd';

interface Props {
    title: string;
    requestPayloadStylingField: 'uppercase' | 'italic' | 'remove_symbols' | 'auto_font_size';
}

export const TranscriptionStyleCheckbox: React.FC<Props> = ({
	title,
	requestPayloadStylingField
}: Props) => {
	const {
		requestPayload,
		setRequestPayload
	} = useTranscriptionContext();

	return (
		<>
			<Grid container spacing={0} alignItems="center"
				  sx={{
					  flexWrap: 'nowrap',
					  '& .ant-color-picker-color-block': {
						  width: '25px !important'
					  },
				  }}>
				<Checkbox
					checked={requestPayload.styling[requestPayloadStylingField]}
					onChange={(event) => {
						const checked = event.target.checked;
						if (checked) {
							setRequestPayload((prevState) => {
								return {
									...prevState,
									styling: {
										...prevState.styling,
										[requestPayloadStylingField]: true
									}
								};
							});
						} else {
							setRequestPayload((prevState) => {
								return {
									...prevState,
									styling: {
										...prevState.styling,
										[requestPayloadStylingField]: false
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
						'&:not(.Mui-checked) .MuiSvgIcon-root': {
							color: colors.inputBorderGrey,
						},
					}}
				/>
				<Grid item xs="auto" sx={{ padding: 0, margin: 0, ml: 0.5}}>
					<Typography color={colors.darkGrey} fontWeight="500" fontSize="13px">
						{title}
					</Typography>
				</Grid>
			</Grid>
		</>
	);
};