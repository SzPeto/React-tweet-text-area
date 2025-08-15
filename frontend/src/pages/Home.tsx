import './Home.css'
import TweetInput from '@/components/tweets/tweet-input/TweetInput'
import TweetList from '@/components/tweets/tweet-list/TweetList.tsx'
import { useState } from 'react'
import { useTweetHelpers } from '@/hooks/useTweetHeplers'
import { getDateTime } from '@/utils/getDateTime.ts'
import { getIsFirstStart, setIsFirstStart } from '@/utils/globalStore'

const Home = () => {

  const [ tweet, setTweet ] = useState('Tweet me!')
  const { fetchFromBe, sendToBe, deleteAll } = useTweetHelpers()
  const [ tweets, setTweets ] = useState([])

  if(getIsFirstStart()){
    (async () => {
      try{
        const getJson = await fetchFromBe()
        setTweets(getJson)
      }catch(err){
        console.error(`Error on initial GET request : ${err}`)
      }
    })()
    console.log('=================\n\nInitial fetch\n\n=================')
    setIsFirstStart(false)
  }

  async function handleClick(e: any) {

    const buttonId = e.target.id
    const dateSubmitted = getDateTime()
    let json;
    let getJson;

    if(buttonId == 'submit'){
      try{
        json = await sendToBe(tweet, dateSubmitted)
        getJson = await fetchFromBe()
      }catch(err){
        console.error(`Error during communication with backend : `, err)
      }
      console.log('Post response : ', json)
      setTweets(getJson)
    }else if(buttonId == 'info'){
      setTweet('')
    }else if(buttonId == 'delete'){
      try{
        await deleteAll()
        getJson = await fetchFromBe()
      }catch(err){
        console.error(`Error during communication with backend : `, err)
      }
      setTweets(getJson)
    }
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
        <TweetList tweets={ tweets } />
      </div>
    </div>
  )
}

export default Home