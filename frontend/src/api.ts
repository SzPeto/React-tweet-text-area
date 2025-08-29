import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000', // backend URL
  withCredentials: true, // needed if you use cookies/sessions
})

// OPTIONAL: Add an interceptor for attaching tokens
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default api