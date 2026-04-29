import { Link } from 'react-router-dom'
import '../styles/location.css'

export default function LocationPage() {
  return (
    <div className="location-page">
      <div className="location-header">
        <Link to=".." className="homeButton">
          <i className="fa-solid fa-arrow-left" /> Back
        </Link>
        <h1>Location</h1>
      </div>

      <div className="location-body">
        <div className="location-info">
          <i className="fa-solid fa-location-dot location-icon" />
          <p className="location-address">14861 N Dale Mabry Hwy, Tampa, FL 33618</p>
        </div>
    {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14080.5590517866!2d-82.49490204556884!3d28.081279385057467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88c2c41f9ae3784b%3A0xbf9be92a0403df6c!2sPapa%20Johns%20Pizza!5e0!3m2!1sen!2sus!4v1744135206504!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
        {/* iframe not allowed, setted a random img */}
        <img
          src="https://images.unsplash.com/photo-1619468129361-605ebea04b44?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Map placeholder"
          className="location-map-img"
        />
      </div>
    </div>
  )
}
