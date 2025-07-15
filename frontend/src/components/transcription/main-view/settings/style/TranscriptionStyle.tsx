import {Box, Grid, IconButton, InputBase, Paper, Stack} from '@mui/material';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {useTranscriptionContext} from '../../../../../contexts/TranscriptionContext';
import {isSmallerThanMd} from '../../../../../hooks/is-compact';
import '../../styles.css';
import {TranscriptionStyleTabButton} from '../../../common/TranscriptionStyleTabButton';
import {TranscriptionStyleTemplates} from './TranscriptionStyleTemplates';
import {TranscriptionStyleCustomize} from './TranscriptionStyleCustomize';
import {TranscriptionStyleEffects} from './TranscriptionStyleEffects';
import {useUserTemplates} from '../../../../../contexts/UserTemplatesContext';
import {UpgradeDialog} from '../../../../layout/UpgradeDialog';
import {useAuth} from '../../../../../contexts/UsersContext';
import {displayError, displayInfo, displaySuccess} from '../../../../../utils/utils';
import {addUserTemplate} from '../../../../../api/user-templates';
import {UIButton} from '../../../../ui/UIButton';
import {UIDialog} from '../../../../ui/UIDialog';
import {colors} from '../../../../../themes';
import {Field, FieldProps, Form, Formik} from 'formik';
import {object, string} from 'yup';
import {HttpError} from '../../../../../api/config';
import {UIText} from '../../../../ui/UIText';
import {UserTemplateAutocomplete} from './UserTemplateAutocomplete';
import {lighten} from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { omit } from 'lodash';
import {FieldError} from '../../../common/FieldError';

interface Values {
	name: string;
}

const initialValues = {
	name: '',
};

const minLength = 1;
const maxLength = 50;
const validationSchema = object({
	name: string()
		.required('Template name is required')
		.min(minLength, `Template name must be at least ${minLength} characters`)
		.max(maxLength, `Template name must not exceed ${maxLength} characters`),
});

