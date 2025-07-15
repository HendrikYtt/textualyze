import {IconButton, Menu, MenuItem, Typography} from '@mui/material';
import React, {useEffect, useRef, useState} from 'react';
import {isSmallerThanMd, isSmallerThanSm} from '../../../../hooks/is-compact';
import {useTranscriptionContext} from '../../../../contexts/TranscriptionContext';
import {tryoutUserId, useAuth} from '../../../../contexts/UsersContext';
import {listenToSocketEvent} from '../../../../api/sockets';
import {startEmbedding} from '../../../../api/embed-subtitles';
import {displayError, displaySuccess} from '../../../../utils/utils';
import {UIButton} from '../../../ui/UIButton';
import {
	handleAreYouSureYouWantToLeave,
	handleCopyTranscription,
	handleDownloadTranscription
} from '../../../../utils/transcription';
import {UIDialog} from '../../../ui/UIDialog';
import {constructProgressComponent} from '../../../../utils/tsx-utils';
import {colors} from '../../../../themes';
import {handleGAEvent} from '../../../../lib/google-analytics';
import {UpgradeDialog} from '../../../layout/UpgradeDialog';
import Grid from '@mui/material/Grid';
import {useMenu} from '../../../../hooks/use-menu';
import {ProgressMessage, RenderMessage} from '@hendrikytt/api-contracts/dist/sockets';
import {exportDropdownZIndex} from '../../../../const/ui';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import {getNotSignedUpUser} from '../../../../api/not-signed-up-users';
import {WhereDidYouHearFromUs} from '../../../WhereDidYouHearFromUs';
import {PaymentWall} from '../../../stripe/PaymentWall';

