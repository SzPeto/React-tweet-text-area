import './TweetList.css'
import Tweet from '@/components/tweets/tweet/Tweet.tsx'

type TweetType = {
  id: number,
  content: string,
  dateSubmitted: string
}

type TweetListProps = {
  tweets: TweetType[]
}

const TweetList = (props: TweetListProps) => {

  return (
    <div className='tweet-list-container-l2'>
      {Array.isArray(props.tweets) && props.tweets.length > 0 ? 
        [...props.tweets].reverse().map((tweet) => (
          <Tweet 
            id={ tweet.id } 
            content={ tweet.content }
            dateSubmitted={ tweet.dateSubmitted }
            key={ tweet.id } 
          />
        )) : 
        'There are no tweets available'}
    </div>
    
  )
}

export default TweetList