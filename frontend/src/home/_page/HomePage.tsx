import Hr from '@/ui/hr/Hr'
import TweetAdd from '../tweet-add/TweetAdd'
import TweetList from '../tweet-list/TweetList'
import './HomePage.css'
import { getMe } from '@/login/login-page/getMe'
import { useEffect } from 'react'
import { useLoginStore } from '@/login/login-page/useLoginStore'

const Home = () => {
  const loginUserFe = useLoginStore((s) => s.loginUserFe)

  // Main user fetch, after refresh checks for active session, if active fetches the logged in user from BE
  useEffect(() => {
    (async () => {
      const user = await getMe()
      if (!user.error) {
        loginUserFe(user.userName, user.email, user.picturePath)
      }
    })()
  }, [loginUserFe])
  
  return (
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