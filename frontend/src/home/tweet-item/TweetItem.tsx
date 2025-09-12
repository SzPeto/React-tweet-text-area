import { useState } from 'react'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import ErrorSlot from '@/ui/error-slot/ErrorSlot'
import EditDeleteButtons from './buttons/EditDeleteButtons'
import { useTweetsStore } from '../tweet-list/useTweetsStore'
import { useLoginStore } from '@/account/login/useLoginStore'
import { deleteTweet } from './buttons/deleteTweet'
import { fetchTweets } from '../tweet-list/fetchTweets'
import { formatIsoDateTime } from '@/_utils/date-time/formatIsoDateTime'
import { type UserType } from '@/account/login/user.type'
import './TweetItem.css'

type TweeetProps = {
  id: string,
  content: string,
  dateSubmitted: string,
  user: UserType
}

const TweetItem = (props: TweeetProps) => {
  const currentUser = useLoginStore((s) => s.currentUser)
  const setTweets = useTweetsStore((s) => s.setTweets)
  const [ errorMessage, setErrorMessage ] = useState('')

  const handleDelete = async () => {
    const resDelete = await deleteTweet(props.id)
    const resFetch = await fetchTweets()

    if (!resDelete.success) {
      setErrorMessage(`Error deleting tweet : ${ resDelete.error }`)
    } 
    if (resFetch.success) {
      setTweets(resFetch.json!)
    } 
  }

  return (
    <>
      <ErrorSlot message={ errorMessage } UUID={ crypto.randomUUID() } />
      <div className='tweet-main-container' >
        
        <div className='upper-container'>
          <div className='titles-container'>
            <AccountCircleRoundedIcon color='primary' fontSize='large' /> 
            <p><b>{ props.user.userName }</b></p>
          </div>
          <div className='date-time-container'>
            <small>{ formatIsoDateTime(props.dateSubmitted) }</small>
          </div>
        </div>

        <hr className='horizontal-rule' />

        <div className='content-container'>
          <p>{ props.content }</p>
        </div>
        
        <div className='edit-buttons-container'>
          { (props.user._id === currentUser._id ) && (<EditDeleteButtons id={ props.id } onClick={ handleDelete } />) }
        </div>

      </div>
    </>
  )
}

export default TweetItem