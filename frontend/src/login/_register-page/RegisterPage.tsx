import { useState } from 'react'
import './RegisterPage.css'
import MuiTextField from '@/ui/mui-text-field/MuiTextField'
import MuiButton from '@/ui/mui-button/MuiButton'
import { addUser } from './addUser'

const Register = () => {
  const [ userName, setUserName ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ email, setEmail ] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const json = await addUser('dsdfsfd', 'fsdfffff', 'fsdfsdfs')
    console.log('Hello from handleSubmit', json)
  }

  return (
    <div className="register-container">
      <p className='register-heading'>Register user</p>
      <form className='register-form' onSubmit={ handleSubmit } >
        <MuiTextField label='username' onChange={ (e) => setUserName(e.target.value) } value={ userName } />
        <MuiTextField label='email' onChange={ (e) => setEmail(e.target.value) } value={ email } />
        <MuiTextField label='password' onChange={ (e) => setPassword(e.target.value) } value={ password } />
        <MuiButton text='Submit' isSubmit={ true } type='success' />
      </form>
    </div>
  )
}

export default Register