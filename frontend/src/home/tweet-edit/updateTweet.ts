import { api } from '@/_utils/swagger-api/swaggerApi'
import { useFlashMessagesStore } from '@/ui/flash/useFlashMessageStore'

export async function updateTweet(id: string, tweet: string) {
  let json
  const updateMessage = { content: tweet }
  const addFlashMessage = useFlashMessagesStore.getState().addFlashMessage

  try {
    const res = await api.tweets.tweetsControllerUpdateTweetById(id, updateMessage)
    json = res.data
  } catch(err: any) {
    const errorMessage = err.res?.data?.message ?? 
                         err.data?.message ?? 
                         err.message ?? 
                         'Unknown error while adding tweet'
                         
    return { success: false, error: errorMessage }
  }

  addFlashMessage('Tweet updated successfully', 'success')
  return { success: true, json: json }
}