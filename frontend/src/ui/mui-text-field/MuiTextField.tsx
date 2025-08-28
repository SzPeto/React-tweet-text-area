import TextField from '@mui/material/TextField'

type PropTypes = {
  label: string,
  onChange: (...args: any[]) => any,
  value: string
}

const MuiTextField = (props: PropTypes) => {

  return (
    <TextField 
      id="outlined-basic" 
      label={ props.label } 
      variant="outlined" 
      onChange={ props.onChange }
      value={ props.value }
    />
  )
}

export default MuiTextField