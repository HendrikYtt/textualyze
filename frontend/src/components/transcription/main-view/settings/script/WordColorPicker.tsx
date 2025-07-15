import {ColorPicker} from 'antd';
import {Segment} from '@hendrikytt/api-contracts';
import {Box} from '@mui/material';
import React from 'react';
import {useTranscriptionContext} from '../../../../../contexts/TranscriptionContext';
import {colors} from '../../../../../themes';

interface Props {
    segmentIndex: number;
    wordIndex: number;
    setColorPickerOpen: React.Dispatch<React.SetStateAction<boolean>>;
    colorType: 'font_color' | 'background_color' | 'highlight_color';
}

export const WordColorPicker: React.FC<Props> = ({
	wordIndex,
	segmentIndex,
	setColorPickerOpen,
	colorType
}) => {
	const {
		requestPayload,
		setRequestPayload
	} = useTranscriptionContext();

	if (!requestPayload?.displayedTranscription[segmentIndex]?.words[wordIndex]) {
		return null;
	}

	const shouldBeDisabled = (colorType === 'background_color' || colorType === 'highlight_color') && requestPayload.styling.template_type === 'Ali';

	return (
		<Box
			sx={{
				border: `1px solid ${colors.grey}`,
				display: 'flex',
				alignItems: 'center',
				borderRadius: '2px',
				minHeight: '0px',
				'& .ant-color-picker-color-block': {
					width: '30px !important',
					height: '20px !important',
					margin: '0px !important',
				},
				'& .ant-color-picker-trigger': {
					width: '30px !important',
					height: '20px !important',
					minWidth: '0px',
					padding: '0px !important',
					margin: '0px !important',
				}
			}}>
			<ColorPicker
				placement="bottom"
				size="small"
				disabled={requestPayload.styling[colorType] === null || shouldBeDisabled}
				value={requestPayload.displayedTranscription[segmentIndex].words[wordIndex][colorType] === '' ? requestPayload.styling[colorType] : requestPayload.displayedTranscription[segmentIndex].words[wordIndex][colorType]}
				onOpenChange={(open) => setColorPickerOpen(open)}
				onChange={(value, hex) => {
					const copy: Segment[] = JSON.parse(JSON.stringify(requestPayload.displayedTranscription));
					copy[segmentIndex].words[wordIndex][colorType] = hex;

					setRequestPayload(prevState => ({
						...prevState,
						displayedTranscription: copy
					}));
				}}
			/>
		</Box>
	);
};