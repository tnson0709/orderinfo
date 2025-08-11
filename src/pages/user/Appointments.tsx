/**
 * User App appointments page component
 * View and manage user's appointments with status tracking
 */
import { useState } from 'react'
import { Calendar, Clock, MapPin, Phone, Star, MessageSquare } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'

export default function AppointmentsPage() {
  /** Sample appointments data */
  const appointments = [
    {
      id: 1,
      service: 'Hair Cut & Style',
      provider: 'Emma Johnson',
      date: 'Tomorrow',
      time: '2:30 PM',
      duration: 90,
      price: 85,
      status: 'confirmed',
      address: '123 Beauty Street, Downtown',
      image: 'https://pub-cdn.sider.ai/u/U07GH2W2594/web-coder/6891fe61964e57bb00419b3b/resource/580b7f55-7e13-446d-8c0c-fccae6b7eb5f.jpg',
      providerImage: 'https://pub-cdn.sider.ai/u/U07GH2W2594/web-coder/6891fe61964e57bb00419b3b/resource/c7bc9075-5dd7-498f-bff2-cf703d21bdce.jpg'
    },
    {
      id: 2,
      service: 'Facial Treatment',
      provider: 'Lisa Chen',
      date: 'Aug 8, 2024',
      time: '11:00 AM',
      duration: 75,
      price: 95,
      status: 'pending',
      address: '123 Beauty Street, Downtown',
      image: 'https://pub-cdn.sider.ai/u/U07GH2W2594/web-coder/6891fe61964e57bb00419b3b/resource/c1862849-6c8c-4d0c-b78b-9791129a2113.jpg',
      providerImage: 'https://pub-cdn.sider.ai/u/U07GH2W2594/web-coder/6891fe61964e57bb00419b3b/resource/661c3cdb-3b35-45d0-97e2-487852246e16.jpg'
    },
    {
      id: 3,
      service: 'Massage Therapy',
      provider: 'Sarah Wilson',
      date: 'Jul 25, 2024',
      time: '3:00 PM',
      duration: 60,
      price: 120,
      status: 'completed',
      address: '123 Beauty Street, Downtown',
      image: 'https://pub-cdn.sider.ai/u/U07GH2W2594/web-coder/6891fe61964e57bb00419b3b/resource/f2f66e55-ac1a-449a-aa7f-028d71b3628b.jpg',
      providerImage: 'https://pub-cdn.sider.ai/u/U07GH2W2594/web-coder/6891fe61964e57bb00419b3b/resource/fa6467f7-3de3-45df-8bc1-e2c60e03a4f3.jpg'
    },
    {
      id: 4,
      service: 'Hair Color',
      provider: 'Emma Johnson',
      date: 'Jul 10, 2024',
      time: '1:00 PM',
      duration: 180,
      price: 150,
      status: 'cancelled',
      address: '123 Beauty Street, Downtown',
      image: 'https://pub-cdn.sider.ai/u/U07GH2W2594/web-coder/6891fe61964e57bb00419b3b/resource/85f20f0b-e99d-4efa-9182-4c439058b994.jpg',
      providerImage: 'https://pub-cdn.sider.ai/u/U07GH2W2594/web-coder/6891fe61964e57bb00419b3b/resource/c7bc9075-5dd7-498f-bff2-cf703d21bdce.jpg'
    }
  ]

  /** Filter appointments by status */
  const upcomingAppointments = appointments.filter(apt => 
    ['confirmed', 'pending'].includes(apt.status)
  )
  const pastAppointments = appointments.filter(apt => 
    ['completed', 'cancelled'].includes(apt.status)
  )

  /** Get status badge variant */
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'confirmed': return 'default'
      case 'pending': return 'secondary'
      case 'completed': return 'outline'
      case 'cancelled': return 'destructive'
      default: return 'outline'
    }
  }

  /** Get status color */
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600'
      case 'pending': return 'text-yellow-600'
      case 'completed': return 'text-gray-600'
      case 'cancelled': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Appointments</h1>
        <p className="text-gray-600">Manage your upcoming and past appointments</p>
      </div>

      {/* Appointment Tabs */}
      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming ({upcomingAppointments.length})</TabsTrigger>
          <TabsTrigger value="past">Past ({pastAppointments.length})</TabsTrigger>
        </TabsList>

        {/* Upcoming Appointments */}
        <TabsContent value="upcoming" className="space-y-4">
          {upcomingAppointments.length > 0 ? (
            upcomingAppointments.map((appointment) => (
              <Card key={appointment.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex">
                    <img
                      src={appointment.image}
                      alt={appointment.service}
                      className="w-24 h-24 object-cover"
                    />
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {appointment.service}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            with {appointment.provider}
                          </p>
                          <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                            <span className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {appointment.date}
                            </span>
                            <span className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {appointment.time}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="w-3 h-3 mr-1" />
                            <span className="truncate">{appointment.address}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={getStatusVariant(appointment.status)} className="capitalize mb-2">
                            {appointment.status}
                          </Badge>
                          <p className="text-lg font-bold text-gray-900">${appointment.price}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 pt-3 border-t">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Phone className="w-4 h-4 mr-2" />
                          Call
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Message
                        </Button>
                        {appointment.status === 'confirmed' && (
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            Cancel
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Upcoming Appointments</h3>
                <p className="text-gray-600 mb-4">You don't have any appointments scheduled.</p>
                <Button>Book New Appointment</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Past Appointments */}
        <TabsContent value="past" className="space-y-4">
          {pastAppointments.map((appointment) => (
            <Card key={appointment.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex">
                  <img
                    src={appointment.image}
                    alt={appointment.service}
                    className="w-24 h-24 object-cover opacity-75"
                  />
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {appointment.service}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          with {appointment.provider}
                        </p>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {appointment.date}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {appointment.time}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={getStatusVariant(appointment.status)} className="capitalize mb-2">
                          {appointment.status}
                        </Badge>
                        <p className="text-lg font-bold text-gray-900">${appointment.price}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 pt-3 border-t">
                      {appointment.status === 'completed' ? (
                        <>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Star className="w-4 h-4 mr-2" />
                            Rate Service
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            Book Again
                          </Button>
                        </>
                      ) : (
                        <Button variant="outline" size="sm" className="w-full">
                          Reschedule
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Your Stats</CardTitle>
          <CardDescription>Your appointment history at a glance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {appointments.filter(a => a.status === 'completed').length}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                ${appointments.filter(a => a.status === 'completed').reduce((sum, a) => sum + a.price, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Spent</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">2,340</div>
              <div className="text-sm text-gray-600">Loyalty Points</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
