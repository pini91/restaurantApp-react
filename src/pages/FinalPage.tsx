import { useLocation, Link } from 'react-router-dom'
import type { FinalPageState } from '../types'
import '../styles/final.css'

export default function FinalPage() {
  const location = useLocation()
  const state = location.state as FinalPageState | null

  if (!state) {
    return (
      <div className="final-page">
        <div className="final-card final-card--empty">
          <p className="final-card__empty-msg">No reservation data found.</p>
          <Link to="/" className="final-card__cta">Go Home</Link>
        </div>
      </div>
    )
  }

  const name= state.name.split(' ').map(el=> `${el[0].toUpperCase()}${el.slice(1)}`).join(' ')

  return (
    <div className="final-page">
      <div className="final-card">

        {/* Success badge */}
        <div className="final-card__badge">
          <i className="fa-solid fa-circle-check" />
        </div>

        <span className="final-card__label">Reservation Confirmed</span>
        <h1 className="final-card__title">You're all set!</h1>
        <p className="final-card__sub">Health &amp; Taste Restaurant is expecting you. See you soon.</p>

        {/* Details grid */}
        <div className="final-detail__grid">
          <div className="final-detail__item">
            <span className="final-detail__key"><i className="fa-solid fa-user" /> Guest</span>
            <span className="final-detail__val">{name}</span>
          </div>
          <div className="final-detail__item">
            <span className="final-detail__key"><i className="fa-solid fa-calendar-days" /> Date</span>
            <span className="final-detail__val">{state.date}</span>
          </div>
          <div className="final-detail__item">
            <span className="final-detail__key"><i className="fa-solid fa-clock" /> Time</span>
            <span className="final-detail__val">{state.hour}</span>
          </div>
          <div className="final-detail__item">
            <span className="final-detail__key"><i className="fa-solid fa-users" /> Guests</span>
            <span className="final-detail__val">{state.partySize}</span>
          </div>
          <div className="final-detail__item">
            <span className="final-detail__key"><i className="fa-solid fa-chair" /> Table</span>
            <span className="final-detail__val">{state.table}</span>
          </div>
          <div className="final-detail__item">
            <span className="final-detail__key"><i className="fa-solid fa-hashtag" /> Ref No.</span>
            <span className="final-detail__val final-detail__val--mono">{state.id}</span>
          </div>
        </div>

        <p className="final-card__note">
          <i className="fa-solid fa-circle-info" /> Your reference number is in your email — you need it if you need to change your reservation.
        </p>

        <Link to="/" className="final-card__cta">Back to Home</Link>
      </div>
    </div>
  )
}
