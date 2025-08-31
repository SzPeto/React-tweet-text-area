import { Navigate } from 'react-router-dom'
import './ProfilePage.css'
import { useLoginStore } from '@/login/login-page/useLoginStore'
import BaseBackground from '@/ui/base-background/BaseBackground'
import Card from '@/ui/card/Card'
import Hr from '@/ui/hr/Hr'



const ProfilePage = () => {
  const currentUser = useLoginStore((s) => s.currentUser)
  const isLoggedIn = useLoginStore((s) => s.isLoggedIn)

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