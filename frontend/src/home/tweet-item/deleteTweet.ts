import { useFlashMessageStore } from "@/ui/flash/useFlashMessageStore"

export async function deleteTweet(id: string) {
  let json
  const setFlashMessage = useFlashMessageStore.getState().setFlashMessage

  try {
    const response = await fetch(`/api/tweets/${id}`, {
      method: 'DELETE',
    })
    json = await response.json()
    if (json.error) {
      const errorMessage = json.message ?? json.error ?? 'Unknown error while deleting tweet'
      setFlashMessage(`Error deleting tweet : ${errorMessage}`, 'warning')
      return json
    }
  }catch(err: any) {
    const errorMessage = err.message ?? err.error ?? 'Unknown error while deleting tweet'
    setFlashMessage(`Error deleting tweet : ${errorMessage}`, 'warning')
    return json
  }
  setFlashMessage('Tweet deleted successfully', 'success')
  return json
}