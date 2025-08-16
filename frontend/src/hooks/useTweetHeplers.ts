
export const useTweetHelpers = () => {
    
  async function fetchFromBe(){
    const response = await fetch('/api/tweets')
    const json = await response.json()
    return json
  }
  
  async function sendToBe(tweet: string, dateSubmitted: string){
    const postMessage = {
      content: tweet,
      dateSubmitted: dateSubmitted
    }

    const response = await fetch('/api/tweets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postMessage),
    })
    const json = await response.json()
    return json
  }

  async function deleteAll(){
    const response = await fetch('/api/tweets', {
      method: 'DELETE',
    })
    const json = await response.json()
    return json
  }

  async function deleteOne(id: string){
    const response = await fetch(`/api/tweets/${id}`, {
      method: 'DELETE',
    })
    const json = await response.json()
    return json
  }

  async function updateOne(id: string, tweet: string){

    const updateMessage = {
      content: tweet
    }

    const response = await fetch(`/api/tweets/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateMessage),
    })
    const json = await response.json()
    return json
  }

  return { fetchFromBe, sendToBe, deleteAll, deleteOne, updateOne }
}