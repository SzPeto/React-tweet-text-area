import './TweetList.css'
import Tweet from '@/home/tweet-item/TweetItem'
import { useTweetsStore } from '@/tweets/_store/useTweetsStore'

type TweetListProps = {
  onClick: (...args: any[]) => any
}

const TweetList = (props: TweetListProps) => {

  const tweets = useTweetsStore((s) => s.tweets)

  return (
    <div className='tweet-list-container-l2'>
      {Array.isArray(tweets) && tweets.length > 0 ? 
        [...tweets].reverse().map((tweet) => (
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