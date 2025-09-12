import { useEffect, useState } from 'react'
import Tweet from '@/home/tweet-item/TweetItem'
import ErrorSlot from '@/ui/error-slot/ErrorSlot'
import { useTweetsStore } from '@/home/tweet-list/useTweetsStore'
import { fetchTweets } from './fetchTweets'
import './TweetList.css'

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
      } else {
        setErrorMessage(`Error fetching tweets : ${ res.error! }`)
      }
      setIsLoading(false)
    })()
  }, [])

  return (
    <div className='tweet-list-container-l2'>
      <ErrorSlot message={ errorMessage } UUID={ crypto.randomUUID() } />
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