import React, { useState, useEffect, useRef } from 'react';
import {Grid, IconButton} from '@mui/material';
import {darken, lighten} from '@mui/material/styles';
import { colors } from '../../../../../themes';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import CloseIcon from '@mui/icons-material/Close';
import EmojiPicker, { EmojiStyle } from 'emoji-picker-react';
import {emojiPickerZIndex} from '../../../../../const/ui';
import { useTranscriptionContext } from '../../../../../contexts/TranscriptionContext';
import { Segment } from '@hendrikytt/api-contracts';
import { useTranscriptionBox } from '../../../../../hooks/use-transcription-box';
import { UITooltip } from '../../../../ui/UITooltip';
import {isSmallerThanMd} from '../../../../../hooks/is-compact';
import {UIDialog} from '../../../../ui/UIDialog';

const baseCloudfrontUrl = 'https://d1ym62eexzi0wy.cloudfront.net';

interface Props {
	segmentIndex: number;
}

export const EmojiAnimationPicker: React.FC<Props> = ({ segmentIndex }) => {
	const smallerThanMd = isSmallerThanMd();

	const { requestPayload, setRequestPayload } = useTranscriptionContext();
	const { seekTo } = useTranscriptionBox();
	const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
	const pickerRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

	const handleClickOutside = (event: MouseEvent) => {
		if (buttonRef.current && buttonRef.current.contains(event.target as Node)) {
			return;
		}
		if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
			setIsEmojiPickerOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	if (!requestPayload.displayedTranscription[segmentIndex]?.words) {
		return null;
	}

	const currentEmoji = requestPayload.displayedTranscription[segmentIndex].words.find(
		(word) => word.emoji !== null
	);

	const handleOnClick = () => {
		seekTo(requestPayload.displayedTranscription[segmentIndex].start, true);
		setIsEmojiPickerOpen((prev) => !prev);
	};

	const emojiPicker = () => {
		return (
			<EmojiPicker
				lazyLoadEmojis={true}
				autoFocusSearch={false}
				emojiStyle={EmojiStyle.APPLE}
				width={`${smallerThanMd ? '100vw' : '292px'}`}
				onEmojiClick={async (emoji, event) => {
					let emojiVideoUrl: string | null = `${baseCloudfrontUrl}/${emoji.unified}.webm`;
					const resp = await fetch(emojiVideoUrl, {
						method: 'GET',
					});
					if (!resp.ok) {
						emojiVideoUrl = null;
					}
					setRequestPayload((prevState) => {
						const copy = JSON.parse(
							JSON.stringify(requestPayload.displayedTranscription)
						) as Segment[];
						copy[segmentIndex].words[0].emoji = emoji.emoji;
						copy[segmentIndex].words[0].emojiUrl = emojiVideoUrl;
						return {
							...prevState,
							displayedTranscription: copy,
						};
					});
				}}
				style={{
					zIndex: emojiPickerZIndex,
				}}
			/>
		);
	};

	return (
		<div
			style={{
				position: 'relative',
				display: 'inline-block',
				marginRight: '2px',
			}}
		>
			{currentEmoji && (
				<>
					<IconButton
						ref={buttonRef}
						onClick={handleOnClick}
						sx={{
							p: '0px',
							m: 0,
							mt: '-7px',
						}}
					>
						{currentEmoji.emoji}
						<CloseIcon
							onClick={(e) => {
								e.stopPropagation();
								setRequestPayload((prevState) => {
									const copy = JSON.parse(
										JSON.stringify(requestPayload.displayedTranscription)
									) as Segment[];
									copy[segmentIndex].words[0].emoji = null;
									return {
										...prevState,
										displayedTranscription: copy,
									};
								});
							}}
							sx={{
								p: '0px',
								m: 0,
								position: 'absolute',
								top: '-3px',
								right: '-3px',
								borderRadius: '50%',
								backgroundColor: colors.inputBgGrey,
								'&:hover': {
									backgroundColor: darken(colors.inputBgGrey, 0.2),
								},
								color: 'black',
								fontSize: '16px',
							}}
						/>
					</IconButton>
				</>
			)}
			{!currentEmoji && (
				<UITooltip
					title="Add emoji to segment"
				>
					<IconButton
						ref={buttonRef}
						onClick={handleOnClick}
						sx={{
							p: '4px',
							m: 0,
							mt: '-4px',
							'&:hover': {
								backgroundColor: darken(colors.inputBgGrey, 0.2),
							},
						}}
					>
						<AddReactionOutlinedIcon sx={{ color: colors.background }} />
					</IconButton>
				</UITooltip>
			)}

			{!smallerThanMd && isEmojiPickerOpen && (
				<div
					ref={pickerRef}
					style={{
						position: 'absolute',
						top: 35,
						right: '231%',
						transform: 'translateX(48%)',
						zIndex: emojiPickerZIndex,
					}}
				>
					{emojiPicker()}
				</div>
			)}

			<UIDialog
				open={smallerThanMd && isEmojiPickerOpen}
				title="Choose emoji"
				topRightElement={
					<IconButton
						aria-label="close"
						onClick={() => setIsEmojiPickerOpen(false)}
						sx={{
							position: 'absolute',
							right: 14,
							top: 14,
							color: 'white',
							backgroundColor: colors.palette.primary,
							'&:hover': {
								backgroundColor: lighten(colors.palette.primary, 0.15),
							}
						}}
					>
						<CloseIcon />
					</IconButton>
				}
				content={
					<Grid container alignItems="center" justifyContent="center" rowSpacing={1}>
						{emojiPicker()}
					</Grid>
				}
			/>
		</div>
	);
};
