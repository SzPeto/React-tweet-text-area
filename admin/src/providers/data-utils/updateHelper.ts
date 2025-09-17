import { BaseKey } from '@refinedev/core'
import { api } from '../../_api/swagger-api/swaggerApi'

export const updateHelper = async (id: BaseKey, resource: string, variables: any) => {
  let res: any
  let data: any
  
  if (resource === 'tweets') {
    res = await api.tweets.tweetsControllerUpdateTweetById(id as any, variables)
    data = res.data
  } else if (resource === 'users') {
    res = await api.users.usersControllerUpdateUserById(id as any, variables)
    data = res.data
  }

  if (res.status < 200 || res.status > 299) {
    throw res
  }
  return data
}