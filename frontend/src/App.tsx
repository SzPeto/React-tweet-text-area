import { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { rootRoutes } from '@/_layout/_routes/rootRoutes'
import { useLoginStore } from './account/login/useLoginStore'
import { getCurrentUserFromBe } from './account/login/getCurrentUserFromBe'
import { logout } from './_layout/navbar/logout'
import './App.css'


function App() {
  const router = createBrowserRouter([ rootRoutes ])
  const loginUserFe = useLoginStore((s) => s.loginUserFe)

  // Initial / refresh user fetch
  useEffect(() => {
    (async () => {
      if (localStorage.getItem('accessToken')) {
        const res = await getCurrentUserFromBe()
        if (res.success) {
          const user = res.json
          loginUserFe(user._id, user.userName, user.email)
        } else {
          logout()
        }
      }
    })()
  }, [])

  return (
    <div className='body'>
      <RouterProvider router={ router } />
    </div>
  )
}

export default App