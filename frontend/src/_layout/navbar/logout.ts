import { useLoginStore } from '@/account/login/useLoginStore'

export const logout = async () => {
  const { logoutUserFe } = useLoginStore.getState()

  logoutUserFe() // Logout in frontend
  localStorage.removeItem('accessToken')
}