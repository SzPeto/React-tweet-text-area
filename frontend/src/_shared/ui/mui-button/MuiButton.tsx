import Button from '@mui/material/Button'

type MyButtonProps = {
  text?: string,
  type?: 'submit' | 'info' | 'get' | 'delete-all' | 'delete-one' | 'update' | 'disabled',
  data?: string | number,
  hidden?: boolean,
  onClick: (...args: any[]) => any
}

const buttonColor = {
  'submit': 'success',
  'info': 'primary',
  'get': 'primary',
  'delete-all': 'error',
  'delete-one': 'error',
  'update': 'success',
  'disabled': 'info'
}

const MuiButton = (props: MyButtonProps) => {
  if (props.hidden) return null

  return (
    <Button
      onClick={ props.onClick }
      id={ props.type ?? 'submit' }
      data-id={ props.data ?? '' }
      variant="contained"
      color="primary"
    >
      {props.text ?? 'Push me'}
    </Button>
  )
}

export default MuiButton