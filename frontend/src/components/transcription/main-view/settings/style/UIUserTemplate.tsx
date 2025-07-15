import React, {useState} from 'react';
import {UserTemplate} from '@hendrikytt/api-contracts';
import {isSmallerThanMd} from '../../../../../hooks/is-compact';
import {displayError, displayInfo} from '../../../../../utils/utils';
import {Grid, IconButton} from '@mui/material';
import {useTranscriptionContext} from '../../../../../contexts/TranscriptionContext';
import CloseIcon from '@mui/icons-material/Close';
import { colors } from '../../../../../themes';
import {lighten} from '@mui/material/styles';
import {useUserTemplates} from '../../../../../contexts/UserTemplatesContext';
import {UIButton} from '../../../../ui/UIButton';
import {UIDialog} from '../../../../ui/UIDialog';
import {deleteUserTemplate} from '../../../../../api/user-templates';
import GreenCheckCircle from '../../../../../assets/svg/GreenCheckCircle.svg';
import Box from '@mui/material/Box';
import {omit} from 'lodash';

interface Props {
    template: Omit<UserTemplate, 'user_id' | 'created_at' | 'updated_at'>;
	displayBackgroundColor?: string;
	displayFontColor?: string;
	disabled: boolean;
}

export const UIUserTemplate: React.FC<Props> = ({
	template,
	displayBackgroundColor,
	displayFontColor,
	disabled
}) => {
	const smallerThanMd = isSmallerThanMd();

	const {
		setRequestPayload,
		requestPayload
	} = useTranscriptionContext();

	const {
		fetchUserTemplates
	} = useUserTemplates();

	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [isDeleteLoading, setIsDeleteLoading] = useState(false);

	const deleteTemplate = async () => {
		try {
			setIsDeleteLoading(true);
			await deleteUserTemplate(template.id);
			displayInfo('Template deleted');
			await fetchUserTemplates();
		} catch (e) {
			displayError(e);
		}
		setIsDeleteLoading(false);
	};

	const isDefaultTemplate = template.id === 0;
	const isCurrentlySelected = template.name === requestPayload.styling.name && template.id === requestPayload.styling.id;

	if (disabled) {
		return null;
	}

	return (
		<>
			<Grid item xs={6}
			  sx={{
				  '&:hover': {
					  cursor: 'pointer'
				  },
			  }}
			  onClick={() => {
				  setRequestPayload((prevState) => ({
					  ...prevState,
					  styling: omit(template, 'user_id', 'created_at', 'updated_at'),
					  fontType: template.s3_font_name === '' ? 'Default fonts' : 'Your fonts',
					  s3FontName: template.s3_font_name
				  }));
				  displayInfo('Template applied');
			  }}
			>
				<Box
					sx={{
						background: '#F8F8FC',
						height: '80px',
						width: '100%',
						borderRadius: '12px',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						position: 'relative',
						border: `${isCurrentlySelected ? 3 : 1}px solid ${isCurrentlySelected ? '#008A62' : '#8E8EAF'}`,
						'&:hover': {
							cursor: 'pointer',
							backgroundColor: '#E7E7E9'
						},
					}}
				>
					{isCurrentlySelected && (
						<div style={{
							position: 'absolute',
							top: smallerThanMd ? '3px' : '5px',
							left: smallerThanMd ? '3px' : '5px',
						}}>
							<img src={GreenCheckCircle} height={25} alt="Green check circle"/>
						</div>
					)}
					{!isDefaultTemplate && (
						<IconButton
							aria-label="close"
							onClick={(event) => {
								event.stopPropagation();
								setIsDeleteDialogOpen(true);
							}}
							sx={{
								position: 'absolute',
								right: smallerThanMd ? '4px' : '6px',
								top: smallerThanMd ? '4px' : '6px',
								color: 'white',
								backgroundColor: colors.palette.primary,
								'&:hover': {
									backgroundColor: lighten(colors.palette.primary, 0.15),
								},
								p: '3px',
								m: 0
							}}
						>
							<CloseIcon sx={{fontSize: 16}}/>
						</IconButton>
					)}
					<p
						style={{
							color: displayFontColor ? displayFontColor : 'black',
							backgroundColor: displayBackgroundColor ? displayBackgroundColor : 'none',
							fontFamily: isDefaultTemplate ? template.font_family : 'inherit',
							padding: '6px',
							borderRadius: '8px',
							fontWeight: '600'
						}}
					>
						{template.name}
					</p>
				</Box>
			</Grid>

			<UIDialog
				open={isDeleteDialogOpen}
				title="Are you sure you want to delete this template?"
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
								await deleteTemplate();
							}}
							isLoading={isDeleteLoading}
						/>
					</Grid>
				}
			/>
		</>
	);
};