import { useState } from 'react'
import Button from '@/ui/button/Button'
import TextArea from '@/ui/text-area/TextArea'
import { useTweetsStore } from '@/home/tweet-list/useTweetsStore'
import { useLoginStore } from '@/account/login/useLoginStore'
import { addTweet } from './addTweet'
import { fetchTweets } from '@/home/tweet-list/fetchTweets'
import './TweetAdd.css'
import ErrorSlot from '@/ui/error-slot/ErrorSlot'


const TweetAdd = () => {
  const [ tweet, setTweet ] = useState('')
  const [ isActiveSubmit, setIsActiveSubmit ] = useState(true)
  const [ errorMessage, setErrorMessage ] = useState('')
  const setTweets = useTweetsStore((s) => s.setTweets)
  const isLoggedIn = useLoginStore((s) => s.isLoggedIn)

  const handleSubmit = async () => {
    setIsActiveSubmit(false)
    const resAdd = await addTweet(tweet)
    const resFetch = await fetchTweets()

    if (resAdd.success) {
      setTweet('')
    } else {
      setErrorMessage(`Error adding tweet : ${ resAdd.error }`)
    }
    if (resFetch.success) {
      setTweets(resFetch.json!)
    } 
    setIsActiveSubmit(true)
  }

  return (
    <div className='tweet-input-container-l2'>
      <ErrorSlot message={ errorMessage } />
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