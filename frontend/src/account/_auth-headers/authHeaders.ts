import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000', // backend URL
  withCredentials: true, // needed if you use cookies/sessions
})

// Request interceptor for attaching tokens, now every request with axios will have attached to its header the token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers = config.headers ?? {} // If not present in config, initialize it as object
      config.headers.Authorization = `Bearer ${ token }`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default api