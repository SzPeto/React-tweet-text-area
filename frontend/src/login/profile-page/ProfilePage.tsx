import { Navigate } from 'react-router-dom'
import BaseBackground from '@/ui/base-background/BaseBackground'
import Card from '@/ui/card/Card'
import Hr from '@/ui/hr/Hr'
import { useLoginStore } from '@/login/login-page/useLoginStore'
import './ProfilePage.css'
import { getMe } from '../login-page/getMe'
import { useEffect } from 'react'



const ProfilePage = () => {
  const currentUser = useLoginStore((s) => s.currentUser)
  const isLoggedIn = useLoginStore((s) => s.isLoggedIn)

  // TODO - only debugging purposes, remove in production
  useEffect(() => {
    (async ()=> {
      const user = await getMe()
      if (user.error) {
        const userErrorMessage = user.error?.response?.data?.message ?? user.error?.message ?? 'Error fetching user'
        console.log('Error message on fetching user : ', userErrorMessage)
      } else {
        console.log(user.userName)
      }
    })()
  })

  return isLoggedIn ? (
    <BaseBackground>
      <Card>
        <p className='profile-heading'>User profile</p>
        <Hr className='mb-8' />
        <p>Username : { currentUser.userName }</p>
        <p>Email : { currentUser.email }</p>
        <p>Picture path : { currentUser.picturePath }</p>
      </Card>
    </BaseBackground>
  ) : (
    <Navigate to='/' />
  )
}

export default ProfilePage