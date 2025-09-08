import api from '@/account/_auth-headers/authHeaders'
import { logout } from '../../_layout/navbar/logout'

export const getCurrentUserFromBe = async () => {
  
  try {
    const response = await api.get('/api/auth/me')
    return response.data
  } catch (err: any) {
    if (err.response?.status !== 401) {
      logout()
    }
    
    return { error: err.message ?? 'Error fetching user' }
  }
}