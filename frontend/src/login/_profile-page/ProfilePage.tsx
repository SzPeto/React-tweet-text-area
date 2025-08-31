import BaseBackground from "@/ui/base-background/BaseBackground"
import Card from "@/ui/card/Card"
import './ProfilePage.css'
import Hr from "@/ui/hr/Hr"

const ProfilePage = () => {

  return (
    <BaseBackground>
      <Card>
        <p className='profile-heading'>User profile</p>
        <Hr className='mb-8' />
        <p>Username : {}</p>
        <p>Email : {}</p>
      </Card>
    </BaseBackground>
  )
}

export default ProfilePage