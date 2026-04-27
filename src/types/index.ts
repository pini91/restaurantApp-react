export interface Reservation {
  _id: string
  name: string
  phoneNumber: string
  email: string
  date: string
  hour: string
  partySize: number
  table: string
  userID: string
}

export interface MenuItem {
  id: number
  name: string
  imagePath: string
  ingredients: string[]
}

export interface ReservationFormData {
  name: string
  email: string
  phoneNumber: string
  date: string
  hours: string
  partySize: string
}

export interface CreateReservationResponse {
  reservationId: string
  name: string
  date: string
  hour: string
  partySize: number
}

export interface FinalPageState {
  name: string
  id: string
  date: string
  hour: string
  partySize: number
  table: string
}

export interface AssignTableResponse {
  status: 'success' | 'tooSmall' | 'failed'
}
