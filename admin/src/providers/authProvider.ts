import { AuthProvider } from '@refinedev/core'
import { loginHelper } from './auth-utils/loginHelper'
import { getIdentityHelper } from './auth-utils/getIdentityHelper'
import { onErrorHelper } from './auth-utils/onErrorHelper'

export const authProvider: AuthProvider = {
  getIdentity: async () => {
    const data = await getIdentityHelper()
    return data
  },
  check: async () => {
    const token = localStorage.getItem('accessToken')
    return { authenticated: Boolean(token) }
  },
  login: async ({ userName, password }) => {
    const res = await loginHelper(userName, password)
    return res
  },
  logout: async () => {
    localStorage.removeItem('accessToken')
    return { success: true }
  },
  onError: async (error) => {
    const res = onErrorHelper(error)
    return res ?? {}
  }
}