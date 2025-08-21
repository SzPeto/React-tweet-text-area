import './TweetList.css'
import Tweet from '@/tweets/tweet/Tweet'

type TweetType = {
  _id: string,
  content: string,
  dateSubmitted: string
}

type TweetListProps = {
  tweets: TweetType[],
  onClick: (...args: any[]) => any
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
            onClick={ props.onClick }
          />
        )) : 
        'There are no tweets available'}
    </div>
  )
}

export default TweetList