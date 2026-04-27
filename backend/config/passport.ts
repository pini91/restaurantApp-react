import { Strategy as LocalStrategy } from 'passport-local'
import { PassportStatic } from 'passport'
import User from '../models/User'

export default function configurePassport(passport: PassportStatic) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      try {
        const user = await User.findOne({ email: email.toLowerCase() })
        if (!user) return done(null, false, { message: `Email ${email} not found.` })
        user.comparePassword(password, (err: Error | null, isMatch: boolean) => {
          if (err) return done(err)
          if (isMatch) return done(null, user)
          return done(null, false, { message: 'Invalid email or password.' })
        })
      } catch (err) {
        return done(err)
      }
    })
  )

  passport.serializeUser((user: Express.User, done) => {
    done(null, (user as { id: string }).id)
  })

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await User.findById(id)
      done(null, user || false)
    } catch (err) {
      done(err, null)
    }
  })
}
