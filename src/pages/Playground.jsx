import React from 'react';

import {
	KeyboardArrowLeft,
	KeyboardArrowRight,
	KeyboardDoubleArrowLeft,
	KeyboardDoubleArrowRight,
} from '@mui/icons-material';
import { Container, FormControl, IconButton, InputLabel, MenuItem, Select, Stack } from '@mui/material';

function Playground() {
	return (
		<Container>
			<FormControl sx={{ m: 1, minWidth: 120 }}>
				<InputLabel id="demo-simple-select-label">No. of rows per page</InputLabel>
				<Select labelId="demo-simple-select-label" id="demo-simple-select" value={5} label="Age" onChange={() => {}}>
					<MenuItem value={5}>5</MenuItem>
					<MenuItem value={10}>10</MenuItem>
					<MenuItem value={20}>20</MenuItem>
				</Select>
			</FormControl>
			<Stack direction="row" justifyContent="center" alignItems="center">
				<IconButton onClick={() => {}}>
					<KeyboardDoubleArrowLeft />
				</IconButton>
				<IconButton onClick={() => {}}>
					<KeyboardArrowLeft />
				</IconButton>
				<IconButton onClick={() => {}}>
					<KeyboardArrowRight />
				</IconButton>
				<IconButton onClick={() => {}}>
					<KeyboardDoubleArrowRight />
				</IconButton>
			</Stack>
		</Container>
	);
}

export default Playground;
