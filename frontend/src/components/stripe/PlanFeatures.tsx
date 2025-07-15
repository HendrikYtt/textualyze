import {UIText} from '../ui/UIText';
import Box from '@mui/material/Box';
import * as React from 'react';
import {PlanType} from '@hendrikytt/api-contracts';

interface Props {
    feature: string;
    themeColor: string;
    planType: PlanType;
}

export const PlanFeatures: React.FC<Props> = ({
	feature,
	themeColor,
	planType
}: Props) => {

	return (
		<Box key={feature} sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', gap: '8px', mb: '8px' }}>
			<div
				style={{
					borderRadius: '72px',
					background: themeColor,
					width: '20px',
					height: '20px',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					gap: '10px'
				}}
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="12" height="10" viewBox="0 0 12 10" fill="none" style={{
					width: '11.467px',
					height: '9.433px',
					flexShrink: '0',
				}}>
					<path d="M11.5485 1.64038L5.84438 9.38121C5.70834 9.5617 5.50548 9.67997 5.28139 9.70943C5.05731 9.73889 4.83078 9.67708 4.65271 9.53788L0.579376 6.28121C0.219931 5.99357 0.161728 5.46899 0.449376 5.10955C0.737025 4.7501 1.2616 4.6919 1.62104 4.97955L5.01771 7.69705L10.2069 0.654547C10.377 0.399205 10.6738 0.258032 10.9792 0.287078C11.2847 0.316124 11.5495 0.510688 11.6685 0.793524C11.7875 1.07636 11.7414 1.4017 11.5485 1.64038Z"
						fill={planType === 'BASIC' ? '#067051' : '#0A0D59'}/>
				</svg>
			</div>
			<UIText
				variant="small"
				component="h4"
				color={'#716F83'}
			>
				{feature}
			</UIText>
		</Box>
	);
};