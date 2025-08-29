import TextField, { type TextFieldProps } from '@mui/material/TextField'

type PropTypes = {
  id: 'outlined-basic' | 'outlined-required' | 'outlined-password-input'
  label: string,
  onChange: (...args: any[]) => any,
  value: string,
  type: 'password' | 'email' | 'text',
  slotProps?: TextFieldProps['slotProps'],
  error?: boolean
  helperText?: string
}

const MuiTextField = (props: PropTypes) => {

  return (
    <TextField 
      id='outlined-basic' 
      label={ props.label } 
      onChange={ props.onChange }
      value={ props.value }
      sx={{ width: '80%' }}
      type={ props.type }
      slotProps={ props.slotProps }
      error={ props.error }
      helperText={props.helperText}
    />
  )
}

export default MuiTextField