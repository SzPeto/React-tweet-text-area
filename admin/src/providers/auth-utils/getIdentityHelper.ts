import { api } from '../../_api/swagger-api/swaggerApi'

export const getIdentityHelper = async () => {
  const res = await api.auth.authControllerMe()
  const data = res.data

  if (res.status < 200 || res.status > 299) {
    return null
  }
  return data
}