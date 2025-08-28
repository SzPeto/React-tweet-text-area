import api from '@/api'

export const addUser = async (userName: string, email: string, password: string) => {
  let json

  const user = {
    userName: userName,
    email: email,
    password: password
  }

  try {
    const response = await api.post('/users/register', user)
    json = response.data
  } catch(err) {
    return { error: err }
  }

  return await json
}