
export async function addTweet(tweet: string, dateSubmitted: string) {
  let json
  const postMessage = {
    content: tweet,
    dateSubmitted: dateSubmitted
  }
  
  try {
    const response = await fetch('/api/tweets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postMessage),
    })
    json = await response.json()
  }catch(err) {
    json = null
    console.log('Error during POST request to backend : ', err)
  }
  
  return json
}