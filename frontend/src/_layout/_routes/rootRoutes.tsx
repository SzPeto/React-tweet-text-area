import MainLayout from '@/_layout/main/MainLayout'
import NotFoundPage from '@/_layout/not-found-page/NotFoundPage'
import Home from '@/home/_page/HomePage'
import Login from '@/account/login-page/LoginPage'
import Register from '@/account/register-page/RegisterPage'
import ProfilePage from '@/account/profile-page/ProfilePage'

export const rootRoutes = {
  path: '/',
  element: <MainLayout />,
  errorElement: <NotFoundPage/ >,
  children: [
    { index: true, element: <Home /> },
    { path: 'login', element: <Login /> },
    { path: 'register', element: <Register /> },
    { path: 'user', element: <ProfilePage /> }
  ]
}