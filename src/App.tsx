import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import BreakfastPage from './pages/BreakfastPage'
import LunchPage from './pages/LunchPage'
import DinnerPage from './pages/DinnerPage'
import GalleryPage from './pages/GalleryPage'
import LocationPage from './pages/LocationPage'
import ReservationFormPage from './pages/ReservationFormPage'
import TablesPage from './pages/TablesPage'
import FinalPage from './pages/FinalPage'
import EditPage from './pages/EditPage'
import EditFormPage from './pages/EditFormPage'
import FinalEditPage from './pages/FinalEditPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/breakfast" element={<BreakfastPage />} />
        <Route path="/lunch" element={<LunchPage />} />
        <Route path="/dinner" element={<DinnerPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/location" element={<LocationPage />} />
        <Route path="/bookForm" element={<ReservationFormPage />} />
        <Route path="/tables/:reservationId?" element={<TablesPage />} />
        <Route path="/final" element={<FinalPage />} />
        <Route path="/edit" element={<EditPage />} />
        <Route path="/editForm" element={<EditFormPage />} />
        <Route path="/finalEdit" element={<FinalEditPage />} />
      </Routes>
    </BrowserRouter>
  )
}

