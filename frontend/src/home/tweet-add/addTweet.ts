import api from '@/account/_auth-headers/authHeaders'
import { useFlashMessageStore } from '@/ui/flash/useFlashMessageStore'

export async function addTweet(tweet: string) {
  let response
  const postMessage = {
    content: tweet
  }
  const setFlashMessage = useFlashMessageStore.getState().setFlashMessage
  
  try {
    response = await api.post('/api/tweets', postMessage)
  }catch(err: any) {
    const errorMessage = err.message ?? err.data?.message ?? 'Unknown error'
    setFlashMessage(`Error on inserting tweet : ${ errorMessage }`, 'warning')
    return { error: err }
  }
  
  setFlashMessage('Tweet added successfully!', 'success')
  return response.data
}