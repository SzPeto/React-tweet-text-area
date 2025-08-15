import './Tweet.css'

type TweeetProps = {
  id: string,
  content: string
  dateSubmitted: string
}

const Tweet = (props: TweeetProps) => {

  return (
    <div className="tweet-tweet-container">
      <p className="titles-label"> UUID : { props.id } </p>
      <p>{ props.content }</p>
      <hr />
      <small>{ props.dateSubmitted }</small>
    </div>
  )
}

export default Tweet