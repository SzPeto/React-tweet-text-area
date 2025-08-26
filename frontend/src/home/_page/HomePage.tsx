import './HomePage.css'
import TweetAdd from '@/home/tweet-add/TweetAdd'
import TweetList from '@/home/tweet-list/TweetList'
import { useEffect, useState } from 'react'
import { getDateTime } from '@/_utils/getDateTime'
import { useTweetsStore } from '@/home/tweet-list/useTweetsStore'
import { useActiveSubmitStore } from '@/home/tweet-add/useActiveSubmitStore'
import { fetchTweets } from '@/home/tweet-list/fetchTweets'
import { addTweet } from '@/home/tweet-add/addTweet'
import { deleteTweet } from '@/home/tweet-item/deleteTweet'
import { deleteAllTweets } from '@/home/tweet-add/deleteAllTweets'
import { useFlashMessageStore } from '@/ui/flash/useFlashMessageStore'

const Home = () => {

  const [ tweet, setTweet ] = useState('')
  const setTweets = useTweetsStore((s) => s.setTweets)
  const setIsActiveSumbit = useActiveSubmitStore((s) => s.setisActiveSubmit)
  const setFlashMessage = useFlashMessageStore((s) => s.setFlashMessage)

  // Handling button events
  async function handleClick(e: any) {
    const buttonId = e.target.id
    const dateSubmitted = getDateTime()
    let json
    let getJson

    if (buttonId == 'submit') {
      setIsActiveSumbit(false)
      json = await addTweet(tweet, dateSubmitted)
      if (json) {
        setTweet('')
        setFlashMessage('Tweet added successfully!', 'success')
      } else {
        setFlashMessage('Error on inserting tweet', 'warning')
      }
    } else if (buttonId == 'info') {
      setTweet('')
    } else if (buttonId == 'delete-all') {
      json = await deleteAllTweets()
      if (json) {
        setFlashMessage('All tweets deleted successfully!', 'success')
      } else {
        setFlashMessage('Error on deleting tweets', 'warning')
      }
    } else if (buttonId == 'delete-one') {
      const idToDelete = e.currentTarget.getAttribute('data-id')
      json = await deleteTweet(idToDelete)
      if (json) {
        setFlashMessage('Tweet deleted successfully!', 'success')
      } else {
        setFlashMessage('Error on deleting tweet', 'warning')
      }
    }

    getJson = await fetchTweets()
    setTweets(getJson)
    setIsActiveSumbit(true)
  }
  
  return(
    <div className='home-container'>
      <div className='tweet-input-container-l1'>
        <TweetAdd 
          onClick={ handleClick }
          onChange={ (e) => setTweet(e.target.value) } 
          value={ tweet } 
          placeholder={ 'Tweet me!' }
        />
      </div>
      <hr />
      <div className='tweet-list-container'>
        <TweetList onClick={ handleClick } />
      </div>
    </div>
  )
}

export default Home