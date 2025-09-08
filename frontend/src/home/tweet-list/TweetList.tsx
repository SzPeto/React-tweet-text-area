import { useEffect, useState } from 'react'
import Tweet from '@/home/tweet-item/TweetItem'
import { useTweetsStore } from '@/home/tweet-list/useTweetsStore'
import { fetchTweets } from './fetchTweets'
import './TweetList.css'
import ErrorSlot from '@/ui/error-slot/ErrorSlot'

const TweetList = () => {
  const tweets = useTweetsStore((s) => s.tweets)
  const setTweets = useTweetsStore((s) => s.setTweets)
  const [ isLoading, setIsLoading ] = useState(false)
  const [ errorMessage, setErrorMessage ] = useState('')

  // Initial fetch after startup
  useEffect(() => {
    (async () => {
      setIsLoading(true)
      const res = await fetchTweets()
      if (res.success) {
        setTweets(res.json!)
        setIsLoading(false)
      } else {
        setErrorMessage(`Error fetching tweets : ${ res.error! }`)
        setIsLoading(false)
      }
    })()
  }, [])

  return (
    <div className='tweet-list-container-l2'>
      <ErrorSlot message={ errorMessage } />
      {
        isLoading ? (
          <p>Loading tweets...</p>
        ) : (
          Array.isArray(tweets) && tweets.length > 0 ? (
            [...tweets].reverse().map((tweet) => (
              <Tweet 
                id={ tweet._id } 
                content={ tweet.content }
                dateSubmitted={ tweet.createdAt }
                user={ tweet.user }
                key={ tweet._id }
              />
            ))
          ) : (
            'There are no tweets available'
          )
        )
      }
    </div>
  )
}

export default TweetList