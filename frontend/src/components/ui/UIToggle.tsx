import Typography from '@mui/material/Typography';
import * as React from 'react';
import './styles.css';

interface Props {
	isInitialYearly: boolean;
    isYearly: boolean;
	setIsYearly: React.Dispatch<React.SetStateAction<boolean>>;
	background?: string;
}

export const UIToggle: React.FC<Props> = ({
	isInitialYearly,
	isYearly,
	setIsYearly,
	background
}: Props) => {

	const handleButtonClick = () => {
		const btn = document.getElementById('btn');
		const toggleBtn = document.getElementById('toggleBtn');
		const toggleBtnYearly = document.getElementById('toggleBtnYearly');
		if (!btn || !toggleBtn || !toggleBtnYearly) {
			return;
		}
		if ((!isInitialYearly ? btn.style.left : true) && btn.style.left !== '0px') {
			setIsYearly(false);
			btn.style.left = '0';
		} else {
			setIsYearly(true);
			btn.style.left = '85px';
		}
	};

	return (
		<div className="button-box"
			 style={{
				 backgroundColor: background ? background : 'white'
			 }}
		>
			<div id="btn" style={{left: isInitialYearly ? '85px' : '0px'}}></div>
			<button type="button" className="toggle-btn" id="toggleBtn" onClick={handleButtonClick}>
				<Typography
					fontWeight={isYearly ? '500' : '700'}
					fontSize="12px"
					sx={{
						color: isYearly ? '#000' : '#fff',
						transform: 'translateX(-2px)',
					}}
				>
                    MONTHLY
				</Typography>
			</button>
			<button type="button" className="toggle-btn" id="toggleBtnYearly" onClick={handleButtonClick}>
				<Typography
					fontWeight={!isYearly ? '500' : '700'}
					fontSize="12px"
					sx={{
						color: !isYearly ? '#000' : '#fff',
						transform: 'translateX(-2px)',
					}}
				>
                    YEARLY
				</Typography>
			</button>
		</div>
	);
};