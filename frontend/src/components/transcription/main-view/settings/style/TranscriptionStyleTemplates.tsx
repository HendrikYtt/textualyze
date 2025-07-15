import {CircularProgress, Grid} from '@mui/material';
import React from 'react';
import {isSmallerThanMd} from '../../../../../hooks/is-compact';
import {UIText} from '../../../../ui/UIText';
import {useUserTemplates} from '../../../../../contexts/UserTemplatesContext';
import {colors} from '../../../../../themes';
import {UIButton} from '../../../../ui/UIButton';
import {UIUserTemplate} from './UIUserTemplate';
import {useAuth} from '../../../../../contexts/UsersContext';
import {Styling} from '@hendrikytt/api-contracts';
import {useTranscriptionContext} from '../../../../../contexts/TranscriptionContext';
import {getPlanTypeIcon} from '../../../../../utils/utils';

export const defaultTemplates: (Styling & {name: string, id: number, displayFontColor: string, displayBackgroundColor: string})[] = [
	{
		name: 'MrBeast',
		id: 0,
		font_color: 'white',
		outline_color: 'black',
		font_family: 'MrBeast',
		s3_font_name: '',
		word_by_word: false,
		highlight_color: '#00cfff',
		background_color: null,
		italic: false,
		remove_symbols: true,
		uppercase: true,
		fade: false,
		word_spacing: 0,
		bounce_effect: true,
		auto_rotate: false,
		auto_move: false,
		displayBackgroundColor: '#00cfff',
		displayFontColor: 'black',
		template_type: 'Default',
		auto_font_size: true,
		multiple_speakers: false,
		font_weight: 400
	},
	{
		name: 'Ali',
		id: 0,
		font_color: '#1C1E1D',
		outline_color: 'black',
		font_family: 'Poppins',
		s3_font_name: '',
		word_by_word: false,
		highlight_color: null,
		background_color: '#E7E5E7',
		italic: false,
		remove_symbols: false,
		uppercase: false,
		fade: false,
		word_spacing: 0,
		bounce_effect: false,
		auto_rotate: false,
		auto_move: false,
		displayBackgroundColor: '#E7E5E7',
		displayFontColor: '#1C1E1D',
		template_type: 'Ali',
		auto_font_size: false,
		multiple_speakers: false,
		font_weight: 800
	},
	{
		name: 'Goofy',
		id: 0,
		font_color: 'white',
		s3_font_name: '',
		outline_color: 'black',
		font_family: 'The Bold Font',
		word_by_word: false,
		highlight_color: '#F9EA03',
		background_color: '#7F32EE',
		italic: false,
		remove_symbols: false,
		uppercase: false,
		fade: false,
		word_spacing: 0,
		bounce_effect: true,
		auto_rotate: true,
		auto_move: true,
		displayBackgroundColor: '#7F32EE',
		displayFontColor: '#F9EA03',
		template_type: 'Default',
		auto_font_size: false,
		multiple_speakers: false,
		font_weight: 400
	},
	{
		name: 'Multiple speakers',
		id: 0,
		font_color: 'white',
		s3_font_name: '',
		outline_color: 'black',
		font_family: 'Fira Sans Condensed',
		word_by_word: false,
		highlight_color: null,
		background_color: null,
		italic: false,
		remove_symbols: false,
		uppercase: false,
		fade: false,
		word_spacing: 0,
		bounce_effect: false,
		auto_rotate: false,
		auto_move: false,
		displayBackgroundColor: colors.palette.primary,
		displayFontColor: '#F9EA03',
		template_type: 'Default',
		auto_font_size: false,
		multiple_speakers: true,
		font_weight: 600
	},
	{
		name: 'Cheeky',
		id: 0,
		font_color: '#FFFFFFFF',
		outline_color: null,
		font_family: 'Roboto',
		s3_font_name: '',
		word_by_word: true,
		highlight_color: 'black',
		background_color: '#F79800',
		italic: false,
		remove_symbols: false,
		uppercase: false,
		fade: false,
		word_spacing: 0,
		bounce_effect: false,
		auto_rotate: false,
		auto_move: true,
		displayBackgroundColor: '#F79800',
		displayFontColor: 'white',
		template_type: 'Default',
		auto_font_size: true,
		multiple_speakers: false,
		font_weight: 400
	},
	{
		name: 'Classic',
		id: 0,
		font_color: '#ffffff',
		outline_color: null,
		font_family: 'Fira Sans Condensed',
		s3_font_name: '',
		word_by_word: false,
		highlight_color: null,
		background_color: null,
		italic: false,
		remove_symbols: false,
		uppercase: false,
		fade: false,
		word_spacing: 0,
		bounce_effect: false,
		auto_rotate: false,
		auto_move: false,
		displayBackgroundColor: 'white',
		displayFontColor: 'black',
		template_type: 'Default',
		auto_font_size: false,
		multiple_speakers: false,
		font_weight: 400
	},
	{
		name: 'Textualyze choice',
		id: 0,
		font_color: 'white',
		s3_font_name: '',
		outline_color: null,
		font_family: 'Plus Jakarta Sans',
		word_by_word: false,
		highlight_color: null,
		background_color: colors.palette.primary,
		italic: false,
		remove_symbols: false,
		uppercase: false,
		fade: false,
		word_spacing: 0,
		bounce_effect: false,
		auto_rotate: false,
		auto_move: false,
		displayBackgroundColor: colors.palette.primary,
		displayFontColor: 'white',
		template_type: 'Default',
		auto_font_size: false,
		multiple_speakers: false,
		font_weight: 400
	},
	{
		name: 'Documentary',
		id: 0,
		font_color: '#fff000',
		outline_color: 'black',
		font_family: 'The Bold Font',
		s3_font_name: '',
		word_by_word: true,
		highlight_color: null,
		background_color: 'black',
		italic: false,
		remove_symbols: false,
		uppercase: true,
		fade: true,
		word_spacing: 0,
		bounce_effect: true,
		auto_rotate: false,
		auto_move: false,
		displayBackgroundColor: 'black',
		displayFontColor: '#fff000',
		template_type: 'Default',
		auto_font_size: true,
		multiple_speakers: false,
		font_weight: 400
	}
];

