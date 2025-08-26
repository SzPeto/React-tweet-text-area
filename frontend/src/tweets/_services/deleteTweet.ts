import type { Tweet } from '@/home/tweet-list/tweet'

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