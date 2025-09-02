import type { TweetType } from '@/home/tweet-list/tweet.type'

export async function fetchTweets() {
  let json: TweetType[] = []
  
  try {
    const response = await fetch('/api/tweets')
    json = await response.json()
  } catch (err) {
    console.log('Error during GET request from backend : ', err)
  }
  return json
}