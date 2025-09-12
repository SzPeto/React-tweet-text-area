import { Configuration, TweetsApi, UsersApi, AuthApi } from '@/_api'

const publicConfig = new Configuration({})
const privateConfig = new Configuration({
  accessToken: () => localStorage.getItem('accessToken') ?? ''
})

export const tweetsApi = new TweetsApi(privateConfig)
export const usersApi = new UsersApi(publicConfig)
export const authApi = new AuthApi(privateConfig)