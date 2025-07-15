import React from 'react';
import { colors } from '../../../themes';

export const UIDivider = () => {
	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center'
			}}
		>
			<div
				style={{
					width: '90%',
					height: '1px',
					backgroundColor: colors.inputBorderGrey
				}}
			>
			</div>
		</div>
	);
};