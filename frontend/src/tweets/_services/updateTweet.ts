import type { Tweet } from '@/home/tweet-list/tweet'

export async function updateTweet(id: string, tweet: string) {

  let json: Tweet[] = []
  const updateMessage = {
    content: tweet
  }

  try {
    const response = await fetch(`/api/tweets/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateMessage),
    })
    json = await response.json()
  }catch(err) {
    console.log('Error during PATCH request : ', err)
  }
  return json
}