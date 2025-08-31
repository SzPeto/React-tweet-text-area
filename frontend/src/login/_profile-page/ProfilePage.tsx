import BaseBackground from "@/ui/base-background/BaseBackground"
import Card from "@/ui/card/Card"
import './ProfilePage.css'
import Hr from "@/ui/hr/Hr"
import { useLoginStore } from "../_login-page/useLoginStore"

const ProfilePage = () => {
  const currentUser = useLoginStore((s) => s.currentUser)

  return (
    <BaseBackground>
      <Card>
        <p className='profile-heading'>User profile</p>
        <Hr className='mb-8' />
        <p>Username : { currentUser.userName }</p>
        <p>Email : {}</p>
      </Card>
    </BaseBackground>
  )
}

export default ProfilePage