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
- Confirmation Number: ${reservation._id}

To edit or delete your reservation, visit:
https://health-and-taste.up.railway.app/edit

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
            <p><strong>Confirmation Number:</strong> ${reservation._id}</p>
          </div>
          
          <p>To edit or delete your reservation, visit:<br>
          <a href="https://health-and-taste.up.railway.app/edit">https://health-and-taste.up.railway.app/edit</a></p>
          
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
