import { BaseKey } from '@refinedev/core'
import { api } from '../../_api/swagger-api/swaggerApi'

export const updateHelper = async (id: BaseKey, resource: string, variables: any) => {
  let res: any
  let data: any
  
  try {
    if (resource === 'tweets') {
      res = await api.tweets.tweetsControllerUpdateTweetById(id as any, variables)
      data = res.data
    } else if (resource === 'users') {
      res = await api.users.usersControllerUpdateUserById(id as any, variables)
      data = res.data
    }
  } catch(err: any) {
    const errorMessage = err.response?.data?.message ?? 
                         err.res?.data?.message ?? 
                         err.data?.message ?? 
                         err.message ?? 
                         'Unknown error while updating resource'
    
    throw new Error(errorMessage)
  }
  return data
}