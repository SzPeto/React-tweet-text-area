import { useLoginStore } from '@/account/login/useLoginStore'
import { authenticateUser } from '@/account/login/authenticateUser'
import { getCurrentUserFromBe } from './getCurrentUserFromBe'

export const login = async (userName: string, password: string) => {
  const loginUserFe = useLoginStore.getState().loginUserFe
  const authResponse = await authenticateUser(userName, password)

  if (authResponse.error) {
    const tokenErrorMessage = authResponse.error?.response?.data?.message ?? 
                              authResponse.error?.message ?? 
                              'Error while authenticating user'

    /* setFlashMessage(tokenErrorMessage, 'warning') */
    return { success: false }
  } else {
    localStorage.setItem('accessToken', authResponse.accessToken)
    const user = await getCurrentUserFromBe()
    if (user.error) {
      return { success: false }
    } else {
      loginUserFe(user._id, user.userName, user.email)
      /* setFlashMessage(`Welcome ${ user.userName }!`, 'success') */
      return { success: true }
    }
  }
}