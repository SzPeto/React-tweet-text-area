import { useState } from 'react'
import Button from '../button/Button.tsx'
import TextArea from '../text-area/TextArea.tsx'
import './Tweet.css'


/*
============================================================================================================================
                                             Helper functions
============================================================================================================================
*/

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


/*
============================================================================================================================
                                             The Tweet component
============================================================================================================================
*/

const Tweet = () => {
    
    const [tweet, setTweet] = useState('Tweet me!')

    async function handleClick(e: React.ChangeEvent<HTMLInputElement>) {

        const buttonId = e.target.id

        if(buttonId == 'get'){
            const json = await fetchFromBe()
            console.log('Get response : ', json)
        }else if(buttonId == 'submit'){
            const json = await sendToBe(tweet)
            console.log('Post response : ', json)
        }

    }

    return (
        <div className='tweet-container'>
            <TextArea value={ tweet } onChange={ (e) => setTweet(e.target.value) } />
            <Button text='Submit' type='submit' onClick={ handleClick } />
            <Button text='Clear text' type='info' onClick={ () => setTweet('') } />
            <Button text='Get tweets on console' type='get' onClick={ handleClick } />
        </div>
    )

}

export default Tweet

/* 
const tweets = useTweetStore((state) => state.tweets)
// Here we get a refernce to the custom Zustand hook's addTweet function(state=object, addTweet=key to returned function)
const addTweet = useTweetStore((state) => state.addTweet) 
*/