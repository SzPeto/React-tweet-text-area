import './Home.css'
import Tweet from '@/components/tweet/Tweet.tsx'

const Home = () => {

  return(
    <div className='home-container'>
      <Tweet />
      <hr />
    </div>
  )
}

export default Home