import { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { rootRoutes } from '@/_layout/_routes/rootRoutes'
import { useLoginStore } from './account/login-page/useLoginStore'
import { getMe } from './account/login-page/getMe'
import './App.css'

function App() {
  const router = createBrowserRouter([ rootRoutes ])
  const loginUserFe = useLoginStore((s) => s.loginUserFe)

  // Main user fetch, after refresh checks for active session, if active fetches the logged in user from BE
  useEffect(() => {
    (async () => {
      const user = await getMe()
      if (!user.error) {
        loginUserFe(user.userName, user.email, user.picturePath)
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