export const TranscriptionStyle = () => {
	const smallerThanMd = isSmallerThanMd();

	const {user} = useAuth();

	const {
		currentStyleTab,
		requestPayload,
		setRequestPayload
	} = useTranscriptionContext();

	const {
		userTemplates,
		fetchUserTemplates,
		fetchInitialUserTemplates,
		isUserTemplatesFreeDialogOpen,
		setIsUserTemplatesFreeDialogOpen,
		isUserTemplatesBasicDialogOpen,
		setIsUserTemplatesBasicDialogOpen,
		shouldValidateUserTemplatesCreation,
		setShouldValidateUserTemplatesCreation,
		isAddNewUserTemplateDialogOpen,
		setIsAddNewUserTemplateDialogOpen
	} = useUserTemplates();

	useEffect(() => {
		fetchInitialUserTemplates();
	}, []);

	const [isAddingUserTemplateLoading, setIsAddingUserTemplateLoading] = useState(false);

	const addNewUserTemplate = async (values: Values) => {
		try {
			setIsAddingUserTemplateLoading(true);
			const newTemplate = await addUserTemplate(values.name, omit(requestPayload.styling, 'id', 'displayFontColor', 'displayBackgroundColor'));
			displaySuccess('Template added successfully!');
			setRequestPayload(prevState => {
				return {
					...prevState,
					styling: {
						...prevState.styling,
						...omit(newTemplate, 'user_id', 'created_at', 'updated_at')
					}
				};
			});
			await fetchUserTemplates();
		} catch (e) {
			displayError(e);
			if ((e as HttpError).body.message === 'This template name already exists') {
				setIsAddingUserTemplateLoading(false);
				return;
			}
		}
		setIsAddNewUserTemplateDialogOpen(false);
		setIsAddingUserTemplateLoading(false);
	};

	const validateUserTemplateCreation = async () => {
		if (user?.current_plan.plan_type === 'FREE') {
			setIsUserTemplatesFreeDialogOpen(true);
		} else if (user?.current_plan.plan_type === 'BASIC' && userTemplates.length === user.current_plan.user_templates_count_limit) {
			setIsUserTemplatesBasicDialogOpen(true);
		} else if (user?.current_plan.plan_type === 'PRO' && userTemplates.length === user.current_plan.user_templates_count_limit) {
			displayInfo('You have reached your template limit, remove some to add new ones');
		} else {
			setIsAddNewUserTemplateDialogOpen(true);
		}
		setShouldValidateUserTemplatesCreation(false);
	};

	useEffect(() => {
		if (shouldValidateUserTemplatesCreation) {
			validateUserTemplateCreation();
		}
	}, [shouldValidateUserTemplatesCreation]);

	return (
		<>
			<Box sx={{height: '100%', width: '100%'}}>
				<Stack justifyContent="start" flexDirection="row" pl={smallerThanMd ? 1 : 2} columnGap={1} sx={{height: '34px', borderBottom: '2px solid #ACA8CA'}} mb={smallerThanMd ? 0 : 2}>
					{requestPayload.styling.template_type !== 'Ali' && (
						<div
							style={{marginTop: smallerThanMd ? '-1px' : '-4px'}}
						>
							<TranscriptionStyleTabButton
								styleTab="Enhance"
							/>
						</div>
					)}
					<div
						style={{marginTop: smallerThanMd ? '-1px' : '-4px'}}
					>
						<TranscriptionStyleTabButton
							styleTab="Templates"
						/>
					</div>
					<div
						style={{marginTop: smallerThanMd ? '-1px' : '-4px'}}
					>
						<TranscriptionStyleTabButton
							styleTab="Customize"
						/>
					</div>
				</Stack>

				<div style={{ maxHeight: `calc(100% - ${smallerThanMd ? 0 : 155}px)`, overflowY: 'auto', paddingBottom: '10px', width: '100%'}}>
					<Grid container px={smallerThanMd ? 1 : 3} pb={smallerThanMd ? 4 : 0} sx={{width: '100%'}}>
						{currentStyleTab === 'Enhance' && (
							<TranscriptionStyleEffects />
						)}
						{currentStyleTab === 'Templates' && (
							<TranscriptionStyleTemplates />
						)}
						{currentStyleTab === 'Customize' && (
							<TranscriptionStyleCustomize />
						)}
					</Grid>
				</div>
			</Box>

			<UIDialog
				open={isAddNewUserTemplateDialogOpen}
				title="Add new template"
				zIndex={1200}
				topRightElement={
					<IconButton
						aria-label="close"
						onClick={() => setIsAddNewUserTemplateDialogOpen(false)}
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
					<>
						<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={addNewUserTemplate}>
							{(formik) => {
								return (
									<Form>
										<Grid container item alignItems="center" xs={12} height="70px">
											<Grid item xs={12}>
												<UIText
													variant="small"
													mb={1}
												>
													Template name
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
													{({ field, meta }: FieldProps) => (
														<InputBase
															{...field}
															sx={{
																ml: 1,
																flex: 1,
																color: 'text.secondary',
																'& .MuiInputBase-input::placeholder': {
																	fontSize: '14px'
																}
															}}
															placeholder="Enter your new template name here"
															error={meta.touched && !!meta.error}
														/>
													)}
												</Field>
											</Paper>
										</Grid>
										<Grid item xs={12} sx={{p: 0, mt: 3}}>
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
										<Grid item xs={12} mt={4} mb={1}>
											<UIText
												variant="small"
											>
												Based on
											</UIText>
										</Grid>
										<Grid item xs={12} mb={2}>
											<UserTemplateAutocomplete/>
										</Grid>
										<Grid container item xs={12} justifyContent="center" mt={1}>
											<UIButton
												title="Add template"
												colorType="primary"
												variant="contained"
												type="submit"
												onClick={() => {}}
												disabled={!formik.isValid && formik.touched.name}
												isLoading={isAddingUserTemplateLoading}
											/>
										</Grid>
									</Form>
								);
							}}
						</Formik>
					</>
				}
			/>

			<UpgradeDialog
				title="add new templates"
				isUpgradeDialogOpen={isUserTemplatesFreeDialogOpen}
				setIsUpgradeDialogOpen={setIsUserTemplatesFreeDialogOpen}
			/>

			<UpgradeDialog
				title="add more templates"
				isUpgradeDialogOpen={isUserTemplatesBasicDialogOpen}
				setIsUpgradeDialogOpen={setIsUserTemplatesBasicDialogOpen}
			/>
		</>
	);
};