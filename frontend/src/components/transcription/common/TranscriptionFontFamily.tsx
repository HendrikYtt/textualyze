import {Autocomplete, Grid, IconButton, InputAdornment, InputBase, Paper, TextField, Typography} from '@mui/material';
import * as React from 'react';
import {useRef, useState} from 'react';
import {useTranscriptionContext} from '../../../contexts/TranscriptionContext';
import {colors} from '../../../themes';
import {addNewFont, fontOptions} from '../../../const/transcription';
import {customFilter, displayError, displayInfo, displaySuccess, getPlanTypeIcon} from '../../../utils/utils';
import {lighten, styled} from '@mui/material/styles';
import {UIButton} from '../../ui/UIButton';
import {UIDialog} from '../../ui/UIDialog';
import {getPreSigneUserFontUrl, uploadFileToS3} from '../../../api/s3';
import {addUserFonts, deleteUserFont} from '../../../api/user-fonts';
import {defaultFontSelection, FontSelectionOption, useUserFonts} from '../../../contexts/UserFontsContext';
import {UIText} from '../../ui/UIText';
import {Field, FieldProps, Form, Formik, FormikErrors, FormikValues} from 'formik';
import {object, string} from 'yup';
import DeleteIcon from '@mui/icons-material/Delete';
import {UpgradeDialog} from '../../layout/UpgradeDialog';
import {useAuth} from '../../../contexts/UsersContext';
import CloseIcon from '@mui/icons-material/Close';
import {applyFont} from '../../../utils/transcription';
import {FieldError} from './FieldError';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

interface Props {
    title: string;
}

const GroupHeader = styled('div')(({ theme }) => ({
	position: 'sticky',
	top: '-8px',
	padding: '4px 10px',
	color: 'white',
	backgroundColor: theme.palette.primary.main,
	zIndex: 9999
}));

const GroupItems = styled('ul')({
	padding: 0,
});

interface Values {
	name: string;
}

const initialValues = {
	name: '',
};

const minLength = 1;
const maxLength = 30;
const validationSchema = object({
	name: string()
		.required('Font name is required')
		.min(minLength, `Font name must be at least ${minLength} characters`)
		.max(maxLength, `Font name must not exceed ${maxLength} characters`),
});

