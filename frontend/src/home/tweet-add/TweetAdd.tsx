import MuiButton from '@/ui/mui-button/MuiButton'
import TextArea from '@/ui/text-area/TextArea'
import './TweetAdd.css'
import { useState } from 'react'
import { addTweet } from './addTweet'
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
            <MuiButton text='Add tweet' color='success' onClick={ handleSubmit } />
          ) : (
            <MuiButton text='Add tweet' isDisabled={ true } />
          )
        }
      </div>
    </div>
  )
}

export default TweetAdd