import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Button from '@/ui/button/Button'
import MuiTextField from '@/ui/text-field/TextField'
import Hr from '@/ui/hr/Hr'
import { schema } from './login.schema'
import { login } from './login'
import { useLoginStore } from './useLoginStore'
import './LoginPage.css'

type LoginFormData = z.infer<typeof schema>

const Login = () => {
  const navigate = useNavigate()
  const [ showPassword, setShowPassword ] = useState(false)
  const { control, handleSubmit, reset, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
    defaultValues: { userName: '', password: '' }
  })

  const onSubmit = async (data: LoginFormData) => {
    const response = await login(data.userName, data.password)

    if (response.success) {
      reset()
      navigate('/')
    }
  }

  return useLoginStore.getState().isLoggedIn ? (
    <Navigate to='/' />
  ) : (
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

        <Button text='Login' isSubmit={ true } color={ 'primary' } />
      </form>
    </div>
  )
}

export default Login