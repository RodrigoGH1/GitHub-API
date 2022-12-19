import {
    createTheme,
    CssBaseline,
    ThemeProvider,
    Typography,
} from '@mui/material'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

import { SearchField } from '../templates/SearchField/SearchField'
import { Events } from '../templates/Events/Events'

/*
The App component acts as a router for two main component templates, Events and SearchField
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
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Typography variant="h2">tapio - Github API</Typography>
                    <Routes>
                        <Route path="/" element={<SearchField />} />
                        <Route path="/:user/events" element={<Events />} />
                    </Routes>
                </ThemeProvider>
            </QueryClientProvider>
        </BrowserRouter>
    )
}

export default App
