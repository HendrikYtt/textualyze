import {colors} from '../../../themes';

export const underlineStyle = (showCondition: boolean, currentTabConditional: boolean, marginBottom: number) => {
	return showCondition ? {
		'&::after': {
			content: '""',
			position: 'absolute',
			bottom: marginBottom,
			left: 0,
			right: 0,
			height: '3px',
			backgroundColor: currentTabConditional ? colors.palette.primary : 'transparent',
			transition: 'background-color .2s',
		}
	} : {};
};