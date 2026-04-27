import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { lookupReservation, deleteReservation } from '../services/api'
import '../styles/edit.css'

export default function EditPage() {
  const navigate = useNavigate()
  const [reservationId, setReservationId] = useState('')
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
      <section className="container">
        <header>CHANGE YOUR RESERVATION</header>
        <form onSubmit={handleLookup}>
          <div>
            <input
              type="text"
              id="id"
              name="id"
              placeholder="Enter Reservation Number"
              value={reservationId}
              onChange={(e) => setReservationId(e.target.value)}
            />
          </div>
          {error && <p className="edit-error">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Find Reservation'}
          </button>
        </form>

        <form onSubmit={handleDelete} style={{ marginTop: 16 }}>
          <button type="submit" disabled={loading}>
            Delete Reservation
          </button>
        </form>
      </section>
    </div>
  )
}
