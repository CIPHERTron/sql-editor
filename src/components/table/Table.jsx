/* eslint-disable react/jsx-key */
import React, { useState } from 'react';

import { Helmet } from 'react-helmet';
import CsvDownload from 'react-json-to-csv';
import { useAsyncDebounce, useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';
import { exportToJson } from 'utils';

import {
	DownloadForOffline,
	KeyboardArrowLeft,
	KeyboardArrowRight,
	KeyboardDoubleArrowLeft,
	KeyboardDoubleArrowRight,
} from '@mui/icons-material';
import {
	Button,
	IconButton,
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));

const GlobalFilter = ({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) => {
	const count = preGlobalFilteredRows.length;
	const [value, setValue] = useState(globalFilter);
	const onChange = useAsyncDebounce((value) => {
		setGlobalFilter(value || undefined);
	}, 200);

	return (
		<>
			<Helmet>
				<title>{`SQL Editor`}</title>
			</Helmet>
			<label className="flex gap-x-2 items-baseline">
				<span className="text-primary-dark hidden md:inline-block font-semibold">Search: </span>
				<input
					type="text"
					className="text-primary-dark rounded-md shadow-sm outline-none border-2 border-gray-300 focus:border-primary-dark transition p-2 w-40 md:w-52 "
					value={value || ''}
					onChange={(e) => {
						setValue(e.target.value);
						onChange(e.target.value);
					}}
					placeholder={`${count} records...`}
				/>
			</label>
		</>
	);
};

const TableComponent = ({ columns, data, completeData, query }) => {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		prepareRow,
		previousPage,
		nextPage,
		canPreviousPage,
		canNextPage,
		state,
		setPageSize,
		pageOptions,
		gotoPage,
		pageCount,
		setGlobalFilter,
		preGlobalFilteredRows,
	} = useTable(
		{
			columns,
			data,
		},
		useGlobalFilter,
		useSortBy,
		usePagination,
	);
	return (
		<>
			<Stack direction="row" justifyContent="space-between" alignItems="center">
				<GlobalFilter
					preGlobalFilteredRows={preGlobalFilteredRows}
					globalFilter={state.globalFilter}
					setGlobalFilter={setGlobalFilter}
				/>
				<Stack direction="row" justifyContent="space-between" alignItems="center">
					<CsvDownload data={completeData} filename={`${query}.csv`}>
						<Button color="inherit" variant="contained">
							<DownloadForOffline sx={{ marginRight: '5px' }} />
							CSV
						</Button>
					</CsvDownload>
					<Button onClick={() => exportToJson(completeData, query)} variant="contained" color="inherit">
						<DownloadForOffline sx={{ marginRight: '5px' }} />
						JSON
					</Button>
				</Stack>
			</Stack>

			{/* table */}
			<TableContainer component={Paper}>
				<Table {...getTableProps()} sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						{headerGroups.map((headerGroup) => (
							<TableRow {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<StyledTableCell
										scope="col"
										className="px-6 py-4 text-left text-xs font-medium text-white  uppercase tracking-wider"
										{...column.getHeaderProps(column.getSortByToggleProps())}>
										<span className=" hover:text-gray-300">{column.render('Header')}</span>
										<span>{column.isSorted ? (column.isSortedDesc ? ' ▼' : ' ▲') : ''}</span>
									</StyledTableCell>
								))}
							</TableRow>
						))}
					</TableHead>

					<TableBody {...getTableBodyProps()}>
						{page.map((row) => {
							prepareRow(row);
							return (
								<StyledTableRow {...row.getRowProps()} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									{row.cells.map((cell) => {
										return <StyledTableCell {...cell.getCellProps()}>{cell.render('Cell')}</StyledTableCell>;
									})}
								</StyledTableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>

			{/* Pagination */}
			<div className="py-3 flex items-center justify-between">
				<div className="flex-1 flex justify-between sm:hidden">
					<Button onClick={() => previousPage()} disabled={!canPreviousPage}>
						Previous
					</Button>
					<Button onClick={() => nextPage()} disabled={!canNextPage}>
						Next
					</Button>
				</div>
				<div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
					<div className="flex gap-x-2">
						<span className="text-sm text-gray-700">
							Page <span className="font-medium">{state.pageIndex + 1}</span> of{' '}
							<span className="font-medium">{pageOptions.length}</span>
						</span>
						<select
							className="text-black outline-none bg-white border-2 border-transparent focus:border-primary-dark rounded-md cursor-pointer"
							value={state.pageSize}
							onChange={(e) => {
								setPageSize(Number(e.target.value));
							}}>
							{[5, 10].map((pageSize) => (
								<option key={pageSize} value={pageSize}>
									Show {pageSize}
								</option>
							))}
						</select>
					</div>
					<div>
						<nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
							<IconButton
								className="rounded-l-md"
								onClick={() => gotoPage(0)}
								disabled={!canPreviousPage}
								aria-label="First Page">
								<KeyboardDoubleArrowLeft>
									<span className="sr-only">First</span>
									<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
										<title id="pageOne">Go to page one</title>
										<path
											fillRule="evenodd"
											d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
											clipRule="evenodd"
										/>
									</svg>
								</KeyboardDoubleArrowLeft>
							</IconButton>

							<IconButton onClick={() => previousPage()} disabled={!canPreviousPage} aria-label="Previous">
								<KeyboardArrowLeft>
									<span className="sr-only">Previous</span>
									<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
										<title id="previousPage">Go to previous page</title>
										<path
											fillRule="evenodd"
											d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
											clipRule="evenodd"
										/>
									</svg>
								</KeyboardArrowLeft>
							</IconButton>

							<IconButton onClick={() => nextPage()} disabled={!canNextPage} aria-label="Next">
								<KeyboardArrowRight>
									<span className="sr-only">Next</span>
									<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
										<title id="nextPage">Go to next page</title>
										<path
											fillRule="evenodd"
											d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
											clipRule="evenodd"
										/>
									</svg>
								</KeyboardArrowRight>
							</IconButton>

							<IconButton
								className="rounded-r-md"
								onClick={() => gotoPage(pageCount - 1)}
								disabled={!canNextPage}
								aria-label="Last Page">
								<KeyboardDoubleArrowRight>
									<span className="sr-only">Last</span>
									<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
										<title id="lastPage">Go to last page</title>
										<path
											fillRule="evenodd"
											d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
											clipRule="evenodd"
										/>
										<path
											fillRule="evenodd"
											d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
											clipRule="evenodd"
										/>
									</svg>
								</KeyboardDoubleArrowRight>
							</IconButton>
						</nav>
					</div>
				</div>
			</div>
		</>
	);
};

export default TableComponent;