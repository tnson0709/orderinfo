/**
 * Admin App main component
 * Responsive business management dashboard
 */
import { Routes, Route, Navigate } from 'react-router'
import AdminLayout from '../layouts/AdminLayout'
import AdminDashboard from '../pages/admin/Dashboard'
import AdminAppointments from '../pages/admin/Appointments'
import AdminServices from '../pages/admin/Services'
import AdminCustomers from '../pages/admin/Customers'
import AdminAnalytics from '../pages/admin/Analytics'
import AdminSettings from '../pages/admin/Settings'

export default function AdminApp() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/appointments" element={<AdminAppointments />} />
        <Route path="/services" element={<AdminServices />} />
        <Route path="/customers" element={<AdminCustomers />} />
        <Route path="/analytics" element={<AdminAnalytics />} />
        <Route path="/settings" element={<AdminSettings />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminLayout>
  )
}
