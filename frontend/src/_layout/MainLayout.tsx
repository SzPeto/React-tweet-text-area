import NavBar from '@/_layout/navbar/NavBar'
import Footer from '@/_layout/footer/Footer'
import { Outlet } from 'react-router-dom'
import './MainLayout.css'
import { useFlashMessageStore } from '@/_shared/store/useFlashMessageStore'
import FlashMessage from '@/_shared/ui/flash-message/FlashMessage'

const MainLayout = () => {
    
  const flashMessage = useFlashMessageStore((s) => s.flashMessage)

  return(
    <>
      <header><NavBar /></header>
      <main>
        <FlashMessage value='Test' type='info' />
        <Outlet />
      </main>
      <footer><Footer /></footer>
    </>
  )
}

export default MainLayout