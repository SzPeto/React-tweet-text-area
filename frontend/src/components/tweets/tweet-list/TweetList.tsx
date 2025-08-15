import './TweetList.css'
import Tweet from '@/components/tweets/tweet/Tweet.tsx'

type TweetType = {
  _id: string,
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
            id={ tweet._id } 
            content={ tweet.content }
            dateSubmitted={ tweet.dateSubmitted }
            key={ tweet._id } 
          />
        )) : 
        'There are no tweets available'}
    </div>
    
  )
}

export default TweetList