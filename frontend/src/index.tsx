import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {initializeConfig} from './api/config';
import 'hacktimer/HackTimer.js';
import {theme} from './themes';
import {CssBaseline, ThemeProvider} from '@mui/material';
import {SnackbarProvider} from 'notistack';
import {GoogleOAuthProvider} from '@react-oauth/google';
import {AuthProvider} from './contexts/UsersContext';
import {PlansProvider} from './contexts/PlansContext';
import {TranscriptionContextProvider} from './contexts/TranscriptionContext';
import {HelmetProvider} from 'react-helmet-async';
import {DialogProvider} from './contexts/DialogContext';
import { UserTemplatesProvider } from './contexts/UserTemplatesContext';
import { UserProjectsProvider } from './contexts/UserProjectsContext';
import {UserFontsProvider} from './contexts/UserFontsContext';
import { TrimAndCropContextProvider } from './contexts/TrimAndCropContext';

initializeConfig();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
	<HelmetProvider>
		<GoogleOAuthProvider clientId="608962363523-jitk48o6lg1j5r013au00su00jppplap.apps.googleusercontent.com">
			{/*<React.StrictMode>*/}
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<AuthProvider>
					<DialogProvider>
						<TranscriptionContextProvider>
							<PlansProvider>
								<UserTemplatesProvider>
									<UserProjectsProvider>
										<UserFontsProvider>
											<TrimAndCropContextProvider>
												<SnackbarProvider maxSnack={3} classes={{containerRoot: 'z-alert'}}>
													<App/>
												</SnackbarProvider>
											</TrimAndCropContextProvider>
										</UserFontsProvider>
									</UserProjectsProvider>
								</UserTemplatesProvider>
							</PlansProvider>
						</TranscriptionContextProvider>
					</DialogProvider>
				</AuthProvider>
			</ThemeProvider>
			{/*</React.StrictMode>*/}
		</GoogleOAuthProvider>
	</HelmetProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
