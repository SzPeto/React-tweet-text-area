import { BaseKey } from '@refinedev/core'
import { api } from '../../_api/swagger-api/swaggerApi'

export const deleteOneHelper = async (id: BaseKey, resource: string) => {
  let res: any
  let data: any
  
  try {
    if (resource === 'tweets') {
      res = await api.tweets.tweetsControllerDeleteTweetById(id as any)
      data = res.data
    } else if (resource === 'users') {
      res = await api.users.usersControllerDeleteUserById(id as any)
      data = res.data
    }
  } catch(err: any) {
    const errorMessage = err.response?.data?.message ?? 
                         err.res?.data?.message ?? 
                         err.data?.message ?? 
                         err.message ?? 
                         'Unknown error while deleting resource'
    
    throw new Error(errorMessage)
  }
  return data
}