import {Grid, Typography} from '@mui/material';
import {
	defaultHighlightColor,
	defaultBackgroundColor,
	defaultRequestPayload,
	useTranscriptionContext, defaultSpeakerColors
} from '../../../../../contexts/TranscriptionContext';
import {colors} from '../../../../../themes';
import {TranscriptionStyleCheckBoxColor} from '../../../common/TranscriptionStyleCheckBoxColor';
import {TranscriptionStyleSlider} from '../../../common/TranscriptionStyleSlider';
import {TranscriptionStyleCheckbox} from '../../../common/TranscriptionStyleCheckbox';
import * as React from 'react';
import {isSmallerThanMd} from '../../../../../hooks/is-compact';
import {TranscriptionFontFamily} from '../../../common/TranscriptionFontFamily';
import {maxFontSize, minFontSize, userSelectNone} from '../../../../../const/ui';
import {TranscriptionStyleSpeakerColor} from '../../../common/TranscriptionStyleSpeakerColor';

export const TranscriptionStyleCustomize = () => {
	const smallerThanMd = isSmallerThanMd();

	const {
		requestPayload,
		assignedSpeakers
	} = useTranscriptionContext();

	return (
		<div style={{
			...userSelectNone,
			paddingBottom: '15px'
		}}>
			<Grid container>
				<Grid item xs={6} mb={1} mt={smallerThanMd ? 1 : 0}>
					<Typography color={colors.font.secondary}>
						Typography
					</Typography>
				</Grid>
			</Grid>

			<Grid
				container
				columnSpacing={1}
				rowSpacing={smallerThanMd ? 0 : 1}
				alignItems="start"
			>
				<Grid item>
					<TranscriptionFontFamily
						title="Family"
					/>
				</Grid>
				{!requestPayload.styling.auto_font_size && (
					<Grid item>
						<TranscriptionStyleSlider
							title="Size"
							requestPayloadStylingField="fontSize"
							minValue={minFontSize}
							maxValue={maxFontSize}
							unit="px"
							disabled={false}
							showSlider={smallerThanMd}
						/>
					</Grid>
				)}
				{requestPayload.processingAction === 'Transcribe' && requestPayload.styling.template_type !== 'Ali' && (
					<Grid item>
						<TranscriptionStyleSlider
							title="Word spacing"
							requestPayloadStylingField="word_spacing"
							minValue={-100}
							maxValue={100}
							unit="px"
							disabled={false}
							showSlider={smallerThanMd}
						/>
					</Grid>
				)}
			</Grid>

			<Grid item mt={1}>
				<TranscriptionStyleCheckbox
					title="Italic"
					requestPayloadStylingField="italic"
				/>
			</Grid>
			<Grid item>
				<TranscriptionStyleCheckbox
					title="Uppercase"
					requestPayloadStylingField="uppercase"
				/>
			</Grid>
			<Grid item>
				<TranscriptionStyleCheckbox
					title="Remove symbols"
					requestPayloadStylingField="remove_symbols"
				/>
			</Grid>
			<Grid item>
				<TranscriptionStyleCheckbox
					title="Auto font size"
					requestPayloadStylingField="auto_font_size"
				/>
			</Grid>

			<Grid container>
				<Grid item xs={6} mb={1} mt={smallerThanMd ? 1 : 2}>
					<Typography color={colors.font.secondary}>
						Color
					</Typography>
				</Grid>
			</Grid>

			<Grid container spacing={1}>
				{!requestPayload.styling.multiple_speakers && (
					<Grid item>
						<TranscriptionStyleCheckBoxColor
							title="Fill color"
							requestPayloadStylingField="font_color"
							showCheckbox={false}
							defaultColor={defaultRequestPayload.styling.font_color}
						/>
					</Grid>
				)}
				<Grid item>
					<TranscriptionStyleCheckBoxColor
						title="Outline color"
						requestPayloadStylingField="outline_color"
						showCheckbox={true}
						defaultColor={defaultRequestPayload.styling.outline_color!}
					/>
				</Grid>

				<Grid item>
					<TranscriptionStyleCheckBoxColor
						title="Background color"
						requestPayloadStylingField="background_color"
						showCheckbox={true}
						defaultColor={defaultBackgroundColor}
					/>
				</Grid>
				{requestPayload.processingAction === 'Transcribe' && requestPayload.styling.template_type !== 'Ali' && (
					<Grid item>
						<TranscriptionStyleCheckBoxColor
							title="Highlight color"
							requestPayloadStylingField="highlight_color"
							showCheckbox={true}
							defaultColor={defaultHighlightColor}
						/>
					</Grid>
				)}

				{requestPayload.styling.multiple_speakers &&
					Object.entries(defaultSpeakerColors)
						.filter(([speaker, _]) => assignedSpeakers.includes(speaker))
						.map(([speaker, color], index) => {
							return (
								<Grid key={index} item>
									<TranscriptionStyleSpeakerColor
										title={`Speaker ${index + 1}`}
										speakerKey={speaker}
									/>
								</Grid>
							);
						})
				}
			</Grid>

			<Grid item xs={12} mt={2} mb={1}>
				<Typography color={colors.font.secondary}>
					Position
				</Typography>
			</Grid>
			<Grid container spacing={2}>
				<Grid item>
					<TranscriptionStyleSlider
						title="Position Y"
						requestPayloadStylingField="position"
						minValue={0}
						maxValue={100}
						unit="%"
						disabled={false}
						showSlider={smallerThanMd}
					/>
				</Grid>


			</Grid>
		</div>
	);
};