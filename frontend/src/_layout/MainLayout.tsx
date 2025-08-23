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
        {
          flashMessage.message ? (
            <div>
              <FlashMessage value={ flashMessage.message } type={ flashMessage.type } />
            </div>
          ) : (
            <div className='invisible'
            >
              <FlashMessage value={ flashMessage.message } type={ flashMessage.type } />
            </div>
          )
        }
        <Outlet />
      </main>
      <footer><Footer /></footer>
    </>
  )
}

export default MainLayout