import {Autocomplete, InputAdornment, TextField} from '@mui/material';
import {customFilter} from '../../../../../utils/utils';
import {colors} from '../../../../../themes';
import * as React from 'react';
import {useUserTemplates} from '../../../../../contexts/UserTemplatesContext';
import {useTranscriptionContext} from '../../../../../contexts/TranscriptionContext';
import {defaultTemplates} from './TranscriptionStyleTemplates';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import {useState} from 'react';

export const UserTemplateAutocomplete = () => {
	const {
		setRequestPayload
	} = useTranscriptionContext();

	const {
		userTemplates
	} = useUserTemplates();

	const [isOpen, setIsOpen] = useState(false);

	const defaultOption = {label: 'Current styling', value: 'Current styling'};
	const autoCompleteOptions = () => {
		return [defaultOption, ...userTemplates.map(t => {
			return {label: t.name, value: t.name};
		}), ...defaultTemplates.map(t => {
			return {label: t.name, value: t.name};
		})];
	};

	return (
		<Autocomplete
			open={isOpen}
			onOpen={() => setIsOpen(true)}
			onClose={() => setIsOpen(false)}
			options={autoCompleteOptions()}
			defaultValue={defaultOption}
			getOptionLabel={(option) => option.label}
			isOptionEqualToValue={(option, value) => option.value === value.value}
			renderInput={(params) => (
				<TextField
					{...params}
					InputProps={{
						...params.InputProps,
						style: {paddingRight: '0px'},
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
			renderOption={(props, option) => (
				<li {...props}>
					{option.label}
				</li>
			)}
			onChange={(_, option) => {
				if (option.value === defaultOption.value) {
					return;
				}
				const template = [...userTemplates, ...defaultTemplates].find(t => t.name === option.value);
				if (!template) {
					return;
				}
				setRequestPayload(prevState => {
					return {
						...prevState,
						styling: template
					};
				});
			}}
			disableClearable
			filterOptions={(options, { inputValue }) => {
				return options.filter(option => customFilter(inputValue, option));
			}}
			sx={{
				'& .MuiOutlinedInput-root': {
					'& .MuiInputBase-input': {
						height: 'calc(100% - 20px)'
					},
				},
				'& .MuiAutocomplete-endAdornment': {
					'& .MuiSvgIcon-root': {
						color: colors.grey,
					},
				},
			}}
		/>
	);
};