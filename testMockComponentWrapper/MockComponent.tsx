import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

export const MockComponent = (props: {
    children:
        | string
        | number
        | boolean
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | React.ReactFragment
        | React.ReactPortal
}) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: { staleTime: 1000 * 60 * 60, cacheTime: 1000 * 60 * 60 }, // 1 hour for both
        },
    })
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                {props.children}
            </QueryClientProvider>
        </BrowserRouter>
    )
}
