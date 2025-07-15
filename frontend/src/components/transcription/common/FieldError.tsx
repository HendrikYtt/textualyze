import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import {FormHelperText} from '@mui/material';
import React from 'react';

interface Props {
    errorMessage: string;
	marginTop: string;
	marginBottom: string;
	textColor?: string;
	fontSize?: string;
	showIcon?: boolean;
}

export const FieldError: React.FC<Props> = ({
	errorMessage,
	marginTop,
	marginBottom,
	textColor,
	fontSize,
	showIcon = true
}) => {
	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'start',
				marginTop: marginTop,
				marginBottom: marginBottom
			}}
		>
			{showIcon && <ReportProblemOutlinedIcon sx={{color: textColor || 'red', fontSize: fontSize || '14px', mr: '4px'}} />}
			<FormHelperText style={{color: textColor || 'red', fontSize: fontSize || '14px'}} error sx={{m: 0, p: 0}}>{errorMessage}</FormHelperText>
		</div>
	);
};