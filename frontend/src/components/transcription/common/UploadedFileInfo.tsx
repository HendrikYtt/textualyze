import Grid from '@mui/material/Grid';
import {IconButton, Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import { useTranscriptionContext } from '../../../contexts/TranscriptionContext';
import {isSmallerThanMd, isSmallerThanSm} from '../../../hooks/is-compact';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Box from '@mui/material/Box';

interface Props {
    onClick: () => void;
	fontColor: string;
	closeDisabled?: boolean;
	height: string;
	isHighlighted: boolean;
}

export const UploadedFileInfo: React.FC<Props> = ({
	onClick,
	fontColor,
	closeDisabled,
	height,
	isHighlighted
}: Props) => {
	const smallerThanSm = isSmallerThanSm();
	const smallerThanMd = isSmallerThanMd();

	const {
		adjustedFileData,
	} = useTranscriptionContext();

	return (
		<Grid
			container
			item
			mt={2}
			sx={{
				position: 'relative',
				backgroundColor: isHighlighted ? '#E5F3EF' : '#D8D8DD',
				paddingRight: 3,
				paddingLeft: smallerThanSm ? '12px' : '16px',
				paddingY: '5px',
				borderRadius: '5px',
				border: `1px solid ${isHighlighted ? '#008A62' : '#8E8EAF'}`,
				height: height,
				alignItems: 'center'
			}}
		>
			{isHighlighted && (
				<Grid item>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<CheckCircleIcon
							sx={{
								fontSize: '30px',
								color: '#008A62',
								mr: smallerThanSm ? 1 : 2
							}}
						/>
					</Box>
				</Grid>
			)}
			<Grid item>
				<Grid item xs={12}>
					<Typography
						variant="subtitle2"
						fontWeight="700"
						color="black"
						fontSize={smallerThanSm ? '12px' : '14px'}
						style={{
							display: 'block',
							whiteSpace: 'nowrap',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							maxWidth: smallerThanMd ? '180px' : '600px',
						}}
					>{adjustedFileData.name}</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="subtitle2" fontWeight="400" fontSize={smallerThanSm ? '12px' : '14px'} color={fontColor}>
						<span style={{ marginRight: '6px' }}>{adjustedFileData.duration.toFixed(2)} sec</span>
						<span style={{ display: 'inline-block', verticalAlign: 'middle', marginBottom: '4px' }}>•</span>
						<span style={{ marginLeft: '6px'}}>{adjustedFileData.size.toFixed(2)}MB</span>
					</Typography>
				</Grid>

				<IconButton
					disabled={closeDisabled}
					sx={{
						position: 'absolute',
						right: smallerThanSm ? 2 : 6,
						top: '50%',
						transform: 'translateY(-50%)',
						color: '#1C1B1F'
					}}
					onClick={onClick}
				>
					<CloseIcon fontSize="small" />
				</IconButton>
			</Grid>

		</Grid>
	);
};