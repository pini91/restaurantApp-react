import mongoose, { Document, Schema } from 'mongoose'

export interface IReservation extends Document {
  name: string
  phoneNumber: string
  email: string
  date: string
  hour: string
  partySize: number
  table?: string
  createdAt: Date
  userID?: string
}

const ReservationSchema = new Schema<IReservation>({
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: function (v: string) {
        return /^\d{10}$/.test(v)
      },
      message: 'Phone number must be exactly 10 digits'
    }
  },
  email: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  hour: {
    type: String,
    required: true
  },
  partySize: {
    type: Number,
    required: true
  },
  table: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  userID: {
    type: String,
    required: false
  }
})

export default mongoose.model<IReservation>('Reservation', ReservationSchema)
