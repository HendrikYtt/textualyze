import { AbsoluteFill, Audio, Sequence, useCurrentFrame, Video } from 'remotion';
import { z } from 'zod';
import { RequestPayload } from '@hendrikytt/api-contracts';
import { Subtitle } from './Subtitle';
import SnapchatLayout from './SnapchatLayout';
import { useTranscriptionContext } from '../../contexts/TranscriptionContext';
import TikTokLayout from './TikTokLayout';
import InstagramLayout from './InstagramLayout';
import YouTubeLayout from './YouTubeLayout';
import {calculateFrame} from '@hendrikytt/api-contracts/dist/remotion';
import {AliTemplate} from './AliTemplate';
import React from 'react';

export const myCompSchema = z.object({
	requestPayload: z.string(),
	videoSrc: z.string()
});

export const RemotionFrame: React.FC<z.infer<typeof myCompSchema>> = ({
	requestPayload,
	videoSrc
}) => {
	const {
		selectedPreview
	} = useTranscriptionContext();

	const payload = JSON.parse(requestPayload) as RequestPayload;
	const frame = useCurrentFrame();
	const isAudio = payload.isAudioFile;

	return (
		<AbsoluteFill>
			<AbsoluteFill style={{ backgroundColor: isAudio ? 'black' : 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
				{!isAudio && (
					<Video
						src={videoSrc}
						preload="metadata"
						style={{
							objectFit: 'contain',
							maxWidth: '100%',
							maxHeight: '100%'
						}}
					/>
				)}
				{isAudio && <Audio src={videoSrc} />}
				{payload.displayedTranscription.map((segment, index) => {
					const frameStart = calculateFrame(segment.start);
					const frameEnd = calculateFrame(segment.end);
					const durationInFrames = Math.max(1, frameEnd - frameStart);
					const soundSrc = `https://textualyze.com/audio/${segment.words[0].sound}.mp3`;
					return (
						<Sequence key={index} from={frameStart} durationInFrames={durationInFrames}>
							{segment.words[0].sound && <Audio src={soundSrc} volume={segment.words[0].soundVolume / 100} />}
							{payload.styling.template_type === 'Ali' && (
								<AliTemplate absoluteFrame={frame} segment={segment} requestPayload={requestPayload} />
							)}
							{payload.styling.template_type === 'Default' && (
								<div style={{marginLeft: '-1.5%'}}>
									<Subtitle subtitleType="background" absoluteFrame={frame} segment={segment} requestPayload={requestPayload} />
									<Subtitle subtitleType="stroke" absoluteFrame={frame} segment={segment} requestPayload={requestPayload} />
									<Subtitle subtitleType="text" absoluteFrame={frame} segment={segment} requestPayload={requestPayload} />
								</div>
							)}
						</Sequence>
					);
				})}
			</AbsoluteFill>
			<AbsoluteFill>
				{payload.logo?.logoType === 'text' && (
					<span
						style={{
							position: 'absolute',
							top: `${payload.logo.positionY}%`,
							left: `${payload.logo.positionX}%`,
							fontSize: `${payload.logo.textSize!}rem`,
							opacity: payload.logo.opacity / 100,
							color: 'white'
						}}
					>
						{payload.logo.textContent}
					</span>
				)}
				{payload.logo?.logoType === 'image' && payload.logo.imageUrl && (
					<img
						src={payload.logo.imageUrl}
						style={{
							position: 'absolute',
							top: `${payload.logo.positionY}%`,
							left: `${payload.logo.positionX}%`,
							transform: `scale(${payload.logo.imageScale!})`,
							width: payload.logo.compressedImageWidth!,
							height: payload.logo.compressedImageHeight!,
							transformOrigin: 'top left',
							opacity: payload.logo.opacity / 100,
						}}
					/>
				)}
			</AbsoluteFill>
			<AbsoluteFill>
				{selectedPreview === 'Instagram_Reels' && (
					<InstagramLayout
						videoHeight={payload.compressedHeight}
					/>
				)}
				{selectedPreview === 'TikTok' && (
					<TikTokLayout
						videoHeight={payload.compressedHeight}
					/>
				)}
				{selectedPreview === 'YouTube_Shorts' && (
					<YouTubeLayout
						videoHeight={payload.compressedHeight}
					/>
				)}
				{selectedPreview === 'Snapchat' && (
					<SnapchatLayout
						videoHeight={payload.compressedHeight}
					/>
				)}
			</AbsoluteFill>
		</AbsoluteFill>
	);
};