import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useEffect } from 'react'
import { rootRoutes } from '@/_layout/_routes/rootRoutes'
import { useLoginStore } from './account/login/useLoginStore'
import { getCurrentUserFromBe } from './account/login/getCurrentUserFromBe'
import './App.css'

function App() {
  const router = createBrowserRouter([ rootRoutes ])
  const loginUserFe = useLoginStore((s) => s.loginUserFe)

  // Initial / refresh user fetch
  useEffect(() => {
    (async () => {
      const user = await getCurrentUserFromBe()
      if (!user.error) {
        loginUserFe(user._id, user.userName, user.email)
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