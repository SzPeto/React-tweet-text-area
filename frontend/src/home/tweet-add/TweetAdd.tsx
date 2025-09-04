import { useState } from 'react'
import MuiButton from '@/ui/mui-button/MuiButton'
import TextArea from '@/ui/text-area/TextArea'
import { useFlashMessageStore } from '@/ui/flash/useFlashMessageStore'
import { useTweetsStore } from '@/home/tweet-list/useTweetsStore'
import { addTweet } from './addTweet'
import { fetchTweets } from '@/home/tweet-list/fetchTweets'
import './TweetAdd.css'
import { useLoginStore } from '@/account/login-page/useLoginStore'
import { Link, Navigate } from 'react-router-dom'

const TweetAdd = () => {
  const [ tweet, setTweet ] = useState('')
  const [ isActiveSubmit, setIsActiveSubmit ] = useState(true)
  const setTweets = useTweetsStore((s) => s.setTweets)
  const setFlashMessage = useFlashMessageStore((s) => s.setFlashMessage)
  const isLoggedIn = useLoginStore((s) => s.isLoggedIn)

  const handleSubmit = async () => {
    setIsActiveSubmit(false)
    const json = await addTweet(tweet)
    const getJson = await fetchTweets()

    if (!json.error) {
      setTweet('')
      setFlashMessage('Tweet added successfully!', 'success')
    } else {
      setFlashMessage(`Error on inserting tweet`, 'warning')
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
              <MuiButton text='Add tweet' color='success' onClick={ handleSubmit } />
            ) : (
              <div className='flex flex-col items-center justify-center'>
                <p>ℹ️ Please log in to add tweet</p>
                <MuiButton text='Add tweet' isDisabled={ true } />
              </div>
            )
          ) : (
            <MuiButton text='Add tweet' isDisabled={ true } />
          )
        }
      </div>
    </div>
  )
}

export default TweetAdd