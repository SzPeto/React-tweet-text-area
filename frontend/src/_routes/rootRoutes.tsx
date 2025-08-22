import MainLayout from '@/_layout/MainLayout'
import Home from '@/home/HomePage'
import Login from '@/login/Login'
import Register from '@/login/Register'
import NotFoundPage from '@/home/not-found-page/NotFoundPage'


export const rootRoutes = {
  path: '/',
  element: <MainLayout />,
  errorElement: <NotFoundPage/ >,
  children: [
    { index: true, element: <Home /> },
    { path: 'login', element: <Login /> },
    { path: 'register', element: <Register /> }
  ]
}