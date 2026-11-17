import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Knowledge Base', to: '/knowledge' },
  { label: 'Camera Lab', to: '/camera-lab' },
  { label: 'Camera Archive', to: '/archive' },
  { label: 'Exposure Lab', to: '/exposure-lab' },
]

function Navbar() {
  // Is the mobile menu open? true / false.
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  // Close the menu whenever the page changes.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Close the menu when Escape is pressed (keyboard accessibility).
  useEffect(() => {
    if (!open) return

    function handleKey(event) {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', handleKey)
    // Cleanup: remove the listener when the menu closes.
    return () => window.removeEventListener('keydown', handleKey)
  }, [open])

  return (
    <header className="navbar">
      <Link to="/" className="logo" aria-label="OPTIKA home">
        OPTIKA<span>.</span>
      </Link>

      <nav
        id="main-nav"
        className={open ? 'is-open' : ''}
        aria-label="Main navigation"
      >
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.to === '/'}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <Link to="/knowledge" className="nav-button">
        Explore
      </Link>

      <button
        type="button"
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="main-nav"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
    </header>
  )
}

export default Navbar