import { api } from '../../_api/swagger-api/swaggerApi'

export const createHelper = async (resource: string, variables: any) => {
  let res: any
  let data: any
  
  try {
    if (resource === 'tweets') {
      res = await api.tweets.tweetsControllerAddTweet(variables)
      data = res.data
    } else if (resource === 'users') {
      res = await api.users.usersControllerCreateUser(variables)
      data = res.data
    }
  } catch(err: any) {
    const errorMessage = err.response?.data?.message ?? 
                         err.res?.data?.message ?? 
                         err.data?.message ?? 
                         err.message ?? 
                         'Unknown error while adding resource'
    
    throw new Error(errorMessage)
  }
  return data
}