import { Link } from 'react-router-dom'
import menu from '../assets/imgs/menu.jpg'

export default function MenuPage() {
  return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        // alignItems: 'center',
        // minHeight: '100vh',
        // width: '100vw',
        background:' #fff',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
        // marginLeft: '40%',
        marginTop: '5%',
    }}
    >
        <div className="anchors" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 35,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundImage: `url(${menu})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '60vw',
            height: '60vh',
            margin: 0,
            padding: 0,
        }}
        >
        <Link to="/breakfast" >
            Breakfast
        </Link>
        <Link to="/lunch" >
            Lunch
        </Link>
        <Link to="/dinner">
            Dinner
        </Link>
        </div>
    </div>
  )
}
