
export const useTweetHelpers = () => {
    
    async function fetchFromBe(){
        const response = await fetch('/api/tweets')
        const json = await response.json()
        return json
    }
    
    async function sendToBe(tweet: string){
        const postMessage = {
            content: tweet
        }
    
        const response = await fetch('/api/tweets', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postMessage),
        })
        const json = await response.json()
        return json
    }

    return { fetchFromBe, sendToBe }
}