import api from '@/api'

export const addUser = async (userName: string, email: string, password: string) => {
  let json
  const user = {
    userName: userName,
    email: email,
    password: password
  }

  try {
    const response = await api.post('api/users/register', user)
    json = response.data
  } catch(err: any) {
    return { error: err }
  }

  return json
}