import {UIText, Variant} from './UIText';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import {PlanType} from '@hendrikytt/api-contracts';

interface Props {
    isYearly: boolean;
	planType: PlanType;
    price: number;
    discountedPrice: number;
    isSaleCurrentlyActive: boolean;
	variant: Variant;
	billingIntervalFontSize: string;
}

export const UIPrice: React.FC<Props> = ({
	isYearly,
	planType,
	price,
	discountedPrice,
	isSaleCurrentlyActive,
	variant,
	billingIntervalFontSize
}: Props) => {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center'
			}}
		>
			{planType === 'FREE' && (
				<UIText
					variant={variant}
					component="h2"
					mr="6px"
				>
                    ${price}
				</UIText>
			)}
			{planType !== 'FREE' && (
				<UIText
					variant={variant}
					component="h2"
					mr="6px"
				>
					<span style={{ textDecoration: isSaleCurrentlyActive ? 'line-through' : 'none', color: isSaleCurrentlyActive ? '#C8C8C8' : 'black', fontSize: isSaleCurrentlyActive ? '20px': 'inherit'}}>
						${price}
					</span>
					{isSaleCurrentlyActive ? ` $${discountedPrice}` : ''}
				</UIText>
			)}
			<Typography component="h3" fontWeight="500" fontSize={billingIntervalFontSize} color="black">
				{isYearly ? '/year': '/month'}
			</Typography>
		</div>
	);
};