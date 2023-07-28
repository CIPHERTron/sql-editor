import React, { Suspense, useState } from 'react';

import { Editor, Navbar, TableContainer } from 'components';

import { LinearProgress as Loader } from '@mui/material';

function Home() {
	const [query, setQuery] = useState('');
	const [value, setValue] = useState('select * from customers');
	const [history, setHistory] = useState([]);

	console.log(history);

	return (
		<div>
			<Navbar
				query={query}
				setQuery={setQuery}
				value={value}
				setValue={setValue}
				history={history}
				setHistory={setHistory}
			/>
			<div>
				<Suspense fallback={<Loader />}>
					<Editor value={value} setValue={setValue} history={history} />
					{query ? <TableContainer query={query} /> : null}
				</Suspense>
			</div>
		</div>
	);
}

export default Home;
