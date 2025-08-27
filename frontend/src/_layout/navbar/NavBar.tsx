import './NavBarContainers.css'
import './NavBarMenuItems.css'
import logo from '@/_layout/_assets/letter-t.png'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

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
        
        <ul className={`navbar-links-right ${menuOpen ? 'active' : ''}`}>
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
      </div>
    </nav>
  )
}

export default NavBar