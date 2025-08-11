/**
 * Phân tích quản trị - Thông tin và chỉ số hiệu suất kinh doanh
 */
import { TrendingUp, Calendar, DollarSign, Users, Clock, Star } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'

export default function AdminAnalytics() {
  /** Dữ liệu mẫu */
  const revenueData = [
    { month: 'Th1', revenue: 4500, appointments: 45 },
    { month: 'Th2', revenue: 5200, appointments: 52 },
    { month: 'Th3', revenue: 4800, appointments: 48 },
    { month: 'Th4', revenue: 6100, appointments: 61 },
    { month: 'Th5', revenue: 5900, appointments: 59 },
    { month: 'Th6', revenue: 7200, appointments: 72 }
  ]

  const topServices = [
    { name: 'Cắt & tạo kiểu tóc', bookings: 28, revenue: 2380 },
    { name: 'Nhuộm tóc', bookings: 15, revenue: 1800 },
    { name: 'Massage trị liệu', bookings: 12, revenue: 900 },
    { name: 'Tỉa râu', bookings: 18, revenue: 630 }
  ]

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Phân tích</h1>
        <p className="text-gray-600">Theo dõi hiệu suất và thông tin kinh doanh của bạn</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Doanh thu tháng
            </CardTitle>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">7.200₫</div>
            <p className="text-xs text-green-600 mt-1">+22% so với tháng trước</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Tổng số lịch hẹn
            </CardTitle>
            <Calendar className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">72</div>
            <p className="text-xs text-green-600 mt-1">+18% so với tháng trước</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Thời gian phục vụ TB
            </CardTitle>
            <Clock className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">58 phút</div>
            <p className="text-xs text-red-600 mt-1">+3 phút so với tháng trước</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Đánh giá khách hàng
            </CardTitle>
            <Star className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">4.8</div>
            <p className="text-xs text-green-600 mt-1">+0.2 so với tháng trước</p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="revenue">Doanh thu</TabsTrigger>
          <TabsTrigger value="services">Dịch vụ</TabsTrigger>
          <TabsTrigger value="customers">Khách hàng</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Xu hướng doanh thu</CardTitle>
              <CardDescription>Doanh thu hàng tháng và số lượng lịch hẹn theo thời gian</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {revenueData.map((data, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{data.month} 2024</p>
                        <p className="text-sm text-gray-600">{data.appointments} lịch hẹn</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-green-600">{data.revenue.toLocaleString()}₫</div>
                      <div className="text-sm text-gray-500">{Math.round(data.revenue / data.appointments)}₫ TB</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Dịch vụ nổi bật</CardTitle>
              <CardDescription>Dịch vụ phổ biến nhất theo số lượng đặt và doanh thu</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topServices.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{service.name}</p>
                        <p className="text-sm text-gray-600">{service.bookings} lượt đặt tháng này</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-green-600">{service.revenue.toLocaleString()}₫</div>
                      <div className="text-sm text-gray-500">{Math.round(service.revenue / service.bookings)}₫ TB</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin khách hàng</CardTitle>
              <CardDescription>Hành vi khách hàng và chỉ số giữ chân</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="text-center p-6 border rounded-lg">
                    <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">248</div>
                    <div className="text-sm text-gray-600">Tổng khách hàng</div>
                  </div>
                  <div className="text-center p-6 border rounded-lg">
                    <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">68%</div>
                    <div className="text-sm text-gray-600">Tỷ lệ quay lại</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="text-center p-6 border rounded-lg">
                    <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">2.9</div>
                    <div className="text-sm text-gray-600">TB lượt đến/khách</div>
                  </div>
                  <div className="text-center p-6 border rounded-lg">
                    <DollarSign className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">182₫</div>
                    <div className="text-sm text-gray-600">Giá trị TB/khách</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
