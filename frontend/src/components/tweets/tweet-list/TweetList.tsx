import './TweetList.css'
import Tweet from '@/components/tweets/tweet/Tweet.tsx'

type Tweet = {
  id: number,
  content: string
}

type TweetListProps = {
  tweets: Tweet[]
}

const TweetList = (props: TweetListProps) => {

  return (
    <div className='tweet-list-container-l2'>
      {
        Array.isArray(props.tweets) && props.tweets.length > 0 ? 
        props.tweets.map((tweet) => (<Tweet id={ tweet.id } content={ tweet.content } />)) : 
        'There are no tweets available'
      }
    </div>
    
  )
}

export default TweetList