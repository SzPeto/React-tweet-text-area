import { useFlashMessageStore } from '@/ui/flash/useFlashMessageStore'
import api from '@/account/_auth-headers/authHeaders'
import { logout } from '../../_layout/navbar/logout'

export const getCurrentUserFromBe = async () => {
  const { setFlashMessage } = useFlashMessageStore.getState()

  try {
    const response = await api.get('/api/auth/me')
    return response.data
  } catch (err: any) {
    if (err.response?.status !== 401) {
      const userErrorMessage = err.message ?? 
                              'Error fetching user'

      setFlashMessage(userErrorMessage, 'warning')
      logout()
    }
    
    return { error: err }
  }
}