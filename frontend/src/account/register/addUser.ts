import { usersApi } from '@/_utils/swagger-api/swaggerApi'
import { useFlashMessagesStore } from '@/ui/flash/useFlashMessageStore'

export const addUser = async (userName: string, email: string, password: string) => {
  let json
  const user = {
    userName: userName,
    email: email,
    password: password
  }
  const addFlashMessage = useFlashMessagesStore.getState().addFlashMessage

  try {
    const response = await usersApi.usersControllerCreateUser(user)
    json = response.data
  } catch(err: any) {
    const errorMessage = err.response?.data?.message ?? 
                         err.data?.message ?? 
                         err.message ?? 
                         'Unknown error while registering user'

    return { success: false, error: errorMessage }
  }
  
  addFlashMessage(`User ${ json.userName } registered successfully`, 'success')
  return { success: true, json: json }
}