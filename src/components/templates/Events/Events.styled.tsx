import styled from '@emotion/styled'
import { TableCell, TableRow, Typography } from '@mui/material'

export const StyledCount = styled(Typography)`
    font-size: 22px;
    color: white;
    margin: 5px 5px 10px 5px;
`

export const StyledBodyRow = styled(TableRow)`
    td {
        font-size: 18px;
    }
    :hover {
        background-color: rgb(242 236 236 / 58%);
    }
`

export const AdditionalCell = styled(TableCell)`
    @media only screen and (max-width: 1520px) {
        display: none;
    }
`

export const AdditionalCellNarrow = styled(TableCell)`
    @media only screen and (max-width: 769px) {
        display: none;
    }
`
