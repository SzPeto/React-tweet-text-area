import { tweetsApi } from "@/_utils/swagger-api/swaggerApi"

export async function fetchTweets() {
  let json: any
  
  try {
    const res = await tweetsApi.tweetsControllerGetAllTweets()
    json = res.data
  } catch (err: any) {
    const errorMessage = err.res?.data?.message ?? 
                         err.data?.message ?? 
                         err.message ?? 
                         'Unknown error while adding tweet'
    return { success: false, error: errorMessage }
  }
  return { success: true, json: json }
}