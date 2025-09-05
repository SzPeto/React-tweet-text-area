import { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { rootRoutes } from '@/_layout/_routes/rootRoutes'
import { useLoginStore } from './account/login-page/useLoginStore'
import { me } from '@/account/_session-control/me'
import './App.css'

function App() {
  const router = createBrowserRouter([ rootRoutes ])
  const loginUserFe = useLoginStore((s) => s.loginUserFe)

  // Main user fetch, after refresh checks for active session, if active fetches the logged in user from BE
  useEffect(() => {
    (async () => {
      const user = await me()
      if (!user.error) {
        loginUserFe(user._id, user.userName, user.email, user.picturePath, user.isAdmin)
      }
    })()
  }, [ loginUserFe ])

  return (
    <div className='body'>
      <RouterProvider router={ router } />
    </div>
  )
}

export default App