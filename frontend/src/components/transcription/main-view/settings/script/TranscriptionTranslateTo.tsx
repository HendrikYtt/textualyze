import {Autocomplete, Grid, InputAdornment, LinearProgress, Switch, TextField, Typography} from '@mui/material';
import {colors} from '../../../../../themes';
import {
	defaultTranslateOption,
	defaultValue, SelectedTranslateOption,
	useTranscriptionContext
} from '../../../../../contexts/TranscriptionContext';
import LanguageIcon from '@mui/icons-material/Language';
import {customFilter, displayError, displaySuccess, getPlanTypeIcon} from '../../../../../utils/utils';
import React, {useEffect, useState} from 'react';
import {useAuth} from '../../../../../contexts/UsersContext';
import {convertToSegmentedArrayWithMaxWords, ProcessingAction, TranslateRequest} from '@hendrikytt/api-contracts';
import {translateText} from '../../../../../api/translate';
import {UIDialog} from '../../../../ui/UIDialog';
import {UpgradeDialog} from '../../../../layout/UpgradeDialog';
import {isSmallerThanMd, isSmallerThanSm} from '../../../../../hooks/is-compact';
import {WordsPerLineSlider} from './WordsPerLineSlider';
import {targetLanguageOptions} from '@hendrikytt/api-contracts/dist/language';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import {UIButton} from '../../../../ui/UIButton';
import {isEqual} from 'lodash';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import {useUserProjects} from '../../../../../contexts/UserProjectsContext';

