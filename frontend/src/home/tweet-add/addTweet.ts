import api from '@/_utils/axios/axios'

export async function addTweet(tweet: string) {
  let response
  const postMessage = {
    content: tweet
  }
  
  try {
    response = await api.post('/api/tweets', postMessage)
  }catch(err) {
    return { error: err }
  }
  
  return response.data
}