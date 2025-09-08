import { Outlet } from 'react-router-dom'
import NavBar from '@/_layout/navbar/NavBar'
import './MainLayout.css'


const MainLayout = () => {

  return(
    <>
      <header><NavBar /></header>
      <main>
        <div className='pt-8'>
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default MainLayout