import type {
  CreateReservationResponse,
  ReservationFormData,
  AssignTableResponse,
  FinalPageState,
} from '../types'

const API_BASE = import.meta.env.VITE_API_URL ?? ''

const defaultOptions: RequestInit = {
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
}

export async function createReservation(
  data: ReservationFormData
): Promise<CreateReservationResponse> {
  const body = new URLSearchParams(data as unknown as Record<string, string>)
  const res = await fetch(`${API_BASE}/bookForm/createReservation`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })
  if (!res.ok) throw new Error('Failed to create reservation')
  return res.json() as Promise<CreateReservationResponse>
}

export async function fetchBusyTables(
  date: string,
  hour: string
): Promise<string[]> {
  const params = new URLSearchParams({ date, hour })
  const res = await fetch(`${API_BASE}/bookForm/busyTables?${params}`, {
    ...defaultOptions,
    method: 'GET',
  })
  if (!res.ok) throw new Error('Failed to fetch busy tables')
  return res.json() as Promise<string[]>
}

export async function assignTable(
  tableNum: string,
  reservationId: string
): Promise<AssignTableResponse> {
  const res = await fetch(`${API_BASE}/bookForm/assignTable`, {
    method: 'PUT',
    ...defaultOptions,
    body: JSON.stringify({ tableNumFromJSFile: tableNum, reservationId }),
  })
  if (!res.ok) throw new Error('Failed to assign table')
  return res.json() as Promise<AssignTableResponse>
}

export async function lookupReservation(id: string): Promise<FinalPageState> {
  const res = await fetch(`${API_BASE}/edit/editSession`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ id }).toString(),
  })
  if (!res.ok) throw new Error('Reservation not found')
  return res.json() as Promise<FinalPageState>
}

export async function fetchReservationById(id: string): Promise<CreateReservationResponse> {
  const res = await fetch(`${API_BASE}/bookForm/reservation/${id}`, {
    ...defaultOptions,
    method: 'GET',
  })
  if (!res.ok) throw new Error('Reservation not found')
  return res.json() as Promise<CreateReservationResponse>
}

export async function updateReservation(
  reservationId: string,
  data: { date: string; hours: string; partySize: string }
): Promise<void> {
  const body = new URLSearchParams({ ...data, reservationId })
  const res = await fetch(`${API_BASE}/edit/editInfo`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })
  if (!res.ok) throw new Error('Failed to update reservation')
}

export async function deleteReservation(reservationId: string): Promise<void> {
  const body = new URLSearchParams({ reservationId })
  const res = await fetch(`${API_BASE}/edit/deleteReservation`, {
    method: 'DELETE',
    credentials: 'include',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })
  if (!res.ok) throw new Error('Failed to delete reservation')
}

export async function sendEmailConfirmation(reservationId: string): Promise<void> {
  const res = await fetch(`${API_BASE}/email/sendConfirmation`, {
    method: 'POST',
    ...defaultOptions,
    body: JSON.stringify({ reservationId }),
  })
  if (!res.ok) throw new Error('Failed to send email confirmation')
}
