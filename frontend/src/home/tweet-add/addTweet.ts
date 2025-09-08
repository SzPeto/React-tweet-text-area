import api from '@/account/_auth-headers/authHeaders'
import { useFlashMessagesStore } from '@/ui/flash/useFlashMessageStore'

export async function addTweet(tweet: string) {
  let json
  const postMessage = { content: tweet }
  const addFlashMessage = useFlashMessagesStore.getState().addFlashMessage
  
  try {
    const response = await api.post('/api/tweets', postMessage)
    json = response.data
  }catch(err: any) {
    const errorMessage = err.response?.data?.message ?? 
                         err.data?.message ?? 
                         err.message ?? 
                         'Unknown error while adding tweet'
                         
    return { success: false, error: errorMessage }
  }
  
  addFlashMessage('Tweet added successfully!', 'success')
  return { success: true, json: json }
}