import { api } from '../../_api/swagger-api/swaggerApi'

export const getListHelper = async (resource: any) => {
  let res: any
  let data: any[] = []

  try {
    if (resource === 'tweets') {
      res = await api.tweets.tweetsControllerGetAllTweets()
      data = res.data
    } else if (resource === 'users') {
      res = await api.users.usersControllerGetAllUsers()
      data = res.data
    }
  } catch(err:any) {
    const errorMessage = err.response?.data?.message ?? 
                         err.res?.data?.message ?? 
                         err.data?.message ?? 
                         err.message ?? 
                         'Unknown error while fetching resources'
    
    throw new Error(errorMessage)
  }
  return data
}