export const TranscriptionFontFamily: React.FC<Props> = ({
	title
}: Props) => {
	const {
		setRequestPayload,
		setIsFontSelectionOpen,
		shouldSkipUndoRedoFlow
	} = useTranscriptionContext();

	const {
		fetchUserFonts,
		userFonts,
		currentFontSelectionOption,
		setCurrentFontSelectionOption
	} = useUserFonts();

	const {user} = useAuth();

	const [isOpen, setIsOpen] = useState(false);

	const [isAddFontDialogOpen, setIsAddFontDialogOpen] = useState(false);
	const [isAddingNewFontLoading, setIsAddingNewFontLoading] = useState(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [isDeleteLoading, setIsDeleteLoading] = useState(false);
	const [currentlyUploadedFontName, setCurrentlyUploadedFontName] = useState<string | null>(null);
	const [fontIdToDelete, setFontIdToDelete] = useState(0);

	const [isUpgradeDialogOpen, setIsUpgradeDialogOpen] = useState(false);

	const currentlyUploadedFontFile = useRef<File |null>(null);

	const deleteFont = async () => {
		try {
			setIsDeleteLoading(true);
			await deleteUserFont(fontIdToDelete);
			setRequestPayload(prevState => {
				return {
					...prevState,
					fontType: defaultFontSelection.fontType,
					fontFileExtension: defaultFontSelection.fontFileExtension,
					s3FontLink: defaultFontSelection.s3FontLink,
					styling: {
						...prevState.styling,
						font_family: defaultFontSelection.label,
						s3_font_name: defaultFontSelection.s3FontName,
					},
				};
			});
			shouldSkipUndoRedoFlow.current = true;
			setIsDeleteDialogOpen(false);
			displayInfo('Font deleted');
			await fetchUserFonts();
			setCurrentFontSelectionOption(defaultFontSelection);
		} catch (e) {
			displayError(e);
		}
		setIsDeleteLoading(false);
	};

	const userOptions: FontSelectionOption[] = userFonts.map(font => {
		return {
			id: font.id,
			label: font.original_font_file_name,
			value: font.original_font_file_name,
			fontType: 'Your fonts',
			s3FontLink: font.s3_font_link,
			s3FontName: font.s3_font_name,
			fontFileExtension: font.file_extension
		};
	});

	const defaultOptions: FontSelectionOption[] = fontOptions.map((option) => {
		const isDefaultFont = option.value === addNewFont;
		return {
			id: 0,
			fontType: isDefaultFont ? 'Your fonts' : 'Default fonts',
			s3FontLink: '',
			s3FontName: option.label,
			fontFileExtension: 'ttf',
			...option
		};
	});

	const sortedOptions = [...defaultOptions, ...userOptions].sort((a, b) => {
		if (a.fontType === 'Default fonts' && b.fontType === 'Your fonts') {
			return 1;
		} else if (a.fontType === 'Your fonts' && b.fontType === 'Default fonts') {
			return -1;
		}
		return 0;
	});

	const fileInputRef = useRef(null);

	const validTypes = [
		'font/ttf',
		'font/otf',
		'application/font-woff',
		'font/woff2',
	];
	const validExtensions = ['ttf', 'otf', 'woff', 'woff2'];
	const errorMsg = 'Make sure provided font file has correct type and file extension';
	const validateFontFile = (file: File) => {
		const fileExtension = file.name.split('.').pop();
		if (fileExtension && validExtensions.includes(fileExtension)) {
			return true;
		}
		const fileType = file.type;
		if (!fileType) {
			displayError(new Error(errorMsg));
			return false;
		}
		if (!validTypes.includes(fileType)) {
			displayError(new Error(errorMsg));
			return false;
		}
		return true;
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleUpload = async (file: File, setFieldValue: (field: string, value: any, shouldValidate?: boolean) => Promise<void | FormikErrors<FormikValues>>) => {
		if (!validateFontFile(file)) {
			setCurrentlyUploadedFontName('');
			currentlyUploadedFontFile.current = null;
			setIsAddFontDialogOpen(false);
			return;
		}
		const fontFileName = file.name.split('.')[0];
		setCurrentlyUploadedFontName(fontFileName);
		currentlyUploadedFontFile.current = file;
		await setFieldValue('name', fontFileName);
	};

	const resetFontState = () => {
		setCurrentlyUploadedFontName('');
		currentlyUploadedFontFile.current = null;
		setIsAddingNewFontLoading(false);
		setIsAddFontDialogOpen(false);
	};

	const addNewFontFile = async (values: Values) => {
		try {
			if (!currentlyUploadedFontFile.current) {
				return;
			}
			const extension = currentlyUploadedFontFile.current?.name.split('.').pop() || 'ttf';
			const s3FontFileName = `font_${Date.now()}`;
			setIsAddingNewFontLoading(true);
			const resp = await getPreSigneUserFontUrl(s3FontFileName, 'putObject', extension);
			await uploadFileToS3(resp.preSignedUrl, currentlyUploadedFontFile.current);
			const originalFontFileName = values.name.split('.')[0];
			await addUserFonts([
				{
					s3_font_name: s3FontFileName,
					file_extension: currentlyUploadedFontFile.current?.name.split('.').pop() || 'ttf',
					original_font_file_name: originalFontFileName
				}
			]);
			setIsAddingNewFontLoading(false);
			const fetchedFonts = await fetchUserFonts();
			if (!fetchedFonts) {
				displayError('Could not fetch fonts');
				return;
			}
			const newlyAddedFontS3Link = fetchedFonts.find(font => font.s3_font_name = s3FontFileName)!.s3_font_link;
			const newFontPayload: Omit<FontSelectionOption, 'id'> = {
				fontType: 'Your fonts',
				s3FontLink: newlyAddedFontS3Link,
				s3FontName: s3FontFileName,
				value: originalFontFileName,
				label: originalFontFileName,
				fontFileExtension: extension
			};
			setRequestPayload((prevState) => ({
				...prevState,
				fontType: 'Your fonts',
				fontFileExtension: extension,
				s3FontLink: newFontPayload.s3FontLink,
				styling: {
					...prevState.styling,
					font_family: applyFont(newFontPayload).displayName,
					s3_font_name: s3FontFileName,
				},
			}));
		} catch (e) {
			displayError(e);
			resetFontState();
			return;
		}
		resetFontState();
		displaySuccess('Font added!');
	};

	return (
		currentFontSelectionOption && (
			<>
				<Grid item xs={12}>
					<Typography fontWeight="500" color={colors.darkGrey} fontSize="13px">
						{title}
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Autocomplete
						open={isOpen}
						options={sortedOptions}
						value={currentFontSelectionOption}
						onOpen={() => {
							setIsOpen(true);
							setIsFontSelectionOpen(true);
						}}
						onClose={() => {
							setIsOpen(false);
							setIsFontSelectionOpen(false);
						}}
						getOptionLabel={(option) => option.label}
						groupBy={(option) => option.fontType}
						isOptionEqualToValue={(option, value) => {
							return option.label === value.label;
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								InputProps={{
									...params.InputProps,
									style: { height: '40px', paddingRight: '0px' },
									endAdornment: (
										<InputAdornment position="end">
											<div style={{
												display: 'flex',
												alignItems: 'center',
												marginRight: '8px'
											}}>
												{isOpen ? (
													<KeyboardArrowUpOutlinedIcon sx={{color: colors.iconGrey}} />
												) : (
													<KeyboardArrowDownOutlinedIcon sx={{color: colors.iconGrey}} />
												)}
											</div>
										</InputAdornment>
									)
								}}
							/>
						)}
						renderOption={(props, option, value) => (
							<li {...props}
								key={option.s3FontName || option.label}
								style={{
									fontSize: '16px',
									fontFamily: option.fontType === 'Default fonts' ? option.label : applyFont(option as FontSelectionOption).fontFamily,
									backgroundColor: option.s3FontName === currentFontSelectionOption.s3FontName ? '#FDD4DD' : 'transparent',
									paddingLeft: option.label === addNewFont ? 0 : '16px',
									paddingRight: option.label === addNewFont ? 0 : '8px',
								}}
							>
								{option.label === addNewFont
									? (
										<UIButton
											title={addNewFont}
											colorType="secondary"
											textColor={colors.palette.primary}
											variant="text"
											onClick={(event) => {
												if (!user) {
													return;
												}
												event.stopPropagation();
												if (user.current_plan.plan_type !== 'PRO') {
													setIsUpgradeDialogOpen(true);
												} else {
													if (userFonts.length >= user.current_plan.user_font_limit) {
														displayInfo(`You have reached limit of ${user.current_plan.user_font_limit} fonts`);
														return;
													}
													setIsAddFontDialogOpen(true);
												}
											}}
											fontSize="14px"
											fullWidth
											disablePadding
											borderRadius="0px"
										>
											<div
												style={{
													marginBottom: '-5px',
													marginLeft: '3px'
												}}
											>
												{user?.current_plan.plan_type !== 'PRO' && getPlanTypeIcon('PRO', '28px')}
											</div>
										</UIButton>
									)
									: (
										<div style={{
											position: 'relative',
											display: 'flex',
											alignItems: 'center',
											width: '100%'
										}}>
											{option.label}
											{option.fontType === 'Your fonts' && (
												<IconButton
													onClick={(event) => {
														event.stopPropagation();
														setFontIdToDelete(option.id);
														setIsDeleteDialogOpen(true);
													}}
													style={{
														position: 'absolute',
														right: 0,
														top: 0,
														padding: 0,
														margin: 0
													}}
												>
													<DeleteIcon sx={{ color: colors.palette.primary }} />
												</IconButton>
											)}
										</div>
									)
								}
							</li>
						)}
						onChange={(_, option) => {
							setRequestPayload((prevState) => {
								return {
									...prevState,
									fontType: option.fontType,
									fontFileExtension: option.fontFileExtension,
									s3FontLink: option.s3FontLink,
									styling: {
										...prevState.styling,
										font_family: option.fontType === 'Default fonts' ? option.label : applyFont(option as FontSelectionOption).displayName,
										s3_font_name: option.s3FontName
									},
								};
							});
						}}
						disableClearable
						filterOptions={(options, { inputValue }) => {
							return options.filter(option => customFilter(inputValue, option));
						}}
						renderGroup={(params) => (
							<li key={params.key}>
								<GroupHeader>{params.group}</GroupHeader>
								<GroupItems>{params.children}</GroupItems>
							</li>
						)}
						sx={{
							height: '42px',
							width: '165px',
							'& .MuiOutlinedInput-root': {
								borderRadius: '4px',
								'& .MuiInputBase-input': {
									height: 'calc(100% - 20px)',
									fontSize: '16px'
								},
							},
							'& .MuiAutocomplete-endAdornment': {
								'& .MuiSvgIcon-root': {
									color: colors.grey,
								},
							},
						}}
					/>
				</Grid>

				<UIDialog
					open={isAddFontDialogOpen}
					title="Add new font"
					topRightElement={
						<IconButton
							aria-label="close"
							onClick={() => {
								setCurrentlyUploadedFontName('');
								currentlyUploadedFontFile.current = null;
								setIsAddFontDialogOpen(false);
							}}
							sx={{
								position: 'absolute',
								right: 14,
								top: 14,
								color: 'white',
								backgroundColor: colors.palette.primary,
								'&:hover': {
									backgroundColor: lighten(colors.palette.primary, 0.15),
								}
							}}
						>
							<CloseIcon />
						</IconButton>
					}
					content={
						<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={addNewFontFile}>
							{(formik) => {
								return (
									<Form>
										<div
											style={{
												display: 'flex',
												justifyContent: 'center',
												alignItems: 'center',
												flexDirection: 'column'
											}}
										>
											<UIButton
												title="Choose font file"
												colorType="primary"
												variant="text"
												textColor={colors.background}
												component={'label'}
												onClick={() => {}}
												underline
												fontSize="18px"
											>
												<input
													type="file"
													hidden
													multiple
													ref={fileInputRef}
													onChange={e => {
														const files = e.target.files;
														if (!files) {
															return;
														}
														handleUpload(files[0], formik.setFieldValue);
														e.target.value = '';
													}}
												/>
											</UIButton>
											{currentlyUploadedFontName && (
												<>
													<Grid container item alignItems="center" xs={12} height="70px">
														<Grid item xs={12}>
															<UIText
																variant="small"
																mb={1}
															>
																Font name
															</UIText>
														</Grid>
														<Paper
															elevation={0}
															sx={{
																p: '2px 4px',
																display: 'flex',
																alignItems: 'center',
																backgroundColor: colors.inputBgGrey,
																border: `1px solid ${(!formik.isValid && formik.touched.name) ? 'red' : colors.inputBorderGrey}`,
																height: '56px',
																width: '100%'
															}}
														>
															<Field name="name">
																{({ field, form, meta }: FieldProps) => (
																	<InputBase
																		{...field}
																		value={field.value}
																		onChange={(event) => {
																			field.onChange(event);
																			setCurrentlyUploadedFontName(event.target.value);
																		}}
																		sx={{
																			ml: 1,
																			flex: 1,
																			color: 'text.secondary',
																			'& .MuiInputBase-input::placeholder': {
																				fontSize: '14px',
																			},
																		}}
																		placeholder="Enter your new font name here"
																		error={meta.touched && !!meta.error}
																	/>
																)}
															</Field>

														</Paper>
													</Grid>
													<Grid container item xs={12} sx={{p: 0}}>
														<Field name="name">
															{({ meta }: FieldProps) => (
																meta.touched && meta.error && (
																	<FieldError
																		errorMessage={meta.error}
																		marginTop="0px"
																		marginBottom="-12px"
																	/>
																)
															)}
														</Field>
													</Grid>

												</>
											)}
											<Grid container item xs={12} justifyContent="end" mt={1}>
												{currentlyUploadedFontName && (
													<UIButton
														title="Add"
														colorType="primary"
														variant="contained"
														type="submit"
														onClick={() => {}}
														disabled={!formik.isValid && formik.touched.name}
														isLoading={isAddingNewFontLoading}
													/>
												)}
											</Grid>
										</div>
									</Form>
								);
							}}
						</Formik>
					}
				/>

				<UIDialog
					open={isDeleteDialogOpen}
					title="Are you sure you want to delete this font?"
					content={
						<>
						</>
					}
					actions={
						<Grid container item xs={12} justifyContent="end" mt={1}>
							<UIButton
								title="Cancel"
								colorType="primary"
								variant="text"
								onClick={() => setIsDeleteDialogOpen(false)}
								textColor={colors.font.secondary}
							/>
							<UIButton
								title="Delete"
								colorType="primary"
								variant="contained"
								type="submit"
								onClick={async () => {
									await deleteFont();
								}}
								isLoading={isDeleteLoading}
							/>
						</Grid>
					}
				/>

				<UpgradeDialog
					title="upload custom fonts"
					isUpgradeDialogOpen={isUpgradeDialogOpen}
					setIsUpgradeDialogOpen={setIsUpgradeDialogOpen}
				/>
			</>
		)
	);
};