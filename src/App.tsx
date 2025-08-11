/**
 * Main application router component
 * Handles routing between User App and Admin App
 */
import { HashRouter, Route, Routes, Navigate } from 'react-router'
import UserApp from './apps/UserApp'
import AdminApp from './apps/AdminApp'
import LandingPage from './pages/Landing'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user/*" element={<UserApp />} />
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  )
}
