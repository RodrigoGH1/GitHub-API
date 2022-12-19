import React from 'react'
import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material'
import {
    AdditionalHeaderCell,
    AdditionalHeaderCellNarrow,
    StyledHeaderCell,
    StyledSpan,
    StyledTableRow,
} from './EnhancedTableHead.styled'

/*
The component below takes care of the Event Table Header, 
allowing for sorting of certain columns.
*/

export const EnhancedTableHead = ({ order, orderBy, onRequestSort }) => {
    const createSortHandler = (property) => (event) => {
        onRequestSort(property)
    }

    return (
        <TableHead>
            <StyledTableRow>
                <TableCell>
                    <b>Login Name</b>
                </TableCell>
                <TableCell
                    key="created_at"
                    sortDirection={orderBy === 'created_at' ? order : false}
                >
                    <TableSortLabel
                        active={orderBy === 'created_at'}
                        direction={orderBy === 'created_at' ? order : 'asc'}
                        onClick={createSortHandler('created_at')}
                    >
                        {<b>Created at (sorteable)</b>}
                        {orderBy === 'created_at' ? (
                            <StyledSpan>
                                {order === 'desc'
                                    ? 'sorted descending'
                                    : 'sorted ascending'}
                            </StyledSpan>
                        ) : null}
                    </TableSortLabel>
                </TableCell>
                <AdditionalHeaderCellNarrow>
                    <b>Repo ID</b>
                </AdditionalHeaderCellNarrow>
                <AdditionalHeaderCellNarrow>
                    <b>Repo Name</b>
                </AdditionalHeaderCellNarrow>
                <AdditionalHeaderCellNarrow>
                    <b>Public</b>
                </AdditionalHeaderCellNarrow>
                <AdditionalHeaderCell>
                    <b>Type</b>
                </AdditionalHeaderCell>
            </StyledTableRow>
        </TableHead>
    )
}
