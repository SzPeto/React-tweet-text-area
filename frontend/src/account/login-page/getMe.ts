import api from '@/api'

export const getMe = async (accessToken: string) => {
  let json
  const request = {
    headers: {
      Authorization: `Bearer ${ accessToken }`,
    }
  }

  try {
    const response = await api.get('/api/auth/me', request)
    json = response.data
  } catch(err) {
    return { error: err }
  }

  return json
}