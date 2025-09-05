import { useState } from 'react'
import TextArea from '@/ui/text-area/TextArea'
import MuiButton from '@/ui/mui-button/MuiButton'
import { useTweetsStore } from '@/home/tweet-list/useTweetsStore'
import { useFlashMessageStore } from '@/ui/flash/useFlashMessageStore'
import { useLoginStore } from '@/account/login-page/useLoginStore'
import { updateTweet } from './updateTweet'
import { fetchTweets } from '../tweet-list/fetchTweets'
import { deleteTweet } from './deleteTweet'
import { formatIsoDateTime } from '@/_utils/date-time/formatIsoDateTime'
import { type User } from '@/account/login-page/user.type'
import './TweetItem.css'


type TweeetProps = {
  id: string,
  content: string,
  dateSubmitted: string
  user: User
}

const TweetItem = (props: TweeetProps) => {
  const [ editValue, setEditValue ] = useState( props.content )
  const [ isEditing, setIsEditing ] = useState(false)
  const setTweets = useTweetsStore((s) => s.setTweets)
  const setFlashMessage = useFlashMessageStore((s) => s.setFlashMessage)
  const currentUser = useLoginStore((s) => s.currentUser)

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
      <div className="titles-container">
        <img src={ props.user.picturePath } width='40px' /> 
        <p><b>{ props.user.userName }</b></p>
      </div>
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
      <div className='edit-buttons-container'>
        { props.user._id === currentUser._id && (<Buttons />) }
      </div>
    </div>
  )
}

export default TweetItem