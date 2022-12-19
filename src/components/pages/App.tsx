import {
    createTheme,
    CssBaseline,
    ThemeProvider,
    Typography,
} from '@mui/material'
import React from 'react'

import { SearchField } from '../templates/SearchField/SearchField'

/*
The App component ....
*/

const App = () => {
    const theme = createTheme({
        palette: {
            mode: 'dark',
        },
        typography: {
            h2: { fontWeight: 900, margin: '0 0 15px 15px' },
            fontFamily: 'Rajdhani,sans-serif',
        },
    })
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Typography variant="h2">tapio - Github API</Typography>
            <SearchField />
        </ThemeProvider>
    )
}

export default App
