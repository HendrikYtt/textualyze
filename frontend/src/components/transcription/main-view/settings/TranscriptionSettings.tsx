import {TranscriptionStyle} from './style/TranscriptionStyle';
import React from 'react';
import {isSmallerThanMd} from '../../../../hooks/is-compact';
import {useTranscriptionContext} from '../../../../contexts/TranscriptionContext';
import {TranscriptionBox} from './script/TranscriptionBox';
import {TranscriptionSocials} from './socials/TranscriptionSocials';
import {appBarHeight} from '../../../../const/ui';

export type CurrentTab = 'script' | 'style' | 'socials';

export const TranscriptionSettings = () => {
	const smallerThanMd = isSmallerThanMd();

	const {
		currentTab
	} = useTranscriptionContext();

	return (
		<div
			style={{
				backgroundColor: 'white',
				borderRadius: smallerThanMd ? '20px 20px 0 0' : 'none',
				height: `calc(90vh - ${appBarHeight-65}px)`,
				borderLeft: '2px solid #ACA8CA',
				borderRight: '2px solid #ACA8CA',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'start',
				alignItems: 'start',
				paddingTop: '26px',
			}}>
			{currentTab === 'script' && (
				<TranscriptionBox />
			)}
			{currentTab === 'socials' && (
				<TranscriptionSocials />
			)}
			{currentTab === 'style' && (
				<TranscriptionStyle />
			)}
		</div>
	);
};