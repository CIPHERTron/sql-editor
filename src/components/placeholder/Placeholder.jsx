import React from 'react';

import GitHubIcon from '@mui/icons-material/GitHub';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const Placeholder = () => {
	return (
		<Card sx={{ minWidth: 275, maxWidth: 1400, margin: '2% auto', textAlign: 'center', background: '#F3F6F9' }}>
			<CardContent>
				<Typography sx={{ fontSize: 14, textDecoration: 'underline' }} color="text.secondary" gutterBottom>
					Query Output
				</Typography>
				<Stack sx={{ mb: 2 }} direction={'row'} justifyContent={'center'} alignItems={'center'}>
					<Typography sx={{ mr: 1 }} variant="h5" component="div">
						Nothing to display at the moment
					</Typography>
					<SentimentVeryDissatisfiedIcon />
				</Stack>
				<Typography sx={{ mb: 1 }} color="text.secondary">
					Execute a new query by clicking on the &quot;Run Query&quot; button at the top right
				</Typography>
				<Typography sx={{ mb: 1 }} variant="body2">
					OR
				</Typography>
				<Typography color="text.secondary">
					Click on one of the available tables which is present in the sidebar that opens when you click the
					&quot;Available Tables&quot; button.
				</Typography>
			</CardContent>
			<CardActions>
				<Stack sx={{ width: '100%' }} justifyContent={'center'} alignItems={'center'}>
					<Link target="_blank" href="https://github.com/CIPHERTron/sql-editor">
						<Button variant="contained" endIcon={<GitHubIcon />} size="small">
							View GitHub
						</Button>
					</Link>
				</Stack>
			</CardActions>
		</Card>
	);
};

export default Placeholder;
