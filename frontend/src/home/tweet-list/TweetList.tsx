import './TweetList.css'
import Tweet from '@/home/tweet-item/TweetItem'
import { useTweetsStore } from '@/home/tweet-list/useTweetsStore'
import { useEffect, useState } from 'react'
import { fetchTweets } from './fetchTweets'

type TweetListProps = {
  onClick: (...args: any[]) => any
}

const TweetList = (props: TweetListProps) => {

  const tweets = useTweetsStore((s) => s.tweets)
  const setTweets = useTweetsStore((s) => s.setTweets)
  const [ isLoading, setIsLoading ] = useState(false)

  // Initial fetch after startup
  useEffect(() => {
    (async () => {
      setIsLoading(true)
      const getJson = await fetchTweets()
      setIsLoading(false)
      setTweets(getJson)
    })()
  }, [])

  return (
    <div className='tweet-list-container-l2'>
      {
        isLoading ? (
          <p>Loading tweets...</p>
        ) : (
          Array.isArray(tweets) && tweets.length > 0 ? (
            [...tweets].reverse().map((tweet) => (
              <Tweet 
                id={ tweet._id } 
                content={ tweet.content }
                dateSubmitted={ tweet.dateSubmitted }
                key={ tweet._id }
                onClick={ props.onClick }
              />
            ))) : (
              'There are no tweets available'
            )
        )
      }
    </div>
  )
}

export default TweetList