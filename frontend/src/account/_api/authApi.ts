import { useLoginStore } from '@/account/login-page/useLoginStore'
import { useFlashMessageStore } from '@/ui/flash/useFlashMessageStore'
import { authenticateUser } from '@/account/login-page/authenticateUser'
import api from '@/_utils/api/api'
import { getMe } from '@/account/login-page/getMe'

export const login = async (userName: string, password: string) => {
  // Use zustand store's imperative API when outside React component
  const { loginUserFe, setAccessToken } = useLoginStore.getState()
  const { setFlashMessage } = useFlashMessageStore.getState()
  const json = await authenticateUser(userName, password)

  if (json.error) {
    const jsonErrorMessage = json.error?.response?.data?.message ?? json.error?.message ?? 'Error while authenticating user'
    setFlashMessage(`Login unsuccessful, error while authenticating user : ${ jsonErrorMessage }`, 'warning')
    return { success: false }
  } else {
    setAccessToken(json.accessToken)
    const user = await getMe()
    if (user.error) {
      const userErrorMessage = user.error?.response?.data?.message ?? user.error?.message ?? 'Error fetching user'
      setFlashMessage(`Login unsuccessful, error while fetching user : ${ userErrorMessage }`, 'warning')
      return { success: false }
    } else {
      loginUserFe(user._id, user.userName, user.email, user.picturePath)
      setFlashMessage(`Welcome ${ user.userName }!`, 'success')
      return { success: true }
    }
  }
}

export const me = () => getMe()

export const logout = async () => {
  const { logoutUserFe } = useLoginStore.getState()
  const { setFlashMessage } = useFlashMessageStore.getState()

  try {
    await api.post('/api/auth/logout') // Logout in backend
  } catch(err) {
    setFlashMessage(`Server logout failed, session may still be active : ${ err }`, 'warning')
  }

  logoutUserFe() // Logout in frontend
  setFlashMessage('User logged out successfully', 'success')
}