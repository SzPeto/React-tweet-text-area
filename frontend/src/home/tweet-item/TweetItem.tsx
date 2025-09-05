import { useState } from 'react'
import TextArea from '@/ui/text-area/TextArea'
import MuiButton from '@/ui/mui-button/MuiButton'
import { useTweetsStore } from '@/home/tweet-list/useTweetsStore'
import { useFlashMessageStore } from '@/ui/flash/useFlashMessageStore'
import { updateTweet } from './updateTweet'
import { fetchTweets } from '../tweet-list/fetchTweets'
import { deleteTweet } from './deleteTweet'
import { formatIsoDateTime } from '@/_utils/date-time/formatIsoDateTime'
import './TweetItem.css'
import { useLoginStore } from '@/account/login-page/useLoginStore'

type TweeetProps = {
  id: string,
  content: string,
  dateSubmitted: string
  userId: string
}

const TweetItem = (props: TweeetProps) => {
  const [ editValue, setEditValue ] = useState( props.content )
  const [ isEditing, setIsEditing ] = useState(false)
  const setTweets = useTweetsStore((s) => s.setTweets)
  const setFlashMessage = useFlashMessageStore((s) => s.setFlashMessage)
  const currentUserId = useLoginStore((s) => s.currentUser._id)

  const handleSave = async () => {
    const response = await updateTweet(props.id, editValue)
    const getJson = await fetchTweets()
    setIsEditing(false)
    setTweets(getJson)
    console.log(response)
  }

  const handleDelete = async (e: any) => {
    const idToDelete = e.currentTarget.getAttribute('data-id')
    const json = await deleteTweet(idToDelete)
    const getJson = await fetchTweets()
    if (json) {
      setFlashMessage('Tweet deleted successfully!', 'success')
    } else {
      setFlashMessage('Error on deleting tweet', 'warning')
    }
    setTweets(getJson)
  }

  // Reusable inline component Buttons, to avoid code duplication
  const Buttons = () => (
    <div className='delete-edit-button-container'>
      <MuiButton 
        text='Delete tweet' 
        color='error' 
        onClick={ 
          (e) => { 
            if (window.confirm('Are you sure you want to delete this tweet?')) {
              handleDelete(e) 
            }
          }
        } 
        data={ props.id }
        size='small'
      />
      <MuiButton 
        text='Edit tweet'
        color='primary' 
        onClick={ () => setIsEditing(true) } 
        data={ props.id }
        hidden={ isEditing ? true : false }
        size='small'
      />
    </div>
  )

  return (
    <div className="tweet-tweet-container" >
      <p className="titles-label"> 🆔 { props.id } </p>
      <div className='logic-container'>
        {/* Editing logic */}
        {
          isEditing ? (
            <div className='edit-container'>
              <TextArea 
                onChange={ (e) => setEditValue(e.target.value) } 
                value={ editValue } 
                placeholder='Edit tweet'
              />
              <div>
                <MuiButton 
                  text='Save' 
                  onClick={ handleSave } 
                  color='success'
                  size='small'
                />
                <MuiButton 
                  text='Cancel' 
                  onClick={ () => setIsEditing(false) } 
                  color='primary' 
                  size='small'
                />
              </div>
            </div>
          ) : (
            <p>{ props.content }</p>
          )
        }
      </div>
      <hr />
      <small>🗓️ { formatIsoDateTime(props.dateSubmitted) }</small>
      <p>User id : { props.userId }</p>
      <div className='edit-buttons-container'>
        { props.userId === currentUserId && (<Buttons />) }
      </div>
    </div>
  )
}

export default TweetItem