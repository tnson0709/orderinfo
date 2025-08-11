/**
 * Trang lịch hẹn của người dùng
 * Xem và quản lý lịch hẹn với trạng thái
 */
import { useState } from 'react'
import { Calendar, Clock, MapPin, Phone, Star, MessageSquare } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'

export default function AppointmentsPage() {
  /** Dữ liệu mẫu lịch hẹn */
  const appointments = [
    {
      id: 1,
      service: 'Cắt & tạo kiểu tóc',
      provider: 'Emma Johnson',
      date: 'Ngày mai',
      time: '14:30',
      duration: 90,
      price: 85,
      status: 'đã xác nhận',
      address: '123 Beauty Street, Downtown',
      image: 'https://pub-cdn.sider.ai/u/U07GH2W2594/web-coder/6891fe61964e57bb00419b3b/resource/580b7f55-7e13-446d-8c0c-fccae6b7eb5f.jpg',
      providerImage: 'https://pub-cdn.sider.ai/u/U07GH2W2594/web-coder/6891fe61964e57bb00419b3b/resource/c7bc9075-5dd7-498f-bff2-cf703d21bdce.jpg'
    },
    {
      id: 2,
      service: 'Chăm sóc da mặt',
      provider: 'Lisa Chen',
      date: '08/08/2024',
      time: '11:00',
      duration: 75,
      price: 95,
      status: 'chờ xác nhận',
      address: '123 Beauty Street, Downtown',
      image: 'https://pub-cdn.sider.ai/u/U07GH2W2594/web-coder/6891fe61964e57bb00419b3b/resource/c1862849-6c8c-4d0c-b78b-9791129a2113.jpg',
      providerImage: 'https://pub-cdn.sider.ai/u/U07GH2W2594/web-coder/6891fe61964e57bb00419b3b/resource/661c3cdb-3b35-45d0-97e2-487852246e16.jpg'
    },
    {
      id: 3,
      service: 'Massage trị liệu',
      provider: 'Sarah Wilson',
      date: '25/07/2024',
      time: '15:00',
      duration: 60,
      price: 120,
      status: 'đã hoàn thành',
      address: '123 Beauty Street, Downtown',
      image: 'https://pub-cdn.sider.ai/u/U07GH2W2594/web-coder/6891fe61964e57bb00419b3b/resource/f2f66e55-ac1a-449a-aa7f-028d71b3628b.jpg',
      providerImage: 'https://pub-cdn.sider.ai/u/U07GH2W2594/web-coder/6891fe61964e57bb00419b3b/resource/fa6467f7-3de3-45df-8bc1-e2c60e03a4f3.jpg'
    },
    {
      id: 4,
      service: 'Nhuộm tóc',
      provider: 'Emma Johnson',
      date: '10/07/2024',
      time: '13:00',
      duration: 180,
      price: 150,
      status: 'đã hủy',
      address: '123 Beauty Street, Downtown',
      image: 'https://pub-cdn.sider.ai/u/U07GH2W2594/web-coder/6891fe61964e57bb00419b3b/resource/85f20f0b-e99d-4efa-9182-4c439058b994.jpg',
      providerImage: 'https://pub-cdn.sider.ai/u/U07GH2W2594/web-coder/6891fe61964e57bb00419b3b/resource/c7bc9075-5dd7-498f-bff2-cf703d21bdce.jpg'
    }
  ]

  /** Lọc lịch hẹn theo trạng thái */
  const upcomingAppointments = appointments.filter(apt => 
    ['đã xác nhận', 'chờ xác nhận'].includes(apt.status)
  )
  const pastAppointments = appointments.filter(apt => 
    ['đã hoàn thành', 'đã hủy'].includes(apt.status)
  )

  /** Badge trạng thái */
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'đã xác nhận': return 'default'
      case 'chờ xác nhận': return 'secondary'
      case 'đã hoàn thành': return 'outline'
      case 'đã hủy': return 'destructive'
      default: return 'outline'
    }
  }

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Lịch hẹn của tôi</h1>
        <p className="text-gray-600">Quản lý các lịch hẹn sắp tới và đã qua</p>
      </div>

      {/* Appointment Tabs */}
      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">Sắp tới ({upcomingAppointments.length})</TabsTrigger>
          <TabsTrigger value="past">Đã qua ({pastAppointments.length})</TabsTrigger>
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
                            với {appointment.provider}
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
                          <p className="text-lg font-bold text-gray-900">{appointment.price}₫</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 pt-3 border-t">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Phone className="w-4 h-4 mr-2" />
                          Gọi điện
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Nhắn tin
                        </Button>
                        {appointment.status === 'đã xác nhận' && (
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            Hủy lịch
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
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Không có lịch hẹn sắp tới</h3>
                <p className="text-gray-600 mb-4">Bạn chưa có lịch hẹn nào được đặt.</p>
                <Button>Đặt lịch mới</Button>
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
                          với {appointment.provider}
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
                        <p className="text-lg font-bold text-gray-900">{appointment.price}₫</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 pt-3 border-t">
                      {appointment.status === 'đã hoàn thành' ? (
                        <>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Star className="w-4 h-4 mr-2" />
                            Đánh giá dịch vụ
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            Đặt lại
                          </Button>
                        </>
                      ) : (
                        <Button variant="outline" size="sm" className="w-full">
                          Đặt lại lịch
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
          <CardTitle>Thống kê của bạn</CardTitle>
          <CardDescription>Lịch sử đặt lịch của bạn</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {appointments.filter(a => a.status === 'đã hoàn thành').length}
              </div>
              <div className="text-sm text-gray-600">Đã hoàn thành</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {appointments.filter(a => a.status === 'đã hoàn thành').reduce((sum, a) => sum + a.price, 0)}₫
              </div>
              <div className="text-sm text-gray-600">Tổng chi tiêu</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">2,340</div>
              <div className="text-sm text-gray-600">Điểm tích lũy</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
