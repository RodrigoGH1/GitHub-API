import { CircularProgress } from '@mui/material'
import { capitalize } from 'lodash'
import React from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

import { getGitHubAccount } from '../../../api'
import { ReturnButton } from '../../molecules/ReturnButton/ReturnButton'
import {
    AvatarDiv,
    AvatarIconDiv,
    Div,
    FallbackDiv,
    StyledAlert,
    StyledAvatar,
    StyledRight,
} from './AccountField.styled'

interface AccountProps {
    value: string
}

/*
The AccountField component renders a template with the general attributes of a user's GitHub account
*/

export const AccountField = ({ value }: AccountProps) => {
    const { data, isError, isLoading } = useQuery(
        ['getAccountDetails', value],
        () => getGitHubAccount(value)
    )

    if (isLoading) {
        return (
            <FallbackDiv>
                <CircularProgress />
            </FallbackDiv>
        )
    }
    if (isError) {
        return (
            <StyledAlert severity="error">
                Something went wrong with the GitHub account query
            </StyledAlert>
        )
    }

    const avatar = (
        <div>
            {<StyledAvatar alt={data?.login} src={data?.avatar_url} /> ?? '-'}
        </div>
    )
    const date = new Date(data?.created_at as any)
    const dateFormatted =
        date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()
    return (
        <div data-testid="accountField" style={{ margin: '25px 0 0 15px' }}>
            <ReturnButton />
            {
                <Div>
                    <AvatarDiv>
                        Login: {capitalize(data?.login) ?? '-'}{' '}
                        {<StyledRight />}
                        <AvatarIconDiv>{avatar}</AvatarIconDiv>
                    </AvatarDiv>
                </Div>
            }
            {<Div>Name: {capitalize(data?.name) ?? '-'}</Div>}
            {<Div>ID: {data?.id ?? '-'}</Div>}
            {<Div>Bio: {data?.bio ?? '-'}</Div>}
            {<Div>E-mail: {data?.email ?? '-'}</Div>}
            {<Div>Company: {data?.id ?? '-'}</Div>}
            {<Div>Blog: {data?.blog ?? '-'}</Div>}
            {<Div>Location: {data?.location ?? '-'}</Div>}
            {<Div>Followers: {data?.followers ?? '-'}</Div>}
            {<Div>Date: {dateFormatted ?? '-'}</Div>}
            {
                <Div>
                    Events:{' '}
                    {
                        <Link
                            style={{ color: '#00ff8c' }}
                            to={`${data?.login}/events`}
                        >
                            More Details
                        </Link>
                    }
                </Div>
            }
        </div>
    )
}
