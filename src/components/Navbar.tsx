import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="site-navbar">
      <div className="site-navbar__inner">

        {/* Brand */}
        <Link to="/" className="site-navbar__brand">
          Health &amp; Taste
        </Link>

        {/* Desktop links- Centered */}
        <ul className="site-navbar__links">
          <li>
            <NavLink
              to="/menu"
              className={({ isActive }) =>
                'site-navbar__link' + (isActive ? ' site-navbar__link--active' : '')
              }
            >
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/gallery"
              className={({ isActive }) =>
                'site-navbar__link' + (isActive ? ' site-navbar__link--active' : '')
              }
            >
              Gallery
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/location"
              className={({ isActive }) =>
                'site-navbar__link' + (isActive ? ' site-navbar__link--active' : '')
              }
            >
              Location
            </NavLink>
          </li>
        </ul>

        {/* Desktop CTA */}
        <Link to="/bookForm" className="site-navbar__cta">
          Reserve a Table
        </Link>

        {/* Hamburger— mobile only */}
        <button
          className={`site-navbar__hamburger${open ? ' is-open' : ''}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`site-navbar__drawer${open ? ' is-open' : ''}`}>
        <NavLink to="/menu"     className="site-navbar__drawer-link" onClick={() => setOpen(false)}>Menu</NavLink>
        <NavLink to="/gallery"  className="site-navbar__drawer-link" onClick={() => setOpen(false)}>Gallery</NavLink>
        <NavLink to="/location" className="site-navbar__drawer-link" onClick={() => setOpen(false)}>Location</NavLink>
        <Link    to="/bookForm" className="site-navbar__drawer-cta"  onClick={() => setOpen(false)}>Reserve a Table</Link>
      </div>
    </nav>
  )
}
