import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReplyIcon from '@mui/icons-material/Reply';
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
import PendingIcon from '@mui/icons-material/Pending';
import React from 'react';

const topLeftGrey = '#969798';
const topWhite = '#E1E1E1';
const botLeft1 = '#CACBCB';
const botLeft2 = '#E2E3E3';
const botLeft3 = '#C2C2C3';
const botLeft4 = '#8E8F90';
const botRightGrey = '#8E8F90';
const botRightWhite = '#ffffff';

interface Props {
	videoHeight: number;
}

const SnapchatLayout: React.FC<Props> = ({
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
					justifyContent: 'start',
					alignItems: 'center',
					// height: '120px',
					height: '6.25%',
					width: '100%',
					position: 'relative',
					// marginTop: '10px'
					marginTop: '1%'
				}}
			>
				<div
					style={{
						// height: '100px',
						height: '81%',
						// width: '100px',
						width: '9.1%',
						borderRadius: `${100 * videoHeight}px`,
						backgroundColor: topLeftGrey,
						// marginLeft: '20px',
						marginLeft: '1.75%',
					}}
				>
				</div>
				<div
					style={{
						// height: '100px',
						height: '81%',
						// width: '100px',
						width: '9.1%',
						borderRadius: `${100 * videoHeight}px`,
						backgroundColor: topLeftGrey,
						// marginLeft: '30px',
						marginLeft: '2.75%',
					}}
				>
				</div>
				<div
					style={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						// height: '25px',
						height: '20%',
						// width: '280px',
						width: '26%',
						borderRadius: `${25 * multiplier}px`,
						backgroundColor: topWhite,
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
						// marginLeft: '30px'
						marginLeft: '3%'
					}}
				>
					<div
						style={{
							// height: '25px',
							height: '2.5%',
							// width: '150px',
							width: '18%',
							borderRadius: `${30 * multiplier}px`,
							backgroundColor: botLeft1,
							// marginBottom: '30px'
							marginBottom: '3.5%'
						}}
					>
					</div>
					<div
						style={{
							display: 'flex',
							justifyContent: 'start',
							alignItems: 'center',
							// marginBottom: '30px',
							marginBottom: '3.5%',
							height: '10%',
							width: '100%'
						}}
					>
						<div
							style={{
								// height: '80px',
								height: '80%',
								// width: '80px',
								width: '9.5%',
								borderRadius: `${80 * multiplier}px`,
								backgroundColor: botLeft2,
							}}
						>
						</div>
						<div
							style={{
								// height: '25px',
								height: '25%',
								// width: '350px',
								width: '43%',
								borderRadius: `${30 * multiplier}px`,
								backgroundColor: botLeft2,
								// marginLeft: '30px'
								marginLeft: '3.5%'
							}}
						>
						</div>
					</div>

					<div
						style={{
							// height: '25px',
							height: '2.55%',
							// width: '750px',
							width: '92%',
							borderRadius: `${30 * multiplier}px`,
							backgroundColor: botLeft3,
							// marginBottom: '30px'
							marginBottom: '3.5%'
						}}
					>
					</div>
					<div
						style={{
							// height: '160px',
							height: '16.5%',
							// width: '550px',
							width: '68%',
							borderRadius: `${30 * multiplier}px`,
							backgroundColor: botLeft4,
							// marginBottom: '40px'
							marginBottom: '5%'
						}}
					>
					</div>
				</div>
				<div
					style={{
						height: '100%',
						width: '20%',
						display: 'flex',
						justifyContent: 'space-between',
						flexDirection: 'column',
						// marginRight: '30px',
						marginRight: '3%',
						alignItems: 'end',
						// paddingTop: '60px',
						paddingTop: '6%',
						// paddingBottom: '60px'
						paddingBottom: '6%'
					}}
				>
					<BookmarkAddIcon sx={{color: botRightWhite, fontSize: `${105 * multiplier}px`}}/>
					<FavoriteIcon sx={{color: botRightWhite, fontSize: `${105 * multiplier}px`}}/>
					<div>
						<MarkChatUnreadIcon sx={{ color: botRightWhite, fontSize: `${105 * multiplier}px`, transform: 'scaleX(-1)' }} />
						<p style={{fontSize: `${40 * multiplier}px`, color: botRightWhite, padding: 0, margin: 0, textAlign: 'center', fontWeight: '700'}}>6.9k</p>
					</div>
					<div>
						<ReplyIcon sx={{color: botRightWhite, fontSize: `${105 * multiplier}px`, transform: 'scaleX(-1)'}}/>
						<p style={{fontSize: `${40 * multiplier}px`, color: botRightWhite, padding: 0, margin: 0, textAlign: 'center', fontWeight: '700'}}>4.2k</p>
					</div>
					<PendingIcon sx={{color: botRightGrey, fontSize: `${105 * multiplier}px`, transform: 'rotate(90deg)'}}/>
				</div>
			</div>
		</div>
	);
};

export default React.memo(SnapchatLayout);