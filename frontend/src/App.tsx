import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { rootRoutes } from '@/_layout/_routes/rootRoutes'
import './App.css'

function App() {
  const router = createBrowserRouter([ rootRoutes ])

  return (
    <div className='body'>
      <RouterProvider router={ router } />
    </div>
  )
}

export default App