import api from './axios'
import { useLoginStore } from '@/account/login-page/useLoginStore'

let refreshPromise: Promise<string> | null = null

export async function refreshAccessToken(): Promise<string> {
  // If no refresh is in progress, start one
  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        const refreshResponse = await api.post('/api/auth/refresh')
        const newToken = refreshResponse.data?.accessToken as string
        if (!newToken) {
          throw new Error('No accessToken in refresh response')
        }
        useLoginStore.getState().setAccessToken(newToken)
        return newToken
      } finally {
        // always clear after it finishes (success or fail)
        refreshPromise = null
      }
    })()
  }
  // If a refresh is already happening, wait for it
  return refreshPromise
}