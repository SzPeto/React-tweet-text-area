import api from '@/_api/api'
import { useLoginStore } from '../login-page/useLoginStore'
import { authenticateUser } from '../login-page/authenticateUser'
import { getMe } from '../login-page/getMe'
import { useFlashMessageStore } from '@/ui/flash/useFlashMessageStore'

const loginUserFe = useLoginStore((s) => s.loginUserFe)
const logoutUserFe = useLoginStore((s) => s.logoutUserFe)
const setFlashMessage = useFlashMessageStore((s) => s.setFlashMessage)
const setAccessToken = useLoginStore((s) => s.setAccessToken)

export const login = async (userName: string, password: string) => {
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
      loginUserFe(user.userName, json.accessToken, user.email, user.picturePath)
      setFlashMessage(`Welcome ${ userName }!`, 'success')
      return { success: true }
    }
  }
}

export const me = () => getMe()

export const logout = () => {
  logoutUserFe() // Logout in frontend
  api.post('/api/auth/logout') // Logout in backend
}