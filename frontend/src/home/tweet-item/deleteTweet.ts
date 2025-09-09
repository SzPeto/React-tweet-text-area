import { useFlashMessagesStore } from '@/ui/flash/useFlashMessageStore'

export async function deleteTweet(id: string) {
  const addFlashMessage = useFlashMessagesStore.getState().addFlashMessage
  let json

  try {
    const res = await fetch(`/api/tweets/${id}`, {
      method: 'DELETE',
    })
    json = await res.json()
    if (json.error) {
      const errorMessage = json.message ?? json.error ?? 'Unknown error while deleting tweet'
      return { success: false, error: errorMessage}
    }
  } catch(err: any) {
    const errorMessage = err.message ?? err.error ?? 'Unknown error while deleting tweet'
    return { success: false, error: errorMessage}
  }
  
  addFlashMessage('Tweet deleted successfully', 'success')
  return { success: true, json: json }
}