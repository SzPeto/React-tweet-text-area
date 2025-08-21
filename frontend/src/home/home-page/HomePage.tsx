import './HomePage.css'
import TweetInput from '@/tweets/tweet-input/TweetInput'
import TweetList from '@/tweets/tweet-list/TweetList'
import { useEffect, useState } from 'react'
import { useTweetHelpers } from '../../tweets/_hooks/useTweetHeplers'
import { getDateTime } from '@/_shared/utils/getDateTime'
import { useTweetsStore } from '@/_shared/store/useTweetsStore'
import { useActiveSubmitStore } from '@/_shared/store/useActiveSubmitStore'

const Home = () => {

  const [ tweet, setTweet ] = useState('Tweet me!')
  const [ isLoading, setIsLoading ] = useState(false)
  const tweets = useTweetsStore((s) => s.tweets) // s stands for state
  const setTweets = useTweetsStore((s) => s.setTweets)
  const { fetchFromBe, sendToBe, deleteAll, deleteOne } = useTweetHelpers() // BE REST API functions
  const setIsActiveSumbit = useActiveSubmitStore((s) => s.setisActiveSubmit)

  // Initial fetch after startup
  useEffect(() => {
    (async () => {
      setIsLoading(true)
      const getJson = await fetchFromBe()
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
      json = await sendToBe(tweet, dateSubmitted)
    } else if (buttonId == 'info') {
      setTweet('')
    } else if (buttonId == 'delete-all') {
      json = await deleteAll()
    } else if (buttonId == 'delete-one') {
      const idToDelete = e.currentTarget.getAttribute('data-id')
      json = await deleteOne(idToDelete)
    }

    console.log(json)
    getJson = await fetchFromBe()
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