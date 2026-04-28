import { Router, Request, Response, NextFunction } from 'express'
import passport from 'passport'
import type { IUser } from '../models/User.js'

const router = Router()

// POST /api/auth/admin/login
router.post('/admin/login', (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    'local',
    (err: Error | null, user: IUser | false, info: { message: string } | undefined) => {
      if (err) return next(err)
      if (!user) return res.status(401).json({ message: info?.message ?? 'Invalid credentials.' })
      if (!user.isAdmin) return res.status(403).json({ message: 'Access denied. Admin only.' })

      req.logIn(user, (loginErr) => {
        if (loginErr) return next(loginErr)
        res.json({ message: 'Logged in successfully.' })
      })
    }
  )(req, res, next)
})

// POST /api/auth/admin/logout
router.post('/admin/logout', (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) return next(err)
    res.json({ message: 'Logged out successfully.' })
  })
})

// GET /api/auth/admin/status
router.get('/admin/status', (req: Request, res: Response) => {
  if (req.isAuthenticated() && (req.user as IUser).isAdmin) {
    res.json({ authenticated: true })
  } else {
    res.status(401).json({ authenticated: false })
  }
})

export default router
