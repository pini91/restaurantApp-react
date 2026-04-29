import { Link } from 'react-router-dom'
import '../styles/menu.css'
import breakfastImg from '../assets/imgs/breakfast/avocado-Toast.jpg'
import lunchImg     from '../assets/imgs/lunch/beef.jpg'
import dinnerImg    from '../assets/imgs/dinner/king-salmon.jpg'

const MENU_ITEMS = [
  { to: '/breakfast', label: 'Breakfast', img: breakfastImg },
  { to: '/lunch',     label: 'Lunch',     img: lunchImg     },
  { to: '/dinner',    label: 'Dinner',    img: dinnerImg    },
] as const

export default function MenuPage() {
  return (
    <div className="menu-page">
      <div className="menu-header">
        <Link to="/" className="homeButton">
          <i className="fa-solid fa-arrow-left" /> Back
        </Link>
        <h1>Our Menu</h1>
      </div>

      <div className="menu-grid">
        {MENU_ITEMS.map(({ to, label, img }) => (
          <Link key={to} to={to} className="menu-card">
            <img src={img} alt={label} loading="lazy" />
            <div className="menu-card-overlay">
              <span className="menu-card-label">{label}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

