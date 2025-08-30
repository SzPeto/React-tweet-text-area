import api from '@/api'

export const authenticateUser = async (userName: string, password: string) => {
  let json
  const user = {
    userName: userName,
    password: password
  }

  try {
    const response = await api.post('/api/auth/login', user)
    json = response.data
  } catch(err) {
    return { error: err }
  }

  return json
}