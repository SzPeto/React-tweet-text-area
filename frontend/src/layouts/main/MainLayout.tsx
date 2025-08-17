import NavBar from '@/components/navbar/NavBar.tsx'
import Footer from '@/components/footer/Footer'
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