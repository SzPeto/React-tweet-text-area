import './NavBar.css'
import logo from '../../assets/letter-t.png'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {

  const [menuOpen, setMenuOpen] = useState(false)

  return(
    <nav className='navbar'>
      <div className='navbar-container'>
      
        <div className='navbar-brand'>
          <img src={ logo } className='brand-image' />
          <p>Peter's Tweet</p>
        </div>

        {/* Hamburger Button */}
        <button
          className='menu-toggle'
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label='Toggle menu'
        >
          ☰
        </button>

        <div className='left-items-container'>
          <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
            <li>
              <NavLink to='/'>
                Home
              </NavLink>
            </li>
          </ul>
        </div>

        <div className='right-items-container'>
          <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
            <li>
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
    </nav>
  )
}

export default NavBar