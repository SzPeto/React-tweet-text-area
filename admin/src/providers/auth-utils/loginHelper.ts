import { api } from '../../_api/swagger-api/swaggerApi'

export const loginHelper = async (userName: string, password: string) => {
  const user = { userName, password }
  const res = await api.auth.authControllerLogin(user)
  const data = res.data

  if (data.accessToken) {
    localStorage.setItem('accessToken', data.accessToken)
  } else {
    return { success: false }
  }
  
  if (res.status < 200 || res.status > 299) {
    throw res
  }
  return { success: true }
}