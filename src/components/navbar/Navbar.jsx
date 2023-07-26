import React, { useState } from 'react';

import useData from 'hooks/useData';
import useMediaQuery from 'hooks/useMediaQuery';

import { JoinFull, PlayCircle, Storage, TableChart } from '@mui/icons-material';
import {
	Alert as MuiAlert,
	AppBar,
	Box,
	Button,
	Chip,
	Drawer,
	IconButton,
	Snackbar,
	Stack,
	Toolbar,
	Typography,
} from '@mui/material';

import AVAILABLE_TABLES from '../../constants/constants';

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Navbar({ query, setQuery, value, setValue, history, setHistory }) {
	const { showToast, toastMsg } = useData(query);
	const [open, setOpen] = React.useState(false);
	const [state, setState] = useState({
		right: false,
	});
	const isMobileView = useMediaQuery('(max-width: 700px)');

	const toggleDrawer = (anchor, open) => (event) => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}
		setState({ ...state, [anchor]: open });
	};

	const onSubmit = () => {
		var Z = value.toLowerCase().slice(value.indexOf('from') + 'from'.length);
		setQuery(Z.split(' ')[1]);

		if (toastMsg !== '') {
			setOpen(true);
		}

		setHistory([...history, value]);
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	const horizontal = 'bottom';
	const vertical = 'right';

	const selectTables = (anchor) => (
		<Box
			sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250, padding: '10px' }}
			role="presentation"
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}>
			<Typography textAlign="center" variant="subtitle1" fontWeight={700}>
				Available Tables:
			</Typography>
			<Stack direction="column" justifyContent="center" alignItems="center">
				{AVAILABLE_TABLES.map((table) => (
					<Chip
						sx={{ margin: '10px auto', width: '200px', textAlign: 'start', cursor: 'pointer' }}
						icon={<Storage />}
						color="success"
						key={table}
						label={table}
						onClick={() => setValue(`select * from ${table}`)}
					/>
				))}
			</Stack>
		</Box>
	);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					{!isMobileView && (
						<>
							<IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 0 }}>
								<JoinFull />
							</IconButton>
							<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
								SQL Editor
							</Typography>
						</>
					)}
					<Button onClick={onSubmit} color="inherit">
						<PlayCircle sx={{ marginRight: '5px' }} />
						Run Query
					</Button>
					<Button onClick={toggleDrawer('right', true)} color="inherit">
						<TableChart sx={{ marginRight: '5px' }} />
						Available Tables
					</Button>
					<Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
						{selectTables('right')}
					</Drawer>
				</Toolbar>
			</AppBar>
			<Snackbar anchorOrigin={{ horizontal, vertical }} open={open} autoHideDuration={2000} onClose={handleClose}>
				<Alert onClose={handleClose} severity={showToast} sx={{ width: '100%' }}>
					{toastMsg}
				</Alert>
			</Snackbar>
		</Box>
	);
}

export default Navbar;
