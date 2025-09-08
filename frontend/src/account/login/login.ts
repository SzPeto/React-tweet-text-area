import { useFlashMessagesStore } from '@/ui/flash/useFlashMessageStore'
import { useLoginStore } from '@/account/login/useLoginStore'
import { authenticateUser } from '@/account/login/authenticateUser'
import { getCurrentUserFromBe } from './getCurrentUserFromBe'

export const login = async (userName: string, password: string) => {
  const loginUserFe = useLoginStore.getState().loginUserFe
  const addFlashMessage = useFlashMessagesStore.getState().addFlashMessage

  // Checking the username and pw against DB
  const resAuth = await authenticateUser(userName, password)
  if (resAuth.error) {
    return { success: false, error: resAuth.error }
  } 

  // Setting the returned access token to local storage and getting the user from db with access token
  localStorage.setItem('accessToken', resAuth.json.accessToken)
  const resGet = await getCurrentUserFromBe()

  if (resGet.success) {
    const user = resGet.json
    loginUserFe(user._id, user.userName, user.email)
    addFlashMessage(`Welcome ${ user.userName }!`, 'success')
  } else {
    return { success: false, error: resGet.error }
  }

  return { success: true } 
}