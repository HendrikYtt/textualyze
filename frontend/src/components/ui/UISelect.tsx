import {Box, Grid, MenuItem, Select, SelectChangeEvent} from '@mui/material';
import {colors} from '../../themes';
import {lighten} from '@mui/material/styles';
import React from 'react';
import {UIText} from './UIText';
import {exportDropdownZIndex} from '../../const/ui';

interface Props {
	label: string;
	selectedValue: string;
	onChange: (event: SelectChangeEvent) => void;
	options: {
		title: string;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		icon: any;
		size: number;
	}[]
}

export const UISelect: React.FC<Props> = ({
	label,
	selectedValue,
	onChange,
	options
}: Props) => {
	return (
		<>
			<Grid item mt={2} mb="4px">
				<UIText
					variant="tiny"
					sx={{color: colors.grey}}
				>
					{label}
				</UIText>
			</Grid>
			<Select
				fullWidth
				value={selectedValue}
				onChange={onChange}
				displayEmpty
				MenuProps={{
					disablePortal: true,
				}}
				renderValue={(value) => {
					const selectedOption = options.find(o => o.title === value);
					return (
						<Box sx={{ display: 'flex', alignItems: 'center' }}>
							{selectedOption ? (
								<img
									src={selectedOption.icon}
									height={20}
									width={20}
									loading="lazy"
									title={`${selectedOption.title} logo`}
									alt={`${selectedOption.title} logo`}
									style={{
										marginRight: '8px',
										display: 'inline-block',
										verticalAlign: 'middle'
									}}
								/>
							) : null}
							{selectedOption ? selectedOption.title : 'Please select an option'}
						</Box>
					);
				}}
				sx={{
					zIndex: `${exportDropdownZIndex + 10} !important`,
					'& input': { color: 'text.secondary', fontSize: '18px' },
					'& .MuiOutlinedInput-root': {
						backgroundColor: colors.inputBgGrey,
						'&:hover': {
							backgroundColor: colors.inputBgGrey,
						},
						'&.Mui-focused': {
							backgroundColor: colors.inputBgGrey,
						},
						'& fieldset': {
							borderColor: colors.inputBorderGrey,
						},
						'&:hover fieldset': {
							borderColor: colors.inputBorderGrey,
						},
						'&.Mui-focused fieldset': {
							borderColor: colors.inputBorderGrey,
						},
					},
					'& input::placeholder': {
						color: colors.iconGrey
					},
					'& .MuiSvgIcon-root': {
						color: colors.iconGrey
					}
				}}
			>
				<MenuItem value="" disabled sx={{color: 'black'}}>
                    Please select an option
				</MenuItem>
				{options.map(o => (
					<MenuItem key={o.title} value={o.title} sx={{
						color: 'black',
						'&:hover': {
							backgroundColor: lighten(colors.palette.primary, 0.85),
						}
					}}>
						<img
							src={o.icon}
							height={o.size}
							width={o.size}
							loading="lazy"
							title={`${o.title} logo`}
							alt={`${o.title} logo`}
						/>
						<div
							style={{
								marginLeft: '6px'
							}}
						>
							{o.title}
						</div>
					</MenuItem>
				))}
			</Select>
		</>
	);
};