import { Api } from '../../_api/Api'  

export const api = new Api({
  securityWorker: () => {
    const token = localStorage.getItem('accessToken')
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {}
  },
})