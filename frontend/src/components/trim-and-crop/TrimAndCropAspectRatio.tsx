import {Box} from '@mui/material';
import {colors} from '../../themes';
import React, {useEffect, useRef, useState} from 'react';
import {useTrimAndCropContext} from '../../contexts/TrimAndCropContext';
import {SelectedAspectRatio} from './TrimAndCropConfiguration';
import {UIButton} from '../ui/UIButton';
import {emojiPickerZIndex} from '../../const/ui';
import {lighten} from '@mui/material/styles';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {isSmallerThanMd} from '../../hooks/is-compact';

const availableRatios: SelectedAspectRatio[] = [
	'Original',
	'16:9',
	'9:16',
	'1:1',
	'4:5'
];

export const TrimAndCropAspectRatio = () => {
	const smallerThanMd = isSmallerThanMd();

	const {
		selectedAspectRatio,
		setSelectedAspectRatio,
	} = useTrimAndCropContext();

	const segmentSettingsDropdownRef = useRef<HTMLDivElement>(null);

	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	useEffect(() => {
		document.addEventListener('click', handleDocumentClick);

		return () => {
			document.removeEventListener('click', handleDocumentClick);
		};
	}, []);

	const handleDocumentClick = (event: MouseEvent) => {
		if (segmentSettingsDropdownRef.current && !segmentSettingsDropdownRef.current.contains(event.target as Node)) {
			setIsDropdownOpen(false);
		}
	};

	return (
		<div style={{position: 'relative'}}>
			<UIButton
				title={`${selectedAspectRatio} ratio`}
				colorType="primary"
				variant="contained"
				backgroundColor="transparent"
				borderColor={colors.palette.primary}
				textColor={colors.palette.primary}
				onClick={(event) => {
					event.preventDefault();
					event.stopPropagation();
					setIsDropdownOpen(prevState => !prevState);
				}}
				fontSize="16px"
				fontWeight="700"
				height="40px"
				sx={{
					width: '160px',
					p: 0,
					pr: 1,
					pl: 2
				}}
			>
				<ArrowDropDownIcon sx={{m: 0, p: 0}}/>
			</UIButton>
			{isDropdownOpen && (
				<div
					ref={segmentSettingsDropdownRef}
					style={{
						position: 'absolute',
						height: 'auto',
						width: '140px',
						zIndex: emojiPickerZIndex,
						backgroundColor: 'white',
						border: '1px solid #ccc',
						borderRadius: '5px',
						boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
						marginTop: '2px',
						right: smallerThanMd ? '50%' : '80%',
						bottom: smallerThanMd ? '-420%' : 'auto'
					}}
				>
					{availableRatios.map((ratio, index) => {
						return (
							<Box
								key={ratio}
								sx={{
									marginBottom: index !== availableRatios.length - 1 ? '6px' : '0px',
									px: '6px',
									py: '2px',
									'&:hover' : {
										cursor: 'pointer',
										backgroundColor: lighten(colors.palette.primary, 0.35)
									}

								}}
								onClick={() => {
									setSelectedAspectRatio(ratio);
								}}
							>
								{ratio}
							</Box>
						);
					})}

				</div>
			)}
		</div>
	);
};