import api from '@/account/_auth-headers/authHeaders'
import { useFlashMessageStore } from '@/ui/flash/useFlashMessageStore'

export const addUser = async (userName: string, email: string, password: string) => {
  let json
  const user = {
    userName: userName,
    email: email,
    password: password
  }
  const setFlashMessage = useFlashMessageStore.getState().setFlashMessage

  try {
    const response = await api.post('api/users/register', user)
    json = response.data
  } catch(err: any) {
    const errorMessage = err.message ?? err.data?.message ?? 'Unknown error'
    setFlashMessage(`Registration error : ${ errorMessage }`, 'warning')
    return { error: err }
  }
  
  setFlashMessage(`User ${ json.userName } registered successfully`, 'success')
  return json
}