export const TranscriptionTranslateTo = () => {
	
	const {
		requestPayload,
		setRequestPayload,
		unTouchedTranscription,
		requestId,
		maxWordsPerSegment,
		setIsSelectTranslateOpen,
		isSelectTranslateOpen,
		setMaxWordsPerSegment,
		longestSegmentLength
	} = useTranscriptionContext();

	const {
		currentUserProject,
		setCurrentUserProject
	} = useUserProjects();

	const smallerThanSm = isSmallerThanSm();
	const smallerThanMd = isSmallerThanMd();

	const {user} = useAuth();

	const [isTranslatingDialogOpen, setIsTranslatingDialogOpen] = useState(false);
	const [isUpgradeDialogOpen, setIsUpgradeDialogOpen] = useState(false);
	const [translateCountLeft, setTranslateCountLeft] = useState<number>(user?.current_plan.translate_count_limit || 0);
	const [selectedTranslateOption, setSelectedTranslateOption] = useState<SelectedTranslateOption>(defaultTranslateOption);

	useEffect(() => {
		if (user) {
			setTranslateCountLeft(user.current_plan.translate_count_limit);
		}
	}, [user?.current_plan.translate_count_limit]);

	useEffect(() => {
		const option = targetLanguageOptions.find(t => t.value.toLocaleLowerCase() === requestPayload.targetLanguage) || defaultTranslateOption;
		setSelectedTranslateOption(option);
	}, [requestPayload.targetLanguage]);

	const handleTranslateText = async (option: string, processingAction: ProcessingAction, targetLanguage: null | string) => {
		if (!requestId) {
			return;
		}
		try {
			setIsTranslatingDialogOpen(true);
			const originalSegments = convertToSegmentedArrayWithMaxWords(unTouchedTranscription, requestPayload.displayedTranscription, maxWordsPerSegment);
			const textToTranslate = originalSegments.map((segment, index) => {
				return segment.words.map(w => w.word).join(' ');
			}).join('\n');
			const payload: TranslateRequest = {
				requestId: requestId,
				text: textToTranslate,
				sourceLanguage: requestPayload.language,
				targetLanguage: option
			};
			const data = await translateText(payload);
			setTranslateCountLeft(prevState => {
				return prevState - 1;
			});
			const translatedText = data.text.split('\n');
			setRequestPayload(prevState => ({
				...prevState,
				displayedTranscription: originalSegments.map((segment, index) => {
					return {
						...segment,
						translatedText: translatedText[index]
					};
				}),
				processingAction: processingAction,
				targetLanguage: targetLanguage
			}));
			displaySuccess('Translation is ready!');
			setIsTranslatingDialogOpen(false);
		} catch (e) {
			displayError(e);
			setIsTranslatingDialogOpen(false);
		}
	};

	const getMarginBottom = () => {
		if (smallerThanMd && requestPayload.processingAction === 'Translate') {
			return '8px';
		} else if (smallerThanMd && requestPayload.processingAction === 'Transcribe') {
			return '-16px';
		} else {
			return '-12px';
		}
	};

	return (
		<>
			<Grid
				container
				item
				columnSpacing={1}
				alignItems={smallerThanMd ? 'start' : 'center'}
			  	sx={{
					px: smallerThanMd ? 2 : 3,
					mt: smallerThanMd ? '4px' : '0px',
					mb: getMarginBottom()
			  	}}
			>
				<Grid item xs={smallerThanMd ? 8 : 5.5}>
					<Typography fontWeight="400" color="black" fontSize="13px">
						Translate to
					</Typography>
					<Autocomplete
						open={isSelectTranslateOpen}
						size="small"
						options={[defaultTranslateOption, ...targetLanguageOptions]}
						value={selectedTranslateOption}
						onOpen={() => {
							setIsSelectTranslateOpen(true);
						}}
						onClose={() => {
							setIsSelectTranslateOpen(false);
						}}
						getOptionLabel={(option) => option.label}
						renderInput={(params) => (
							<TextField
								{...params}
								InputProps={{
									...params.InputProps,
									style: {paddingRight: '0px', borderColor: colors.inputBorderGrey, backgroundColor: colors.inputBgGrey, color: colors.iconGrey},
									startAdornment: (
										<InputAdornment position="start">
											{selectedTranslateOption.value.startsWith(defaultValue)
												? (
													<LanguageIcon sx={{color: colors.grey, marginLeft: '5px', marginRight: '-5px'}} />
												)
												: (<span className={`fi fi-${selectedTranslateOption.countryCode}`} style={{marginTop: '3px', marginLeft: '8px'}}></span>)
											}
										</InputAdornment>
									),
									endAdornment: (
										<InputAdornment position="end">
											<div style={{
												display: 'flex',
												alignItems: 'center',
												marginRight: '8px'
											}}>
												{isSelectTranslateOpen ? (
													<>
														<KeyboardArrowUpOutlinedIcon sx={{color: colors.iconGrey}} />
														{user?.current_plan.plan_type !== 'PRO' && getPlanTypeIcon('PRO', '28px')}
													</>

												) : (
													<>
														<KeyboardArrowDownOutlinedIcon sx={{color: colors.iconGrey}} />
														{user?.current_plan.plan_type !== 'PRO' && getPlanTypeIcon('PRO', '28px')}
													</>
												)}
											</div>
										</InputAdornment>
									)
								}}
								sx={{
									'& .MuiInputBase-input': {
										fontSize: '16px',
										color: selectedTranslateOption.value.startsWith(defaultValue) ? colors.grey : 'black'
									},
									'& .MuiOutlinedInput-root': {
										backgroundColor: '#F4F4F4',
										height: '40px',
										padding: 1,
										'& > fieldset': {
											margin: 0
										}
									},
									'& .MuiInputLabel-root.Mui-focused': {
										color: colors.palette.secondary
									},
								}}
							/>
						)}
						renderOption={(props, option) => (
							<li {...props}>
								{option.value.startsWith(defaultValue) ? (
									<LanguageIcon sx={{color: colors.grey, marginLeft: '3px', marginRight: '10px'}} />
								) : (
									<span className={`fi fi-${option.countryCode}`} style={{
										height: '20px',
										width: '30px',
										marginRight: '10px',
									}}></span>
								)}
								{option.label}
							</li>
						)}
						onChange={async (_, option) => {
							if ((user?.current_plan.plan_type !== 'PRO' && option !== defaultTranslateOption) || translateCountLeft === 0) {
								setIsUpgradeDialogOpen(true);
								return;
							}
							const isDefaultOptionSelected = option === defaultTranslateOption;
							const processingAction: ProcessingAction = isDefaultOptionSelected ? 'Transcribe' : 'Translate';
							const targetLanguage = isDefaultOptionSelected ? null : option.value.toLocaleLowerCase();
							if (targetLanguage) {
								await handleTranslateText(option.value, processingAction, targetLanguage);
							} else {
								setRequestPayload(prevState => ({
									...prevState,
									processingAction: processingAction,
									targetLanguage: targetLanguage
								}));
							}
						}}
						disablePortal
						disableClearable
						filterOptions={(options, { inputValue }) => {
							return options.filter(option => customFilter(inputValue, option));
						}}
						sx={{
							height: smallerThanSm ? '34px' : '56px',
							'& .MuiAutocomplete-endAdornment': {
								'& .MuiSvgIcon-root': {
									color: colors.grey,
								},
							}
						}}
					/>
				</Grid>
				{requestPayload.processingAction === 'Transcribe' && (
					<Grid item xs={smallerThanMd ? 4 : 2.5}>
						<WordsPerLineSlider
							title="Words per line"
							value={maxWordsPerSegment}
							onChange={(value) => {
								setMaxWordsPerSegment(value as number);
							}}
							minValue={1}
							maxValue={longestSegmentLength.current}
							disabled={requestPayload.displayedTranscription.length === 0}
						/>
					</Grid>
				)}
				{!smallerThanMd && (
					<Grid justifyContent="start" item ml="-8px" mt="-14px">
						<div
							style={{
								justifyContent: 'start',
								alignItems: 'center',
								display: 'flex',
								flexDirection: 'column'
							}}
						>
							<Typography fontWeight="400" color="black" fontSize="13px">
								Scroll
							</Typography>
							<Switch
								defaultChecked={currentUserProject?.auto_scroll_script || true}
								onChange={(e) => {
									// if (currentUserProject) {
									setCurrentUserProject(prevState => {
										return {
											...prevState!,
											auto_scroll_script: !prevState?.auto_scroll_script
										};
									});
									// }
								}}
								sx={{
									'& .MuiSwitch-track': {
										backgroundColor: colors.inputBorderGrey,
									},
								}}
							/>
						</div>

					</Grid>
				)}

			</Grid>
			<UIDialog
				open={isTranslatingDialogOpen}
				title={`Translating to ${selectedTranslateOption.label}`}
				content={<LinearProgress/>}
				actions={
					<></>
				}
			/>

			<UpgradeDialog
				title="translate text"
				isUpgradeDialogOpen={isUpgradeDialogOpen}
				setIsUpgradeDialogOpen={setIsUpgradeDialogOpen}
			/>
		</>
	);
};