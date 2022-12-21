import {
    Alert,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
} from '@mui/material'
import { capitalize } from 'lodash'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { useLocation } from 'react-router-dom'

import { getGitHubEvents } from '../../../api'
import { EventResponse } from '../../../types'
import { ReturnButton } from '../../molecules/ReturnButton/ReturnButton'
import {
    FallbackDiv,
    StyledAlert,
} from '../../organisms/AccountField/AccountField.styled'
import { EnhancedTableHead } from '../../organisms/TableAdditionals/EnhancedTableHead'
import { TablePaginationActions } from '../../organisms/TableAdditionals/TablePaginationActions'
import {
    AdditionalCell,
    AdditionalCellNarrow,
    StyledBodyRow,
    StyledCount,
} from './Events.styled'

/*
Events renders a template listing the events of a selected user. The table head is imported
using the 'EnhancedTableHead' component
*/

export type OrderBy = 'created_at'
export type Order = 'asc' | 'desc'

export const Events = () => {
    // Used for grabbing the name of the Account from the provided URL
    const { pathname } = useLocation()
    // States used for the pagination
    const [page, setPage] = useState<number>(0)
    const [rowsPerPage, setRowsPerPage] = useState<number>(10)
    // States used for sorting
    const [order, setOrder] = useState<Order>('asc')
    const [orderBy, setOrderBy] = useState<OrderBy>('created_at')
    // Events query below
    const accountName = pathname.split('/')[1]
    const { data, isError, isLoading } = useQuery(
        ['getAccountList', accountName],
        () => getGitHubEvents(accountName)
    )

    function descendingComparator(
        a: EventResponse,
        b: EventResponse,
        orderBy: OrderBy
    ): number {
        if (b[orderBy] < a[orderBy]) {
            return -1
        }
        if (b[orderBy] > a[orderBy]) {
            return 1
        }
        return 0
    }

    function getComparator(order: Order, orderBy: OrderBy) {
        return order === 'desc'
            ? (a: EventResponse, b: EventResponse) =>
                  descendingComparator(a, b, orderBy)
            : (a: EventResponse, b: EventResponse) =>
                  -descendingComparator(a, b, orderBy)
    }

    function stableSort(array: EventResponse[], comparator: any) {
        const stabilizedThis = array.map((el: EventResponse, index: number) => [
            el,
            index,
        ])
        stabilizedThis.sort(
            (a: [EventResponse, number], b: [EventResponse, number]) => {
                const order: number = comparator(a[0], b[0])
                if (order !== 0) {
                    return order
                }
                return a[1] - b[1]
            }
        )
        return stabilizedThis.map((el: [EventResponse, number]) => {
            return el[0]
        })
    }

    const handleRequestSort = (property: OrderBy) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    if (isLoading) {
        return (
            <FallbackDiv>
                <CircularProgress />
            </FallbackDiv>
        )
    }
    if (isError) {
        return (
            <StyledAlert severity="error">
                Something went wrong with the Git events query
            </StyledAlert>
        )
    }

    const allEvents = data || []
    if (allEvents.length === 0 || !Array.isArray(allEvents)) {
        return (
            <>
                <ReturnButton />
                <Alert severity="warning">No events found</Alert>
            </>
        )
    }

    // Below returns the table body as mapped rows
    const eventsArraySorteable = stableSort(
        allEvents as EventResponse[],
        getComparator(order, orderBy)
    ).map((row, index) => {
        const labelId = `enhanced-table-checkbox-${index}`
        const date = new Date(row?.created_at)
        const dateFormatted =
            date.getDate() +
            '.' +
            (date.getMonth() + 1) +
            '.' +
            date.getFullYear()

        return (
            <StyledBodyRow key={labelId}>
                <TableCell>{capitalize(row.actor.login)}</TableCell>
                <TableCell>{dateFormatted}</TableCell>
                <AdditionalCellNarrow>{row.repo.id}</AdditionalCellNarrow>
                <AdditionalCellNarrow>{row.repo.name}</AdditionalCellNarrow>
                <AdditionalCellNarrow>
                    {row.public ? 'Public' : 'Private'}
                </AdditionalCellNarrow>
                <AdditionalCell>{row.type}</AdditionalCell>
            </StyledBodyRow>
        )
    })
    //debugger

    // Slicing logic to avoid too many rows to be rendered at once, the others get paginated
    const slicedDocs = eventsArraySorteable.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    )

    /*
       Below is the main return of the Events component
    */

    return (
        <div style={{ margin: '0 5px 5px 15px' }}>
            <ReturnButton />
            <StyledCount>
                {allEvents?.length} {pluralizeEvents(allEvents?.length)} found
                for <b>{capitalize(accountName)}</b>
            </StyledCount>
            <div>
                <TableContainer>
                    <Table>
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {/* Here is the where the sliced doc objects might get sliced */}
                            {rowsPerPage > 0 && slicedDocs}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[
                        5,
                        10,
                        25,
                        { label: 'All', value: allEvents?.length },
                    ]}
                    component="div"
                    colSpan={1}
                    count={data ? data.length : 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                        inputProps: {
                            'aria-label': 'rows per page',
                        },
                        native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                />
            </div>
        </div>
    )
}

export const pluralizeEvents = (count: number): string => {
    if (count === 1) {
        return 'event'
    } else {
        return 'events'
    }
}
