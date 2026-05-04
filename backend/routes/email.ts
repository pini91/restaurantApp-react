import { Router, Request, Response } from 'express'
import FormData from 'form-data'
import Mailgun from 'mailgun.js'
import Reservation from '../models/Reservation.js'

const router = Router()

// POST /api/email/sendConfirmation
router.post('/sendConfirmation', async (req: Request, res: Response) => {
  try {
    const { reservationId } = req.body
    console.log('📧 Sending email confirmation for reservation:', reservationId)
    
    // Fetch reservation details
    const reservation = await Reservation.findById(reservationId)
    
    if (!reservation) {
      console.log('Reservation not found:', reservationId)
      res.status(404).json({ error: 'Reservation not found' })
      return
    }
    
    console.log('Reservation found:', {
      name: reservation.name,
      email: reservation.email,
      date: reservation.date,
      hour: reservation.hour,
      table: reservation.table,
    })
    
    // Initialize Mailgun
    const mailgun = new Mailgun(FormData)
    const mg = mailgun.client({
      username: 'api',
      key: process.env.MAILGUN_API_KEY || process.env.API_KEY || '',
    })
    
    const capitalizedName = 
      reservation.name.charAt(0).toUpperCase() + 
      reservation.name.slice(1).toLowerCase()

    const baseUrl = process.env.APP_URL || 'https://health-and-taste.up.railway.app'
    const magicLink = `${baseUrl}/edit/${reservation._id}`
    // const magicLink = `http://localhost:5174/edit/${reservation._id}`
    
    // Send email
    const emailData = await mg.messages.create('brenda-app.dev', {
      from: 'Health and Taste <postmaster@brenda-app.dev>',
      to: reservation.email,
      subject: 'RESTAURANT RESERVATION ✔',
      text: `Hello ${capitalizedName}!

Your reservation at Health and Taste has been confirmed.

Reservation Details:
- Date: ${reservation.date}
- Time: ${reservation.hour}
- Table: ${reservation.table || 'No preference'}
- Party Size: ${reservation.partySize}

To manage your reservation (edit or cancel), use your personal link:
${magicLink}

We look forward to seeing you!

Health and Taste Restaurant`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4CAF50;">✓ Reservation Confirmed</h2>
          <p>Hello <strong>${capitalizedName}</strong>!</p>
          <p>Your reservation at <strong>Health and Taste</strong> has been confirmed.</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Reservation Details:</h3>
            <p><strong>Date:</strong> ${reservation.date}</p>
            <p><strong>Time:</strong> ${reservation.hour}</p>
            <p><strong>Table:</strong> ${reservation.table || 'No preference'}</p>
            <p><strong>Party Size:</strong> ${reservation.partySize}</p>
          </div>
          
          <p>To manage your reservation, use your personal link:</p>
          <p style="margin: 16px 0;">
            <a href="${magicLink}"
               style="display:inline-block; background:#1F3A2E; color:#fff; padding:12px 28px; border-radius:24px; text-decoration:none; font-weight:600; font-size:14px;">
              Manage My Reservation
            </a>
          </p>
          <p style="color:#aaa; font-size:12px;">Or copy this link: <a href="${magicLink}" style="color:#aaa;">${magicLink}</a></p>
          
          <p>We look forward to seeing you!</p>
          <p style="color: #888; font-size: 12px; margin-top: 30px;">Health and Taste Restaurant</p>
        </div>
      `,
    })
    
    console.log('Email sent successfully:', emailData)
    res.json({ status: 'success', messageId: emailData.id })
  } catch (error) {
    console.error('EMAIL ERROR:', error)
    res.status(500).json({ error: 'Failed to send email' })
  }
})

export default router
