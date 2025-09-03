import axios, { AxiosError, type AxiosResponse } from 'axios'
import { useLoginStore } from '@/login/login-page/useLoginStore'
import { refreshAccessToken } from './refreshAccessToken'

const api = axios.create({
  baseURL: 'http://localhost:3000', // backend URL
  withCredentials: true, // needed if you use cookies/sessions
})

// Request interceptor for attaching tokens, now every request with axios will have attached to its header the token
api.interceptors.request.use((config) => {
    const token = useLoginStore.getState().accessToken()
    if (token) {
      config.headers = config.headers ?? {} // If not present in config, initialize it as object
      config.headers.Authorization = `Bearer ${ token }`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor: if 401 => refresh => retry once
api.interceptors.response.use(
  (response: AxiosResponse) => response, // success → just pass through

  async (error: AxiosError) => {
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
        useLoginStore.getState().logoutUserFe() // refresh failed → logout
      }
    }

    return Promise.reject(error)
  }
)

export default api