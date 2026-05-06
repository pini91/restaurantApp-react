import { useState, useEffect, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import type { ReservationFormData } from '../types'
import { createReservation } from '../services/api'
import '../styles/form.css'

function getTodayStr(): string {
  return new Date().toISOString().slice(0, 10)
}

function getMaxDateStr(): string {
  const d = new Date()
  d.setMonth(d.getMonth() + 3)
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${month}-${day}`
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

export default function ReservationFormPage() {
  const navigate = useNavigate()
  const today = getTodayStr()
  const maxDate = getMaxDateStr()

  const [formData, setFormData] = useState<ReservationFormData>({
    name: '',
    email: '',
    phoneNumber: '',
    date: today,
    hours: '',
    partySize: '',
  })
  const [availableHours, setAvailableHours] = useState<string[]>([])
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [phoneDisplay, setPhoneDisplay] = useState('')

  const refreshHours = useCallback((date: string) => {
    const hours = buildHours(date)
    setAvailableHours(hours)
    setFormData((prev) => ({ ...prev, hours: '' }))
  }, [])

  useEffect(() => {
    refreshHours(today)
  }, [refreshHours, today])

  function formatPhone(digits: string): string {
    if (digits.length === 0) return ''
    if (digits.length <= 3) return `(${digits}`
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target

    if (name === 'phoneNumber') {
      const digits = value.replace(/\D/g, '').slice(0, 10) // strip non-digits, cap at 10
      setPhoneDisplay(formatPhone(digits))
      setFormData((prev) => ({ ...prev, phoneNumber: digits })) // store raw digits
      return
    }

    if (name === 'date') refreshHours(value)
      
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { reservationId } = await createReservation(formData)
      navigate(`/tables/${reservationId}`)
    } catch {
      setError('Failed to create reservation. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="resv-page">

      {/* Left panel / brand imagery */}
      <div className="resv-page__panel" aria-hidden="true">
        <div className="resv-page__panel-overlay" />
        <div className="resv-page__panel-content">
          <Link to="/" className="resv-page__logo">Health &amp; Taste</Link>
          <blockquote className="resv-page__quote">
            &ldquo;Every great meal begins with a great table.&rdquo;
          </blockquote>
        </div>
      </div>

      {/* Right panel / form */}
      <div className="resv-page__form-col">
        <div className="resv-form">

          <Link to="/" className="resv-form__back">
            <i className="fa-solid fa-arrow-left" /> Back to home
          </Link>

          <div className="resv-form__header">
            <span className="resv-form__label">Reservations</span>
            <h1 className="resv-form__title">Book Your Table</h1>
            <p className="resv-form__sub">Fill in your details and we'll confirm your spot.</p>
          </div>

          <form onSubmit={handleSubmit}>

            {/* Name */}
            <div className="resv-field">
              <label htmlFor="name" className="resv-field__label">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="resv-field__input"
                placeholder="e.g. Jane Smith"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="resv-field">
              <label htmlFor="email" className="resv-field__label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className="resv-field__input"
                placeholder="e.g. jane@email.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Phone + Date row */}
            <div className="resv-row">
              <div className="resv-field">
                <label htmlFor="phoneNumber" className="resv-field__label">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  className="resv-field__input"
                  placeholder="(555) 555-5555"
                  value={phoneDisplay}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="resv-field">
                <label htmlFor="date" className="resv-field__label">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="resv-field__input"
                  min={today}
                  max={maxDate}
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Time + Party size row */}
            <div className="resv-row">
              <div className="resv-field">
                <label htmlFor="hoursSelect" className="resv-field__label">Arrival Time</label>
                <select
                  name="hours"
                  id="hoursSelect"
                  className="resv-field__input resv-field__select"
                  value={formData.hours}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select time</option>
                  {availableHours.map((h) => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
              </div>
              <div className="resv-field">
                <label htmlFor="partySize" className="resv-field__label">Guests</label>
                <select
                  name="partySize"
                  id="partySize"
                  className="resv-field__input resv-field__select"
                  value={formData.partySize}
                  onChange={handleChange}
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
                ? <><i className="fa-solid fa-spinner fa-spin" /> Submitting…</>
                : <><i className="fa-solid fa-calendar-check" /> Confirm Reservation</>}
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}
