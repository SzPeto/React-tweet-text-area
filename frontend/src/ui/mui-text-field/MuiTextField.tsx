import TextField from '@mui/material/TextField'

type PropTypes = {
  id: 'outlined-basic' | 'outlined-required' | 'outlined-password-input'
  label: string,
  onChange: (...args: any[]) => any,
  value: string,
  type?: 'password'
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
    />
  )
}

export default MuiTextField