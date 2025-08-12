import './NavBar.css'
import logo from '../../assets/letter-t.png'
import { useState } from 'react'

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
              <a href='#home'>Home</a>
            </li>
          </ul>
        </div>

        <div className='right-items-container'>
          <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
            <li>
              <a href='#login'>Login</a>
            </li>
            <li>
              <a href='#register'>Register</a>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  )
}

export default NavBar