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

function buildHours(selectedDate: string): string[] {
  const todayStr = getTodayStr()
  const restaurantStart = 12
  const restaurantEnd = 23
  const hours: string[] = []

  const startHour =
    selectedDate === todayStr
      ? Math.max(restaurantStart, new Date().getHours() + 1)
      : restaurantStart

  for (let i = startHour; i <= restaurantEnd; i++) {
    const hour12 = i % 12 === 0 ? 12 : i % 12
    const ampm = i < 12 ? 'AM' : 'PM'
    hours.push(`${String(hour12).padStart(2, '0')}:00 ${ampm}`)
  }

  return hours
}

export default function EditFormPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as FinalPageState | null

  const today = getTodayStr()
  const maxDate = getMaxDateStr()

  const [date, setDate] = useState(state?.date ?? today)
  const [hours, setHours] = useState(state?.hour ?? '')
  const [partySize, setPartySize] = useState(String(state?.partySize ?? ''))
  const availableHours = buildHours(date)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (!state) {
    return (
      <div className="resv-page">
        <div className="resv-page__form-col">
          <div className="resv-form">
            <p className="resv-form__sub">No reservation data. Please search from the Edit page.</p>
          </div>
        </div>
      </div>
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await updateReservation(state!.id, { date, hours, partySize })
      navigate(`/tables/${state!.id}`, {
        state: {
          reservationId: state!.id,
          name: state!.name,
          date,
          hour: hours,
          partySize: Number(partySize),
        },
      })
    } catch {
      setError('Failed to update reservation. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="resv-page">

      {/* Left panel / current booking summary */}
      <div className="resv-page__panel" aria-hidden="true">
        <div className="resv-page__panel-overlay" />
        <div className="resv-page__panel-content">
          <span className="resv-page__logo">Health &amp; Taste</span>
          <div className="editform-summary">
            <p className="editform-summary__heading">Current Booking</p>
            <div className="editform-summary__row">
              <span className="editform-summary__key"><i className="fa-solid fa-user" /> Guest</span>
              <span className="editform-summary__val">{state.name}</span>
            </div>
            <div className="editform-summary__row">
              <span className="editform-summary__key"><i className="fa-solid fa-calendar-days" /> Date</span>
              <span className="editform-summary__val">{state.date}</span>
            </div>
            <div className="editform-summary__row">
              <span className="editform-summary__key"><i className="fa-solid fa-clock" /> Time</span>
              <span className="editform-summary__val">{state.hour}</span>
            </div>
            <div className="editform-summary__row">
              <span className="editform-summary__key"><i className="fa-solid fa-users" /> Guests</span>
              <span className="editform-summary__val">{state.partySize}</span>
            </div>
            <div className="editform-summary__row">
              <span className="editform-summary__key"><i className="fa-solid fa-chair" /> Table</span>
              <span className="editform-summary__val">{state.table}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel / edit form */}
      <div className="resv-page__form-col">
        <div className="resv-form">

          <div className="resv-form__header">
            <span className="resv-form__label">Manage Reservation</span>
            <h1 className="resv-form__title">Update Details</h1>
            <p className="resv-form__sub">Change your date, time, or party size below.</p>
          </div>

          <form onSubmit={handleSubmit}>

            {/* Date */}
            <div className="resv-field">
              <label htmlFor="edit-date" className="resv-field__label">New Date</label>
              <input
                type="date"
                id="edit-date"
                name="date"
                className="resv-field__input"
                min={today}
                max={maxDate}
                value={date}
                onChange={(e) => { setDate(e.target.value); setHours('') }}
                required
              />
            </div>

            {/* Time + Party size row */}
            <div className="resv-row">
              <div className="resv-field">
                <label htmlFor="edit-hours" className="resv-field__label">Arrival Time</label>
                <select
                  id="edit-hours"
                  name="hours"
                  className="resv-field__input resv-field__select"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  required
                >
                  <option value="" disabled>Select time</option>
                  {availableHours.map((h) => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
              </div>
              <div className="resv-field">
                <label htmlFor="edit-partySize" className="resv-field__label">Guests</label>
                <select
                  id="edit-partySize"
                  name="partySize"
                  className="resv-field__input resv-field__select"
                  value={partySize}
                  onChange={(e) => setPartySize(e.target.value)}
                  required
                >
                  <option value="" disabled>How many?</option>
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
                  ))}
                </select>
              </div>
            </div>

            {error && (
              <p className="resv-form__error">
                <i className="fa-solid fa-circle-exclamation" /> {error}
              </p>
            )}

            <button type="submit" className="resv-form__submit" disabled={loading}>
              {loading
                ? <><i className="fa-solid fa-spinner fa-spin" /> Saving&hellip;</>
                : <><i className="fa-solid fa-floppy-disk" /> Save Changes</>}
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}
