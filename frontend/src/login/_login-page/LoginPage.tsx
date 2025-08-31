import { useFlashMessageStore } from '@/ui/flash/useFlashMessageStore'
import MuiButton from '@/ui/mui-button/MuiButton'
import MuiTextField from '@/ui/mui-text-field/MuiTextField'
import './LoginPage.css'
import { IconButton, InputAdornment } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useState } from 'react'
import { authenticateUser } from './authenticateUser'
import { useLoginStore } from './useLoginStore'
import { useNavigate } from 'react-router-dom'
import Hr from '@/ui/hr/Hr'
import { getMe } from './getMe'

const schema = yup.object({
  userName: yup.string().min(3, 'Username has to be at least 3 characters').required('Username required!'),
  password: yup.string().required('Password required!').min(6, 'Password has to be at least 6 characters long')
}).required()

const Login = () => {
  const navigate = useNavigate()
  const [ showPassword, setShowPassword ] = useState(false)
  const setFlashMessage = useFlashMessageStore((s) => s.setFlashMessage)
  const loginUser = useLoginStore((s) => s.loginUser)
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { userName: '', password: '' }
  })


  const onSubmit = async (data: any) => {
    const json = await authenticateUser(data.userName, data.password)
    
    if (json.error) {
      const jsonErrorMessage = json.error?.response?.data?.message ?? json.error?.message ?? 'Error while authenticating user'
      setFlashMessage(`Login unsuccessful, error while authenticating user : ${ jsonErrorMessage }`, 'warning')
    } else {
      const user = await getMe(json.accessToken)
      if (user.error) {
        const userErrorMessage = user.error?.response?.data?.message ?? user.error?.message ?? 'Error fetching user'
        setFlashMessage(`Login unsuccessful, error while fetching user : ${ userErrorMessage }`, 'warning')
      } else {
        reset()
        loginUser(user.userName, json.accessToken, user.email, user.picturePath)
        setFlashMessage(`Welcome ${ data.userName }!`, 'success')
        navigate('/')
      }
    }
  }

  return (
    <div className='login-container'>
      <form className='login-form' onSubmit={ handleSubmit(onSubmit) } >
        <p className='login-heading'>Login user</p>
        <Hr className='mb-8' />
        <Controller
          name='userName'
          control={ control }
          render={({ field }) => (
            <MuiTextField
              {...field}
              label='Username'
              id='outlined-basic'
              type='text'
              error={ errors.userName ? true : false }
              helperText={ errors.userName?.message } // optional chaining operator, access only messages if userName not null
            />
          )}
        />
        <Controller
          name='password'
          control={ control }
          render={({ field }) => (
            <MuiTextField
              {...field}
              label='Password'
              id='outlined-password-input'
              type={ showPassword ? 'text' : 'password' }
              error={ errors.password ? true : false }
              helperText={ errors.password?.message }
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge='end'
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }
              }}
            />
          )}
        />
        <MuiButton text='Login' isSubmit={ true } color={ 'primary' } />
      </form>
    </div>
  )
}

export default Login