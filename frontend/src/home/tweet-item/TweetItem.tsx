import './Tweet.css'
import { useState } from 'react'
import TextArea from '@/ui/text-area/TextArea'
import { useTweetsStore } from '@/home/tweet-list/useTweetsStore'
import { fetchTweets } from '../_services/fetchTweets'
import { updateTweet } from '../_services/updateTweet'
import MuiButton from '@/ui/mui-button/MuiButton'

type TweeetProps = {
  id: string,
  content: string,
  dateSubmitted: string,
  onClick: (...args: any[]) => any
}

const Tweet = (props: TweeetProps) => {

  const [ editValue, setEditValue ] = useState( props.content )
  const [ isVisibleEdit, setIsVisibleEdit ] = useState(false)
  const [ isEditing, setIsEditing ] = useState(false)
  const setTweets = useTweetsStore((s) => s.setTweets)

  async function handleSave() {
    const response = await updateTweet(props.id, editValue)
    const getJson = await fetchTweets()
    setIsEditing(false)
    setTweets(getJson)
    console.log(response)
  }

  // Reusable inline component Buttons, to avoid code duplication
  const Buttons = () => (
    <div className='delete-edit-button-container'>
      <MuiButton 
        text='Delete tweet' 
        type='delete-one' 
        onClick={ 
          (e) => { 
            if (window.confirm('Are you sure you want to delete this tweet?')) props.onClick(e) 
          }
        } 
        data={ props.id }
        size='small'
      />
      <MuiButton 
        text='Edit tweet'
        type='update' 
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
                  type='submit'
                  size='small'
                />
                <MuiButton 
                  text='Cancel' 
                  onClick={ () => setIsEditing(false) } 
                  type='info' 
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

export default Tweet