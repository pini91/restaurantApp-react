import { Router, Request, Response } from 'express'

const router = Router()

router.post('/login', (req: Request, res: Response) => {
  res.json({ message: 'Login route' })
})

router.post('/logout', (req: Request, res: Response) => {
  res.json({ message: 'Logout route' })
})

export default router