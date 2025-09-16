import { api } from '../../_api/swagger-api/swaggerApi'

export const createHelper = async (resource: string, variables: any) => {
  let res: any
  let data: any
  
  if (resource === 'tweets') {
    res = await api.tweets.tweetsControllerAddTweet(variables)
    data = res.data
  } else if (resource === 'users') {
    res = await api.users.usersControllerCreateUser(variables)
    data = res.data
  }

  if (res.status < 200 || res.status > 299) {
    throw res
  }
  return data
}