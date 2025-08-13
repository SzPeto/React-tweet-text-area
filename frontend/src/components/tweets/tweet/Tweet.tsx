import './Tweet.css'

type TweeetProps = {
  id: number,
  content: string
}

const Tweet = (props: TweeetProps) => {

  return (
    <div className="tweet-container">
      <p className="titles-label">{ props.id } </p>
      <p>{ props.content }</p>
    </div>
  )
}

export default Tweet