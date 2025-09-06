import { useFlashMessageStore } from '@/ui/flash/useFlashMessageStore'
import api from '@/_utils/axios/axios'
import { logout } from './logout'

export const me = async () => {
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