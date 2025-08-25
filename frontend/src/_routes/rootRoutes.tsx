import MainLayout from '@/_layout/MainLayout'
import Home from '@/home/home-page/HomePage'
import Login from '@/login/Login'
import Register from '@/login/Register'
import NotFoundPage from '@/_layout/not-found-page/NotFoundPage'


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