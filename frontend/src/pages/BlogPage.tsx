import {
	Card,
	CardActions,
	CardContent,
	Chip,
	Grid,
	InputAdornment,
	keyframes,
	Pagination,
	Stack,
	TextField,
	Typography
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {colors} from '../themes';
import {SEO} from '../components/SEO/SEO';
import {useHandleNavigation} from '../utils/utils';
import {Masonry} from '@mui/lab';
import './styles.css';
import {Article, Tag} from '../articles/articlesData';
import SearchIcon from '@mui/icons-material/Search';
import {isSmallerThanSm} from '../hooks/is-compact';
import {UIText} from '../components/ui/UIText';

interface Props {
	articles: Article[];
}

const itemsPerPage = 12;

const availableTags: Tag[] = [
	{
		text: 'Social Media',
		color: '#8A81F8'
	},
	{
		text: 'Content Creation',
		color: '#EEB525'
	},
	{
		text: 'Technology',
		color: '#42C3EC'
	}
];

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.9);
  }
`;

export const BlogPage: React.FC<Props> = ({ articles }) => {
	const handleNavigation = useHandleNavigation();

	const smallerThanSm = isSmallerThanSm();

	const [activeTags, setActiveTags] = useState<string[]>(availableTags.map(tag => tag.text));
	const [page, setPage] = useState(1);
	const currentArticles = articles.slice((page - 1) * itemsPerPage, page * itemsPerPage);
	const [displayedArticles, setDisplayedArticles] = useState<Article[]>(currentArticles);
	const [exitingArticles, setExitingArticles] = useState<string[]>([]);

	const totalPages = Math.ceil(articles.length / itemsPerPage);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [page]);

	useEffect(() => {
		filterArticles();
	}, [activeTags]);

	const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	const handleSearch = (searchTerm: string) => {
		const lowercasedTerm = searchTerm.toLowerCase();
		filterArticles(lowercasedTerm);
	};

	const filterArticles = (searchTerm: string = '') => {
		const lowercasedTerm = searchTerm.toLowerCase();
		const filtered = currentArticles.filter((article: Article) => {
			const tagsMatch = activeTags.length === 0 || article.tags.some(tag => activeTags.includes(tag.text));
			const titleMatch = article.title.toLowerCase().includes(lowercasedTerm);
			const descriptionMatch = article.description.toLowerCase().includes(lowercasedTerm);
			const dateMatch = article.date.toLowerCase().includes(lowercasedTerm);

			return tagsMatch && (titleMatch || descriptionMatch || dateMatch || lowercasedTerm === '');
		});
		const exitingPaths = displayedArticles
			.filter(article => !filtered.some(fArticle => fArticle.path === article.path))
			.map(article => article.path);

		setExitingArticles(exitingPaths);

		if (exitingPaths.length > 0) {
			setTimeout(() => {
				setDisplayedArticles(filtered);
				setExitingArticles([]);
			}, 200);
		} else {
			setDisplayedArticles(filtered);
		}
	};

	const countTagOccurrences = (tag: string) => {
		return articles.reduce((count, article) => {
			const hasTag = article.tags.some(articleTag => articleTag.text === tag);
			return count + (hasTag ? 1 : 0);
		}, 0);
	};

	const handleTagClick = (tag: string) => {
		setActiveTags(prevActiveTags => {
			if (prevActiveTags.includes(tag)) {
				return prevActiveTags.filter(t => t !== tag);
			} else {
				return [...prevActiveTags, tag];
			}
		});
	};

	return (
		<>
			<SEO path="/blog" />
			<Grid container justifyContent="center">
				<UIText variant="h1" sx={{color: 'white', textAlign: 'center', mb: '4px', lineHeight: '1.2'}}>
					Textualyze Blog
				</UIText>
			</Grid>
			<Grid container justifyContent="center">
				<Typography component="h2" variant="subtitle1" textAlign="center">
					Insights on Video Captions & Translating Media Content
				</Typography>
			</Grid>
			<Grid container justifyContent="center" pl={1} pr={smallerThanSm ? 1 : 5} mt={smallerThanSm ? 4 : 10}>
				<TextField
					variant="outlined"
					placeholder="Search"
					fullWidth
					onChange={(e) => handleSearch(e.target.value)}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon sx={{color: colors.grey, mr: '5px', mt: '3px'}} />
							</InputAdornment>
						),
					}}
					sx={{
						backgroundColor: 'transparent',
					}}
				/>
			</Grid>
			<Grid container spacing={1} px={1}>
				{availableTags.map(tag => {
					const isActive = activeTags.includes(tag.text);
					const tagCount = countTagOccurrences(tag.text);
					const labelText = `${tag.text} (${tagCount})`;

					return (
						<Grid key={tag.text} item>
							<Chip
								label={
									<React.Fragment>
										{labelText}
										{isActive && (
											<span style={{
												display: 'inline-block',
												fontWeight: 'bold',
												marginLeft: '4px',
												verticalAlign: 'middle'
											}}>
                  								X
											</span>
										)}
									</React.Fragment>
								}
								onClick={() => handleTagClick(tag.text)}
								sx={{
									color: colors.paper.primary,
									backgroundColor: isActive ? tag.color : 'grey',
									'&:hover': {
										backgroundColor: isActive ? tag.color : 'gray',
										color: colors.paper.primary,
									},
									'& .MuiTouchRipple-root': {
										display: 'none',
									},
									'&:focus': {
										outline: 'none',
									},
									'&:focus-visible': {
										outline: 'none',
									},
								}}
							/>
						</Grid>
					);
				})}
			</Grid>

			<Grid px={1} mt={3}>
				<Masonry spacing={smallerThanSm ? 0 : 4} columns={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
					{displayedArticles.map((article, ) => (
						<Grid item xs={12} sm={12} md={6} lg={4} key={article.path}>
							<Card
								sx={{
									backgroundColor: colors.paper.secondary,
									animation: exitingArticles.includes(article.path) ? `${fadeOut} 0.3s ease-out` : `${fadeIn} 0.3s ease-out`,
									borderRadius: '8px',
									mb: smallerThanSm ? 2 : 0
								}}
								component="article"
							>
								<img
									src={`/markdown/images/${article.mainImage}`}
									alt={article.title}
									onClick={() => {
										handleNavigation(article.path, false);
									}}
									loading="lazy"
									width="auto"
									height="auto"
									style={{
										display: 'block',
										backgroundSize: 'cover',
										backgroundRepeat: 'no-repeat',
										backgroundPosition: 'center',
										width: '100%',
										objectFit: 'cover',
										cursor: 'pointer',
									}}/>
								<CardContent>
									<Stack direction="row" spacing={1} my={2}>
										{article.tags.map(t => {
											return (
												<Chip
													key={t.text}
													label={t.text} sx={{
														color: colors.paper.primary,
														backgroundColor: t.color
													}} />
											);
										})}
									</Stack>

									<Typography
										fontWeight="800"
										variant="h5"
										component="h2"
										color="textSecondary"
										onClick={() => {
											handleNavigation(article.path, false);
										}}
										sx={{
											'&:hover': {
												cursor: 'pointer'
											},
										}}>
										{article.title}
									</Typography>
									<Typography variant="body1" component="p" color="textSecondary" mt={2}>
										{article.description}
									</Typography>
								</CardContent>
								<CardActions>
								</CardActions>
							</Card>
						</Grid>
					))}
				</Masonry>
			</Grid>
			{articles.length > itemsPerPage && (
				<Grid container justifyContent="center" style={{ marginTop: 20 }}>
					<Pagination
						count={totalPages}
						page={page}
						onChange={handlePageChange}
						color="primary"
					/>
				</Grid>
			)}
		</>
	);
};
