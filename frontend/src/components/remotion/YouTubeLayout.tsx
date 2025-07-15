import Search_YouTube from '../../assets/svg/Search_YouTube.svg';
import More_YouTube from '../../assets/svg/More_YouTube.svg';
import Share_YouTube from '../../assets/svg/Share_YouTube.svg';
import Remix_YouTube from '../../assets/svg/Remix_YouTube.svg';
import Comment_YouTube from '../../assets/svg/Comment_YouTube.svg';
import Dislike_YouTube from '../../assets/svg/Dislike_YouTube.svg';
import Like_YouTube from '../../assets/svg/Like_YouTube.svg';
import React from 'react';

const botLeft1 = '#E4E4E4';
const botLeft2 = '#9FA0A1';
const botLeft3 = '#C3C3C4';
const botLeft4 = '#BFBFBF';
const botRightGrey = '#DFDFDF';
const botRightWhite = '#ffffff';

interface Props {
	videoHeight: number;
}

const YouTubeLayout: React.FC<Props> = ({
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
					justifyContent: 'end',
					alignItems: 'center',
					// height: '120px',
					height: '6.25%',
					width: '100%',
					position: 'relative',
					// marginTop: '80px'
					marginTop: '7.25%'
				}}
			>
				<img src={Search_YouTube} height={`${85 * multiplier}px`} alt="Search icon"/>
				{/*<img src={Camera_YouTube} height='85px' alt="Camera icon" style={{marginLeft: '45px'}}/>*/}
				<img src={More_YouTube} height={`${85 * multiplier}px`} alt="More icon" style={{marginLeft: '5%', marginRight: '2%'}}/>
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
					height: '60%',
					width: '100%',
					display: 'flex',
					justifyContent: 'start',
					alignItems: 'center',
					// marginBottom: '20px'
					marginBottom: '2%'
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
						marginLeft: '3%',
						// rowGap: '10px'
						rowGap: '0.85%'
					}}
				>
					<div
						style={{
							display: 'flex',
							justifyContent: 'start',
							alignItems: 'center',
							// marginBottom: '30px'
							marginBottom: '2.5%',
							height: '6.75%',
							width: '100%'
						}}
					>
						<div
							style={{
								// height: '80px',
								height: '85%',
								// width: '80px',
								width: '8%',
								borderRadius: '80px',
								backgroundColor: botLeft1,
							}}
						>
						</div>
						<div
							style={{
								// height: '25px',
								height: '30%',
								// width: '300px',
								width: '35%',
								borderRadius: '30px',
								backgroundColor: botLeft1,
								// marginLeft: '15px'
								marginLeft: '2%'
							}}
						>
						</div>
						<div
							style={{
								// height: '70px',
								height: '85%',
								// width: '200px',
								width: '23%',
								borderRadius: `${45 * multiplier}px`,
								backgroundColor: botLeft2,
								// marginLeft: '20px'
								marginLeft: '2.5%'
							}}
						>
						</div>
					</div>
					<div
						style={{
							// height: '25px',
							height: '2.25%',
							width: '100%',
							borderRadius: `${30 * multiplier}px`,
							backgroundColor: botLeft3,
							// marginBottom: '30px'
							marginBottom: '3.25%'
						}}
					>
					</div>
					<div
						style={{
							// height: '25px',
							height: '2.25%',
							width: '100%',
							borderRadius: `${30 * multiplier}px`,
							backgroundColor: botLeft3,
							// marginBottom: '30px'
							marginBottom: '3.25%'
						}}
					>
					</div>
					<div
						style={{
							// height: '25px',
							height: '2.25%',
							width: '80%',
							borderRadius: `${30 * multiplier}px`,
							backgroundColor: botLeft3,
							// marginBottom: '30px'
							marginBottom: '3.25%'
						}}
					>
					</div>

					<div
						style={{
							display: 'flex',
							justifyContent: 'start',
							alignItems: 'center',
							// marginBottom: '30px',
							marginBottom: '3.25%',
							width: '100%',
							height: '1.75%'
						}}
					>
						<div
							style={{
								// height: '35px',
								height: '180%',
								// width: '35px',
								width: '4.25%',
								borderRadius: `${35 * multiplier}px`,
								backgroundColor: botLeft4
							}}
						>
						</div>
						<div
							style={{
								// height: '20px',
								height: '100%',
								width: '50%',
								borderRadius: `${40 * multiplier}px`,
								backgroundColor: botLeft4,
								// marginLeft: '20px'
								marginLeft: '2.5%'
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
						justifyContent: 'end',
						flexDirection: 'column',
						// marginRight: '-20px',
						marginRight: '-2%',
						alignItems: 'center',
						// paddingTop: '60px',
						paddingTop: '6%',
						// rowGap: '40px',
						rowGap: '3.75%',
						// paddingBottom: '20px'
						paddingBottom: '2%'
					}}
				>
					<div>
						<img src={Like_YouTube} height={`${85 * multiplier}px`} alt="Share icon" style={{marginLeft: `${5 * multiplier}px`}}/>
						<p style={{fontSize: `${30 * multiplier}px`, color: botRightWhite, padding: 0, margin: 0, textAlign: 'center', fontWeight: '500'}}>420</p>
					</div>
					<div>
						<img src={Dislike_YouTube} height={`${85 * multiplier}px`} alt="Share icon" style={{marginLeft: `${5 * multiplier}px`}}/>
						<p style={{fontSize: `${30 * multiplier}px`, color: botRightWhite, padding: 0, margin: 0, textAlign: 'center', fontWeight: '500'}}>Dislike</p>
					</div>
					<div>
						<img src={Comment_YouTube} height={`${85 * multiplier}px`} alt="Share icon" style={{marginLeft: `${5 * multiplier}px`}}/>
						<p style={{fontSize: `${30 * multiplier}px`, color: botRightWhite, padding: 0, margin: 0, textAlign: 'center', fontWeight: '500'}}>69</p>
					</div>
					<div>
						<img src={Share_YouTube} height={`${85 * multiplier}px`} alt="Share icon" style={{marginLeft: `${5 * multiplier}px`}}/>
						<p style={{fontSize: `${30 * multiplier}px`, color: botRightWhite, padding: 0, margin: 0, textAlign: 'center', fontWeight: '500'}}>Share</p>
					</div>
					<div>
						<img src={Remix_YouTube} height={`${85 * multiplier}px`} alt="Share icon" style={{marginLeft: `${5 * multiplier}px`}}/>
						<p style={{fontSize: `${30 * multiplier}px`, color: botRightWhite, padding: 0, margin: 0, textAlign: 'center', fontWeight: '500'}}>Remix</p>
					</div>
					<div
						style={{
							height: `${85 * multiplier}px`,
							width: `${85 * multiplier}px`,
							borderRadius: `${12 * multiplier}px`,
							backgroundColor: botRightGrey,
						}}
					>
					</div>
				</div>
			</div>
		</div>
	);
};

export default React.memo(YouTubeLayout);