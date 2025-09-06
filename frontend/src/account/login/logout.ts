import { useLoginStore } from '@/account/login/useLoginStore'
import { useFlashMessageStore } from '@/ui/flash/useFlashMessageStore'
import api from '@/_utils/axios/axios'

export const logout = async () => {
  const { logoutUserFe } = useLoginStore.getState()
  const { setFlashMessage } = useFlashMessageStore.getState()

  try {
    await api.post('/api/auth/logout') // Logout in backend
  } catch(err: any) {
    setFlashMessage(`Server logout failed, session may still be active : ${ err.message ?? err  }`, 'warning')
  }

  logoutUserFe() // Logout in frontend
  setFlashMessage('User logged out successfully', 'success')
}