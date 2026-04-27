import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <div
        id="hambi"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle navigation"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setMenuOpen((prev) => !prev)}
      >
        <img src="/imgs/hambii.png" alt="menu" />
      </div>

      <ul className={`nav${menuOpen ? ' open' : ''}`}>
        <li className="navList">
          <Link to="/menu" onClick={() => setMenuOpen(false)}>
            Menu |
          </Link>
        </li>
        <li className="navList">
          <Link to="/gallery" onClick={() => setMenuOpen(false)}>
            Gallery |
          </Link>
        </li>
        <li className="navList">
          <Link to="/location" onClick={() => setMenuOpen(false)}>
            Location
          </Link>
        </li>
      </ul>
    </>
  )
}
