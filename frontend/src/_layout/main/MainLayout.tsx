import { Outlet } from 'react-router-dom'
import NavBar from '@/_layout/navbar/NavBar'
import Footer from '@/_layout/footer/Footer'
import FlashMessage from '@/ui/flash/FlashMessage'
import { useFlashMessageStore } from '@/ui/flash/useFlashMessageStore'
import './MainLayout.css'


const MainLayout = () => {
  const flashMessage = useFlashMessageStore((s) => s.flashMessage)

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
      { flashMessage.message && ( <FlashMessage value={ flashMessage.message } type={ flashMessage.type } /> ) }
    </>
  )
}

export default MainLayout