import { Button, TextField, Typography } from '@mui/material'
import styled from '@emotion/styled'
import React, { useState } from 'react'

/*
The SearchField Component consists of multiple components managing the
input fields necessary to query a GitHub account
*/

export const SearchField = () => {
    const [inputData, setInputData] = useState<string>('')
    const [finalSearchInputVal, setFinalSearchInputVal] = useState<string>('')
    const [renderChild, setRenderChild] = useState<boolean>(false)

    const handleClick = (e: any) => {
        setFinalSearchInputVal(inputData)
        setRenderChild(true)
    }

    const format = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/
    const isInputError = format.test(inputData)
    return (
        <div style={{ margin: '15px' }}>
            <Typography>Search for a Github User</Typography>
            <TextField
                label="by Name"
                data-testid="search-text-field"
                variant="outlined"
                onChange={(e: any) => setInputData(e.target.value)}
                error={isInputError}
                helperText="Cannot use special characters"
            />
            <StyledButton
                variant="contained"
                disabled={inputData === '' || isInputError}
                data-testid="search-button"
                onClick={(e: any) => handleClick(e)}
            >
                Search
            </StyledButton>
        </div>
    )
}

export const StyledButton = styled(Button)`
    margin-left: 15px;
    margin-top: 18px;
`
