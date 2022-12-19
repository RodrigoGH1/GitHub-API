import React from 'react'

interface AccountProps {
    value: string
}

export const AccountField = ({ value }: AccountProps) => {
    return <>{value}</>
}
