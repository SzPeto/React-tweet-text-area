import './Tweet.css'

type TweeetProps = {
  id: number,
  content: string
  dateSubmitted: string
}

const Tweet = (props: TweeetProps) => {

  return (
    <div className="tweet-tweet-container">
      <p className="titles-label">{ props.id } </p>
      <p>{ props.content }</p>
      <hr />
      <small>{ props.dateSubmitted }</small>
    </div>
  )
}

export default Tweet