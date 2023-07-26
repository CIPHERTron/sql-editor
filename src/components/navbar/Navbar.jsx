import React, { useState } from 'react';

import { JoinFull, TableChart } from '@mui/icons-material';
import { AppBar, Box, Button, Drawer, IconButton, Toolbar, Typography } from '@mui/material';

function Navbar() {
	const [state, setState] = useState({
		right: false,
	});

	const toggleDrawer = (anchor, open) => (event) => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	const history = (anchor) => (
		<Box
			sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
			role="presentation"
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}>
			<Typography>History displayed here</Typography>
		</Box>
	);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 0 }}>
						<JoinFull />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						SQL Editor
					</Typography>
					<Button onClick={toggleDrawer('right', true)} color="inherit">
						<TableChart sx={{ marginRight: '5px' }} />
						Available Tables
					</Button>
					<Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
						{history('right')}
					</Drawer>
				</Toolbar>
			</AppBar>
		</Box>
	);
}

export default Navbar;
