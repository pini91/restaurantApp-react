import { useLocation, Link } from 'react-router-dom'
import type { FinalPageState } from '../types'
import '../styles/final.css'

export default function FinalPage() {
  const location = useLocation()
  const state = location.state as FinalPageState | null

  if (!state) {
    return (
      <div className="final-page" style={{ padding: 20 }}>
        <p>No reservation data found.</p>
        <Link to="/">Go Home</Link>
      </div>
    )
  }

  return (
    <div className="final-page">
      <div className="container">
        <div className="inside">
          <div className="confirmed">
            <i className="fa fa-check" aria-hidden="true" />
            <h2>Your reservation is confirmed</h2>
          </div>

          <div className="info">
            <h5 className="restaurant">Health &amp; Taste Restaurant</h5>
            <br />
            <p>Name: {state.name}</p>
            <br />
            <p>Date: {state.date}</p>
            <br />
            <p>Hour: {state.hour}</p>
            <br />
            <p>Party Size: {state.partySize}</p>
            <br />
            <p>Table: {state.table}</p>
            <br />
            <p>Reservation Number: {state.id}</p>
            <br />
            <p>
              Thank you for your reservation. You are safe to close this window.
            </p>
            <br />
            <Link to="/" className="done-btn">Done!</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
