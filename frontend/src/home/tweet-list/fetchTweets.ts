import type { Tweet } from '@/home/tweet-item/tweetType'

export async function fetchTweets() {

  let json: Tweet[] = []
  
  try {
    const response = await fetch('/api/tweets')
    json = await response.json()
  } catch (err) {
    console.log('Error during GET request from backend : ', err)
  }
  return json
}