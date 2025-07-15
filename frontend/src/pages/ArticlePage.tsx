import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import MarkdownView from 'react-showdown';
import {Helmet} from 'react-helmet-async';
import {Chip, Grid, Paper} from '@mui/material';
import {colors} from '../themes';
import {useHandleNavigation} from '../utils/utils';
import Box from '@mui/material/Box';
import {Article} from '../articles/articlesData';
import {isSmallerThanMd, isSmallerThanSm, isSmallerThanXl} from '../hooks/is-compact';
import {UIButton} from '../components/ui/UIButton';

export const ArticlePage: React.FC<{ articles: Article[] }> = ({ articles }) => {
	const smallerThanMd = isSmallerThanMd();
	const location = useLocation();

	const smallerThanSm = isSmallerThanSm();
	const smallerThanXl = isSmallerThanXl();

	const handleNavigation = useHandleNavigation();

	const [markdownContent, setMarkdownContent] = useState('');

	const article = articles.find(a => a.path === location.pathname);

	useEffect(() => {
		if (article) {
			const mdFilePath = `/markdown/articles/${article.path.replace('/blog/', '')}/content.md`;

			fetch(mdFilePath)
				.then(response => response.text())
				.then(text => setMarkdownContent(text))
				.catch(err => console.error('Failed to load markdown file', err));
		}
	}, [location, articles]);

	if (!article) {
		return <div>Article not found</div>;
	}

	const getMaxHeight = () => {
		if (smallerThanSm) {
			return '100%';
		} else if (!smallerThanSm && smallerThanXl) {
			return '75vh';
		} else {
			return '60vh';
		}
	};

	return (
		<>
			<Helmet>
				<title>{article.title} | Textualyze</title>
				<meta name="description" content={article.description} />
				<meta name="keywords" content={article.keywords} />
			</Helmet>
			<UIButton
				title="Back"
				colorType="primary"
				variant="contained"
				backgroundColor="transparent"
				borderColor={colors.palette.primary}
				textColor={colors.palette.primary}
				onClick={() => {
					handleNavigation(-1, false);
				}}
				fontSize="14px"
				sx={{
					maxHeight: '41px',
					mb: 1
				}}
			>
			</UIButton>
			<Paper
				component="article"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					mx: 'auto',
					borderRadius: '8px',
					boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
					color: colors.font.secondary,
					'& img': {
						display: 'block',
						maxWidth: '100%',
						maxHeight: getMaxHeight(),
						margin: '0 auto'
					},
					'& h1': {
						textAlign: smallerThanMd ? 'start' : 'center',
						fontSize: smallerThanMd ? '26px' : '40px',
						lineHeight: '1.2'
					},
					'& h2': {
						fontSize: '20px'
					},
					'& a': {
						color: colors.palette.primary
					},
					'& .date': {
						textAlign: smallerThanMd ? 'start' : 'center',
					},
					fontSize: {xs: '18px', sm: '20px'}
				}}>
				<img
					src={`/markdown/images/${article.mainImage}`}
					loading="lazy"
					width="auto"
					height="auto"
					alt={article.title}
					title={article.title}
				/>
				<Box sx={{
					maxWidth: '680px',
					paddingX: 2,
					paddingBottom: 4
				}}>
					<Grid container alignItems="start" columnSpacing={1} mt={2}>
						{article.tags.map(t => {
							return (
								<Grid key={t.text} item>
									<Chip
										label={t.text} sx={{
											color: colors.paper.primary,
											backgroundColor: t.color
										}} />
								</Grid>
							);
						})}
					</Grid>
					<MarkdownView
						markdown={markdownContent}
						options={{ tables: true, emoji: true }}
					/>
				</Box>
			</Paper>
			<UIButton
				title="Back"
				colorType="primary"
				variant="contained"
				backgroundColor="transparent"
				borderColor={colors.palette.primary}
				textColor={colors.palette.primary}
				onClick={() => {
					handleNavigation(-1, false);
				}}
				fontSize="14px"
				sx={{
					maxHeight: '41px',
					mt: 1
				}}
			>
			</UIButton>
		</>
	);
};
