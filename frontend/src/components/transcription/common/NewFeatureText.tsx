import { colors } from '../../../themes';
import {UIText} from '../../ui/UIText';
import * as React from 'react';

interface Props {
	featureText: string
}

export const NewFeatureText: React.FC<Props> = ({
	featureText
}) => {
	return (
		<div
			style={{
				backgroundColor: '#E5E6FF',
				width: '100%',
				padding: '16px',
				borderRadius: '4px',
			}}
		>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center'
				}}
			>
				<UIText
					variant="regular"
					fontWeight="700"
				>
					What&apos;s that?
				</UIText>
				<div
					style={{
						backgroundColor: colors.background,
						padding: '7px 12px 7px 12px',
						borderRadius: '13.5px',
					}}
				>
					<UIText
						variant="tiny"
						fontWeight="700"
						color="white"
						fontSize="10px"
					>
						NEW FEATURE
					</UIText>
				</div>
			</div>
			<UIText
				variant="tiny"
				fontWeight="400"
				marginTop="4px"
			>
				{featureText}
			</UIText>
		</div>
	);
};