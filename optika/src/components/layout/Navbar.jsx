import { Link, NavLink } from 'react-router-dom'

// The list of links lives in data, not in the markup.
// To add a page to the menu later, add one line here.
const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Knowledge Base', to: '/knowledge' },
  { label: 'Camera Lab', to: '/camera-lab' },
  { label: 'Camera Archive', to: '/archive' },
  { label: 'Exposure Lab', to: '/exposure-lab' },
]

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="logo" aria-label="OPTIKA home">
        OPTIKA<span>.</span>
      </Link>

      <nav aria-label="Main navigation">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.to === '/'}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <Link to="/knowledge" className="nav-button">
        Explore
      </Link>
    </header>
  )
}

export default Navbar