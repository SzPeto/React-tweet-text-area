import 'Tweet.css'

type TweeetProps = {
  content: string,
  user: string,
  dateSubmitted: string
}

const Tweet = (props: TweeetProps) => {

  return (
    <div className="tweet-container">
      <p className="titles-label">{ props.user } </p>
      <p>{ props.content }</p>
      <br />
      <small>{ props.dateSubmitted }</small>
    </div>
  )
}

export default Tweet