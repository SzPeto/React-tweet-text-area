import './HomePage.css'
import TweetInput from '@/tweets/tweet-input/TweetInput'
import TweetList from '@/tweets/tweet-list/TweetList'
import { useEffect, useState } from 'react'
import { getDateTime } from '@/_shared/utils/getDateTime'
import { useTweetsStore } from '@/tweets/_store/useTweetsStore'
import { useActiveSubmitStore } from '@/tweets/_store/useActiveSubmitStore'
import { fetchTweets } from '@/tweets/_services/fetchTweets'
import { addTweet } from '@/tweets/_services/addTweet'
import { deleteTweet } from '@/tweets/_services/deleteTweet'
import { deleteAllTweets } from '@/tweets/_services/deleteAllTweets'
import { useFlashMessageStore } from '@/_shared/store/useFlashMessageStore'

const Home = () => {

  const [ tweet, setTweet ] = useState('')
  const [ isLoading, setIsLoading ] = useState(false)
  const tweets = useTweetsStore((s) => s.tweets) // s stands for state
  const setTweets = useTweetsStore((s) => s.setTweets)
  const setIsActiveSumbit = useActiveSubmitStore((s) => s.setisActiveSubmit)
  const setFlashMessage = useFlashMessageStore((s) => s.setFlashMessage)
  const setFlashMessageType = useFlashMessageStore((s) => s.setFlashMessageType)

  // Initial fetch after startup
  useEffect(() => {
    (async () => {
      setIsLoading(true)
      const getJson = await fetchTweets()
      setIsLoading(false)
      setTweets(getJson)
    })()
  }, [])

  // Handling button events
  async function handleClick(e: any) {
    const buttonId = e.target.id
    const dateSubmitted = getDateTime()
    let json
    let getJson

    if (buttonId == 'submit') {
      setIsActiveSumbit(false)
      json = await addTweet(tweet, dateSubmitted)
    } else if (buttonId == 'info') {
      setTweet('')
    } else if (buttonId == 'delete-all') {
      json = await deleteAllTweets()
    } else if (buttonId == 'delete-one') {
      const idToDelete = e.currentTarget.getAttribute('data-id')
      json = await deleteTweet(idToDelete)
    }

    if (json) {
      setTweet('')
      setFlashMessage('Tweet added successfully!')
      setFlashMessageType('success')
    } else {
      setFlashMessage('Error on inserting tweet!')
      setFlashMessageType('warning')
    }

    getJson = await fetchTweets()
    setTweets(getJson)
    setIsActiveSumbit(true)
  }
  
  return(
    <div className='home-container'>
      <div className='tweet-input-container-l1'>
        <TweetInput 
          onClick={ handleClick }  /* Passed down to : TweetInput/TextArea/Button */
          onChange={ (e) => setTweet(e.target.value) } 
          value={ tweet } 
          placeholder={ 'Tweet me!' }
        />
      </div>
      <hr />
      {
        isLoading ? (
          <p>Loading tweets...</p>
        ) : (
          <div className='tweet-list-container'>
            <TweetList tweets={ tweets } onClick={ handleClick } />
          </div>
        )
      }
    </div>
  )
}

export default Home