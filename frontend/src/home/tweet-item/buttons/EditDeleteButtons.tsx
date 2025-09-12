import { useNavigate } from 'react-router-dom'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import IconButton from '@/ui/icon-button/IconButton'
  
type ButtonsProps = {
  id: string,
  onClick: (...args: any[]) => any
}

const EditDeleteButtons = (props: ButtonsProps) => {
  const navigate = useNavigate()

  return (
    <div className='buttons-wrapper-container'>
      <hr className='horizontal-rule'/>
      <div className='buttons-container'>

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
              props.onClick() 
            }
          }} 
          color='error'
        >
          <DeleteRoundedIcon />
        </IconButton>
        
      </div>
    </div>
  )
}

export default EditDeleteButtons