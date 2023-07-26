import React, { Suspense, useState } from 'react';

import { Editor, Footer, Navbar, TableContainer } from 'components';
import { Toaster } from 'react-hot-toast';

import { CircularProgress as Loader } from '@mui/material';

function Home() {
	const [query, setQuery] = useState('');
	const [value, setValue] = useState('select * from customers');
	const [isOpen] = useState(false);

	return (
		<div>
			<Navbar />
			<Toaster
				position="top-center"
				gutter={8}
				containerClassName=""
				containerStyle={{}}
				toastOptions={{
					className: '',
					duration: 5000,
					style: {
						background: '#ffffff',
						color: '#3A4374',
					},
					success: {
						duration: 3000,
						iconTheme: {
							primary: '#4661E6',
							secondary: '#ffffff',
						},
					},
					error: {
						iconTheme: {
							primary: '#D73737',
							secondary: '#ffffff',
						},
					},
				}}
			/>
			<div className="grid grid-cols-layout-desktop grid-rows-layout-desktop min-h-screen">
				<Suspense fallback={<Loader />}>
					<Editor setQuery={setQuery} value={value} setValue={setValue} isOpen={isOpen} />
					{query ? <TableContainer query={query} isOpen={isOpen} /> : null}
				</Suspense>
			</div>
			<Footer />
		</div>
	);
}

export default Home;
