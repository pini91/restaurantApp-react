import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/adminDashboard.css'

interface Reservation {
  _id: string
  name: string
  email: string
  phoneNumber: string
  date: string
  hour: string
  partySize: number
  table?: string
  createdAt: string
}

// All restaurant hours: 12:00 PM – 11:00 PM (admin can edit any date)
const ALL_HOURS: string[] = []
for (let i = 12; i <= 23; i++) {
  const hour12 = i % 12 === 0 ? 12 : i % 12
  const ampm = i < 12 ? 'AM' : 'PM'
  ALL_HOURS.push(`${String(hour12).padStart(2, '0')}:00 ${ampm}`)
}

export default function AdminDashboardPage() {
  const navigate = useNavigate()
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedDate, setSelectedDate] = useState('')  // '' = all
  const [editing, setEditing] = useState<Reservation | null>(null)
  const [savingEdit, setSavingEdit] = useState(false)
  const [editError, setEditError] = useState('')

  const fetchReservations = useCallback(async (date: string) => {
    setLoading(true)
    setError('')
    try {
      const url = date
        ? `/api/admin/reservations?date=${date}`
        : '/api/admin/reservations'
      const res = await fetch(url, { credentials: 'include' })
      if (!res.ok) throw new Error()
      setReservations(await res.json())
    } catch {
      setError('Failed to load reservations.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    async function init() {
      const statusRes = await fetch('/api/auth/admin/status', { credentials: 'include' })
      if (!statusRes.ok) {
        navigate('/admin')
        return
      }
      fetchReservations('')
    }
    init()
  }, [navigate, fetchReservations])

  function handleQuickFilter(date: string) {
    setSelectedDate(date)
    fetchReservations(date)
  }

  function handleDatePicker(e: React.ChangeEvent<HTMLInputElement>) {
    const date = e.target.value
    setSelectedDate(date)
    fetchReservations(date)
  }

  async function handleLogout() {
    await fetch('/api/auth/admin/logout', { method: 'POST', credentials: 'include' })
    navigate('/admin')
  }

  function openEdit(r: Reservation) {
    setEditing({ ...r })
    setEditError('')
  }

  function handleEditChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    if (!editing) return
    const { name, value } = e.target
    setEditing({ ...editing, [name]: name === 'partySize' ? Number(value) : value })
  }

  async function handleSave() {
    if (!editing) return
    setSavingEdit(true)
    setEditError('')
    try {
      const res = await fetch(`/api/admin/reservations/${editing._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          name: editing.name,
          email: editing.email,
          phoneNumber: editing.phoneNumber,
          date: editing.date,
          hour: editing.hour,
          partySize: editing.partySize,
          table: editing.table,
        }),
      })
      if (!res.ok) throw new Error()
      const updated: Reservation = await res.json()
      setReservations((prev) => prev.map((r) => (r._id === updated._id ? updated : r)))
      setEditing(null)
    } catch {
      setEditError('Failed to save changes.')
    } finally {
      setSavingEdit(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this reservation? This cannot be undone.')) return
    try {
      const res = await fetch(`/api/admin/reservations/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      if (!res.ok) throw new Error()
      setReservations((prev) => prev.filter((r) => r._id !== id))
    } catch {
      setError('Failed to delete reservation.')
    }
  }

  const filterLabel = selectedDate ? selectedDate : 'All'

  return (
    <div className="admin-db">
      <header className="admin-db-header">
        <h1>Admin Dashboard</h1>
        <button className="admin-db-logout" onClick={handleLogout}>
          Logout
        </button>
      </header>

      {error && <p className="admin-db-error">{error}</p>}

      <main className="admin-db-main">
        {/* Date filter bar */}
        <div className="admin-db-filter-bar">
          <button
            className={`admin-db-filter-btn ${selectedDate === '' ? 'active' : ''}`}
            onClick={() => handleQuickFilter('')}
          >
            All
          </button>
          <input
            className="admin-db-date-input"
            type="date"
            value={selectedDate}
            onChange={handleDatePicker}
            title="Pick a specific date"
          />
        </div>

        <h2>
          {loading ? 'Loading...' : `${reservations.length} reservation${reservations.length !== 1 ? 's' : ''} — ${filterLabel}`}
        </h2>

        {!loading && reservations.length === 0 ? (
          <p className="admin-db-empty">No reservations found for this date.</p>
        ) : (
          <div className="admin-db-table-wrapper">
            <table className="admin-db-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Party</th>
                  <th>Table</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((r) => (
                  <tr key={r._id}>
                    <td>{r.name}</td>
                    <td>{r.email}</td>
                    <td>{r.phoneNumber}</td>
                    <td>{r.date}</td>
                    <td>{r.hour}</td>
                    <td>{r.partySize}</td>
                    <td>{r.table ?? '—'}</td>
                    <td>
                      <button className="admin-db-edit" onClick={() => openEdit(r)}>
                        Edit
                      </button>
                      <button className="admin-db-delete" onClick={() => handleDelete(r._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Edit modal */}
      {editing && (
        <div className="admin-modal-overlay" onClick={() => setEditing(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Edit Reservation</h3>

            {editError && <p className="admin-modal-error">{editError}</p>}

            <label>Name
              <input name="name" value={editing.name} onChange={handleEditChange} />
            </label>
            <label>Email
              <input name="email" type="email" value={editing.email} onChange={handleEditChange} />
            </label>
            <label>Phone
              <input name="phoneNumber" value={editing.phoneNumber} onChange={handleEditChange} />
            </label>
            <label>Date
              <input name="date" type="date" value={editing.date} onChange={handleEditChange} />
            </label>
            <label>Time
              <select name="hour" value={editing.hour} onChange={handleEditChange}>
                {ALL_HOURS.map((h) => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
            </label>
            <label>Party Size
              <input name="partySize" type="number" min={1} max={20} value={editing.partySize} onChange={handleEditChange} />
            </label>
            <label>Table (optional)
              <input name="table" value={editing.table ?? ''} onChange={handleEditChange} />
            </label>

            <div className="admin-modal-actions">
              <button className="admin-modal-cancel" onClick={() => setEditing(null)}>Cancel</button>
              <button className="admin-modal-save" onClick={handleSave} disabled={savingEdit}>
                {savingEdit ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}