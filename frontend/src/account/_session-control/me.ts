import api from '@/_utils/axios/axios'

export const me = async () => {
  try {
    const response = await api.get('/api/auth/me')
    return response.data
  } catch (err) {
    return { error: err }
  }
}