import Button from '@/components/button/Button'
import './Tweet.css'

type TweeetProps = {
  id: string,
  content: string,
  dateSubmitted: string,
  onClick: (...args: any[]) => any
}

const Tweet = (props: TweeetProps) => {

  return (
    <div className="tweet-tweet-container">
      <p className="titles-label"> UUID : { props.id } </p>
      <p>{ props.content }</p>
      <hr />
      <small>{ props.dateSubmitted }</small>
      <Button text='Delete tweet' type='delete-one' onClick={ props.onClick } data={ props.id } />
    </div>
  )
}

export default Tweet