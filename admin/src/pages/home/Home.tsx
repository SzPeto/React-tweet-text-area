import React from 'react'
import { useGetIdentity } from '@refinedev/core'
import LeftCircleTwoTone from '@ant-design/icons/LeftCircleTwoTone'
import { UserType } from '../users/user.type'
import './Home.css'

const HomePage: React.FC = () => {
  const { data } = useGetIdentity<UserType>()

  return (
    <div className='main-container'>
      <h1 className='text-2xl'>
        { `Welcome${ data?.userName ? ' ' + data.userName : '' }!` }
      </h1>
      <div className='description-container'>
        <LeftCircleTwoTone style={{ fontSize: '36px' }} /> 
        <p className='text-lg ml-4'>Please choose a list you want to work with</p>
      </div>
    </div>
  )
}

export default HomePage