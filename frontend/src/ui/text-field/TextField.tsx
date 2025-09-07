import MuiTextField, { type TextFieldProps } from '@mui/material/TextField'

type PropTypes = {
  label: string,
  onChange: (...args: any[]) => any,
  value: string,
  type: 'password' | 'email' | 'text',
  slotProps?: TextFieldProps['slotProps'],
  error?: boolean
  helperText?: string
}

const TextField = (props: PropTypes) => {

  return (
    <MuiTextField 
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

export default TextField