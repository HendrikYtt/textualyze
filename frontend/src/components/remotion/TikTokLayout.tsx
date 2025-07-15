import Heart_TikTok from '../../assets/svg/Heart_TikTok.svg';
import Message_TikTok from '../../assets/svg/Message_TikTok.svg';
import Share_TikTok from '../../assets/svg/Share_TikTok.svg';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import React from 'react';

const topLeftWhite = '#E4E5E5';
const topGrey = '#D7D7D8';
const topRightWhite = '#E4E5E5';
const botLeft1 = '#999A9C';
const botLeft2 = '#E3E4E4';
const botLeft3 = '#C3C3C3';
const botLeft4 = '#BFBFBF';
const botRightGrey = '#AEAFAF';
const botRightWhite = '#ffffff';

interface Props {
	videoHeight: number;
}

const TikTokLayout: React.FC<Props> = ({
	videoHeight
}) => {
	const multiplier = videoHeight / 1920;
	return (
		<div
			style={{
				height: '100%',
				width: '100%',
				display: 'flex',
				justifyContent: 'start',
				flexDirection: 'column',
				alignItems: 'center',
				// marginBottom: '5px'
				marginBottom: '0.5%'
			}}
		>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					// height: '120px',
					height: '3.25%',
					width: '100%',
					// marginTop: '100px',
					marginTop: '12%',
					// paddingLeft: '40px',
					paddingLeft: '3.75%',
					// paddingRight: '40px',
					paddingRight: '3.75%'
				}}
			>
				<div
					style={{
						// height: '80px',
						height: '130%',
						// width: '80px',
						width: '8%',
						// borderRadius: '20px',
						borderRadius: '25%',
						backgroundColor: topLeftWhite,
					}}
				>
				</div>
				<div
					style={{
						// height: '25px',
						height: '40%',
						// width: '460px',
						width: '46%',
						borderRadius: '25px',
						backgroundColor: topGrey,
					}}
				>
				</div>
				<div
					style={{
						// height: '80px',
						height: '130%',
						// width: '80px',
						width: '8%',
						borderRadius: '80px',
						backgroundColor: topRightWhite,
					}}
				>
				</div>

			</div>


			<div
				style={{
					width: '100%',
					flexGrow: 1
				}}
			>

			</div>

			<div
				style={{
					height: '55%',
					width: '100%',
					display: 'flex',
					justifyContent: 'start',
					alignItems: 'center',
				}}
			>
				<div
					style={{
						height: '100%',
						width: '80%',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'end',
						alignItems: 'start',
						// marginLeft: '30px'
						marginLeft: '2.75%',
					}}
				>
					<div
						style={{
							// height: '100px',
							height: '9.5%',
							// width: '320px',
							width: '38%',
							borderRadius: '15px',
							backgroundColor: botLeft1,
							// marginBottom: '30px',
							marginBottom: '3.5%'
						}}
					>
					</div>

					<div
						style={{
							// height: '25px',
							height: '2.25%',
							// width: '640px',
							width: '75%',
							borderRadius: '30px',
							backgroundColor: botLeft2,
							// marginBottom: '30px'
							marginBottom: '3.5%'
						}}
					>
					</div>
					<div
						style={{
							// height: '25px',
							height: '2.25%',
							// width: '750px',
							width: '89%',
							borderRadius: '30px',
							backgroundColor: botLeft2,
							// marginBottom: '30px'
							marginBottom: '3.5%'
						}}
					>
					</div>
					<div
						style={{
							// height: '25px',
							height: '2.25%',
							// width: '750px',
							width: '89%',
							borderRadius: '30px',
							backgroundColor: botLeft3,
							// marginBottom: '40px'
							marginBottom: '4.5%'
						}}
					>
					</div>
					<div
						style={{
							// height: '25px',
							height: '2.25%',
							// width: '680px',
							width: '80%',
							borderRadius: '30px',
							backgroundColor: botLeft3,
							// marginBottom: '40px'
							marginBottom: '4.5%'
						}}
					>
					</div>

					<div
						style={{
							display: 'flex',
							justifyContent: 'start',
							alignItems: 'center',
							height: '2%',
							width: '100%',
							// marginBottom: '30px'
							marginBottom: '3.5%'
						}}
					>
						<div
							style={{
								// height: '40px',
								height: '200%',
								// width: '40px',
								width: '5%',
								borderRadius: '40px',
								backgroundColor: botLeft4,
							}}
						>
						</div>
						<div
							style={{
								// height: '25px',
								height: '120%',
								// width: '500px',
								width: '60%',
								borderRadius: '30px',
								backgroundColor: botLeft4,
								// marginLeft: '10px'
								marginLeft: '2.25%'
							}}
						>
						</div>
					</div>
				</div>
				<div
					style={{
						height: '100%',
						width: '20%',
						display: 'flex',
						justifyContent: 'space-between',
						flexDirection: 'column',
						alignItems: 'center',
						// paddingTop: '60px',
						paddingTop: '6%',
						// paddingBottom: '20px',
						paddingBottom: '2%',
						// marginRight: '-10px'
						marginRight: '-1%'
					}}
				>
					<div
						style={{
							// height: '105px',
							height: '10.5%',
							// width: '105px',
							width: '48%',
							// borderRadius: '105px',
							borderRadius: '105%',
							backgroundColor: botRightWhite,
							// marginBottom: '10px'
							marginBottom: '6%'
						}}
					>
					</div>
					<div>
						<img src={Heart_TikTok} height={`${90 * multiplier}px`} alt="Heart icon" />
						<p style={{fontSize: `${40 * multiplier}px`, color: botRightWhite, padding: 0, margin: 0, textAlign: 'center', fontWeight: '400', marginTop: '-15%'}}>456</p>
					</div>
					<div>
						<img src={Message_TikTok} height={`${90 * multiplier}px`} alt="Message icon" />
						<p style={{fontSize: `${40 * multiplier}px`, color: botRightWhite, padding: 0, margin: 0, textAlign: 'center', fontWeight: '400', marginTop: '-15%'}}>123</p>
					</div>
					<div>
						<BookmarkIcon sx={{ color: botRightWhite, fontSize: `${95 * multiplier}px`, transform: 'scaleX(-1)'}} />
						<p style={{fontSize: `${40 * multiplier}px`, color: botRightWhite, padding: 0, margin: 0, textAlign: 'center', fontWeight: '400', marginTop: '-15%'}}>69</p>
					</div>
					<div>
						<img src={Share_TikTok} height={`${90 * multiplier}px`} alt="Message icon" />
						<p style={{fontSize: `${40 * multiplier}px`, color: botRightWhite, padding: 0, margin: 0, textAlign: 'center', fontWeight: '400', marginTop: '-15%'}}>420</p>
					</div>
					<div
						style={{
							// height: '105px',
							height: '10.5%',
							// width: '105px',
							width: '48%',
							// borderRadius: '105px',
							borderRadius: '105%',
							backgroundColor: botRightGrey,
							// marginBottom: '10px'
							marginBottom: '6%'
						}}
					>
					</div>
				</div>
			</div>
		</div>
	);
};

export default React.memo(TikTokLayout);