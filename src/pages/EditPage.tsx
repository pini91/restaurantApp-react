import { useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { lookupReservation, deleteReservation } from '../services/api'
import '../styles/edit.css'

export default function EditPage() {
  const navigate = useNavigate()
  const { reservationId: urlId } = useParams<{ reservationId?: string }>()
  const [reservationId, setReservationId] = useState(urlId ?? '')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLookup(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const data = await lookupReservation(reservationId.trim())
      navigate('/editForm', { state: { ...data, id: reservationId.trim() } })
    } catch {
      setError('Reservation not found. Please check your reservation number.')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(e: React.FormEvent) {
    e.preventDefault()
    if (!reservationId.trim()) {
      setError('Please enter a reservation number.')
      return
    }
    if (!confirm('Are you sure you want to delete this reservation?')) return

    setLoading(true)
    try {
      await deleteReservation(reservationId.trim())
      navigate('/finalEdit')
    } catch {
      setError('Failed to delete reservation. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="edit-page">
      <div className="edit-card">

        {/* Icon */}
        <div className="edit-card__icon">
          <i className="fa-solid fa-calendar-pen" />
        </div>

        <span className="edit-card__label">Manage Booking</span>
        <h1 className="edit-card__title">Find Your Reservation</h1>
        <p className="edit-card__sub">Enter your reservation number below to update or cancel your booking.</p>

        <div className="edit-card__field">
          <label htmlFor="resv-id" className="edit-card__field-label">Reservation Number</label>
          <input
            type="text"
            id="resv-id"
            name="id"
            className="edit-card__input"
            placeholder="e.g. 6641f3a2b9c4d50012e3f7aa"
            value={reservationId}
            onChange={(e) => setReservationId(e.target.value)}
          />
        </div>

        {error && (
          <p className="edit-card__error">
            <i className="fa-solid fa-circle-exclamation" /> {error}
          </p>
        )}

        <button
          type="button"
          className="edit-card__btn edit-card__btn--primary"
          onClick={handleLookup}
          disabled={loading}
        >
          {loading
            ? <><i className="fa-solid fa-spinner fa-spin" /> Looking up&hellip;</>
            : <><i className="fa-solid fa-magnifying-glass" /> Find Reservation</>}
        </button>

        <div className="edit-card__divider">
          <span>or</span>
        </div>

        <button
          type="button"
          className="edit-card__btn edit-card__btn--danger"
          onClick={handleDelete}
          disabled={loading}
        >
          <i className="fa-solid fa-trash" /> Cancel Reservation
        </button>

        <Link to="/" className="edit-card__back">
          <i className="fa-solid fa-arrow-left" /> Back to home
        </Link>

      </div>
    </div>
  )
}
