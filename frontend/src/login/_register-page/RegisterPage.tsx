import { useState } from 'react'
import './RegisterPage.css'
import MuiTextField from '@/ui/mui-text-field/MuiTextField'
import MuiButton from '@/ui/mui-button/MuiButton'
import { addUser } from './addUser'
import { useFlashMessageStore } from '@/ui/flash/useFlashMessageStore'
import { IconButton, InputAdornment } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'


// 1️⃣ Yup validation schema
const schema = yup.object({
  userName: yup.string().min(3, 'Username has to be at least 3 characters').required('Username required!'),
  email: yup.string().email('Invalid email').required('Email required'),
  password: yup.string().required('Password required!').min(6, 'Password has to be at least 6 characters long')
}).required()

const Register = () => {
  const setFlashMessage = useFlashMessageStore((s) => s.setFlashMessage)
  const [ showPassword, setShowPassword ] = useState(false)

  // 2️⃣ Initialize react-hook-form
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { userName: '', email: '', password: '' }
  })

  // 3️⃣ Modify submit handler (data: any), addUser(data.userName, data.email, data.password)
  const onSubmit = async (data: any) => {
    // When using react hook form, you don't have to prevent default
    const json = await addUser(data.userName, data.email, data.password)

    if (json.error) {
      setFlashMessage('User registration failed!', 'warning')
    } else {
      setFlashMessage(`User ${ json.userName } registered successfully`, 'success')
    }
  }

  // 4️⃣ Modify onSubmit and add Controllers
  return (
    <div className='register-container'>
      <p className='register-heading'>Register user</p>
      <form className='register-form' onSubmit={ handleSubmit(onSubmit) } >
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
          name='email'
          control={ control }
          render={({ field }) => (
            <MuiTextField
              {...field}
              label='Email'
              id='outlined-basic'
              type='email'
              error={ errors.email ? true : false }
              helperText={errors.email?.message}
            />
          )}
        />
        <Controller
          name='password'
          control={ control }
          render={({ field }) => (
            <>
              <MuiTextField
                {...field}
                label='Password'
                id='outlined-password-input'
                type={showPassword ? 'text' : 'password'}
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
              { errors.password && <p className='error-text'>{errors.password.message}</p> }
            </>
          )}
        />
        <MuiButton text='Submit' isSubmit={ true } color='success' />
      </form>
    </div>
  )
}

export default Register