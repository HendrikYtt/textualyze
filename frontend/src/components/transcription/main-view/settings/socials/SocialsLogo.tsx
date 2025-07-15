import {NewFeatureText} from '../../../common/NewFeatureText';
import {UIText} from '../../../../ui/UIText';
import {Box, Button, Grid, Switch, Typography} from '@mui/material';
import {colors} from '../../../../../themes';
import {TranscriptionStyleSlider} from '../../../common/TranscriptionStyleSlider';
import * as React from 'react';
import {useTranscriptionContext} from '../../../../../contexts/TranscriptionContext';
import {isSmallerThanSm} from '../../../../../hooks/is-compact';
import {UITextField} from '../../../../ui/UITextField';
import {UIButton} from '../../../../ui/UIButton';
import {displayError} from '../../../../../utils/utils';
import {
	getFileSizeInMB,
	getImageProperties
} from '../../../../../utils/file-media';
import {useAuth} from '../../../../../contexts/UsersContext';
import {getPreSigneUserUploadUrl, uploadFileToS3} from '../../../../../api/s3';

export const SocialsLogo = () => {
	const smallerThanSm = isSmallerThanSm();

	const {
		user
	} = useAuth();

	const {
		requestPayload,
		setRequestPayload
	} = useTranscriptionContext();

	const validateFileTypeAndResetState = async (uploadedFile: File) => {
		const supportedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

		if (!user) {
			displayError(new Error('User not found'));
			return;
		}

		if (!supportedImageTypes.includes(uploadedFile.type)) {
			displayError(new Error('Unsupported file type. Please upload an image.'));
			return;
		}
		const MAX_DIMENSION = 1024;
		const TARGET_PERCENTAGE = 0.2; // Watermark should occupy about 20% of video width
		const MIN_DIMENSION = 50; // Minimum size for visibility

		const properties = (await getImageProperties(uploadedFile)) as unknown as { width: number; height: number };
		console.log('Original watermark properties', properties);

		const { width: fileWidth, height: fileHeight } = properties;
		const aspectRatio = fileWidth / fileHeight;

		const targetRenderWidth = Math.round(requestPayload.adjustedWidth * TARGET_PERCENTAGE);
		const targetCompressedWidth = Math.round(requestPayload.compressedWidth * TARGET_PERCENTAGE);

		let renderWidth = Math.min(MAX_DIMENSION, Math.max(MIN_DIMENSION, targetRenderWidth));
		let renderHeight = Math.round(renderWidth / aspectRatio);

		let compressedWidth = Math.min(MAX_DIMENSION, Math.max(MIN_DIMENSION, targetCompressedWidth));
		let compressedHeight = Math.round(compressedWidth / aspectRatio);

		if (renderHeight > MAX_DIMENSION) {
			renderHeight = MAX_DIMENSION;
			compressedHeight = MAX_DIMENSION;

			renderWidth = Math.round(renderHeight * aspectRatio);
			compressedWidth = Math.round(compressedHeight * aspectRatio);
		} else if (renderHeight < MIN_DIMENSION) {
			renderHeight = MIN_DIMENSION;
			compressedHeight = MIN_DIMENSION;

			renderWidth = Math.round(renderHeight * aspectRatio);
			compressedWidth = Math.round(compressedWidth * aspectRatio);
		}

		console.log('Normalized watermark dimensions:', { renderWidth, renderHeight, compressedWidth, compressedHeight});
		const sizeMB = getFileSizeInMB(uploadedFile);
		if (sizeMB > 128) {
			displayError(new Error('Uploaded file must be smaller than 128MB'));
			return;
		}
		const extension = 'jpg';
		const contentType = 'image/jpeg';
		const s3ImageName = `${requestPayload.requestId}_watermark_image`;
		const resp = await getPreSigneUserUploadUrl(s3ImageName, 'putObject', extension, contentType, false);
		await uploadFileToS3(resp.preSignedUrl, uploadedFile);
		const getResp = await getPreSigneUserUploadUrl(s3ImageName, 'getObject', extension, contentType, false);
		setRequestPayload((prevState) => ({
			...prevState,
			logo: {
				...prevState.logo!,
				imageUrl: getResp.preSignedUrl,
				adjustedImageHeight: renderHeight,
				adjustedImageWidth: renderWidth,
				compressedImageHeight: compressedHeight,
				compressedImageWidth: compressedWidth
			}
		}));
	};

	return (
		<Grid container
			style={{
				width: '100%'
			}}
		>
			<Grid item xs={12}>
				<NewFeatureText
					featureText="New AI feature! Add logos to videos and generate smart brand descriptions."
				/>
			</Grid>
			<Grid item xs={12}>
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
						Logo
					</UIText>
					<Switch
						defaultChecked={requestPayload.logo !== null}
						onChange={(e) => {
							setRequestPayload(prevState => {
								const isLogoTurnedOn = prevState.logo !== null;
								if (isLogoTurnedOn) {
									return {
										...prevState,
										logo: null
									};
								} else {
									return {
										...prevState,
										logo: {
											logoType: 'text',
											opacity: 100,
											positionX: 5,
											positionY: 20,
											textSize: 4,
											imageUrl: null,
											imageScale: null,
											textContent: '',
											adjustedImageHeight: null,
											adjustedImageWidth: null,
											compressedImageHeight: null,
											compressedImageWidth: null
										}
									};
								}

							});
						}}
						sx={{
							'& .MuiSwitch-track': {
								backgroundColor: colors.inputBorderGrey,
							},
						}}
					/>
				</div>
			</Grid>

			{requestPayload.logo && (
				<Grid container>
					<Grid item xs={12} mt={1}>
						<Grid item xs={12}>
							<Typography color="black" fontWeight="700" noWrap fontSize="13px">
                                Type
							</Typography>
						</Grid>
						<Box sx={{flexWrap: 'nowrap', display: 'flex'}}>
							<Button
								variant={
									requestPayload.logo?.logoType === 'text'
										? 'contained'
										: 'outlined'
								}
								onClick={() =>
									setRequestPayload((prevState) => ({
										...prevState,
										logo: {
											...prevState.logo!,
											logoType: 'text'
										}
									}))
								}
								sx={{
									borderRadius: 0,
									borderTopLeftRadius: '5px',
									borderBottomLeftRadius: '5px',
									padding: 0,
									margin: 0,
									minWidth: 0,
									minHeight: 0
								}}
							>
								<Typography
									variant="body2"
									px="16px"
									py="10px"
								>
                                    Text
								</Typography>
							</Button>

							<Button
								variant={
									requestPayload.logo?.logoType === 'image'
										? 'contained'
										: 'outlined'
								}
								onClick={() =>
									setRequestPayload((prevState) => ({
										...prevState,
										logo: {
											...prevState.logo!,
											logoType: 'image'
										}
									}))
								}
								sx={{
									borderRadius: 0,
									borderTopRightRadius: '5px',
									borderBottomRightRadius: '5px',
									padding: 0,
									margin: 0,
									minWidth: 0,
									minHeight: 0,
								}}
							>
								<Typography
									variant="body2"
									px="15px"
									py="10px"
								>
                                    Image
								</Typography>
							</Button>
						</Box>

					</Grid>
					{requestPayload.logo.logoType === 'text' ? (
						<Grid item xs={6} mt={2}>
							<UITextField
								placeHolder="@Textualyze"
								value={requestPayload.logo.textContent}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
									setRequestPayload(prevState => ({
										...prevState,
										logo: {
											...prevState.logo!,
											textContent: event.target.value
										}
									}));
								}}
							/>
						</Grid>
					) : (
						<Grid item xs={12} mt={1}>
							<UIButton
								title={`${requestPayload.logo.imageUrl ? 'Replace' : 'Choose'} image`}
								colorType="primary"
								variant="text"
								textColor={colors.palette.primary}
								component={'label'}
								onClick={() => {}}
								underline
								fontSize="18px"
								disablePadding
								removeSpacing
								sx={{
									mb: 1
								}}
							>
								<input
									type="file"
									hidden
									accept="image/*"
									onChange={(e) => {
										const files = e.target.files;
										if (!files) {
											return;
										}
										validateFileTypeAndResetState(files[0]);
										e.target.value = '';
									}}
								/>
							</UIButton>
							{requestPayload.logo.imageUrl && (
								<Box mb={2} mt={1}
									 sx={{
										 backgroundColor: '#dbdbe8',
										 height: '100px',
										 width: '100px',
										 minWidth: '100px',
										 maxWidth: '100px',
										 display: 'flex',
										 alignItems: 'center',
										 justifyContent: 'center',
										 borderRadius: '4px',
										 position: 'relative'
									 }}
								>
									<img
										src={requestPayload.logo.imageUrl}
										alt="Uploaded logo"
										style={{ maxWidth: '100%', maxHeight: '100px' }}
									/>
								</Box>
							)}
						</Grid>
					)}
					{requestPayload.logo.logoType === 'text' ? (
						<Grid item xs={6} mt={2}>
						</Grid>
					) : (
						<Grid item mt={1}>
						</Grid>
					)}
					<Grid container spacing={1}>
						<Grid item >
							<TranscriptionStyleSlider
								title="Size"
								onChange={(value) => {
									setRequestPayload(prevState => {
										return {
											...prevState,
											logo: {
												...prevState.logo!,
												[requestPayload.logo?.logoType === 'text' ? 'textSize' : 'imageScale']: value
											}
										};
									});
								}}
								value={(requestPayload.logo?.logoType === 'text' ? requestPayload.logo.textSize : requestPayload.logo.imageScale) || 1}
								minValue={0.25}
								maxValue={4}
								step={0.25}
								unit={null}
								disabled={false}
								width={smallerThanSm ? 66 : 100}
								showSlider={true}
							/>
						</Grid>

						<Grid item >
							<TranscriptionStyleSlider
								title="Position X"
								onChange={(value) => {
									setRequestPayload(prevState => {
										return {
											...prevState,
											logo: {
												...prevState.logo!,
												positionX: value
											}
										};
									});
								}}
								value={requestPayload!.logo.positionX}
								minValue={0}
								maxValue={100}
								unit="%"
								disabled={false}
								width={smallerThanSm ? 66 : 100}
								showSlider={true}
							/>
						</Grid>

						<Grid item >
							<TranscriptionStyleSlider
								title="Position Y"
								onChange={(value) => {
									setRequestPayload(prevState => {
										return {
											...prevState,
											logo: {
												...prevState.logo!,
												positionY: value
											}
										};
									});
								}}
								value={requestPayload!.logo.positionY}
								minValue={0}
								maxValue={100}
								unit="%"
								disabled={false}
								width={smallerThanSm ? 66 : 100}
								showSlider={true}
							/>
						</Grid>

						<Grid item >
							<TranscriptionStyleSlider
								title="Opacity"
								onChange={(value) => {
									setRequestPayload(prevState => {
										return {
											...prevState,
											logo: {
												...prevState.logo!,
												opacity: value
											}
										};
									});
								}}
								value={(requestPayload.logo?.opacity) || 100}
								minValue={10}
								maxValue={100}
								unit="%"
								disabled={false}
								width={smallerThanSm ? 66 : 100}
								showSlider={true}
							/>
						</Grid>
					</Grid>

				</Grid>
			)}
		</Grid>
	);
};