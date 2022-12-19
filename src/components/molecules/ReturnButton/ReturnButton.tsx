import React from 'react'
import Button from '@mui/material/Button'
import { ChevronLeft } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

export const ReturnButton = () => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/')
        window.location.reload()
    }
    return (
        <Button
            sx={{ color: '#00ff8c', fontSize: '22px', margin: '0 5px 15px 0' }}
            variant="text"
            startIcon={<ChevronLeft />}
            onClick={() => handleClick()}
        >
            Return to Home
        </Button>
    )
}
