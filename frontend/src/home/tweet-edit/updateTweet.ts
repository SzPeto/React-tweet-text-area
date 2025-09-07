import { useFlashMessageStore } from "@/ui/flash/useFlashMessageStore"

export async function updateTweet(id: string, tweet: string) {
  let json
  const updateMessage = {
    content: tweet
  }
  const setFlashMessage = useFlashMessageStore.getState().setFlashMessage

  try {
    const response = await fetch(`/api/tweets/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateMessage),
    })
    json = await response.json()
    if (json.error) {
      const errorMessage = json.message ?? json.error ?? 'Unknown error while updating tweet'
      setFlashMessage(`Error updating tweet : ${errorMessage}`, 'warning')
      return json
    }
  }catch(err: any) {
    const errorMessage = err.message ?? err.error ?? 'Unknown error while updating tweet'
    setFlashMessage(`Error updating tweet : ${errorMessage}`, 'warning')
    return json
  }
  setFlashMessage('Tweet updated successfully', 'success')
  return json
}