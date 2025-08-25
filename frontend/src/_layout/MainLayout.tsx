import NavBar from '@/_layout/navbar/NavBar'
import Footer from '@/_layout/footer/Footer'
import { Outlet } from 'react-router-dom'
import './MainLayout.css'
import { useFlashMessageStore } from '@/_shared/store/useFlashMessageStore'
import FlashMessage from '@/_shared/ui/flash-message/FlashMessage'

const MainLayout = () => {
    
  const flashMessage = useFlashMessageStore((s) => s.flashMessage)

  console.log('flash message : ', flashMessage.message)

  return(
    <>
      <header><NavBar /></header>
      <main>
        <div className='pt-8'>
          <Outlet />
        </div>
      </main>
      <footer><Footer /></footer>

      {/* Floating Flash Message */}
      {flashMessage.message && (
        <div className='fixed top-20 left-1/2 transform -translate-x-1/2 z-50'>
          <FlashMessage value={flashMessage.message} type={flashMessage.type} />
        </div>
      )}

    </>
  )
}

export default MainLayout