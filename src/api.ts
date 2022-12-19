import axios from 'axios'
import { EventResponse, GithubAccount } from './types'

export const getGitHubAccount = async (name: string) => {
    const response = await axios.get(`https://api.github.com/users/${name}`)
    return response.data as GithubAccount
}

export const getGitHubEvents = async (name: string) => {
    const response = await axios.get(
        `https://api.github.com/users/${name}/events`
    )
    return response.data as EventResponse[]
}