export const TranscriptionStyleTemplates = () => {
	const smallerThanMd = isSmallerThanMd();

	const {user} = useAuth();

	const {
		assignedSpeakers
	} = useTranscriptionContext();

	const {
		userTemplates,
		isLoadingUserTemplates,
		setShouldValidateUserTemplatesCreation
	} = useUserTemplates();

	return (
		<Grid container spacing={2} mt={smallerThanMd ? 0 : -1} mb={2}>
			<Grid container item xs={12} justifyContent="space-between">
				<Grid item>
					<UIText
						variant="small"
						color={colors.darkGrey}
					>
						Your templates {user?.current_plan.plan_type !== 'FREE' ? `(${userTemplates.length}/${user?.current_plan.user_templates_count_limit})` : ''}
					</UIText>
				</Grid>
				<Grid item>
					<div
						style={{
							display: 'flex',
							justifyContent: 'end'
						}}
					>
						<UIButton
							title="Add new +"
							colorType="primary"
							variant="text"
							textColor={colors.palette.primary}
							onClick={() => {setShouldValidateUserTemplatesCreation(true);}}
							underline
							fontSize="16px"
							removeSpacing
						>
							{user?.current_plan.plan_type !== 'PRO' && getPlanTypeIcon('PRO', '28px')}
						</UIButton>
					</div>
				</Grid>
			</Grid>
			{isLoadingUserTemplates && (
				<Grid container alignItems="center" justifyContent="center">
					<CircularProgress/>
				</Grid>
			)}
			{userTemplates.length > 0 && userTemplates.map((template => {
				return (
					<UIUserTemplate
						key={template.id}
						template={template}
						disabled={false}
					/>
				);
			}))}
			{userTemplates.length === 0 && !isLoadingUserTemplates && (
				<Grid item xs={12}>
					<UIText
						variant="tiny"
						color={colors.darkGrey}
						textAlign="center"
					>
						You haven&apos;t added any templates yet
					</UIText>
				</Grid>
			)}

			<Grid item xs={12} mt={1}>
				<UIText
					variant="small"
					color={colors.darkGrey}
				>
					Default templates
				</UIText>
			</Grid>
			{defaultTemplates.map((template, index) => {

				return (
					<>
						{template.multiple_speakers && assignedSpeakers.length === 0
							? (
								<UIUserTemplate
									key={index}
									template={template}
									displayBackgroundColor={template.displayBackgroundColor}
									displayFontColor={template.displayFontColor}
									disabled={true}
								/>
							)
							: (
								<UIUserTemplate
									key={index}
									template={template}
									displayBackgroundColor={template.displayBackgroundColor}
									displayFontColor={template.displayFontColor}
									disabled={false}
								/>
							)
						}
					</>
				);
			})}
		</Grid>
	);
};