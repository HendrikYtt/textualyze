export type Tag = {
	text: string;
	color: string;
};

export type Article = {
    path: string;
    title: string;
    description: string;
    date: string;
    keywords: string;
    mainImage: string;
    tags: Tag[];
}

export const articlesData: Article[] = [
	{
		path: '/blog/how-to-translate-videos-instantly',
		title: 'How to translate videos (INSTANTLY!)',
		description: 'How to automatically translate your videos to another language to take your content to an international level to reach a wider audience and get more views',
		date: 'Thursday July 4, 2024',
		keywords: 'Video Translation, Automatic Translation, Multilingual Content, AI Translation, Content Localization, International Audience, Video Subtitles, Language Barrier, Content Globalization, Video Accessibility, International SEO',
		mainImage: 'how_to_translate_videos_instantly.png',
		tags: [
			{
				text: 'Technology',
				color: '#42C3EC'
			},
			{
				text: 'Content Creation',
				color: '#EEB525'
			}
		]
	},
	{
		path: '/blog/how-to-add-color-coded-captions-for-multiple-speakers-in-videos',
		title: 'How to Add Color-Coded Captions for Multiple Speakers in Videos',
		description: 'Add color-coded captions for different speakers to your videos using Textualyze, improving clarity and engagement.',
		date: 'Wednesday June 26, 2024',
		keywords: 'Subtitles, Textualyze, Diarization, Content creation, Video captions',
		mainImage: 'how_to_add_color_coded_captions_for_multiple_speakers_in_videos.png',
		tags: [
			{
				text: 'Social Media',
				color: '#42C3EC'
			},
			{
				text: 'Content Creation',
				color: '#EEB525'
			}
		]
	},
	{
		path: '/blog/can-ai-translate-audio',
		title: 'Can AI Translate Audio?',
		description: 'Dive into the world of AI audio translation to understand how it transcends traditional language barriers.',
		date: 'Thursday December 21, 2023',
		keywords: 'AI Audio Translation, Real-Time Translation, Speech Recognition, Natural Language Processing, Multilingual Communication, Technological Advancements in Translation',
		mainImage: 'can_ai_translate_audio.png',
		tags: [
			{
				text: 'Technology',
				color: '#42C3EC'
			}
		]
	},
	{
		path: '/blog/top-5-subtitle-fonts-for-video-subtitles',
		title: 'Top 5 Subtitle Fonts for Video Subtitles',
		description: 'Explore the top subtitle fonts for enhancing video content, and discover Textualyze\'s AI-powered subtitle generator.',
		date: 'Saturday December 17, 2023',
		keywords: 'Subtitle Fonts, Video Content, AI Subtitle Generation, Educational Videos, Entertainment Subtitling, Font Customization',
		mainImage: 'streamline_your_video_creating_with_textualyze.png',
		tags: [
			{
				text: 'Content Creation',
				color: '#EEB525'
			}
		]
	},
	{
		path: '/blog/how-to-add-captions-to-tiktok-videos-in-2024',
		title: 'How to add captions to TikTok videos in 2024',
		description: 'Learn how to add captions to TikTok videos with Textualyze in 2024, offering free, customizable subtitles for better accessibility and engagement.',
		date: 'Saturday February 18, 2024',
		keywords: 'TikTok captions, Textualyze, Video subtitles, Adding captions, Video accessibility, Subtitle customization, Video transcription, Translate video',
		mainImage: 'how_to_add_captions_to_tiktok_videos_in_2024.png',
		tags: [
			{
				text: 'Social Media',
				color: '#8A81F8'
			},
			{
				text: 'Content Creation',
				color: '#EEB525'
			}
		]
	},
	{
		path: '/blog/the-impact-of-subtitles-on-video-engagement',
		title: 'The Impact of Subtitles on Video Engagement ',
		description: 'Discover the crucial role of subtitles in enhancing video engagement and accessibility across platforms with Textualyze.',
		date: 'Saturday February 18, 2024',
		keywords: 'Subtitles, Textualyze, Accessibility, Engagement, Content creation, Video captions',
		mainImage: 'the_impact_of_subtitles_on_video_engagement.png',
		tags: [
			{
				text: 'Technology',
				color: '#42C3EC'
			},
			{
				text: 'Content Creation',
				color: '#EEB525'
			}
		]
	},
];
