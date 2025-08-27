import Button from '@mui/material/Button'

type MuiButtonProps = {
  text?: string,
  type?: 'primary' | 'success' | 'error' | 'disabled',
  data?: string | number,
  hidden?: boolean,
  onClick: (...args: any[]) => any,
  size?: 'small' | 'medium' | 'large'
}

const MuiButton = (props: MuiButtonProps) => {
  if (props.hidden) return null
  if (props.type == 'disabled') return (<Button disabled >{props.text ?? 'Push me'}</Button>)

  return (
    <Button
      onClick={ props.onClick }
      id={ props.type ?? 'submit' }
      data-id={ props.data ?? '' }
      variant="contained"
      color={ props.type ?? 'info' }
      sx={{ margin: '10px' }}
      size={ props.size ?? 'medium' }
    >
      {props.text ?? 'Push me'}
    </Button>
  )
}

export default MuiButton