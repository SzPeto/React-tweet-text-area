import Button from '@/components/button/Button'
import './Tweet.css'
import { useState } from 'react'
import TextArea from '@/components/text-area/TextArea'

type TweeetProps = {
  id: string,
  content: string,
  dateSubmitted: string,
  onClick: (...args: any[]) => any
  onChange: (...args: any[]) => any
  editValue: string
}

const Tweet = (props: TweeetProps) => {

  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="tweet-tweet-container">
      <p className="titles-label"> UUID : { props.id } </p>

      {/* Editing logic */}
      {
        isEditing ? (
          <TextArea onChange={ props.onChange } value={ props.editValue } />
        ) : (
          <p>{ props.content }</p>
        )
      }

      <hr />
      <small>Date submitted : { props.dateSubmitted }</small>
      <div className='delete-edit-button-container'>
        <Button text='Delete tweet' type='delete-one' onClick={ props.onClick } data={ props.id } />
        <Button 
          text={ isEditing ? '' : 'Edit tweet' } 
          type='update' onClick={ () => setIsEditing(!isEditing) } 
          data={ props.id }
          hidden={ isEditing ? true : false }
        />
      </div>
    </div>
  )
}

export default Tweet