import { useLoginStore } from '@/account/login/useLoginStore'
import { useFlashMessageStore } from '@/ui/flash/useFlashMessageStore'

export const logout = async () => {
  const { logoutUserFe } = useLoginStore.getState()
  const { setFlashMessage } = useFlashMessageStore.getState()

  logoutUserFe() // Logout in frontend
  localStorage.removeItem('accessToken')
  setFlashMessage('User logged out successfully', 'success')
}