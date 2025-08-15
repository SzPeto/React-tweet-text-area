import './Home.css'
import TweetInput from '@/components/tweets/tweet-input/TweetInput'
import TweetList from '@/components/tweets/tweet-list/TweetList.tsx'
import { useState } from 'react'
import { useTweetHelpers } from '@/hooks/useTweetHeplers'
import { getDateTime } from '@/utils/getDateTime.ts'
import { getIsFirstStart, setIsFirstStart } from '@/utils/globalStore'

const Home = () => {

  const [ tweet, setTweet ] = useState('Tweet me!')
  const { fetchFromBe, sendToBe, deleteAll, deleteOne } = useTweetHelpers()
  const [ tweets, setTweets ] = useState([])

  // Initial fetch after startup
  if(getIsFirstStart()){
    (async () => {
      try{
        const getJson = await fetchFromBe()
        setTweets(getJson)
      }catch(err){
        console.error(`Error on initial GET request : ${err}`)
      }
    })()
    setIsFirstStart(false)
  }

  // Handling button events
  async function handleClick(e: any) {
    const buttonId = e.target.id
    const dateSubmitted = getDateTime()
    let json;
    let getJson;

    try{
      if(buttonId == 'submit'){
        json = await sendToBe(tweet, dateSubmitted)
      }else if(buttonId == 'info'){
        setTweet('')
      }else if(buttonId == 'delete-all'){
        json = await deleteAll()
      }else if(buttonId == 'delete-one'){
        const idToDelete = e.currentTarget.getAttribute('data-id')
        json = await deleteOne(idToDelete)
      }
    }catch(err){
      console.error(`Error during communication with backend : `, err)
    }
    console.log(json)
    getJson = await fetchFromBe()
    setTweets(getJson)
  }
  
  return(
    <div className='home-container'>
      <div className='tweet-input-container-l1'>
        <TweetInput 
          onClick={ handleClick } 
          onChange={ (e) => setTweet(e.target.value) } 
          value={ tweet } 
        />
      </div>
      <hr />
      <div className='tweet-list-container'>
        <TweetList tweets={ tweets } onClick={ handleClick } />
      </div>
    </div>
  )
}

export default Home