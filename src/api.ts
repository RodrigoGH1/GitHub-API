import axios from 'axios'
import { GithubAccount } from './types'

export const getGitHubAccount = async (name: string) => {
    const response = await axios.get(`https://api.github.com/users/${name}`)
    return response.data as GithubAccount
}
