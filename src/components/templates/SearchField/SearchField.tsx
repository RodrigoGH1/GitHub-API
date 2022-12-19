import { Button, TextField, Typography } from '@mui/material'
import styled from '@emotion/styled'
import React, { useState } from 'react'

import { AccountField } from '../../organisms/AccountField/AccountField'

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
        <div style={{ margin: '20px' }}>
            <div style={{ marginLeft: '16px' }}>
                <Typography>Search for a Github User</Typography>
                <TextField
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
            {renderChild && <AccountField value={finalSearchInputVal} />}
        </div>
    )
}

export const StyledButton = styled(Button)`
    margin-left: 15px;
    margin-top: 2px;
`
