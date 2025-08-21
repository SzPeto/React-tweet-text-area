import NavBar from '@/_layout/navbar/NavBar'
import Footer from '@/_layout/footer/Footer'
import { Outlet } from 'react-router-dom'
import './MainLayout.css'

const MainLayout = () => {
    
  return(
    <>
      <header><NavBar /></header>
      <main><Outlet /></main>
      <footer><Footer /></footer>
    </>
  )
}

export default MainLayout