import { api } from '../../_api/swagger-api/swaggerApi'

export const loginHelper = async (userName: string, password: string) => {
  const user = { userName, password }
  let res: any
  let data: any

  try {
    res = await api.auth.authControllerLogin(user)
    data = res.data
  } catch(err: any) {
    const errorMessage = err.response?.data?.message ?? 
                         err.res?.data?.message ?? 
                         err.data?.message ?? 
                         err.message ?? 
                         'User authorization error'
    
    throw new Error(errorMessage)
  }

  if (data.accessToken) {
    localStorage.setItem('accessToken', data.accessToken)
  } else {
    return { success: false }
  }
  return { success: true }
}