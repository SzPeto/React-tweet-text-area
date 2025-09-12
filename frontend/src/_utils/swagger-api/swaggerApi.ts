import { Api } from '@/_api/Api'  

// create instance with baseURL and optional securityWorker
export const api = new Api({
  securityWorker: () => {
    const token = localStorage.getItem('accessToken')
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {}
  },
})