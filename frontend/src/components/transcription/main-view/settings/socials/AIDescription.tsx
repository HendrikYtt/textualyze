import {UIText} from '../../../../ui/UIText';
import {Grid, Switch} from '@mui/material';
import {colors} from '../../../../../themes';
import * as React from 'react';
import {isSmallerThanSm} from '../../../../../hooks/is-compact';
import {useTranscriptionContext} from '../../../../../contexts/TranscriptionContext';
import {UIButton} from '../../../../ui/UIButton';
import {DescriptionLength, generateDescription} from '../../../../../api/worker';
import {convertToTXT} from '../../../../../utils/transcription';
import {useState} from 'react';
import {displayError, displaySuccess} from '../../../../../utils/utils';

export const AIDescription = () => {
	const smallerThanSm = isSmallerThanSm();

	const {
		requestPayload,
		setRequestPayload
	} = useTranscriptionContext();

	const [isGenerateLoading, setIsGenerateLoading] = useState(false);
	const [isGenerateShortLoading, setIsGenerateShortLoading] = useState(false);
	const [isGenerateLongLoading, setIsGenerateLongLoading] = useState(false);

	const handleGenerateDescription = async (descriptionLength: DescriptionLength) => {
		const transcriptText = convertToTXT(requestPayload.displayedTranscription, requestPayload.processingAction === 'Translate');
		if (descriptionLength === 'regular') {
			setIsGenerateLoading(true);
		} else if (descriptionLength === 'short') {
			setIsGenerateShortLoading(true);
		} else {
			setIsGenerateLongLoading(true);
		}
		const resp = await generateDescription(transcriptText, descriptionLength);
		if (descriptionLength === 'regular') {
			setIsGenerateLoading(false);
		} else if (descriptionLength === 'short') {
			setIsGenerateShortLoading(false);
		} else {
			setIsGenerateLongLoading(false);
		}
		setRequestPayload(prevState => {
			return {
				...prevState,
				aiDescription: resp.message
			};
		});
	};

	return (
		<Grid item xs={12} mt={2} sx={{
			paddingBottom: '70px'
		}}>
			<div
				style={{
					display: 'flex',
					width: '100%',
					justifyContent: 'space-between',
					marginTop: '4px'
				}}
			>
				<UIText
					variant="regular"
					component="h2"
					mb={smallerThanSm ? 0 : 1}
					mt="4px"
				>
                    AI description
				</UIText>
				<Switch
					defaultChecked={requestPayload.showAiDescription}
					onChange={(e) => {
						setRequestPayload(prevState => {
							return {
								...prevState,
								showAiDescription: !prevState.showAiDescription
							};
						});
					}}
					sx={{
						'& .MuiSwitch-track': {
							backgroundColor: colors.inputBorderGrey,
						},
					}}
				/>
			</div>
			{requestPayload.showAiDescription && (
				<>
					<Grid
						item
						xs={12}
						sx={{
							'& #description': {
								width: '100%',
								height: '150px',
								resize: 'vertical',
								backgroundColor: colors.inputBgGrey,
								borderColor: colors.inputBorderGrey,
								borderRadius: '4px',
								fontFamily: 'Plus Jakarta Sans, sans-serif',
								opacity: isGenerateLoading ? 0.7 : 1,
								cursor: isGenerateLoading ? 'not-allowed' : 'text',
								letterSpacing: '0.5px',
								fontSize: '16px',
								fontWeight: '400',
								paddingX: '8px',
								'&:focus': {
									border: `1px solid ${colors.background}`,
									outline: 'none',
								},
							}
						}}
					>
						<textarea
						  id="description"
						  rows={8}
						  value={requestPayload.aiDescription || ''}
						  disabled={isGenerateLoading}
						  onChange={(e) => {
							  setRequestPayload(prev => ({...prev, aiDescription: e.target.value}));
						  }}
						/>
					</Grid>
					<Grid container spacing={1}>
						<Grid item>
							<UIButton
								title={requestPayload.aiDescription ? 'Regenerate' : 'Generate'}
								colorType="primary"
								variant="contained"
								backgroundColor="transparent"
								borderColor={colors.palette.primary}
								textColor={colors.palette.primary}
								isLoading={isGenerateLoading}
								loadingSpinnerColor={colors.palette.primary}
								disabled={isGenerateShortLoading || isGenerateLongLoading}
								onClick={async () => {
									await handleGenerateDescription('regular');
								}}
								fontSize="14px"
							>
							</UIButton>
						</Grid>
						{requestPayload.aiDescription && (
							<Grid item>
								<UIButton
									title="Copy"
									colorType="primary"
									variant="contained"
									backgroundColor="transparent"
									borderColor={colors.palette.primary}
									textColor={colors.palette.primary}
									onClick={async () => {
										navigator.clipboard
											.writeText(requestPayload.aiDescription!)
											.then(() => displaySuccess('AI description copied to clipboard!'))
											.catch(() => displayError(new Error('Could not copy AI description to clipboard')));
									}}
									fontSize="14px"
								>
								</UIButton>
							</Grid>
						)}

						{requestPayload.aiDescription && (
							<Grid item>
								<UIButton
									title="Short version"
									colorType="primary"
									variant="contained"
									backgroundColor="transparent"
									borderColor={colors.palette.primary}
									textColor={colors.palette.primary}
									isLoading={isGenerateShortLoading}
									loadingSpinnerColor={colors.palette.primary}
									disabled={isGenerateLoading || isGenerateLongLoading}
									onClick={async () => {
										await handleGenerateDescription('short');
									}}
									fontSize="14px"
								>
								</UIButton>
							</Grid>
						)}
						{requestPayload.aiDescription && (
							<Grid item>
								<UIButton
									title="Long version"
									colorType="primary"
									variant="contained"
									backgroundColor="transparent"
									borderColor={colors.palette.primary}
									textColor={colors.palette.primary}
									isLoading={isGenerateLongLoading}
									loadingSpinnerColor={colors.palette.primary}
									disabled={isGenerateLoading || isGenerateShortLoading}
									onClick={async () => {
										await handleGenerateDescription('long');
									}}
									fontSize="14px"
								>
								</UIButton>
							</Grid>
						)}

					</Grid>
				</>
			)}
		</Grid>
	);
};