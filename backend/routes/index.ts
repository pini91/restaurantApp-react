import { Router } from 'express'
import reservationRoutes from './reservations.js'
import authRoutes from './auth.js'
import editRoutes from './edit.js'
import emailRoutes from './email.js'

const router = Router()

router.use('/bookForm', reservationRoutes)
router.use('/auth', authRoutes)
router.use('/edit', editRoutes)
router.use('/email', emailRoutes)

export default router