import { Navigate } from 'react-router-dom'
import BaseBackground from '@/ui/base-background/BaseBackground'
import Card from '@/ui/card/Card'
import Hr from '@/ui/hr/Hr'
import { useLoginStore } from '@/account/login/useLoginStore'
import './ProfilePage.css'

const ProfilePage = () => {
  const currentUser = useLoginStore((s) => s.currentUser)
  const isLoggedIn = useLoginStore((s) => s.isLoggedIn)

  return isLoggedIn ? (
    <BaseBackground>
      <Card>
        <p className='profile-heading'>User profile</p>
        <Hr className='mb-8' />
        <p><b>Username : </b>{ currentUser.userName }</p>
        <p><b>Email : </b>{ currentUser.email }</p>
      </Card>
    </BaseBackground>
  ) : (
    <Navigate to='/' />
  )
}

export default ProfilePage