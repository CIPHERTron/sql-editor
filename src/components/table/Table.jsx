/* eslint-disable react/jsx-key */
import React, { useState } from 'react';

import { Helmet } from 'react-helmet';
import CsvDownload from 'react-json-to-csv';
import { useAsyncDebounce, useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';
import { exportToJson } from 'utils';

import styled from '@emotion/styled';
import {
	DownloadForOffline,
	KeyboardArrowLeft,
	KeyboardArrowRight,
	KeyboardDoubleArrowLeft,
	KeyboardDoubleArrowRight,
	Search,
} from '@mui/icons-material';
import {
	Button,
	FormControl,
	IconButton,
	Input,
	InputAdornment,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import { styled as s } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

const SearchContainer = styled.div`
	border: 2px solid #1876d0;
	padding: 5px;
	border-radius: 4px;
`;

const StyledTableCell = s(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = s(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));

const SearchRow = ({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) => {
	const count = preGlobalFilteredRows.length;
	const [value, setValue] = useState(globalFilter);
	const onChange = useAsyncDebounce((value) => {
		setGlobalFilter(value || undefined);
	}, 200);

	return (
		<SearchContainer>
			<Helmet>
				<title>{`SQL Editor`}</title>
			</Helmet>
			<Stack direction="row" justifyContent="center" alignItems="center">
				<FormControl variant="outlined">
					<InputLabel htmlFor="input-with-icon-adornment">{`${count} records...`}</InputLabel>
					<Input
						id="input-with-icon-adornment"
						onChange={(e) => {
							setValue(e.target.value);
							onChange(e.target.value);
						}}
						value={value || ''}
						startAdornment={
							<InputAdornment position="start">
								<Search />
							</InputAdornment>
						}
					/>
				</FormControl>
			</Stack>
		</SearchContainer>
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
				<SearchRow
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
			<Stack sx={{ marginTop: '5%' }} direction="column" justifyContent="center" alignItems="center">
				<Typography variant="subtitle1">{`Page ${state.pageIndex + 1} of ${pageOptions.length}`}</Typography>
				<Stack direction="row" justifyContent="flex-end" alignItems="center">
					<FormControl sx={{ m: 1, minWidth: 120 }}>
						<InputLabel>Rows per page</InputLabel>
						<Select
							value={state.pageSize}
							label="Rows per page"
							onChange={(e) => {
								setPageSize(Number(e.target.value));
							}}>
							<MenuItem value={5}>5</MenuItem>
							<MenuItem value={10}>10</MenuItem>
							<MenuItem value={20}>20</MenuItem>
						</Select>
					</FormControl>
					<Stack direction="row" justifyContent="center" alignItems="center">
						<IconButton onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
							<KeyboardDoubleArrowLeft />
						</IconButton>
						<IconButton onClick={() => previousPage()} disabled={!canPreviousPage}>
							<KeyboardArrowLeft />
						</IconButton>
						<IconButton onClick={() => nextPage()} disabled={!canNextPage}>
							<KeyboardArrowRight />
						</IconButton>
						<IconButton onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
							<KeyboardDoubleArrowRight />
						</IconButton>
					</Stack>
				</Stack>
			</Stack>
		</>
	);
};

export default TableComponent;
