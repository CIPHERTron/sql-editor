import React, { Suspense, useState } from 'react';

import { Editor, Footer, Navbar, TableContainer } from 'components';

import { CircularProgress as Loader } from '@mui/material';

function Home() {
	const [query, setQuery] = useState('');
	const [value, setValue] = useState('select * from customers');
	const [isOpen] = useState(false);

	return (
		<div>
			<Navbar query={query} setQuery={setQuery} value={value} />
			<div className="grid grid-cols-layout-desktop grid-rows-layout-desktop min-h-screen">
				<Suspense fallback={<Loader />}>
					<Editor value={value} setValue={setValue} isOpen={isOpen} />
					{query ? <TableContainer query={query} isOpen={isOpen} /> : null}
				</Suspense>
			</div>
			<Footer />
		</div>
	);
}

export default Home;
