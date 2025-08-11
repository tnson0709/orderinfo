/**
 * User App layout component
 * Mobile-optimized layout with bottom navigation
 */
import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router'
import { Home, Calendar, Clock, User, ArrowLeft } from 'lucide-react'
import { Button } from '../components/ui/button'

interface UserLayoutProps {
  children: ReactNode
}

export default function UserLayout({ children }: UserLayoutProps) {
  const location = useLocation()
  const currentPath = location.pathname

  const navItems = [
    { path: '/user', icon: Home, label: 'Trang chủ', exact: true },
    { path: '/user/services', icon: Calendar, label: 'Dịch vụ' },
    { path: '/user/appointments', icon: Clock, label: 'Đặt chỗ' },
    { path: '/user/profile', icon: User, label: 'Hồ sơ' },
  ]

  const isActive = (path: string, exact = false) => {
    if (exact) {
      return currentPath === path
    }
    return currentPath.startsWith(path)
  }

  const showBackButton = currentPath.includes('/booking/')

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        {showBackButton ? (
          <Link to="/user/services">
            <Button variant="ghost" size="sm" className="p-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
        ) : (
          <div />
        )}
        
        <div className="text-center">
          <h1 className="text-lg font-semibold text-gray-900">BookingPro</h1>
          <p className="text-xs text-gray-500">Beauty & Wellness</p>
        </div>
        
        <div className="w-8" /> {/* Spacer for centering */}
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path, item.exact)
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                  active
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
