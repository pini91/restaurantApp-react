import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
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

  const refreshHours = useCallback((date: string) => {
    const hours = buildHours(date)
    setAvailableHours(hours)
    setFormData((prev) => ({ ...prev, hours: '' }))
  }, [])

  useEffect(() => {
    refreshHours(today)
  }, [refreshHours, today])

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target
    if (name === 'date') {
      refreshHours(value)
    }
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
    <section className="container">
      <header>Make a reservation</header>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-box">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-box">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="column">
          <div className="input-box">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              pattern="[0-9]{10}"
              maxLength={10}
              minLength={10}
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Enter phone"
              title="Ten digit code"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              min={today}
              max={maxDate}
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="column">
          <div className="select-box">
            <select
              name="hours"
              id="hoursSelect"
              value={formData.hours}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Hour
              </option>
              {availableHours.map((h) => (
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
              value={formData.partySize}
              onChange={handleChange}
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
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </section>
  )
}
