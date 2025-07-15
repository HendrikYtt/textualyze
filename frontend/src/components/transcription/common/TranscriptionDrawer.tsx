import * as React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import {TranscriptionSettingsTabs} from '../main-view/settings/TranscriptionSettingsTabs';
import {TranscriptionStyle} from '../main-view/settings/style/TranscriptionStyle';
import {useTranscriptionContext} from '../../../contexts/TranscriptionContext';
import {drawerPercentage} from '../../../const/transcription';
import {Puller} from './Puller';
import {TranscriptionBox} from '../main-view/settings/script/TranscriptionBox';
import {TranscriptionSocials} from '../main-view/settings/socials/TranscriptionSocials';

const Root = styled('div')(({ theme }) => ({
	height: '100%',
	backgroundColor:
        theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

export default function TranscriptionDrawer() {

	const {
		currentTab,
		isTranscriptionDrawerOpen,
		setIsTranscriptionDrawerOpen,
		drawerBleeding
	} = useTranscriptionContext();

	const toggleDrawer = (newOpen: boolean) => () => {
		setIsTranscriptionDrawerOpen(newOpen);
	};

	return (
		<Root>
			<Global
				styles={{
					'.MuiDrawer-root > .MuiPaper-root': {
						height: `calc(${drawerPercentage}% - ${drawerBleeding}px)`,
						overflow: 'visible'
					},
				}}
			/>
			<SwipeableDrawer
				anchor="bottom"
				open={isTranscriptionDrawerOpen}
				onClose={() => {
					setIsTranscriptionDrawerOpen(false);}
				}
				onOpen={toggleDrawer(true)}
				swipeAreaWidth={drawerBleeding}
				disableSwipeToOpen={false}
				ModalProps={{
					keepMounted: true,
					BackdropProps: {
						style: {
							backgroundColor: 'transparent'
						},
					},
				}}
			>
				<Box
					sx={{
						position: 'absolute',
						top: -drawerBleeding,
						borderTopLeftRadius: 8,
						borderTopRightRadius: 8,
						visibility: 'visible',
						right: 0,
						left: 0,
						backgroundColor: isTranscriptionDrawerOpen ? 'white' : '#E5E5E5'
					}}
				>
					<Puller />
					<TranscriptionSettingsTabs />
				</Box>
				{currentTab === 'script' && (
					<TranscriptionBox />
				)}
				{currentTab === 'style' && (
					<TranscriptionStyle />
				)}
				{currentTab === 'socials' && (
					<TranscriptionSocials />
				)}
			</SwipeableDrawer>
		</Root>
	);
}