import { Request, Response, NextFunction } from 'express'
import type { IUser } from '../models/User.js'

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  if (req.isAuthenticated() && (req.user as IUser).isAdmin) {
    return next()
  }
  res.status(401).json({ message: 'Unauthorized' })
}
