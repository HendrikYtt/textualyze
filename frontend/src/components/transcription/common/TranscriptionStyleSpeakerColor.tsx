import {debounce} from 'lodash';
import {Grid, Typography} from '@mui/material';
import {ColorPicker} from 'antd';
import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import { useTranscriptionContext } from '../../../contexts/TranscriptionContext';
import {colors} from '../../../themes';
import {RequestPayload} from '@hendrikytt/api-contracts';

interface Props {
	title?: string;
	speakerKey: string;
}

export const TranscriptionStyleSpeakerColor: React.FC<Props> = ({
	title,
	speakerKey
}) => {
	const {
		requestPayload,
		setRequestPayload
	} = useTranscriptionContext();

	const [color, setColor] = useState(requestPayload.speakerColors[speakerKey]);

	const debouncedSetRequestPayload = useCallback(
		debounce((newPayload: React.SetStateAction<RequestPayload>) => {
			setRequestPayload(newPayload);
		}, 25),
		[setRequestPayload]
	);

	useEffect(() => {
		return () => {
			debouncedSetRequestPayload.cancel();
		};
	}, [debouncedSetRequestPayload]);

	return (
		<>
			{title &&
				<Grid item>
					<Typography fontWeight="700" color={colors.font.secondary} fontSize="13px">
						{title}
					</Typography>
				</Grid>
			}

			<Grid container spacing={0} alignItems="center"
				  sx={{
					  flexWrap: 'nowrap',
					  '& .ant-color-picker-color-block': {
						  width: '58px !important'
					  },
				  }}>
				<Grid
					item
					xs="auto"
					sx={{
						padding: 0,
						margin: 0
					}}
				>
					<ColorPicker
						placement="bottom"
						size="large"
						value={color}
						onChange={(value, hex) => {
							setColor(hex);
							debouncedSetRequestPayload(prevState => ({
								...prevState,
								speakerColors: {
									...prevState.speakerColors,
									[speakerKey]: hex
								}
							}));
						}}
					/>
				</Grid>
			</Grid>
		</>
	);
};