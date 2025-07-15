import {Grid, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useAuth} from '../contexts/UsersContext';
import {useHandleNavigation} from '../utils/utils';
import {isSmallerThan400px, isSmallerThanMd} from '../hooks/is-compact';
import {SEO} from '../components/SEO/SEO';
import LandingPageVideo from '../assets/videos/landingpagevideo.mp4';
import {UIButton} from '../components/ui/UIButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import {useFileUpload} from '../hooks/use-file-upload';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import FirstPic from '../assets/images/1_pic.webp';
import SecondPic from '../assets/images/2_pic.webp';
import ThirdPic from '../assets/images/3_pic.webp';
import FourthPic from '../assets/images/4_pic.webp';
import FifthPic from '../assets/images/5_pic.webp';
import {colors} from '../themes';
import {getUsersCount} from '../api/user';

export const LandingPage = () => {
	const {isLoggedIn} = useAuth();

	const {validateFileTypeAndResetState} = useFileUpload();

	const handleNavigation = useHandleNavigation();

	const smallerThan400px = isSmallerThan400px();
	const smallerThanMd = isSmallerThanMd();

	const [usersCount, setUsersCount] = useState(0);

	useEffect(() => {
		const fetchUsersCount = async () => {
			const resp = await getUsersCount();
			setUsersCount(resp.count);
		};
		fetchUsersCount();
	}, []);

	const imageStyle: React.CSSProperties = {
		width: '50px',
		height: '50px',
		borderRadius: '50%',
		border: `5px solid ${colors.background}`,
		objectFit: 'cover',
		marginRight: '-18px', // This creates the overlap effect
	};

	return (
		<>
			<SEO path="/"/>
			{/* Hero Section */}
			<Grid
				container
				direction="column"
				alignItems="center"
				justifyContent="start"
				sx={{
					height: '100%',
					width: '100%',
				}}
			>
				{/* Main Title */}
				<Typography
					component="h1"
					fontWeight="800"
					variant="h2"
					align="center"
					sx={{
						marginTop: 0,
						marginBottom: 2,
						px: 1,
						fontSize: smallerThanMd ? '32px' : '52px'
					}}
				>
					Your Automatic {!smallerThanMd && (<br/>)} Captions & Translations
				</Typography>

				{/* Intro text */}
				<Typography
					variant="body1"
					component="div"
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						fontWeight: '400',
						fontSize: '18px',
						px: {xs: 4, md: 2},
						mb: {xs: 3, md: 5}
					}}
					textAlign="center"
				>
					Experience the ease of automatically adding {!smallerThanMd && (<br/>)} subtitles to videos with
					Textualyze.
				</Typography>

				{isLoggedIn ? (
					<UIButton
						title={'Transcribe'}
						path={'/transcribe'}
						colorType="primary"
						variant="contained"
						onClick={() => {
							handleNavigation('/transcribe', true);
						}}
					>
						<ArrowForwardIcon sx={{ml: '8px', mb: '-2px'}}/>
					</UIButton>
				) : (
					<div
						style={{
							display: 'flex',
							flexDirection: smallerThanMd ? 'column' : 'row',
							alignItems: 'center',
							justifyContent: 'center'
						}}
					>
						<UIButton
							title={'Upload file'}
							path={'/transcribe'}
							colorType="primary"
							variant="contained"
							fontSize={'26px'}
							component={'label'}
							onClick={() => {
							}}
						>
							<input
								type="file"
								hidden
								accept="video/*,audio/*"
								onChange={async (e) => {
									const files = e.target.files;
									if (!files) {
										return;
									}
									await validateFileTypeAndResetState(files[0]);
									handleNavigation('/transcribe', false);
									e.target.value = '';
								}}
							/>
							<FileUploadOutlinedIcon sx={{fontSize: '36px', ml: '1px', mr: '-5px'}}/>
						</UIButton>
						<Typography
							variant="body1"
							component="div"
							sx={{
								fontWeight: '400',
								fontSize: '26px',
								mx: 2.5,
								my: 1
							}}
							textAlign="center"
						>
							or
						</Typography>
						<UIButton
							title={'Try example'}
							path={'/transcribe'}
							colorType="secondary"
							variant="contained"
							fontSize={'26px'}
							onClick={async () => {
								await handleNavigation('/transcribe?exampleVideo=true', true);
							}}
						>
							<BoltOutlinedIcon sx={{color: 'yellow', fontSize: '36px', ml: '1px', mr: '-5px'}}/>
						</UIButton>
					</div>
				)}
				<Grid container justifyContent="center" mt={smallerThanMd ? 3 : 4}>
					<Grid item>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'start',
								width: '100%'
							}}
						>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									flexDirection: smallerThanMd ? 'column' : 'row'
								}}
							>
								<div>
									<img src={FirstPic} style={imageStyle} alt="First person"/>
									<img src={SecondPic} style={imageStyle} alt="Second person"/>
									<img src={ThirdPic} style={imageStyle} alt="Third person"/>
									<img src={FourthPic} style={imageStyle} alt="Fourth person"/>
									<img src={FifthPic} style={imageStyle} alt="Fifth person"/>
								</div>
								<div
									style={{
										display: 'flex',
										alignItems: smallerThanMd ? 'center' : 'start',
										justifyContent: 'center',
										flexDirection: 'column',
										marginLeft: smallerThanMd ? '0px' : '30px'
									}}
								>
									<div
										style={{
											height: '20px',
											width: '100px',
											display: 'flex',
										}}
									>
										{[...Array(5)].map((_, i) => (
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 20 20"
												fill={'rgb(234 179 8)'}
												key={i}
											>
												<path
													fillRule="evenodd"
													d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
													clipRule="evenodd"
												/>
											</svg>
										))}
									</div>
									<Typography
										variant="body1"
										component="div"
										sx={{
											fontWeight: '400',
											fontSize: '18px',
										}}
										textAlign="center"
									>
										trusted by <strong>{usersCount}</strong> users
									</Typography>
								</div>
							</div>

						</div>
					</Grid>
				</Grid>
				<Grid container item justifyContent="center" xs={12} px="5px" mt={{xs: 2, md: 3}} ml={'-12px'}>
					<video
						autoPlay
						style={{
							width: '100%',
							maxWidth: '800px',
							height: 'auto',
							borderRadius: smallerThan400px ? '16px' : '28px',
						}}
						src={LandingPageVideo}
						loop
						muted
						controlsList="nodownload"
						playsInline
					>
					</video>
				</Grid>
				<div
					className="senja-embed"
					data-id="76632d71-02a1-4924-a04b-647d761e4f94"
					data-mode="shadow"
					data-lazyload="false"
					style={{
						display: 'block',
						maxWidth: '820px',
						marginTop: smallerThanMd ? '30px' : '50px',
						paddingLeft: smallerThanMd ? '20px' : '0px',
						paddingRight: smallerThanMd ? '20px' : '0px'
					}}></div>
			</Grid>
		</>
	);
};
