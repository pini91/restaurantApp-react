import { Link } from 'react-router-dom'
import '../styles/final.css'

export default function FinalEditPage() {
  return (
    <div className="final-page">
      <div className="final-card">

        {/* Icon badge */}
        <div className="final-card__badge final-card__badge--cancel">
          <i className="fa-solid fa-calendar-xmark" />
        </div>

        <span className="final-card__label">Reservation Cancelled</span>
        <h1 className="final-card__title">All done!</h1>
        <p className="final-card__sub">
          Your reservation has been successfully cancelled. We hope to see you again soon.
        </p>

        <p className="final-card__note">
          <i className="fa-solid fa-circle-info" /> Want to book a new table? You can make a new reservation any time.
        </p>

        <Link to="/" className="final-card__cta">Back to Home</Link>

      </div>
    </div>
  )
}
