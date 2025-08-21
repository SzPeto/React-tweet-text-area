import MainLayout from '@/_layout/main/MainLayout'
import Home from '@/home/home-page/HomePage'
import Login from '@/pages/login/Login.tsx'
import Register from '@/pages/register/Register.tsx'
import NotFoundPage from '@/pages/not-found-page/NotFoundPage.tsx'


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