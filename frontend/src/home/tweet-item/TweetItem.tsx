import './TweetItem.css'
import { useState } from 'react'
import TextArea from '@/ui/text-area/TextArea'
import { useTweetsStore } from '@/home/tweet-list/useTweetsStore'
import MuiButton from '@/ui/mui-button/MuiButton'
import { deleteTweet } from './deleteTweet'
import { useFlashMessageStore } from '@/ui/flash/useFlashMessageStore'
import { updateTweet } from './updateTweet'
import { fetchTweets } from '../tweet-list/fetchTweets'

type TweeetProps = {
  id: string,
  content: string,
  dateSubmitted: string
}

const TweetItem = (props: TweeetProps) => {
  const [ editValue, setEditValue ] = useState( props.content )
  const [ isVisibleEdit, setIsVisibleEdit ] = useState(false)
  const [ isEditing, setIsEditing ] = useState(false)
  const setTweets = useTweetsStore((s) => s.setTweets)
  const setFlashMessage = useFlashMessageStore((s) => s.setFlashMessage)

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
        type='error' 
        onClick={ 
          (e) => { 
            if (window.confirm('Are you sure you want to delete this tweet?')) handleDelete(e) 
          }
        } 
        data={ props.id }
        size='small'
      />
      <MuiButton 
        text='Edit tweet'
        type='primary' 
        onClick={ () => setIsEditing(true) } 
        data={ props.id }
        hidden={ isEditing ? true : false }
        size='small'
      />
    </div>
  )

  return (
    <div className="tweet-tweet-container" 
         onMouseEnter={ () => setIsVisibleEdit(true) } 
         onMouseLeave={ () => setIsVisibleEdit( false ) }
    >
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
                  type='success'
                  size='small'
                />
                <MuiButton 
                  text='Cancel' 
                  onClick={ () => setIsEditing(false) } 
                  type='primary' 
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
      <small>🗓️ { props.dateSubmitted }</small>
      <div className='on-desktop-container'>
        { isVisibleEdit && (<Buttons />) }
      </div>
      <div className='on-mobile-container'>
        <Buttons />
      </div>
    </div>
  )
}

export default TweetItem