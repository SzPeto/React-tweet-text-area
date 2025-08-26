import Button from '@mui/material/Button'

type MuiButtonProps = {
  text?: string,
  type?: 'submit' | 'info' | 'get' | 'delete' | 'update' | 'disabled',
  data?: string | number,
  hidden?: boolean,
  onClick: (...args: any[]) => any,
  size?: 'small' | 'medium' | 'large'
}

const buttonColor: any = {
  'submit': 'success',
  'info': 'primary',
  'get': 'primary',
  'delete': 'error',
  'update': 'success',
  'disabled': 'info'
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
      color={ buttonColor[props.type ?? 'info'] }
      sx={{ margin: '10px' }}
      size={ props.size ?? 'medium' }
    >
      {props.text ?? 'Push me'}
    </Button>
  )
}

export default MuiButton