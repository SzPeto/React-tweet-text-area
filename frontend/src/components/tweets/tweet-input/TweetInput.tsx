import { useState } from 'react'
import Button from '../../button/Button.tsx'
import TextArea from '../../text-area/TextArea.tsx'
import './TweetInput.css'
import { useTweetHelpers } from '@/hooks/useTweetHeplers'

const Tweet = () => {
    
  const [tweet, setTweet] = useState('Tweet me!')
  const { fetchFromBe, sendToBe } = useTweetHelpers()

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
      <div className="upper-container">
        <TextArea value={ tweet } onChange={ (e) => setTweet(e.target.value) } />
      </div>
      <div className="lower-container">
        <Button text='Submit' type='submit' onClick={ handleClick } />
        <Button text='Clear text' type='info' onClick={ () => setTweet('') } />
        <Button text='Get tweets on console' type='get' onClick={ handleClick } />
      </div>
    </div>
  )
}

export default Tweet

/* 
const tweets = useTweetStore((state) => state.tweets)
// Here we get a refernce to the custom Zustand hook's addTweet function(state=object, addTweet=key to returned function)
const addTweet = useTweetStore((state) => state.addTweet) 
*/