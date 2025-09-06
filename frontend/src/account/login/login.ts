import { useLoginStore } from '@/account/login/useLoginStore'
import { useFlashMessageStore } from '@/ui/flash/useFlashMessageStore'
import { authenticateUser } from '@/account/login/authenticateUser'
import { me } from './getCurrentUser'

export const login = async (userName: string, password: string) => {
  // Use zustand store's imperative API when outside React component
  const loginUserFe = useLoginStore.getState().loginUserFe
  const { setFlashMessage } = useFlashMessageStore.getState()
  const authResponse = await authenticateUser(userName, password)

  if (authResponse.error) {
    const tokenErrorMessage = authResponse.error?.response?.data?.message ?? 
                              authResponse.error?.message ?? 
                              'Error while authenticating user'

    setFlashMessage(tokenErrorMessage, 'warning')
    return { success: false }
  } else {
    setAccessToken(authResponse.accessToken)
    const user = await me()
    if (user.error) {
      return { success: false }
    } else {
      loginUserFe(user._id, user.userName, user.email)
      setFlashMessage(`Welcome ${ user.userName }!`, 'success')
      return { success: true }
    }
  }
}