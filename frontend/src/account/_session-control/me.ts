import { useFlashMessageStore } from '@/ui/flash/useFlashMessageStore'
import api from '@/_utils/axios/axios'

export const me = async () => {
  const { setFlashMessage } = useFlashMessageStore.getState()

  try {
    const response = await api.get('/api/auth/me')
    return response.data
  } catch (err: any) {
    console.log('Server error : ', err)
    const userErrorMessage = err.message ?? 
                             'Error fetching user'
    setFlashMessage(userErrorMessage, 'warning')
    return { error: err }
  }
}