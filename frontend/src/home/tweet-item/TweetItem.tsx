import { useState } from 'react'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import TextArea from '@/ui/text-area/TextArea'
import Button from '@/ui/button/Button'
import IconButton from '@/ui/icon-button/IconButton'
import { useTweetsStore } from '@/home/tweet-list/useTweetsStore'
import { useLoginStore } from '@/account/login-page/useLoginStore'
import { updateTweet } from './updateTweet'
import { fetchTweets } from '@/home/tweet-list/fetchTweets'
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
  const currentUser = useLoginStore((s) => s.currentUser)

  const handleSave = async () => {
    await updateTweet(props.id, editValue)
    const getJson = await fetchTweets()
    setIsEditing(false)
    setTweets(getJson)
  }

  const handleDelete = async () => {
    await deleteTweet(props.id)
    const getJson = await fetchTweets()
    setTweets(getJson)
  }

  // Reusable inline component Buttons, to avoid code duplication
  const Buttons = () => (
    <div className='delete-edit-button-wrapper-container'>
      <hr className='horizontal-rule'/>
      <div className='delete-edit-button-container'>
        <IconButton 
          size='large' 
          onClick={ () => setIsEditing(true) } 
          hidden={ isEditing ? true : false }
          color='primary'
        >
          <EditRoundedIcon />
        </IconButton>
        <IconButton 
          size='large' 
          onClick={ () => { 
            if (window.confirm('Are you sure you want to delete this tweet?')) {
              handleDelete() 
            }
          }} 
          color='error'
        >
          <DeleteRoundedIcon />
        </IconButton>
      </div>
    </div>
  )

  return (
    <div className="tweet-tweet-container" >

      <div className='upper-container'>
        <div className="titles-container">
          <img src={ props.user.picturePath } width='40px' /> 
          <p><b>{ props.user.userName }</b></p>
        </div>
        <div className='date-time-container'>
          <small>{ formatIsoDateTime(props.dateSubmitted) }</small>
        </div>
      </div>

      <hr className='horizontal-rule' />

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
                <Button 
                  text='Save' 
                  onClick={ handleSave } 
                  color='success'
                  size='small'
                />
                <Button 
                  text='Cancel' 
                  onClick={ () => setIsEditing(false) } 
                  color='primary' 
                  size='small'
                />
              </div>
            </div>
          ) : (
            <div className='content-container'>
              <p>{ props.content }</p>
            </div>
          )
        }
      </div>

      <div className='edit-buttons-container'>
        { (props.user._id === currentUser._id || currentUser.isAdmin ) && (<Buttons />) }
      </div>

    </div>
  )
}

export default TweetItem