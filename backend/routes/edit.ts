import { Router, Request, Response } from 'express'
import Reservation from '../models/Reservation.js'

const router = Router()

// POST /api/edit/editSession — look up a reservation by ID
router.post('/editSession', async (req: Request, res: Response) => {
  try {
    const { id } = req.body
    const reservation = await Reservation.findById(id)
    if (!reservation) {
      res.status(404).json({ error: 'Reservation not found' })
      return
    }
    res.json({
      id: reservation._id,
      name: reservation.name,
      date: reservation.date,
      hour: reservation.hour,
      partySize: reservation.partySize,
      table: reservation.table ?? '',
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Reservation not found' })
  }
})

// PUT /api/edit/editInfo — update date, hours, partySize
router.put('/editInfo', async (req: Request, res: Response) => {
  try {
    const { reservationId, date, hours, partySize } = req.body
    await Reservation.findByIdAndUpdate(reservationId, {
      date,
      hour: hours,
      partySize: Number(partySize),
    })
    res.json({ status: 'success' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to update reservation' })
  }
})

// DELETE /api/edit/deleteReservation
router.delete('/deleteReservation', async (req: Request, res: Response) => {
  try {
    const { reservationId } = req.body
    await Reservation.findByIdAndDelete(reservationId)
    res.json({ status: 'success' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to delete reservation' })
  }
})

export default router
