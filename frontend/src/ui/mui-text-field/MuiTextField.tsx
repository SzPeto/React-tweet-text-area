import TextField, { type TextFieldProps } from '@mui/material/TextField'

type PropTypes = TextFieldProps & {
  id: 'outlined-basic' | 'outlined-required' | 'outlined-password-input',
  type?: 'password' | 'email' | 'text',
  label: string,
  onChange: (...args: any[]) => any,
  value: string,
}


const MuiTextField = (props: PropTypes) => {

  return (
    <TextField 
      sx={{ width: '80%' }}
      { ...props }
    />
  )
}

export default MuiTextField