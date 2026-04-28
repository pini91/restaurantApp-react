import { Router, Request, Response } from 'express'
import Reservation from '../models/Reservation.js'

const router = Router()

// POST /api/bookForm/createReservation
router.post('/createReservation', async (req: Request, res: Response) => {
  try {
    console.log('📝 CREATE RESERVATION REQUEST:', req.body)
    
    const { name, email, phoneNumber, date, hours, partySize } = req.body
    
    const reservationData = {
      name,
      email,
      phoneNumber,
      date,
      hour: hours,
      partySize: Number(partySize),
      userID: req.sessionID,
    }
    
    console.log('💾 Attempting to save reservation:', reservationData)
    
    const reservation = await Reservation.create(reservationData)
    
    console.log('✅ Reservation saved to DB successfully:', {
      _id: reservation._id,
      name: reservation.name,
      date: reservation.date,
      hour: reservation.hour,
      partySize: reservation.partySize,
      table: reservation.table,
      userID: reservation.userID,
    })
    
    res.json({
      reservationId: reservation._id,
      name: reservation.name,
      date: reservation.date,
      hour: reservation.hour,
      partySize: reservation.partySize,
    })
  } catch (err) {
    console.error(' CREATE RESERVATION ERROR:', err)
    res.status(500).json({ error: 'Failed to create reservation' })
  }
})

// GET /api/bookForm/busyTables?date=&hour=
router.get('/busyTables', async (req: Request, res: Response) => {
  try {
    const { date, hour } = req.query as { date: string; hour: string }
    console.log('🔍 Fetching busy tables for:', { date, hour })
    
    const reservations = await Reservation.find({ date, hour, table: { $exists: true, $ne: null } })
    const busyTables = reservations.map((r) => r.table).filter(Boolean)
    
    console.log('Busy tables found:', busyTables)
    res.json(busyTables)
  } catch (err) {
    console.error('FETCH BUSY TABLES ERROR:', err)
    res.status(500).json({ error: 'Failed to fetch busy tables' })
  }
})

// PUT /api/bookForm/assignTable
router.put('/assignTable', async (req: Request, res: Response) => {
  try {
    const { tableNumFromJSFile, reservationId } = req.body
    console.log('🪑 ASSIGN TABLE REQUEST:', { tableNum: tableNumFromJSFile, reservationId })
    
    const reservation = await Reservation.findById(reservationId)
    
    if (!reservation) {
      console.log(' Reservation not found for ID:', reservationId)
      res.status(404).json({ status: 'failed' })
      return
    }
    
    console.log('📋 Found reservation:', {
      _id: reservation._id,
      name: reservation.name,
      currentTable: reservation.table,
    })
    
    reservation.table = tableNumFromJSFile
    await reservation.save()
    
    console.log(' Table assigned successfully:', {
      reservationId: reservation._id,
      assignedTable: reservation.table,
    })
    
    res.json({ status: 'success' })
  } catch (err) {
    console.error(' ASSIGN TABLE ERROR:', err)
    res.status(500).json({ status: 'failed' })
  }
})

// GET /api/bookForm/reservation/:id
router.get('/reservation/:id', async (req: Request, res: Response) => {
  try {
    console.log('🔎 Fetching reservation by ID:', req.params.id)
    
    const reservation = await Reservation.findById(req.params.id)
    
    if (!reservation) {
      console.log(' Reservation not found for ID:', req.params.id)
      res.status(404).json({ error: 'Reservation not found' })
      return
    }
    
    console.log('Reservation found:', {
      _id: reservation._id,
      name: reservation.name,
      date: reservation.date,
      hour: reservation.hour,
      partySize: reservation.partySize,
      table: reservation.table,
    })
    
    res.json({
      reservationId: reservation._id,
      name: reservation.name,
      date: reservation.date,
      hour: reservation.hour,
      partySize: reservation.partySize,
    })
  } catch (err) {
    console.error(' FETCH RESERVATION ERROR:', err)
    res.status(500).json({ error: 'Reservation not found' })
  }
})

export default router