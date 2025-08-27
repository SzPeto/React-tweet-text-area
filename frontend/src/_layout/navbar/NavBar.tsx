import './NavBarContainers.css'
import './NavBarMenuItems.css'
import logo from '@/_layout/_assets/letter-t.png'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {

  const [menuOpen, setMenuOpen] = useState(false)

  return(
    <nav className='navbar'>
      <div className='navbar-container'>
      
        <NavLink to='/' style={{ textDecoration: 'none' }}>
          <div className='navbar-brand'>
            <img src={ logo } className='brand-image' />
            <p className='min-w-[150px]'>Peter's Tweet</p>
          </div>
        </NavLink>

        {/* Hamburger Button */}
        <button
          className='menu-toggle'
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label='Toggle menu'
        >
          ☰
        </button>

        <div className='wrapper-container'>
          <div className='left-items-container'>
            <ul className={`navbar-links-left ${menuOpen ? 'active' : ''}`}>
              <li>
                <NavLink to='/'>
                  Home
                </NavLink>
              </li>
            </ul>
          </div>

          <div className='right-items-container'>
            <ul className={`navbar-links-right ${menuOpen ? 'active' : ''}`}>
              <li className='mr-4'>
                <NavLink to='/login'>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to='/register'>
                  Register
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        

      </div>
    </nav>
  )
}

export default NavBar