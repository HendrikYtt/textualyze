import {Segment} from '@hendrikytt/api-contracts';
import {log} from '../../lib/log';
import {openai} from '../../lib/openai';
import {keyBy} from 'lodash';
import {keyedByEmoji} from './emoji-data';
import nodeFetch from 'node-fetch';
import FormData from 'form-data';
import fs from 'fs';
import {autoDetect, languageOptions} from '@hendrikytt/api-contracts/dist/language';
import {InitialSegmentsV2} from '../../types';
import Anthropic from '@anthropic-ai/sdk';

const baseCloudfrontUrl = 'https://d1ym62eexzi0wy.cloudfront.net';

export const transcribeMedia = async (mp3FilePath: string, language: string): Promise<InitialSegmentsV2> => {
	const body = new FormData();
	const fileStream = fs.createReadStream(mp3FilePath);

	body.append('file', fileStream);
	if (language !== autoDetect) {
		const lang = languageOptions.filter(l => l.value === language)[0].label.toLowerCase();
		body.append('language', lang);
	}
	body.append('response_format', 'verbose_json');
	body.append('speaker_labels', 'true');

	const response = await nodeFetch('https://api.lemonfox.ai/v1/audio/transcriptions', {
		method: 'POST',
		headers: {
			'Authorization': 'Bearer <YOUR_TOKEN>',
			...body.getHeaders()
		},
		body: body
	});
	const lemonFoxResp: InitialSegmentsV2 = await response.json();
	return lemonFoxResp;
};

export const generateImage = async (segment: Segment): Promise<{ url: string }> => {
	const response = await nodeFetch('https://api.lemonfox.ai/v1/images/generations', {
		method: 'POST',
		headers: {
			'Authorization': 'Bearer <YOUR_TOKEN>',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			prompt: `Depict following in futuristic art: ${segment.text}`
		})
	});
	const lemonFoxResp = await response.json();
	return lemonFoxResp.data[0];
};

export const assignEmojisV2 = async (segments: Segment[]): Promise<Segment[]> => {
	try {
		const words = segments.flatMap(s => s.words.map(w => {
			return {
				id: w.id,
				word: w.word,
				emoji: w.emoji
			};
		}));
		const completion = await openai.chat.completions.create({
			messages: [
				{ role: 'system', content: 'You are a helpful assistant.' },
				{ role: 'user', content: `Assign appropriate UNICODE emoji to EACH word here:\n ${words.map(w => JSON.stringify({ word: w.word })).join(', ')}\nRETURN ONLY THE UPDATED JSON OBJECT LIST IN THIS FORMAT [{word: string, emoji: string}] WITHOUT ANY EXTRA TEXT.` },
			],
			model: 'mixtral-chat',
			// frequency_penalty: 0.5
		});
		if (completion.choices[0].message.content) {
			const yes = completion.choices[0].message.content;
			const parsed: {word: string, emoji: string}[] = JSON.parse(yes);
			const emojiMap = keyedByEmoji;
			const merged = words.map((w, index) => {
				const emoji = parsed[index].emoji;
				if (!emojiMap[emoji]) {
					return {
						...w,
						emoji: null,
						emojiUrl: null
					};
				}
				const hasVideo = emojiMap[emoji].hasVideo;
				const value = emojiMap[emoji].emojiKey;
				return {
					...w,
					emoji: emoji,
					emojiUrl: hasVideo ? `${baseCloudfrontUrl}/${value}.webm` : null
				};
			});
			const keyedBy = keyBy(merged, 'id');
			const segmentsWithEmojis = segments.map(s => {
				return {
					...s,
					words: s.words.map(w => {
						const wordWithEmoji = keyedBy[w.id];
						return {
							...w,
							emoji: wordWithEmoji.emoji,
							emojiUrl: wordWithEmoji.emojiUrl,
						};
					})
				};
			});

			return segmentsWithEmojis;
		} else {
			log.error('Failed to assign emojis');
			return [];
		}

	} catch (e) {
		log.error(`Failed to assign emojis: ${e}`);
		return [];
	}
};

const anthropic = new Anthropic({
	apiKey: '<YOUR_TOKEN>'
});
export const generateDescription = async (transcriptText: string, length: 'regular' | 'short' | 'long') => {
	let sentenceCount, hashtagCount, emojiCount, tokenCount;

	switch (length) {
	case 'short':
		sentenceCount = '1-2';
		hashtagCount = '3-5';
		emojiCount = '1-2';
		tokenCount = 125;
		break;
	case 'long':
		sentenceCount = '3-4';
		hashtagCount = '7-10';
		emojiCount = '4-6';
		tokenCount = 350;
		break;
	case 'regular':
	default:
		sentenceCount = '2-3';
		hashtagCount = '5-7';
		emojiCount = '2-4';
		tokenCount = 250;
	}

	const prompt = `
    Create a compelling social media post description, relevant hashtags, and appropriate emojis for a video with the following transcript. Use the same language as the transcript for your response:

${transcriptText}

Your task:
1. Write an engaging ${sentenceCount} sentence description that captures the essence of the video content.
2. Generate ${hashtagCount} relevant hashtags that will help the post reach its target audience.
3. Include ${emojiCount} relevant emojis that complement the content and tone of the video.
4. Ensure the description, hashtags, and emoji usage are appropriate for the language and culture of the provided transcript.
Format your response as follows:

[Your ${sentenceCount} sentence description here in the original language, with emojis integrated naturally]
#[hashtag1] #[hashtag2] #[hashtag3] ... #[hashtag${hashtagCount.split('-')[1]}]

Be sure to tailor the tone and style of the description to match the content and intended audience of the video. Make the hashtags specific and relevant to the video's topic, but also include some broader, popular tags to increase visibility. Use language-appropriate hashtags that are commonly used in the target language and culture. Integrate emojis in a way that enhances the message without overcrowding the text.
    `;

	const msg = await anthropic.messages.create({
		model: 'claude-3-5-sonnet-20240620',
		max_tokens: tokenCount,
		temperature: 0.5,
		messages: [
			{
				'role': 'user',
				'content': [
					{
						'type': 'text',
						'text': prompt
					}
				]
			}
		]
	});
	return (msg.content[0] as { text: string }).text;
};