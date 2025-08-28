import MainLayout from '@/_layout/main/MainLayout'
import Home from '@/home/_page/HomePage'
import Login from '@/login/_login-page/LoginPage'
import Register from '@/login/_register-page/RegisterPage'
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