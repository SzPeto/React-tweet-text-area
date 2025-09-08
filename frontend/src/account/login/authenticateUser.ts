import api from '@/account/_auth-headers/authHeaders'

export const authenticateUser = async (userName: string, password: string) => {
  let json
  const user = { userName: userName, password: password }

  try {
    const response = await api.post('/api/auth/login', user)
    json = response.data
  } catch(err: any) {
    const errorMessage = err.response?.data?.message ?? 
                         err.data?.message ?? 
                         err.message ?? 
                         'Unknown error while authenticating user'

    return { success: false, error: errorMessage }
  }

  return { success: true, json: json }
}