const hasExportedKey = 'hasExported';
export const TranscriptionExport = () => {
	const smallerThanSm = isSmallerThanSm();

	const {
		user,
		notSignedUpUser,
		setNotSignedUpUser
	} = useAuth();

	const {
		requestId,
		requestPayload,
		areRenderSocketsInitialized,
		adjustedFileData,
		willProgressBeLost
	} = useTranscriptionContext();

	const {
		handleMenuClose,
		handleMenuClick,
		anchorEl
	} = useMenu();

	const [isExportLoading, setIsExportLoading] = useState(false);

	const [isRenderDialogOpen, setIsRenderDialogOpen] = useState(false);
	const [isUpgradeDialogOpen, setIsUpgradeDialogOpen] = useState(false);
	const [isPaymentWallOpen, setIsPaymentWallOpen] = useState(false);
	const [renderPercentage, setRenderPercentage] = useState(0);

	const [isHasExportedKeySet, setIsHasExportedKeySet] = useState(false);

	const willProgressBeLostRef = useRef(willProgressBeLost);

	useEffect(() => {
		setIsHasExportedKeySet(!!localStorage.getItem(hasExportedKey));
	}, []);

	useEffect(() => {
		willProgressBeLostRef.current = willProgressBeLost;
	}, [willProgressBeLost]);

	useEffect(() => {
		if (renderPercentage >= 100 || !isRenderDialogOpen || renderPercentage === 0) {
			document.title = 'Textualyze';
			return;
		}
		document.title = `Textualyze - ${renderPercentage.toFixed(0)}% rendered`;
	}, [renderPercentage, isRenderDialogOpen]);

	useEffect(() => {
		if (!user || areRenderSocketsInitialized.current || !requestId) {
			return;
		}
		const userId = user.id.toString();
		listenToSocketEvent('render-progress', async (data) => {
			const message = data as unknown as ProgressMessage;
			setRenderPercentage(message.percentage);
		}, userId, requestId);
		listenToSocketEvent('render-ready', async (data) => {
			const renderMessage = data as unknown as RenderMessage;
			setIsRenderDialogOpen(false);
			displaySuccess('Video rendered!');
			downloadFile(renderMessage.renderUrl);
		}, userId, requestId);
		listenToSocketEvent('render-failed', async () => {
			setIsRenderDialogOpen(false);
			displayError(new Error('Rendering failed'));
		}, userId, requestId);
		areRenderSocketsInitialized.current = true;
	}, [user, requestId, areRenderSocketsInitialized.current]);

	// in this function I manually remove and add event listener, because React state change doesn't change fast enough
	const downloadFile = (url: string) => {
		window.removeEventListener('beforeunload', handleAreYouSureYouWantToLeave);
		const anchor = document.createElement('a');
		anchor.href = url;
		document.body.appendChild(anchor);
		anchor.click();
		document.body.removeChild(anchor);
		if (willProgressBeLostRef.current) {
			window.addEventListener('beforeunload', handleAreYouSureYouWantToLeave);
		}
	};

	const isUpgradeLimitReached = () => {
		if (
			(
				user?.current_plan.plan_type === 'FREE' &&
				currentTranscription &&
				currentTranscription?.export_count > 0
			) || (user?.current_plan.id === 6 && isHasExportedKeySet) || notSignedUpUser?.has_exported
		) {
			return true;
		}
		return false;
	};

	const submitRequest = async () => {
		if (!requestId) {
			return;
		}
		if (isUpgradeLimitReached()) {
			if (user?.id === tryoutUserId || user?.current_plan.plan_type === 'FREE') {
				setIsPaymentWallOpen(true);
				return;
			}
			setIsUpgradeDialogOpen(true);
			return;
		}
		setIsExportLoading(true);
		setRenderPercentage(0);
		try {
			setIsRenderDialogOpen(true);
			if (user?.id === tryoutUserId) {
				localStorage.setItem(hasExportedKey, 'true');
				setNotSignedUpUser(await getNotSignedUpUser());
			}
			setIsHasExportedKeySet(true);
			await startEmbedding(requestPayload, adjustedFileData.name);
		} catch (e) {
			setIsExportLoading(false);
			displayError(e);
			setIsRenderDialogOpen(false);
			return;
		}
		setIsExportLoading(false);
	};

	const currentTranscription = user?.transcriptions.find(t => t.request_id === requestId);

	const showHearFromUs =
		(user && user.id !== tryoutUserId && !user.hear_from_us) ||
		(notSignedUpUser && !notSignedUpUser.hear_from_us);

	return (
		<>
			<UIButton
				title="Export"
				colorType="primary"
				variant="contained"
				disabled={isExportLoading}
				onClick={handleMenuClick}
				fontSize={smallerThanSm ? '13px' : '18px'}
				removeSpacing
				sx={{
					py: 1,
					px: 3
				}}
				isFlaming={true}
			>
				<KeyboardArrowDownOutlinedIcon sx={{mr: '-10px'}} />
			</UIButton>
			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleMenuClose}
				sx={{
					zIndex: exportDropdownZIndex
				}}
			>
				<MenuItem onClick={async () => {
					handleMenuClose();
					await submitRequest();
				}}>
					<Typography fontWeight="500" variant="body1" sx={{ color: 'black', letterSpacing: '1px' }}>
						Video
						{user && currentTranscription && (!notSignedUpUser || !notSignedUpUser?.has_exported && !isHasExportedKeySet) && (
							<span style={{ fontSize: '0.75em', marginLeft: '6px'}}>
								{` Limit: ${user?.current_plan.export_count_limit}/${user.current_plan.export_count_limit - currentTranscription.export_count}`}
							</span>
						)}
						{user?.id === tryoutUserId && (notSignedUpUser?.has_exported || isHasExportedKeySet) && (
							<span style={{ fontSize: '0.75em', marginLeft: '6px'}}>
								{' Limit: 0/0'}
							</span>
						)}
					</Typography>

				</MenuItem>
				<MenuItem onClick={() => {
					handleMenuClose();
					handleDownloadTranscription(requestPayload, 'TXT', adjustedFileData.name);
				}}>
					<Typography fontWeight="500" variant="body1" sx={{ color: 'black', letterSpacing: '1px' }}>
						Text
					</Typography>
				</MenuItem>
				<MenuItem onClick={() => {
					handleMenuClose();
					handleDownloadTranscription(requestPayload, 'SRT', adjustedFileData.name);
				}}>
					<Typography fontWeight="500" variant="body1" sx={{ color: 'black', letterSpacing: '1px' }}>
						.srt
					</Typography>
				</MenuItem>
				<MenuItem onClick={() => {
					handleMenuClose();
					handleDownloadTranscription(requestPayload, 'VTT', adjustedFileData.name);
				}}>
					<Typography fontWeight="500" variant="body1" sx={{ color: 'black', letterSpacing: '1px' }}>
						.vtt
					</Typography>
				</MenuItem>
				<MenuItem onClick={() => {
					handleMenuClose();
					handleCopyTranscription(requestPayload.displayedTranscription);
				}}>
					<Typography fontWeight="500" variant="body1" sx={{ color: 'black', letterSpacing: '1px' }}>
						Copy to clipboard
					</Typography>
				</MenuItem>
			</Menu>

			{/*Render media file*/}
			<UIDialog
				open={isRenderDialogOpen}
				title="Rendering video"
				content={
					<>
						{showHearFromUs && (
							<div
								style={{
									marginTop: '-16px',
									marginBottom: '16px'
								}}
							>
								<WhereDidYouHearFromUs />
							</div>
						)}
						{constructProgressComponent(renderPercentage, colors.font.secondary)}
					</>
				}
				actions={
					<Grid container justifyContent="center">
						<UIButton
							title="Transcribe another"
							colorType="primary"
							variant="contained"
							onClick={() => {
								window.open('/transcribe', '_blank');
								handleGAEvent('Transcribe-another');
							}}
						/>
					</Grid>
				}
			/>

			{/*You can export only once dialog*/}
			<UpgradeDialog
				title="export more"
				isUpgradeDialogOpen={isUpgradeDialogOpen}
				setIsUpgradeDialogOpen={setIsUpgradeDialogOpen}
			/>

			{isPaymentWallOpen && (
				<PaymentWall
					isPaymentWallOpen={isPaymentWallOpen}
					setIsPaymentWallOpen={setIsPaymentWallOpen}
				/>
			)}
		</>
	);
};