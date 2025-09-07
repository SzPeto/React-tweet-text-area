import { useNavigate } from 'react-router-dom'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import IconButton from '@/ui/icon-button/IconButton'
import { useTweetsStore } from '../tweet-list/useTweetsStore'
import { useLoginStore } from '@/account/login/useLoginStore'
import { deleteTweet } from './deleteTweet'
import { fetchTweets } from '../tweet-list/fetchTweets'
import { formatIsoDateTime } from '@/_utils/date-time/formatIsoDateTime'
import { type User } from '@/account/login/user.type'
import './TweetItem.css'

type TweeetProps = {
  id: string,
  content: string,
  dateSubmitted: string
  user: User
}

const TweetItem = (props: TweeetProps) => {
  const currentUser = useLoginStore((s) => s.currentUser)
  const navigate  = useNavigate()
  const setTweets = useTweetsStore((s) => s.setTweets)

  const handleDelete = async () => {
    await deleteTweet(props.id)
    const getJson = await fetchTweets()
    setTweets(getJson)
  }

  // Reusable inline component Buttons
  const Buttons = () => (
    <div className='delete-edit-button-wrapper-container'>
      <hr className='horizontal-rule'/>
      <div className='delete-edit-button-container'>
        <IconButton 
          size='large' 
          onClick={ () => navigate(`/tweets/${ props.id }/edit`) } 
          color='primary'
        >
          <EditRoundedIcon />
        </IconButton>
        <IconButton 
          size='large' 
          onClick={ () => { 
            if (window.confirm('Are you sure you want to delete this tweet?')) {
              handleDelete() 
            }
          }} 
          color='error'
        >
          <DeleteRoundedIcon />
        </IconButton>
      </div>
    </div>
  )

  return (
    <div className="tweet-tweet-container" >
      
      <div className='upper-container'>
        <div className="titles-container">
          <AccountCircleRoundedIcon color='primary' fontSize='large' /> 
          <p><b>{ props.user.userName }</b></p>
        </div>
        <div className='date-time-container'>
          <small>{ formatIsoDateTime(props.dateSubmitted) }</small>
        </div>
      </div>

      <hr className='horizontal-rule' />

      <div className='logic-container'>
        <div className='content-container'>
          <p>{ props.content }</p>
        </div>
      </div>

      <div className='edit-buttons-container'>
        { (props.user._id === currentUser._id ) && (<Buttons />) }
      </div>

    </div>
  )
}

export default TweetItem