import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {LuMessageCircle} from 'react-icons/lu';
import Share from '../../assets/svg/Share.svg';
import React from 'react';

const topRightGrey = '#E4E4E5';
const botLeft1 = '#E4E4E4';
const botLeft2 = '#C4C5C5';
const botLeft3 = '#7E7F80';
const botRightGrey = '#DFDFDF';
const botRightWhite = '#ffffff';

interface Props {
	videoHeight: number;
}

const InstagramLayout: React.FC<Props> = ({
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
					position: 'relative',
					// marginTop: '100px'
					marginTop: '12%'
				}}
			>
				<div
					style={{
						// height: '65px',
						height: '100%',
						// width: '65px',
						width: '6%',
						// borderRadius: '15px',
						borderRadius: '20%',
						backgroundColor: topRightGrey,
						// marginLeft: '30px',
						marginLeft: '2.75%',
					}}
				>
				</div>
				<div
					style={{
						// height: '65px',
						height: '100%',
						// width: '65px',
						width: '6%',
						// borderRadius: '15px',
						borderRadius: '20%',
						backgroundColor: topRightGrey,
						// marginRight: '30px',
						marginRight: '2.75%',
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
					height: '50%',
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
						// marginLeft: '30px',
						marginLeft: '2.75%',
						// rowGap: '10px'
						rowGap: '1%'
					}}
				>
					<div
						style={{
							display: 'flex',
							height: '10%',
							width: '100%',
							justifyContent: 'start',
							// alignItems: 'end',
							alignItems: 'center',
							// marginBottom: '30px'
							marginBottom: '1.5%'
						}}
					>
						<div
							style={{
								// height: '60px',
								height: '65%',
								// width: '60px',
								width: '7%',
								// borderRadius: '60px',
								borderRadius: '50%',
								backgroundColor: botLeft1,
							}}
						>
						</div>
						<div
							style={{
								// height: '25px',
								height: '25%',
								// width: '400px',
								width: '47%',
								borderRadius: '30px',
								// borderRadius: '10%',
								backgroundColor: botLeft1,
								// marginLeft: '15px'
								marginLeft: '2.25%'
							}}
						>
						</div>
					</div>
					<div
						style={{
							// height: '25px',
							height: '2.75%',
							// width: '650px',
							width: '76%',
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
							height: '2.75%',
							// width: '650px',
							width: '76%',
							borderRadius: '30px',
							backgroundColor: botLeft2,
							// marginBottom: '30px'
							marginBottom: '3.5%'
						}}
					>
					</div>
					<div
						style={{
							// height: '50px',
							height: '5.5%',
							// width: '450px',
							width: '53%',
							borderRadius: '40px',
							backgroundColor: botLeft3,
							// marginBottom: '40px'
							marginBottom: '4.25%'
						}}
					>
					</div>
				</div>
				<div
					style={{
						// border: '2px solid red',
						height: '100%',
						width: '20%',
						display: 'flex',
						justifyContent: 'end',
						flexDirection: 'column',
						// marginRight: '-20px',
						marginRight: '-2%',
						alignItems: 'center',
						// paddingTop: '60px',
						paddingTop: '6%',
						// rowGap: '40px',
						rowGap: '4.5%',
						// paddingBottom: '20px'
						paddingBottom: '2%'
					}}
				>
					<div>
						<FavoriteBorderIcon sx={{color: botRightWhite, fontSize: `${85 * multiplier}px`}}/>
						<p style={{fontSize: `${30 * multiplier}px`, color: botRightWhite, padding: 0, margin: 0, textAlign: 'center', fontWeight: '500'}}>420</p>
					</div>
					<div>
						<LuMessageCircle size={85 * multiplier} style={{color: botRightWhite, transform: 'scaleX(-1)'}} />
						<p style={{fontSize: `${30 * multiplier}px`, color: botRightWhite, padding: 0, margin: 0, textAlign: 'center', fontWeight: '500'}}>69</p>
					</div>
					<div>
						<img src={Share} height={`${85 * multiplier}px`} alt="Share icon" style={{marginLeft: '1%'}}/>
						<p style={{fontSize: `${30 * multiplier}px`, color: botRightWhite, padding: 0, margin: 0, textAlign: 'center', fontWeight: '500'}}>69</p>
					</div>
					<MoreHorizIcon sx={{color: botRightWhite, fontSize: `${85 * multiplier}px`}}/>
					<div
						style={{
							// height: '75px',
							height: '9%',
							// width: '75px',
							width: '35%',
							// borderRadius: '20px',
							borderRadius: '30%',
							backgroundColor: botRightGrey,
						}}
					>
					</div>
				</div>
			</div>
		</div>
	);
};

export default React.memo(InstagramLayout);