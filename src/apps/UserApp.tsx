/**
 * User App main component
 * Mobile-first customer booking application
 */
import { Routes, Route, Navigate } from 'react-router'
import UserLayout from '../layouts/UserLayout'
import UserHome from '../pages/user/Home'
import ServicesPage from '../pages/user/Services'
import BookingPage from '../pages/user/Booking'
import AppointmentsPage from '../pages/user/Appointments'
import ProfilePage from '../pages/user/Profile'

export default function UserApp() {
  return (
    <UserLayout>
      <Routes>
        <Route path="/" element={<UserHome />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/booking/:serviceId" element={<BookingPage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/user" replace />} />
      </Routes>
    </UserLayout>
  )
}
