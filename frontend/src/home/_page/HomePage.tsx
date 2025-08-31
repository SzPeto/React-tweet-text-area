import Hr from '@/ui/hr/Hr'
import TweetAdd from '../tweet-add/TweetAdd'
import TweetList from '../tweet-list/TweetList'
import './HomePage.css'

const Home = () => {
  
  return(
    <div className='home-container'>
      <div className='tweet-input-container-l1'>
        <TweetAdd />
      </div>
      <Hr />
      <div className='tweet-list-container'>
        <TweetList />
      </div>
    </div>
  )
}

export default Home