export async function fetchTweets() {
  let json: any
  let response: any
  
  try {
    response = await fetch('/api/tweets')
    json = await response.json()
    if (json.error) {
      const errorMessage = json.message ?? json.error ?? 'Unknown error while deleting tweet'
      return { success: false, error: errorMessage}
    }
  } catch (err) {
    const errorMessage = `${ response.statusText ?? 'Error fetching tweets' } ${ response.status ?? '' }`
    return { success: false, error: errorMessage }
  }
  
  return { success: true, json: json }
}