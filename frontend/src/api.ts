import axios from 'axios'
import { useLoginStore } from './login/login-page/useLoginStore'

const api = axios.create({
  baseURL: 'http://localhost:3000', // backend URL
  withCredentials: true, // needed if you use cookies/sessions
})

// Interceptor for attaching tokens, now every request with axios will have attached to its header the token
// If you want to remove the token from a request : api.post('/api/auth/login', creds, { headers: { Authorization: '' } })
api.interceptors.request.use((config) => {
    const token = useLoginStore.getState().currentUser.accessToken
    if (token) {
      config.headers.Authorization = `Bearer ${ token }`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default api