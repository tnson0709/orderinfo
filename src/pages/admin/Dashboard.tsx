/**
 * Admin Dashboard - Main overview page with key metrics and recent activity
 */
import { Calendar, Users, Clock, TrendingUp, Phone, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'

export default function AdminDashboard() {
  /** Sample data for demonstration */
  const stats = [
    { title: 'Today\'s Appointments', value: '12', icon: Calendar, change: '+2 from yesterday' },
    { title: 'Total Customers', value: '1,248', icon: Users, change: '+5% from last month' },
    { title: 'Avg. Service Time', value: '45min', icon: Clock, change: '-3min from last week' },
    { title: 'Revenue Today', value: '$1,890', icon: TrendingUp, change: '+12% from yesterday' }
  ]

  const recentAppointments = [
    { id: 1, customer: 'Sarah Johnson', service: 'Hair Cut & Style', time: '9:00 AM', status: 'confirmed' },
    { id: 2, customer: 'Mike Chen', service: 'Beard Trim', time: '10:30 AM', status: 'in-progress' },
    { id: 3, customer: 'Emma Wilson', service: 'Hair Color', time: '11:00 AM', status: 'confirmed' },
    { id: 4, customer: 'David Brown', service: 'Massage Therapy', time: '2:00 PM', status: 'pending' }
  ]

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Phone className="h-4 w-4 mr-2" />
          Quick Call
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-xs text-green-600 mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Appointments */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Appointments</CardTitle>
          <CardDescription>Manage your schedule and track appointments</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentAppointments.map((appointment) => (
            <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{appointment.customer}</p>
                  <p className="text-sm text-gray-600">{appointment.service}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-900">{appointment.time}</span>
                <Badge 
                  variant={
                    appointment.status === 'confirmed' ? 'default' :
                    appointment.status === 'in-progress' ? 'secondary' : 'outline'
                  }
                  className="capitalize"
                >
                  {appointment.status === 'in-progress' ? 'In Progress' : appointment.status}
                </Badge>
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full">
            View All Appointments
          </Button>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">New Appointment</h3>
            <p className="text-sm text-gray-600">Schedule a new appointment for a customer</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Add Customer</h3>
            <p className="text-sm text-gray-600">Register a new customer profile</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Complete Service</h3>
            <p className="text-sm text-gray-600">Mark an appointment as completed</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
