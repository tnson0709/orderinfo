/**
 * Landing page component
 * Entry point to choose between User App and Admin App
 */
import { Link } from 'react-router'
import { Calendar, Settings, Users, BookOpen } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full mb-6">
            <Calendar className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            BookingPro
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Complete white-label appointment booking system for modern businesses
          </p>
        </div>

        {/* App Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* User App Card */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardHeader className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-full mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors">
                <BookOpen className="w-6 h-6" />
              </div>
              <CardTitle className="text-2xl text-gray-900">User App</CardTitle>
              <CardDescription className="text-gray-600">
                Customer booking experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Browse available services
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Select appointment times
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Manage bookings
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Mobile-optimized interface
                </div>
              </div>
              <Link to="/user" className="block">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Launch User App
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Admin App Card */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardHeader className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Settings className="w-6 h-6" />
              </div>
              <CardTitle className="text-2xl text-gray-900">Admin App</CardTitle>
              <CardDescription className="text-gray-600">
                Business management dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  Manage appointments
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  Configure services
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  Analytics & reporting
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  Mobile + Desktop ready
                </div>
              </div>
              <Link to="/admin" className="block">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Launch Admin App
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Features Overview */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Platform Features</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">White-Label Ready</h3>
              <p className="text-sm text-gray-600">Fully customizable branding for each business</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Calendar className="w-8 h-8 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Smart Scheduling</h3>
              <p className="text-sm text-gray-600">Intelligent appointment management system</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Settings className="w-8 h-8 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Multi-Platform</h3>
              <p className="text-sm text-gray-600">Works seamlessly on mobile and desktop</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
