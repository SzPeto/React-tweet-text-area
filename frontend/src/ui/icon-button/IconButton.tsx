import type { ReactNode } from 'react'
import MuiIconButton from '@mui/material/IconButton'

type IconButtonProps = {
  data?: string | number,
  onClick: (...args: any[]) => any,
  size?: 'small' | 'medium' | 'large',
  hidden?: boolean,
  isSubmit?: boolean,
  isDisabled?: boolean,
  children: ReactNode,
  color?: 'primary' | 'success' | 'error'
}

const IconButton = (props: IconButtonProps) => {
  if (props.hidden) {
    return null
  }
  
  return (
    <MuiIconButton
      onClick={ props.onClick }
      data-id={ props.data ?? '' }
      sx={{ margin: '10px' }}
      size={ props.size ?? 'medium' }
      disabled={ props.isDisabled ? true : false }
      color={ props.color ?? 'primary' }
    >
      { props.children }
    </MuiIconButton>
  )
}

export default IconButton