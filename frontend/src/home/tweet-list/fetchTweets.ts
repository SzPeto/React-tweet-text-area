export async function fetchTweets() {
  let json: any
  let res: any
  
  try {
    res = await fetch('/api/tweets')
    json = await res.json()
    if (json.error) {
      const errorMessage = json.message ?? json.error ?? 'Unknown error while deleting tweet'
      return { success: false, error: errorMessage}
    }
  } catch (err) {
    const errorMessage = `${ res.statusText ?? 'Error fetching tweets' } ${ res.status ?? '' }`
    return { success: false, error: errorMessage }
  }
  
  return { success: true, json: json }
}