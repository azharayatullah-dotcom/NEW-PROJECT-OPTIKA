import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

function Layout() {
  return (
    <div className="app">
      <Navbar />
      <main>
        {/* Outlet is the "slot" where the current page appears */}
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout