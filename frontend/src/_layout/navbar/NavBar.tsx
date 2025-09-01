import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useLoginStore } from '@/login/login-page/useLoginStore'
import { useFlashMessageStore } from '@/ui/flash/useFlashMessageStore'
import logo from '@/_layout/_assets/letter-t.png'
import './NavBarContainers.css'
import './NavBarMenuItems.css'

const NavBar = () => {
  const [ profileOpen, setProfileOpen ] = useState(false)
  const [ menuOpen, setMenuOpen ] = useState(false)
  const currentUser = useLoginStore((s) => s.currentUser)
  const logoutUser = useLoginStore((s) => s.logoutUser)
  const isLoggedIn = useLoginStore((s) => s.isLoggedIn)
  const setFlashMessage = useFlashMessageStore((s) => s.setFlashMessage)

  const handleLogout = () => {
    logoutUser()
    setFlashMessage('User logged out successfully', 'success')
  }

  return(
    <nav className='navbar'>
      <NavLink to='/' style={{ textDecoration: 'none' }} className='navbar-brand' >
        <img src={ logo } className='brand-image' />
        <p className='min-w-[150px]'>Peter's Tweet</p>
      </NavLink>

      <button
        className='menu-toggle'
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label='Toggle menu'
      >
        ☰
      </button>

      <div className='wrapper-container'>
        <ul className={`navbar-links-left ${menuOpen ? 'active' : ''}`}>
          <NavLink to='/'>
            <li>
              <p>Home</p>
            </li>
          </NavLink>
        </ul>
        {
          isLoggedIn ? (
            <ul className={`navbar-links-right ${ menuOpen ? 'active' : '' }`}>
              <li 
                className='dropdown'
                onMouseEnter={ () => setProfileOpen(true) }
                onMouseLeave={ () => setProfileOpen(false) }
              >
                <button className='dropdown-toggle'>
                  { currentUser.userName } ▾
                </button>
                <ul className={`dropdown-menu ${ profileOpen ? 'show' : '' }`}>
                  <NavLink to='/user'>
                    <li>
                      <button>Profile</button>
                    </li>
                  </NavLink>
                  <li onClick={ handleLogout } className='cursor-pointer'>
                    <button>Logout</button>
                  </li>
                </ul>
              </li>
            </ul>
          ) : (
            <ul className={`navbar-links-right ${ menuOpen ? 'active' : '' }`}>
              <NavLink to='/login'>
                <li>
                  <p>Login</p>
                </li>
              </NavLink>
              <NavLink to='/register'>
                <li>
                  <p>Register</p>
                </li>
              </NavLink>
            </ul>
          )
        }
      </div>
    </nav>
  )
}

export default NavBar