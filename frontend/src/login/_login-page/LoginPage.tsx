import { useFlashMessageStore } from "@/ui/flash/useFlashMessageStore"
import MuiButton from "@/ui/mui-button/MuiButton"
import MuiTextField from "@/ui/mui-text-field/MuiTextField"
import { useState } from "react"
import './LoginPage.css'
import { IconButton, InputAdornment } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const Login = () => {
  const [ userName, setUserName ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ showPassword, setShowPassword ] = useState(false)
  const setFlashMessage = useFlashMessageStore((s) => s.setFlashMessage)


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

  }

  return (
    <div className="login-container">
      <p className='login-heading'>Login user</p>
      <form className='register-form' onSubmit={ handleSubmit } >
        <MuiTextField 
          label='username' 
          onChange={ (e) => setUserName(e.target.value) } 
          value={ userName } 
          id='outlined-basic'
        />
        <MuiTextField 
          label='password' 
          onChange={ (e) => setPassword(e.target.value) } 
          value={ password } 
          id='outlined-password-input'
          type={ showPassword ? 'text' : 'password' }
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    { showPassword ? <VisibilityOff /> : <Visibility /> }
                  </IconButton>
                </InputAdornment>
              )
            }
          }}
        />
        <MuiButton text='Login' isSubmit={ true } color={ 'primary' } />
      </form>
    </div>
  )
}

export default Login