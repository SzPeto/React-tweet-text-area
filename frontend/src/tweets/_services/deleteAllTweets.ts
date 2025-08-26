import type { Tweet } from '@/home/tweet-list/tweetType'

export async function deleteAllTweets() {

  let json: Tweet[] = []

  try {
    const response = await fetch('/api/tweets', {
      method: 'DELETE',
    })
    json = await response.json()
  }catch(err) {
    console.log('Error during DELETE request ( deleteAll() ) : ', err)
  }
  return json
}