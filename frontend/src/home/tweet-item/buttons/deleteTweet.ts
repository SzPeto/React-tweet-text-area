import { tweetsApi } from '@/_utils/swagger-api/swaggerApi'
import { useFlashMessagesStore } from '@/ui/flash/useFlashMessageStore'

export async function deleteTweet(id: string) {
  const addFlashMessage = useFlashMessagesStore.getState().addFlashMessage
  let json

  try {
    const res = await tweetsApi.tweetsControllerDeleteTweetById(id)
    json = res.data
  } catch(err: any) {
    const errorMessage = err.res?.data?.message ?? 
                         err.data?.message ?? 
                         err.message ?? 
                         'Unknown error while adding tweet'
                         
    return { success: false, error: errorMessage}
  }
  
  addFlashMessage('Tweet deleted successfully', 'success')
  return { success: true, json: json }
}