import styled from '@emotion/styled'
import { ChevronRight } from '@mui/icons-material'
import { Alert, Avatar } from '@mui/material'

export const StyledAvatar = styled(Avatar)`
    margin-top: -10px;
    margin-left: 5px;
`

export const Div = styled.div`
    height: 40px;
    font-size: 22px;
`

export const AvatarDiv = styled.div`
    display: flex;
    height: 30px;
    font-size: 22px;
`

export const AvatarIconDiv = styled.div`
    transform: translateY(4px);
`

export const StyledRight = styled(ChevronRight)`
    transform: translateY(4px);
`

export const FallbackDiv = styled.div`
    margin-top: 60px;
    text-align: center;
`

export const StyledAlert = styled(Alert)`
    font-size: 22px;
    div svg {
        transform: translateY(5px);
    }
`
