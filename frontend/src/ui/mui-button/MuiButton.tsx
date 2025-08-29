import Button from '@mui/material/Button'

type MuiButtonProps = {
  text?: string,
  color?: 'primary' | 'success' | 'error' | 'info',
  data?: string | number,
  onClick?: (...args: any[]) => any,
  size?: 'small' | 'medium' | 'large',
  hidden?: boolean,
  isSubmit?: boolean,
  isDisabled?: boolean
}

const MuiButton = (props: MuiButtonProps) => {
  if (props.hidden) return null
  
  return (
    <Button
      onClick={ props.onClick }
      data-id={ props.data ?? '' }
      variant='contained'
      color={ props.color ?? 'info' }
      sx={{ margin: '10px' }}
      size={ props.size ?? 'medium' }
      type={ props.isSubmit ? 'submit' : 'button' }
      disabled={ props.isDisabled ? true : false }
    >
      {props.text ?? 'Push me'}
    </Button>
  )
}

export default MuiButton