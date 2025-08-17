import './App.css'
import MainLayout from './layouts/main/MainLayout.tsx'
import Home from './pages/Home.tsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> }
      ]
    }
  ])

  return (
    <div className='body'>
      <RouterProvider router={ router } />
    </div>
  )
}

export default App