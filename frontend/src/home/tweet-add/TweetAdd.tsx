import { useState } from 'react'
import Button from '@/ui/button/Button'
import TextArea from '@/ui/text-area/TextArea'
import { useTweetsStore } from '@/home/tweet-list/useTweetsStore'
import { useLoginStore } from '@/account/login/useLoginStore'
import { addTweet } from './addTweet'
import { fetchTweets } from '@/home/tweet-list/fetchTweets'
import './TweetAdd.css'


const TweetAdd = () => {
  const [ tweet, setTweet ] = useState('')
  const [ isActiveSubmit, setIsActiveSubmit ] = useState(true)
  const setTweets = useTweetsStore((s) => s.setTweets)
  const isLoggedIn = useLoginStore((s) => s.isLoggedIn)

  const handleSubmit = async () => {
    setIsActiveSubmit(false)
    const json = await addTweet(tweet)
    const getJson = await fetchTweets()

    if (!json.error) {
      setTweet('')
    } 

    setTweets(getJson)
    setIsActiveSubmit(true)
  }

  return (
    <div className='tweet-input-container-l2'>
      <div className="upper-container">
        <TextArea 
          value={ tweet } 
          onChange={ (e) => setTweet(e.target.value) } 
          placeholder={ 'Tweet me!' } 
        />
      </div>
      <div className="lower-container">
        {
          isActiveSubmit ? (
            isLoggedIn ? (
              <Button text='Add tweet' color='success' onClick={ handleSubmit } />
            ) : (
              <div className='flex flex-col items-center justify-center'>
                <p>ℹ️ Please log in to add tweet</p>
                <Button text='Add tweet' isDisabled={ true } />
              </div>
            )
          ) : (
            <Button text='Add tweet' isDisabled={ true } />
          )
        }
      </div>
    </div>
  )
}

export default TweetAdd