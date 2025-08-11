/**
 * Admin Appointments - Comprehensive appointment management interface
 */
import { useState } from 'react'
import { Calendar, Clock, Search, Filter, Plus, Phone, MessageSquare } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Badge } from '../../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'

export default function AdminAppointments() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')

  /** Sample appointments data */
  const appointments = [
    {
      id: 1,
      customer: 'Sarah Johnson',
      phone: '+1 (555) 123-4567',
      service: 'Hair Cut & Style',
      date: 'Today',
      time: '9:00 AM',
      duration: '60 min',
      status: 'confirmed',
      price: 85,
      avatar: 'https://pub-cdn.sider.ai/u/U07GH2W2594/web-coder/6891fe61964e57bb00419b3b/resource/39326288-a727-414c-9efc-b615e83cbeff.jpg'
    },
    {
      id: 2,
      customer: 'Mike Chen',
      phone: '+1 (555) 234-5678',
      service: 'Beard Trim',
      date: 'Today',
      time: '10:30 AM',
      duration: '30 min',
      status: 'in-progress',
      price: 35,
      avatar: 'https://pub-cdn.sider.ai/u/U07GH2W2594/web-coder/6891fe61964e57bb00419b3b/resource/a79d0519-26d2-4a8d-b9aa-3977f77a006b.jpg'
    },
    {
      id: 3,
      customer: 'Emma Wilson',
      phone: '+1 (555) 345-6789',
      service: 'Hair Color',
      date: 'Today',
      time: '11:00 AM',
      duration: '90 min',
      status: 'confirmed',
      price: 120,
      avatar: 'https://pub-cdn.sider.ai/u/U07GH2W2594/web-coder/6891fe61964e57bb00419b3b/resource/2c6f1d1d-0876-4939-aef7-7333d1f16cdf.jpg'
    },
    {
      id: 4,
      customer: 'David Brown',
      phone: '+1 (555) 456-7890',
      service: 'Massage Therapy',
      date: 'Tomorrow',
      time: '2:00 PM',
      duration: '45 min',
      status: 'pending',
      price: 75,
      avatar: 'https://pub-cdn.sider.ai/u/U07GH2W2594/web-coder/6891fe61964e57bb00419b3b/resource/dfb00167-32bd-4c98-beec-ffc74e9355b6.jpg'
    }
  ]

  /** Filter appointments based on search and status */
  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.service.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || appointment.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  /** Get status badge variant */
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'confirmed': return 'default'
      case 'in-progress': return 'secondary'
      case 'completed': return 'outline'
      case 'cancelled': return 'destructive'
      default: return 'outline'
    }
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-600">Manage and track all your appointments</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          New Appointment
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search appointments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Appointments Tabs */}
      <Tabs defaultValue="today" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4">
          {filteredAppointments.map((appointment) => (
            <Card key={appointment.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <img
                      src={appointment.avatar}
                      alt={appointment.customer}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{appointment.customer}</h3>
                        <Badge variant={getStatusVariant(appointment.status)} className="capitalize">
                          {appointment.status === 'in-progress' ? 'In Progress' : appointment.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{appointment.service}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {appointment.time} ({appointment.duration})
                        </span>
                        <span className="font-medium text-green-600">${appointment.price}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardContent className="p-8 text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Upcoming Appointments</h3>
              <p className="text-gray-600 mb-4">You're all caught up! No appointments scheduled for the coming days.</p>
              <Button>Schedule New Appointment</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          <Card>
            <CardContent className="p-8 text-center">
              <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Past Appointments</h3>
              <p className="text-gray-600">View and manage your appointment history</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
