import React from 'react';

import DataObjectIcon from '@mui/icons-material/DataObject';
import { Container } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

function Playground() {
	return (
		<Container>
			<List
				sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
				component="nav"
				aria-labelledby="nested-list-subheader"
				subheader={
					<ListSubheader component="div" id="nested-list-subheader">
						Queries History
					</ListSubheader>
				}>
				<ListItemButton>
					<ListItemIcon>
						<DataObjectIcon />
					</ListItemIcon>
					<ListItemText primary="select * from customers" />
				</ListItemButton>
			</List>
		</Container>
	);
}

export default Playground;
