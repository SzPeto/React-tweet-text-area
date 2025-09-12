import { api } from "@/_utils/swagger-api/swaggerApi"

export const authenticateUser = async (userName: string, password: string) => {
  let json
  const user = { userName: userName, password: password }

  try {
    const res = await api.auth.authControllerLogin(user)
    json = res.data
  } catch(err: any) {
    const errorMessage = err.response?.data?.message ?? 
                         err.data?.message ?? 
                         err.message ?? 
                         'Unknown error while authenticating user'

    return { success: false, error: errorMessage }
  }
  return { success: true, json: json }
}