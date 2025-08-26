import MuiButton from '@/ui/mui-button/MuiButton'
import TextArea from '@/ui/text-area/TextArea'
import './TweetAdd.css'
import { useState } from 'react'
import { addTweet } from './addTweet'
import { deleteAllTweets } from './deleteAllTweets'
import { getDateTime } from '@/_utils/getDateTime'
import { useFlashMessageStore } from '@/ui/flash/useFlashMessageStore'

const TweetAdd = () => {

  const [ tweet, setTweet ] = useState('')
  const [ isActiveSubmit, setIsActiveSubmit ] = useState(true)
  const setFlashMessage = useFlashMessageStore((s) => s.setFlashMessage)

  const handleSubmit = async () => {
    const dateSubmitted = getDateTime()
    setIsActiveSubmit(false)

    const json = await addTweet(tweet, dateSubmitted)
    if (json) {
      setTweet('')
      setFlashMessage('Tweet added successfully!', 'success')
    } else {
      setFlashMessage('Error on inserting tweet', 'warning')
    }
    setIsActiveSubmit(true)
  }

  const handleDeleteAll = async (e: any) => {
    const json = await deleteAllTweets()

    if (json) {
      setFlashMessage('All tweets deleted successfully!', 'success')
    } else {
      setFlashMessage('Error on deleting tweets', 'warning')
    }
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
            <MuiButton text='Submit' type='submit' onClick={ handleSubmit } />
          ) : (
            <MuiButton text='Submit' type='disabled' onClick={ () => {} } />
          )
        }
        <MuiButton text='Clear text' type='info' onClick={ () => setTweet('') } />
        <MuiButton 
          text='Delete all tweets' 
          type='delete' 
          onClick={ (e) => { if (window.confirm('Are you sure you want to delete all tweets?')) handleDeleteAll(e) } 
          } 
        />
      </div>
    </div>
  )
}

export default TweetAdd