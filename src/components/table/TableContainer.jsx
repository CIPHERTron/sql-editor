/* eslint-disable react/display-name */
import React, { useMemo } from 'react';

import useData from 'hooks/useData';

import styled from '@emotion/styled';
import { Box, LinearProgress, Typography } from '@mui/material';

import Table from './Table';

const QueryTime = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	background-color: #1876d1;
	color: #fff;
	padding: 5px;
	border-radius: 8px;
	width: fit-content;
	margin: 0 auto;
	margin-top: 16px;
`;

const TableContainer = React.memo(({ query, isOpen }) => {
	const { data, runtime, error } = useData(query);

	const columns = useMemo(() => {
		if (data.length > 0) {
			return Object.keys(data[0]).map((key) => {
				const result = data[0][key].replace(/([A-Z]+)/g, ' $1').replace(/([A-Z][a-z])/g, ' $1');

				return {
					Header: result,
					accessor: key,
				};
			});
		}
	}, [data]);

	const queryData = useMemo(() => data.slice(1), [data]);
	if (error)
		return (
			<section>
				<h1>Something Went Wrong</h1>
			</section>
		);
	return (
		<>
			<section
				className={`${
					isOpen ? 'col-start-2' : 'col-start-1'
				} col-end-3 row-start-3 row-end-4 text-white mx-6 my-12 lg:mx-12 overflow-hidden`}>
				{data.length > 0 ? (
					<>
						<QueryTime>
							<Typography variant="body1" fontWeight={300}>
								Query took:
							</Typography>
							<Typography variant="subtitle1" fontWeight={700}>{`${runtime.toFixed(2)} ms`}</Typography>
						</QueryTime>
						<Table columns={columns} completeData={data} data={queryData} query={query} />
					</>
				) : (
					<Box sx={{ width: '100%' }}>
						<LinearProgress />
					</Box>
				)}
			</section>
		</>
	);
});

export default TableContainer;
