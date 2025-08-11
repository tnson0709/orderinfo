/**
 * Admin App layout component  
 * Responsive layout with sidebar for desktop and bottom nav for mobile
 */
import { ReactNode, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { 
  LayoutDashboard, 
  Calendar, 
  Scissors, 
  Users, 
  BarChart3, 
  Settings,
  Menu,
  X,
  ArrowLeft
} from 'lucide-react'
import { Button } from '../components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '../components/ui/sheet'

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const navItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
    { path: '/admin/appointments', icon: Calendar, label: 'Appointments' },
    { path: '/admin/services', icon: Scissors, label: 'Dịch vụ' },
    { path: '/admin/customers', icon: Users, label: 'Khách hàng' },
    { path: '/admin/analytics', icon: BarChart3, label: 'Phân tích' },
    { path: '/admin/settings', icon: Settings, label: 'Cài đặt' },
  ]

  const isActive = (path: string, exact = false) => {
    if (exact) {
      return location.pathname === path
    }
    return location.pathname.startsWith(path)
  }

  const NavContent = () => (
    <div className="space-y-2">
      {navItems.map((item) => {
        const Icon = item.icon
        const active = isActive(item.path, item.exact)
        
        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              active
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </Link>
        )
      })}
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        {/* Desktop Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 p-6">
          <div className="mb-8">
            <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Apps</span>
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-sm text-gray-500">Beauty & Wellness</p>
          </div>
          <NavContent />
        </aside>

        {/* Desktop Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Mobile Header */}
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="p-2">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-6">
              <div className="mb-8">
                <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm">Back to Apps</span>
                </Link>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">Beauty & Wellness</p>
              </div>
              <NavContent />
            </SheetContent>
          </Sheet>
          
          <div className="text-center">
            <h1 className="text-lg font-semibold text-gray-900">Admin Panel</h1>
            <p className="text-xs text-gray-500">Business Management</p>
          </div>
          
          <div className="w-8" />
        </header>

        {/* Mobile Main Content */}
        <main className="p-4">
          {children}
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2">
          <div className="flex items-center justify-around">
            {navItems.slice(0, 5).map((item) => {
              const Icon = item.icon
              const active = isActive(item.path, item.exact)
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col items-center py-2 px-2 rounded-lg transition-colors ${
                    active
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4 mb-1" />
                  <span className="text-xs font-medium">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </div>
  )
}
