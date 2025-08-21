import type { Tweet } from '@/tweets/tweet/types/tweet'

export async function deleteTweet(id: string) {

  let json: Tweet[] = []

  try {
    const response = await fetch(`/api/tweets/${id}`, {
      method: 'DELETE',
    })
    json = await response.json()
  }catch(err) {
    console.log('Error during DELETE request ( deleteOne() ) : ', err)
  }
  return json
}