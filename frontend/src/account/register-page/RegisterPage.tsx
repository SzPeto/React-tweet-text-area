import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Hr from '@/ui/hr/Hr'
import MuiTextField from '@/ui/text-field/TextField'
import MuiButton from '@/ui/button/Button'
import { addUser } from './addUser'
import { useFlashMessageStore } from '@/ui/flash/useFlashMessageStore'
import './RegisterPage.css'


const schema = z.object({
  userName: z.string().min(3, 'Username has to be at least 3 characters').nonempty('Username required!'),
  email: z.email('Invalid email').min(6, 'Email has to be at least 6 characters long').nonempty('Email required'),
  password: z.string().min(6, 'Password has to be at least 6 characters long').nonempty('Password required!'),
})

type RegisterFormData = z.infer<typeof schema>

const Register = () => {
  const setFlashMessage = useFlashMessageStore((s) => s.setFlashMessage)
  const [ showPassword, setShowPassword ] = useState(false)
  const { control, handleSubmit, reset, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
    defaultValues: { userName: '', email: '', password: '' }
  })

  const onSubmit = async (data: RegisterFormData) => {
    const json = await addUser(data.userName, data.email, data.password)

    if (json.error) {
      const message = json.error?.response?.data?.message ?? json.error?.message ?? 'unknown error'
      setFlashMessage(`User registration failed : ${ message }`, 'warning')
    } else {
      reset()
      setFlashMessage(`User ${ json.userName } registered successfully`, 'success')
    }
  }
  
  return (
    <div className='register-container'>
      <form className='register-form' onSubmit={ handleSubmit(onSubmit) } >
        <p className='register-heading'>Register user</p>
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
          name='email'
          control={ control }
          render={({ field }) => (
            <MuiTextField
              {...field}
              label='Email'
              id='outlined-basic'
              type='email'
              error={ errors.email ? true : false }
              helperText={ errors.email?.message }
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
                        { showPassword ? <VisibilityOff /> : <Visibility /> }
                      </IconButton>
                    </InputAdornment>
                  )
                }
              }}
            />
          )}
        />

        <MuiButton text='Submit' isSubmit={ true } color='success'  />
      </form>
    </div>
  )
}

export default Register