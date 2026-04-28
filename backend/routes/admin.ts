import { Router, Request, Response } from 'express'
import Reservation from '../models/Reservation.js'
import { requireAdmin } from '../middleware/isAdmin.js'

const router = Router()

// GET /api/admin/reservations date is optional
router.get('/reservations', requireAdmin, async (req: Request, res: Response) => {
  try {
    const filter = req.query.date ? { date: req.query.date as string } : {}
    const reservations = await Reservation.find(filter).sort({ createdAt: -1 })
    res.json(reservations)
  } catch (err) {
    console.error('Failed to fetch reservations:', err)
    res.status(500).json({ error: 'Failed to fetch reservations' })
  }
})

// PUT /api/admin/reservations/:id
router.put('/reservations/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { name, email, phoneNumber, date, hour, partySize, table } = req.body
    const updated = await Reservation.findByIdAndUpdate(
      req.params.id,
      { name, email, phoneNumber, date, hour, partySize: Number(partySize), table: table || undefined },
      { new: true, runValidators: true }
    )
    if (!updated) return res.status(404).json({ error: 'Reservation not found' })
    res.json(updated)
  } catch (err) {
    console.error('Failed to update reservation:', err)
    res.status(500).json({ error: 'Failed to update reservation' })
  }
})

// DELETE /api/admin/reservations/:id
router.delete('/reservations/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id)
    res.json({ message: 'Reservation deleted.' })
  } catch (err) {
    console.error('Failed to delete reservation:', err)
    res.status(500).json({ error: 'Failed to delete reservation' })
  }
})

export default router
