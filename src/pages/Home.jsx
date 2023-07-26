import React, { Suspense, useState } from 'react';

import { Editor, Navbar, TableContainer } from 'components';

import { LinearProgress as Loader } from '@mui/material';

function Home() {
	const [query, setQuery] = useState('');
	const [value, setValue] = useState('select * from customers');
	const [history, setHistory] = useState([]);
	const [isOpen] = useState(false);

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
			<div className="grid grid-cols-layout-desktop grid-rows-layout-desktop min-h-screen">
				<Suspense fallback={<Loader />}>
					<Editor value={value} setValue={setValue} isOpen={isOpen} history={history} />
					{query ? <TableContainer query={query} isOpen={isOpen} /> : null}
				</Suspense>
			</div>
			{/* <Footer /> */}
		</div>
	);
}

export default Home;
