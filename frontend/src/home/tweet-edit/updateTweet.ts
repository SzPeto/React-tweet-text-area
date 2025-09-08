import { useFlashMessagesStore } from "@/ui/flash/useFlashMessageStore"

export async function updateTweet(id: string, tweet: string) {
  let json
  const updateMessage = { content: tweet }
  const addFlashMessage = useFlashMessagesStore.getState().addFlashMessage

  try {
    const response = await fetch(`/api/tweets/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateMessage),
    })
    json = await response.json()
    if (json.error) {
      const errorMessage = json.message ?? json.error ?? 'Unknown error while updating tweet'
      return { success: false, error: errorMessage }
    }
  }catch(err: any) {
    const errorMessage = err.message ?? err.error ?? 'Unknown error while updating tweet'
    return { success: false, error: errorMessage }
  }

  addFlashMessage('Tweet updated successfully', 'success')
  return { success: true, json: json }
}