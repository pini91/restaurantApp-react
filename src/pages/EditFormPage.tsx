import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { updateReservation } from '../services/api'
import type { FinalPageState } from '../types'
import '../styles/form.css'

function getTodayStr() {
  return new Date().toISOString().slice(0, 10)
}

function getMaxDateStr() {
  const d = new Date()
  d.setMonth(d.getMonth() + 3)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

const HOURS = ['12:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00',
  '07:00', '08:00', '09:00', '10:00', '11:00']

export default function EditFormPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as FinalPageState | null

  const today = getTodayStr()
  const maxDate = getMaxDateStr()

  const [date, setDate] = useState(state?.date ?? today)
  const [hours, setHours] = useState(state?.hour ?? '')
  const [partySize, setPartySize] = useState(String(state?.partySize ?? ''))
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (!state) {
    return (
      <div style={{ padding: 20 }}>
        <p>No reservation data. Please search from the Edit page.</p>
      </div>
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await updateReservation(state!.id, { date, hours, partySize })
      navigate('/final', {
        state: { ...state, date, hour: hours, partySize: Number(partySize) },
      })
    } catch {
      setError('Failed to update reservation. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="container">
      <header>Change a reservation</header>
      <form className="form" onSubmit={handleSubmit}>
        <div className="column">
          <div className="input-box">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              min={today}
              max={maxDate}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="column">
          <div className="select-box">
            <select
              name="hours"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              required
            >
              <option value="" disabled>
                Hour
              </option>
              {HOURS.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="column">
          <div className="select-box">
            <select
              name="partySize"
              value={partySize}
              onChange={(e) => setPartySize(e.target.value)}
              required
            >
              <option value="" disabled>
                Party size
              </option>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && <p style={{ color: 'red', marginTop: 8 }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Submit'}
        </button>
      </form>
    </section>
  )
}
