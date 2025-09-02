import axios from 'axios'
import { useLoginStore } from './login/login-page/useLoginStore'

// --- Extend Axios config module with our custom flag to avoid TS errors ---
declare module 'axios' {
  export interface AxiosRequestConfig {
    _retry?: boolean
  }
}

const api = axios.create({
  baseURL: 'http://localhost:3000', // backend URL
  withCredentials: true, // needed if you use cookies/sessions
})

// Interceptor for attaching tokens, now every request with axios will have attached to its header the token
// If you want to remove the token from a request : api.post('/api/auth/login', creds, { headers: { Authorization: '' } })
api.interceptors.request.use((config) => {
    const token = useLoginStore.getState().currentUser.accessToken
    if (token) {
      config.headers = config.headers ?? {}
      config.headers.Authorization = `Bearer ${ token }`
    }
    return config
  },
  (error) => Promise.reject(error)
)

let refreshPromise: Promise<string> | null = null

async function refreshAccessToken(): Promise<string> {
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

// --- Response interceptor: if 401 => refresh => retry once ---
api.interceptors.response.use(
  (response) => response, // success → just pass through

  async (error) => {
    const original = error.config             // the request we tried
    const status = error.response?.status     // HTTP status code
    const url = original?.url || ''

    // If we don't know what failed → just bubble up
    if (!original || !status) return Promise.reject(error)

    // Don't refresh while calling refresh (avoid loops)
    const isRefreshCall = url.includes('/auth/refresh')

    // Only handle 401 (expired token), and only once
    if (status === 401 && !original._retry && !isRefreshCall) {
      original._retry = true // mark as retried

      try {
        const newToken = await refreshAccessToken()
        original.headers = original.headers || {}
        original.headers.Authorization = `Bearer ${ newToken }`

        return api(original) // retry the request
      } catch {
        useLoginStore.getState().logoutUser() // refresh failed → logout
      }
    }

    return Promise.reject(error)
  }
)

export default api