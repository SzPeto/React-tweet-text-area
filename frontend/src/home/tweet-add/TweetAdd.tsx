import MuiButton from '@/ui/mui-button/MuiButton'
import TextArea from '@/ui/text-area/TextArea'
import './TweetAdd.css'
import { useState } from 'react'
import { addTweet } from './addTweet'
import { deleteAllTweets } from './deleteAllTweets'
import { getDateTime } from '@/_utils/date-time/getDateTime'
import { useFlashMessageStore } from '@/ui/flash/useFlashMessageStore'
import { useTweetsStore } from '../tweet-list/useTweetsStore'
import { fetchTweets } from '../tweet-list/fetchTweets'

const TweetAdd = () => {
  const [ tweet, setTweet ] = useState('')
  const [ isActiveSubmit, setIsActiveSubmit ] = useState(true)
  const setTweets = useTweetsStore((s) => s.setTweets)
  const setFlashMessage = useFlashMessageStore((s) => s.setFlashMessage)

  const handleSubmit = async () => {
    const dateSubmitted = getDateTime()
    setIsActiveSubmit(false)
    const json = await addTweet(tweet, dateSubmitted)
    const getJson = await fetchTweets()

    if (json) {
      setTweet('')
      setFlashMessage('Tweet added successfully!', 'success')
    } else {
      setFlashMessage('Error on inserting tweet', 'warning')
    }

    setTweets(getJson)
    setIsActiveSubmit(true)
  }

  const handleDeleteAll = async () => {
    const json = await deleteAllTweets()
    const getJson = await fetchTweets()

    if (json) {
      setFlashMessage('All tweets deleted successfully!', 'success')
    } else {
      setFlashMessage('Error on deleting tweets', 'warning')
    }
    
    setTweets(getJson)
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
            <MuiButton text='Submit' type='success' onClick={ handleSubmit } />
          ) : (
            <MuiButton text='Submit' type='disabled' onClick={ () => {} } />
          )
        }
        <MuiButton text='Clear text' type='primary' onClick={ () => setTweet('') } />
        <MuiButton 
          text='Delete all tweets' 
          type='error' 
          onClick={ () => { if (window.confirm('Are you sure you want to delete all tweets?')) handleDeleteAll() } 
          } 
        />
      </div>
    </div>
  )
}

export default TweetAdd