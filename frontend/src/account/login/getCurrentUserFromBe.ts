import api from '@/account/_auth-headers/authHeaders'
import { logout } from '../../_layout/navbar/logout'

export const getCurrentUserFromBe = async () => {
  let json

  try {
    const response = await api.get('/api/auth/me')
    json = response.data
  } catch(err: any) {
    const errorMessage = err.response?.data?.message ?? 
                         err.data?.message ?? 
                         err.message ?? 
                         'Unknown error while fetching user'

    if (err.response?.status !== 401) {
      logout()
    }

    return { success: false, error: errorMessage }
  }
  return { success: true, json: json }
}