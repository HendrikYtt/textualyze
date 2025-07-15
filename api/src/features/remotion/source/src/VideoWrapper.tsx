import {AbsoluteFill, OffthreadVideo, Sequence, Audio, useCurrentFrame} from 'remotion';
import {Subtitle} from './Subtitle';
import {z} from 'zod';
import {RequestPayload} from "@hendrikytt/api-contracts";
import { calculateFrame } from '@hendrikytt/api-contracts/dist/remotion';
import {AliTemplate} from "./AliTemplate";
import React from "react";

export const myCompSchema = z.object({
	requestPayload: z.string(),
});

export const VideoWrapper: React.FC<z.infer<typeof myCompSchema>> = ({
	requestPayload
}) => {
	const payload = JSON.parse(requestPayload) as RequestPayload;
	const frame = useCurrentFrame();
	const isAudio = payload.isAudioFile;
	const s3FontName = payload.styling.s3_font_name;
	const s3FontLink = payload.s3FontLink;

	const fontFaceRule = `
	  @font-face {
		font-family: "${s3FontName}";
		src: url("${s3FontLink}") format("truetype");
	  }
	`;

	const styleElement = document.createElement('style');
	styleElement.setAttribute('data-font', s3FontName);
	styleElement.appendChild(document.createTextNode(fontFaceRule));
	document.head.appendChild(styleElement);

	return (
		<AbsoluteFill>
			<AbsoluteFill>
				{!isAudio && (<OffthreadVideo src={payload.s3VideoLink}/>)}
				{isAudio && <Audio src={payload.s3VideoLink} />}
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
									<Subtitle subtitleType="background" absoluteFrame={frame} segment={segment}
											  requestPayload={requestPayload}/>
									<Subtitle subtitleType="stroke" absoluteFrame={frame} segment={segment}
											  requestPayload={requestPayload}/>
									<Subtitle subtitleType="text" absoluteFrame={frame} segment={segment}
											  requestPayload={requestPayload}/>
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
				{payload.logo?.logoType === 'image' && payload.logo.imageUrl &&(
					<img
						src={payload.logo.imageUrl}
						style={{
							position: 'absolute',
							top: `${payload.logo.positionY}%`,
							left: `${payload.logo.positionX}%`,
							transform: `scale(${payload.logo.imageScale!})`,
							width: payload.logo.adjustedImageWidth!,
							height: payload.logo.adjustedImageHeight!,
							transformOrigin: 'top left',
							opacity: payload.logo.opacity / 100,
						}}
					/>
				)}
			</AbsoluteFill>
		</AbsoluteFill>
	);
};