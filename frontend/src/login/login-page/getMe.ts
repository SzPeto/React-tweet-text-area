import api from '@/api'

export const getMe = async () => {
  try {
    const response = await api.get('/api/auth/me')
    return response.data
  } catch (err) {
    return { error: err }
  }
}