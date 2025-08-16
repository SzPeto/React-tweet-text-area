import Button from '@/components/button/Button'
import './Tweet.css'
import { useState } from 'react'

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
  console.log(isEditing)

  return (
    <div className="tweet-tweet-container">
      <p className="titles-label"> UUID : { props.id } </p>
      <p>{ props.content }</p>
      <hr />
      <small>Date submitted : { props.dateSubmitted }</small>
      <div className='delete-edit-button-container'>
        <Button text='Delete tweet' type='delete-one' onClick={ props.onClick } data={ props.id } />
        <Button text='Edit tweet' type='update' onClick={ () => setIsEditing(!isEditing) } data={ props.id } />
      </div>
    </div>
  )
}

export default Tweet