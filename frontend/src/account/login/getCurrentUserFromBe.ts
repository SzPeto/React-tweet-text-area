import { api } from '@/_utils/swagger-api/swaggerApi'
import { logout } from '../../_layout/navbar/logout'

export const getCurrentUserFromBe = async () => {
  let json

  try {
    const res = await api.auth.authControllerMe()
    json = res.data
  } catch(err: any) {
    const errorMessage = err.response?.data?.message ?? 
                         err.data?.message ?? 
                         err.message ?? 
                         'Unknown error while fetching user'

    if (err.response?.status !== 401) {
      logout()
    }

    return { success: false, error: errorMessage }
  }
  return { success: true, json: json }
}