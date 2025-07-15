import {Box, Grid, Stack} from '@mui/material';
import * as React from 'react';
import {isSmallerThanMd, isSmallerThanSm} from '../../../../../hooks/is-compact';
import '../../styles.css';
import {useTranscriptionContext} from '../../../../../contexts/TranscriptionContext';
import {FaInstagram} from 'react-icons/fa';
import { RiTiktokLine } from 'react-icons/ri';
import { FiYoutube } from 'react-icons/fi';
import { RiSnapchatLine } from 'react-icons/ri';
import {UIText} from '../../../../ui/UIText';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {SocialsLogo} from './SocialsLogo';
import {AIDescription} from './AIDescription';

export type SelectedPreview = 'none' | 'Instagram_Reels' | 'TikTok' | 'YouTube_Shorts' | 'Snapchat';

export const TranscriptionSocials = () => {
	const smallerThanSm = isSmallerThanSm();
	const smallerThanMd = isSmallerThanMd();

	const {
		selectedPreview,
		setSelectedPreview,
		isiPhoneRatio
	} = useTranscriptionContext();

	const previewItem = (preview: SelectedPreview) => {
		const isCurrentlySelected = selectedPreview === preview;
		return (
			<Grid item xs={smallerThanMd ? 5.7 : 5.8}
				  onClick={() => {
					  if (isCurrentlySelected) {
						  setSelectedPreview('none');
					  } else {
						  setSelectedPreview(preview);
					  }
				  }}
			>
				<Box
					sx={{
						position: 'relative',
						height: '80px',
						width: '100%',
						borderRadius: '12px',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: '#F8F8FC',
						border: `${isCurrentlySelected ? 3 : 1}px solid ${isCurrentlySelected ? '#008A62' : '#8E8EAF'}`,
						userSelect: 'none',
						'&:hover': {
							cursor: 'pointer',
							backgroundColor: '#E7E7E9'
						},
					}}
				>
					{isCurrentlySelected && (
						<div style={{
							position: 'absolute',
							top: '5px',
							left: '5px',
						}}>
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center'
								}}
							>
								<CheckCircleIcon
									sx={{
										fontSize: '25px',
										color: '#008A62',
										mr: smallerThanSm ? 1 : 2
									}}
								/>
							</Box>
						</div>
					)}
					{preview === 'Instagram_Reels' && (
						<FaInstagram style={{fontSize: '16px', color: 'black', marginRight: '3px', marginTop: '3px'}}/>
					)}
					{preview === 'TikTok' && (
						<RiTiktokLine style={{fontSize: '18px', color: 'black', marginRight: '1px'}}/>
					)}
					{preview === 'YouTube_Shorts' && (
						<FiYoutube style={{fontSize: '18px', color: 'black', marginRight: '3px', marginTop: '3px'}}/>
					)}
					{preview === 'Snapchat' && (
						<RiSnapchatLine style={{fontSize: '18px', color: 'black', marginRight: '1px', marginTop: '1px'}}/>
					)}
					<UIText
						variant="small"
					>
						{preview.replace('_', ' ')}
					</UIText>
				</Box>

			</Grid>
		);
	};

	return (
		<Box sx={{height: '100%'}}>
			<Stack
				flexDirection="column"
				justifyContent="space-between"
				sx={{
					overflowY: 'auto',
					height: '100%'
				}}
			>
				<Grid container px={smallerThanMd ? 2 : 3}
					  sx={{
						  width: '100%',
						  '&:hover .slider': {
							  cursor: 'pointer'
						  }
					  }}
				>
					{isiPhoneRatio && (
						<div style={{width: '100%'}}>
							<UIText
								variant="regular"
								component="h2"
								mb={1}
							>
							Preview
							</UIText>

							<Grid container gap={2} mb={2} sx={{width: '100%'}}>
								{previewItem('Instagram_Reels')}
								{previewItem('TikTok')}
								{previewItem('YouTube_Shorts')}
								{previewItem('Snapchat')}
							</Grid>
						</div>
					)}
					<SocialsLogo />
					<AIDescription />
				</Grid>
			</Stack>
		</Box>
	);
};