import { BaseKey } from '@refinedev/core'
import { api } from '../../_api/swagger-api/swaggerApi'

export const deleteOneHelper = async (id: BaseKey, resource: string) => {
  let res: any
  let data: any
  
  if (resource === 'tweets') {
    res = await api.tweets.tweetsControllerDeleteTweetById(id as any)
    data = res.data
  } else if (resource === 'users') {
    res = await api.users.usersControllerDeleteUserById(id as any)
    data = res.data
  }

  if (res.status < 200 || res.status > 299) {
    throw res
  }
  return data
}