import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import morgan from 'morgan'
import cors from 'cors'
import { connectDB } from './config/db'
import configurePassport from './config/passport'
import User from './models/User'
import path from 'path'
import { fileURLToPath } from 'url'
import routes from './routes/index'

const __dirname = path.dirname(fileURLToPath(import.meta.url))


// Seed admin user from env vars if one doesn't exist yet
async function seedAdmin() {
  const adminEmail = process.env.ADMIN_EMAIL
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminEmail || !adminPassword) {
    console.log('⚠️  ADMIN_EMAIL / ADMIN_PASSWORD not set — skipping admin seed')
    return
  }
  const existing = await User.findOne({ email: adminEmail.toLowerCase() })
  if (!existing) {
    await User.create({ email: adminEmail, password: adminPassword, isAdmin: true })
    console.log(` Admin user created: ${adminEmail}`)
  } else if (!existing.isAdmin) {
    existing.isAdmin = true
    await existing.save()
    console.log(` Existing user promoted to admin: ${adminEmail}`)
  }
}

// Connect to MongoDB then seed admin
connectDB()
  .then(() => seedAdmin())
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err)
    process.exit(1)
  })

// Configure Passport
configurePassport(passport)

const app = express()
app.set('trust proxy', 1)

// CORS — allow the Vite dev server to reach the API
app.use(cors({ 
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',  // Exact Vite port
  credentials: true 
}));

// Body parsing
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Logging
app.use(morgan('dev'))

// Sessions stored in MongoDB
const mongoUrl = (process.env.MONGO_URL || process.env.DB_STRING) as string
app.use(
  session({
    secret: process.env.SESSION_SECRET || process.env.SESSION || 'dev-secret-change-me',
    resave: false,
    saveUninitialized: false,
    name: 'sessionId',
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'lax',
    },
    store: MongoStore.create({ 
      mongoUrl, 
      touchAfter: 24 * 3600,
      mongoOptions: {
        tls: true,
        tlsAllowInvalidCertificates: false,
        tlsAllowInvalidHostnames: false,
      }
    }),
    rolling: true,
  })
)

// Passport
app.use(passport.initialize())
app.use(passport.session())


// All API routes
app.use('/api', routes)

// Serve frontend (when dist/ exists — i.e. Docker/production build)
app.use(express.static(path.join(__dirname, '../dist')))
// Catch-all: send React's index.html for client-side routing
// app.use (not app.get) avoids Express 5 path-to-regexp wildcard issues
app.use((_req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})


// Global error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err)
  res.status(500).json({ errors: [{ msg: err.message || 'Internal server error' }] })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`)
  // console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
})
