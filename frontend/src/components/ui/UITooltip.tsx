import { Tooltip } from '@mui/material';
import { ReactElement } from 'react';

interface Props {
    title: string;
    children: ReactElement;
}

export const UITooltip = ({
	title,
	children
}: Props) => {
	return (
		<Tooltip
			arrow
			title={title}
			placement="top"
			PopperProps={{
				modifiers: [
					{
						name: 'offset',
						options: {
							offset: [0, -8],
						},
					},
				],
			}}
		>
			{children}
		</Tooltip>
	);
};
