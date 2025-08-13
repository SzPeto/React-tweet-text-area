import './Home.css'
import TweetInput from '@/components/tweets/tweet-input/TweetInput.tsx'
import TweetList from '@/components/tweets/tweet-list/TweetList.tsx'
import { useState } from 'react'
import { useTweetHelpers } from '@/hooks/useTweetHeplers'

const Home = () => {

  const [tweet, setTweet] = useState('Tweet me!')
  const { fetchFromBe, sendToBe } = useTweetHelpers()
  const [ tweets, setTweets ] = useState([])

  async function handleClick(e: any) {

    const buttonId = e.target.id
    console.log(`Button id : `, buttonId)
    let json;
    let getJson;

    if(buttonId == 'submit'){
      try{
        json = await sendToBe(tweet)
        getJson = await fetchFromBe()
      }catch(err){
        console.error(`Error during communication with backend : `,)
      }
      console.log('Post response : ', json)
      setTweets(getJson)
    }else if(buttonId == 'info'){
      setTweet('')
    }
  }

  return(
    <div className='home-container'>
      <TweetInput 
        onClick={ handleClick } 
        onChange={ (e) => setTweet(e.target.value) } 
        value={ tweet } 
      />
      <hr />
      <TweetList tweets={ tweets } />
    </div>
  )
}

export default Home