import { useState } from 'react'
import './RegisterPage.css'
import MuiTextField from '@/ui/mui-text-field/MuiTextField'
import MuiButton from '@/ui/mui-button/MuiButton'
import { addUser } from './addUser'
import { useFlashMessageStore } from '@/ui/flash/useFlashMessageStore'
import { IconButton, InputAdornment } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const Register = () => {
  const [ userName, setUserName ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ email, setEmail ] = useState('')
  const setFlashMessage = useFlashMessageStore((s) => s.setFlashMessage)
  const [ showPassword, setShowPassword ] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const json = await addUser(userName, email, password)

    if (json.error) {
      setFlashMessage('User registration failed!', 'warning')
    } else {
      setUserName('')
      setEmail('')
      setPassword('')
      setFlashMessage(`User ${ json.userName } registered successfully`, 'success')
    }
  }

  return (
    <div className="register-container">
      <p className='register-heading'>Register user</p>
      <form className='register-form' onSubmit={ handleSubmit } >
        <MuiTextField 
          label='username' 
          onChange={ (e) => setUserName(e.target.value) } 
          value={ userName } 
          id='outlined-basic' 
        />
        <MuiTextField 
          label='email' 
          onChange={ (e) => setEmail(e.target.value) } 
          value={ email } 
          id='outlined-basic'
          type='email'
        />
        <MuiTextField 
          label='password' 
          onChange={ (e) => setPassword(e.target.value) } 
          value={ password } 
          id='outlined-password-input'
          type={ showPassword ? 'text' : 'password' }
          // adornment in MUI is just something extra you “stick” inside an input field — 
          // either at the start (left side) or at the end (right side).
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
        <MuiButton text='Submit' isSubmit={ true } type='success' />
      </form>
    </div>
  )
}

export default Register