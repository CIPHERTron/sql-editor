import React from 'react';

import styled from '@emotion/styled';
import { JoinFull } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';

const Flex = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	height: 100px;
	background-color: #1876d1;
	color: #fff;
	margin-top: 30%;
`;

const Branding = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
`;

function Footer() {
	return (
		<Flex>
			<Branding>
				<IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 0 }}>
					<JoinFull />
				</IconButton>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					SQL Editor
				</Typography>
			</Branding>

			<Typography>Designed and Developed with 💙 by CIPHERTron</Typography>
		</Flex>
	);
}

export default Footer;
