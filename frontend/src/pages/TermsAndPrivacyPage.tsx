import * as React from 'react';
import Container from '@mui/material/Container';
import {
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControlLabel,
	Grid, IconButton,
	Paper,
	Typography
} from '@mui/material';
import {SEO} from '../components/SEO/SEO';
import {useEffect, useState} from 'react';
import MarkdownView from 'react-showdown';
import {colors, theme} from '../themes';
import Box from '@mui/material/Box';
import {useAuth} from '../contexts/UsersContext';
import CloseIcon from '@mui/icons-material/Close';

export default function TermsAndPrivacyPage() {
	const {
		acceptCookies,
		rejectCookies,
		areCookiesEnabled
	} = useAuth();

	const [isCookieDialogOpen, setIsCookieDialogOpen] = useState(false);
	const [markdownContent, setMarkdownContent] = useState('');

	useEffect(() => {
		const mdFilePath = '/markdown/terms-and-privacy/terms-and-privacy.md';

		fetch(mdFilePath)
			.then(response => response.text())
			.then(text => setMarkdownContent(text))
			.catch(err => console.error('Failed to load markdown file', err));
	}, []);

	return (
		<>
			<SEO path="/terms-and-privacy" />
			<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
				<Paper
					sx={{
						paddingX: 4,
						paddingY: 4,
						mx: 'auto',
						mt: 5,
						borderRadius: '8px',
						boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
						color: colors.font.secondary,
						'& h1': {
							textAlign: 'center'
						},
						'& h2': {
							textAlign: 'center'
						},
						'& a': {
							textDecoration: 'none',
							color: colors.palette.secondary,
						},
					}}>

					<MarkdownView
						markdown={markdownContent}
						options={{ tables: true, emoji: true }}
					/>
					<Box>
						<Typography
							sx={{
								textAlign: 'center',
								textDecoration: 'underline',
								cursor: 'pointer'
							}}
							onClick={() => setIsCookieDialogOpen(true)}
						>
							Cookie preferences
						</Typography>
					</Box>

				</Paper>
			</Container>
			<Dialog
				open={isCookieDialogOpen}
				fullWidth
				aria-labelledby='dialog-title'
				aria-describedby='dialog-description'
			>
				<IconButton
					onClick={() => setIsCookieDialogOpen(false)}
					style={{
						position: 'absolute',
						top: 0,
						right: 0,
					}}
				>
					<CloseIcon sx={{color: 'white', fontSize: '12px'}} />
				</IconButton>
				<DialogTitle id='dialog-title' sx={{
					color: theme.palette.text.primary
				}}>
					Cookie preferences
				</DialogTitle>
				<DialogContent>
					<Grid container spacing={2} direction="row" alignItems="center">
						<Grid item>
							<Typography variant="body2" component="div">
								We use cookies to provide you the best user experience. You can change your preferences any time you want.
							</Typography>
						</Grid>
						<Grid item>
							<FormControlLabel
								label={
									<Typography variant="body2">
										I consent to the use of performance cookies on this website for enhanced functionality and user experience.
									</Typography>
								}
								control={
									<Checkbox
										checked={areCookiesEnabled}
										onChange={(event, checked) => {
											if (checked) {
												acceptCookies();
											} else {
												rejectCookies();
											}
										}}
									/>
								}
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => {
							setIsCookieDialogOpen(false);
						}}
						sx={{
							color: theme.palette.text.primary
						}}>Save</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
