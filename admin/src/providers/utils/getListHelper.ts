import { api } from '../../_api/swagger-api/swaggerApi'

export const getListHelper = async (resource: any) => {
  let res: any
  let data: any[] = []

  if (resource === 'tweets') {
    res = await api.tweets.tweetsControllerGetAllTweets()
    data = res.data
  } else if (resource === 'users') {
    res = await api.users.usersControllerGetAllUsers()
    data = res.data
  }
  if (res.status < 200 || res.status > 299) {
    throw res
  }
  
  return data
}