import { useState, useEffect } from 'react'
import { useNavigate, useLocation, useParams, Link } from 'react-router-dom'
import type { CreateReservationResponse, FinalPageState } from '../types'
import { fetchBusyTables, assignTable, fetchReservationById, sendEmailConfirmation } from '../services/api'

import '../styles/tables.css'

const ALL_TABLES = {
  topRow: ['A2', 'C2', 'B2', 'D2', 'F2', 'G2', 'H4'],
  middleLeft: ['A4', 'B4', 'C4'],
  middleCenter: ['D4', 'F4', 'G4'],
  middleRight: ['H4', 'I4', 'J4'],
  barChairs: ['A1', 'B1', 'C1', 'D1', 'E1', 'F1'],
  bottomRow: ['J2', 'K2', 'L2', 'M2', 'N2', 'O2', 'Q2'],
  lastFixed: ['A6', 'B6', 'C6', 'D6', 'E6'],
  lastTables: ['K4', 'L4', 'M4', 'N4', 'O4'],
}

interface LocationState extends CreateReservationResponse {}

export default function TablesPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { reservationId } = useParams<{ reservationId?: string }>()
  const state = location.state as LocationState | null

  const [reservation, setReservation] = useState<CreateReservationResponse | null>(state)
  const [busyTables, setBusyTables] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch reservation if not in location.state (e.g., page refresh)
  useEffect(() => {
    if (state) {
      // Already have state from navigation
      setReservation(state)
      fetchBusyTables(state.date, state.hour)
        .then(setBusyTables)
        .catch(console.error)
        .finally(() => setLoading(false))
    } else if (reservationId) {
      // Fetch from backend using URL param
      fetchReservationById(reservationId)
        .then((res) => {
          setReservation(res)
          return fetchBusyTables(res.date, res.hour)
        })
        .then(setBusyTables)
        .catch(console.error)
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [state, reservationId])

  async function handleTableClick(tableNum: string) {
    if (busyTables.includes(tableNum)) {
      alert(
        'This table is already reserved for your selected date and time. Please choose another table.'
      )
      return
    }
    if (!reservation) return

    // Extract table capacity from table name (last digit: A2 = 2, A4 = 4, A6 = 6, A1 = 1)
    const tableCapacity = Number(tableNum.match(/\d+$/)?.[0] || 0)
    
    // Check if table is too small for party size
    if (tableCapacity < reservation.partySize) {
      alert(
        `This table (capacity ${tableCapacity}) is too small for your party of ${reservation.partySize}. Please choose a larger table.`
      )
      return
    }

    // Check if the table is too large for the party size
    if (Math.abs(tableCapacity - reservation.partySize) > 1 ) {
      alert(
        `This table (capacity ${tableCapacity}) is too large for your party of ${reservation.partySize}. Please choose a smaller table.`
      )
      return
    }

    try {
      const result = await assignTable(tableNum, reservation.reservationId)
      if (result.status === 'tooSmall') {
        alert('Please pick a table with seats for your group size')
      } else if (result.status === 'failed') {
        alert('Table is busy, please pick another hour or table')
      } else {
        const finalState: FinalPageState = {
          name: reservation.name,
          id: reservation.reservationId,
          date: reservation.date,
          hour: reservation.hour,
          partySize: reservation.partySize,
          table: tableNum,
        }

        // Send email confirmation
        try {
          await sendEmailConfirmation(reservation.reservationId)
          console.log('✅ Email confirmation sent')
        } catch (emailError) {
          console.error('⚠️ Failed to send email confirmation:', emailError)
          // Don't block navigation if email fails
        }

        navigate('/final', { state: finalState })
      }
    } catch {
      alert('Something went wrong. Please try again.')
    }
  }

  async function handleNoTablePreference() {
    if (!reservation) return

    try {
      // Save 'none' as table preference
      await assignTable('none', reservation.reservationId)
      
      // Send email confirmation
      try {
        await sendEmailConfirmation(reservation.reservationId)
        console.log('✅ Email confirmation sent')
      } catch (emailError) {
        console.error('⚠️ Failed to send email confirmation:', emailError)
        // Don't block navigation if email fails
      }

      const finalState: FinalPageState = {
        name: reservation.name,
        id: reservation.reservationId,
        date: reservation.date,
        hour: reservation.hour,
        partySize: reservation.partySize,
        table: 'none',
      }

      navigate('/final', { state: finalState })
    } catch (error) {
      console.error('Failed to save no-table preference:', error)
      alert('Something went wrong. Please try again.')
    }
  }

  function seatClass(table: string) {
    const tableCapacity = Number(table.match(/\d+$/)?.[0] || 0)
    const isBusy = busyTables.includes(table)
    const isTooSmall = reservation && tableCapacity < reservation.partySize
    
    if (isBusy) return 'seat busy'
    if (isTooSmall) return 'seat too-small'
    return 'seat'
  }

  if (!reservation) {
    return (
      <div style={{ padding: 20 }}>
        <p>No reservation found. Please fill in the reservation form first.</p>
        <Link to="/bookForm">Go to form</Link>
      </div>
    )
  }

  if (loading) {
    return <div style={{ padding: 20, color: 'white' }}>Loading tables...</div>
  }

  return (
    <div className="tables-page">
      <div className="contenedor">
        <div className="container">
          <div className="screen">View</div>

          {/* Top row */}
          <div className="row">
            {ALL_TABLES.topRow.map((t) => (
              <div
                key={t}
                className={`${seatClass(t)} round`}
                onClick={() => handleTableClick(t)}
              >
                {t}
              </div>
            ))}
          </div>

          {/* Kitchen middle section */}
          <div className="kitchen">
            <div className="wra">
              <div>
                {ALL_TABLES.middleLeft.map((t) => (
                  <div
                    key={t}
                    className={`${seatClass(t)} middle`}
                    onClick={() => handleTableClick(t)}
                  >
                    {t}
                  </div>
                ))}
              </div>
              <div className="hodnik" />
              <div>
                {ALL_TABLES.middleCenter.map((t) => (
                  <div
                    key={t}
                    className={`${seatClass(t)} middle`}
                    onClick={() => handleTableClick(t)}
                  >
                    {t}
                  </div>
                ))}
              </div>
              <div className="hodnik" />
              <div>
                {ALL_TABLES.middleRight.map((t) => (
                  <div
                    key={t}
                    className={`${seatClass(t)} middle`}
                    onClick={() => handleTableClick(t)}
                  >
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* Bar chairs */}
            <div>
              {ALL_TABLES.barChairs.map((t) => (
                <div
                  key={t}
                  className={`${seatClass(t)} bar-chairs`}
                  onClick={() => handleTableClick(t)}
                >
                  {t}
                </div>
              ))}
            </div>
            <div className="bar">BAR</div>
          </div>

          {/* Bottom row */}
          <div className="row">
            {ALL_TABLES.bottomRow.map((t) => (
              <div
                key={t}
                className={`${seatClass(t)} round`}
                onClick={() => handleTableClick(t)}
              >
                {t}
              </div>
            ))}
          </div>

          {/* Fixed/entrance seats (non-selectable) */}
          <div className="row">
            {ALL_TABLES.lastFixed.map((t) => (
              <div key={t} className="seat last">
                {t}
              </div>
            ))}
          </div>

          <div className="entrance">Entrance</div>

          {/* Last tables row */}
          <div className="row">
            {ALL_TABLES.lastTables.map((t) => (
              <div key={t} className="seat last-tables">
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>

      <button className="noTable" onClick={handleNoTablePreference}>
        NO TABLE PREFERENCE
      </button>
    </div>
  )
}
