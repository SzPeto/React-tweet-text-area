import './Home.css'
import Tweet from '@/components/tweets/tweet-input/TweetInput'

const Home = () => {

  return(
    <div className='home-container'>
      <Tweet />
      <hr />
    </div>
  )
}

export default Home