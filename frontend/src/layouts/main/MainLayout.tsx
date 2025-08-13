import type { ReactNode } from 'react'
import NavBar from '@/components/navbar/NavBar.tsx'
import Footer from '@/components/footer/Footer'

type MainLayoutProps = {
  children: ReactNode
}

const MainLayout = (props: MainLayoutProps) => {
    
  return(
    <>
      <header><NavBar /></header>
      <main>{ props.children }</main>
      <footer><Footer /></footer>
    </>
  )
}

export default MainLayout