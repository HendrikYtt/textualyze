import {AppBar, IconButton, Toolbar} from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { useHandleNavigation } from '../../utils/utils';

export const SmallTranscriptionHeader = () => {
	const handleNavigation = useHandleNavigation();

	return (
		<AppBar
			elevation={0}
			sx={{
				position: 'fixed',
				width: '100%',
				height: '60px',
				backgroundColor: 'white',
				paddingLeft: '25px',
				paddingRight: '15px'
			}}
		>
			<Toolbar
				sx={{
					height: '100%',
					display: 'flex',
					justifyContent: 'space-between'
				}}
			>
				<IconButton
					onClick={() => {
						handleNavigation('/projects', false);
					}}
					size="large"
					edge="start"
					color="inherit"
					aria-label="menu"
					sx={{
						borderRadius: '70px',
						p: 0,
					}}
				>
					<HomeOutlinedIcon sx={{color: 'black'}} />
				</IconButton>
			</Toolbar>
		</AppBar>
	);
};