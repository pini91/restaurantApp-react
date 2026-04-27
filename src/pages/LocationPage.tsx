import { Link } from 'react-router-dom'
import '../styles/location.css'

export default function LocationPage() {
  return (
    <div className="location-page">
      <button className="btn-outline">
        <Link to="/">Home</Link>
      </button>
      <h1>Location</h1>
      <p>14861 N Dale Mabry Hwy, Tampa, FL 33618</p>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14080.559051786592d-82.49490204556884!3d28.081279385057467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88c2c41f9ae3784b%3A0xbf9be92a0403df6c!2sPapa%20Johns%20Pizza!5e0!3m2!1sen!2sus!4v1744135206504!5m2!1sen!2sus"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Restaurant Location"
      />
    </div>
  )
}
