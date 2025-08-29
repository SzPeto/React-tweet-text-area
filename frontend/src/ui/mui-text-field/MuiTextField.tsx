import TextField, { type TextFieldProps } from '@mui/material/TextField'

type PropTypes = {
  id: 'outlined-basic' | 'outlined-required' | 'outlined-password-input'
  label: string,
  onChange: (...args: any[]) => any,
  value: string,
  type?: 'password' | 'email' | 'text',
  slotProps?: TextFieldProps['slotProps']
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
    />
  )
}

export default MuiTextField