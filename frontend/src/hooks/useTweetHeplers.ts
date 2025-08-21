import type { Tweet } from '@/types/tweet.ts'

export const useTweetHelpers = () => {
  
  async function fetchFromBe() {

    let json: Tweet[] = []
    
    try {
      const response = await fetch('/api/tweets')
      json = await response.json()
    } catch (err) {
      console.log('Error during GET request from backend : ', err)
    }
    return json
  }
  
  async function sendToBe(tweet: string, dateSubmitted: string) {

    let json: Tweet[] = []
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
      console.log('Error during POST request to backend : ', err)
    }
    return json
  }

  async function deleteAll() {

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

  async function deleteOne(id: string) {

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

  async function updateOne(id: string, tweet: string) {

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

  return { fetchFromBe, sendToBe, deleteAll, deleteOne, updateOne }
}