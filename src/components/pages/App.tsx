import {
    createTheme,
    CssBaseline,
    ThemeProvider,
    Typography,
} from '@mui/material'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { SearchField } from '../templates/SearchField/SearchField'

/*
The App component ....
*/

const App = () => {
    // Set a theme similar to Tapia's website
    const theme = createTheme({
        palette: {
            mode: 'dark',
        },
        typography: {
            h2: { fontWeight: 900, margin: '0 0 15px 15px' },
            fontFamily: 'Rajdhani,sans-serif',
        },
    })

    // queryClient necessary for react-query requests
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: { staleTime: 1000 * 60 * 60, cacheTime: 1000 * 60 * 60 }, // 1 hour for both
        },
    })

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Typography variant="h2">tapio - Github API</Typography>
                <SearchField />
            </ThemeProvider>
        </QueryClientProvider>
    )
}

export default App
