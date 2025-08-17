import Button from '@/components/button/Button'
import './Tweet.css'
import { useState } from 'react'
import TextArea from '@/components/text-area/TextArea'
import { useTweetHelpers } from '@/hooks/useTweetHeplers.ts'
import { useTweetsStore } from '@/store/useTweetsStore'

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
  const { fetchFromBe, updateOne } = useTweetHelpers()
  const setTweets = useTweetsStore((s) => s.setTweets)

  async function handleSave(){
    const response = await updateOne(props.id, editValue)
    const getJson = await fetchFromBe()
    setIsEditing(false)
    setTweets(getJson)
    console.log(response)
  }

  return (
    <div className="tweet-tweet-container" 
         onMouseEnter={ () => setIsVisibleEdit(true) } 
         onMouseLeave={ () => setIsVisibleEdit( false ) }
    >
      <p className="titles-label"> UUID : { props.id } </p>

      <div className='logic-container'>
        {/* Editing logic */}
        {
          isEditing ? (
            <div className='edit-container'>
              <TextArea onChange={ (e) => setEditValue(e.target.value) } value={ editValue } />
              <div>
                <Button text='Save' onClick={ handleSave } type='submit' />
                <Button text='Cancel' onClick={ () => setIsEditing(false) } type='info' />
              </div>
            </div>
          ) : (
            <p>{ props.content }</p>
          )
        }
      </div>

      <hr />
      <small>Date submitted : { props.dateSubmitted }</small>

      {
        isVisibleEdit ? (
          <div className='delete-edit-button-container'>
            <Button 
              text='Delete tweet' 
              type='delete-one' 
              onClick={ 
                (e) => { 
                  if(window.confirm('Are you sure you want to delete this tweet?')) props.onClick(e) 
                } 
              } 
              data={ props.id } 
            />
            <Button 
              text={ isEditing ? '' : 'Edit tweet' } 
              type='update' onClick={ () => setIsEditing(!isEditing) } 
              data={ props.id }
              hidden={ isEditing ? true : false }
            />
          </div>
        ) : (
          <p style={{ fontSize: '12px', color: 'blue' }} >( Hover over card to uncover buttons )</p>
        )
      }

    </div>
  )
}

export default Tweet