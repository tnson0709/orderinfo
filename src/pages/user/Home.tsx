/**
 * Trang chủ ứng dụng Người dùng
 * Trang chính cho khách hàng với dịch vụ nổi bật và thao tác nhanh
 */
import { Link } from 'react-router'
import { Calendar, Clock, Star, MapPin, Phone } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'

export default function UserHome() {
  const featuredServices = [
    {
      id: 1,
      name: 'Cắt & tạo kiểu tóc',
      price: '45.000₫',
      duration: '60 phút',
      rating: 4.8,
      image: 'https://pub-cdn.sider.ai/u/U07GH2W2594/web-coder/6891fe61964e57bb00419b3b/resource/2eaf5a22-8388-4ed8-8a42-5930049108b7.jpg',
      popular: true
    },
    {
      id: 2,
      name: 'Chăm sóc da mặt',
      price: '80.000₫',
      duration: '90 phút',
      rating: 4.9,
      image: 'https://pub-cdn.sider.ai/u/U07GH2W2594/web-coder/6891fe61964e57bb00419b3b/resource/43483382-3078-4146-a4ce-d48e7f1d4244.jpg'
    },
    {
      id: 3,
      name: 'Massage trị liệu',
      price: '120.000₫',
      duration: '60 phút',
      rating: 4.7,
      image: 'https://pub-cdn.sider.ai/u/U07GH2W2594/web-coder/6891fe61964e57bb00419b3b/resource/cafc75a2-1a51-478f-838f-230381c98f57.jpg'
    }
  ]

  const quickStats = [
    { label: 'Tổng số lịch hẹn', value: '127', color: 'bg-blue-100 text-blue-700' },
    { label: 'Tháng này', value: '12', color: 'bg-green-100 text-green-700' },
    { label: 'Điểm tích lũy', value: '2,340', color: 'bg-purple-100 text-purple-700' }
  ]

  return (
    <div className="space-y-6 p-4">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-2">Chào mừng trở lại, Sarah!</h2>
        <p className="text-blue-100 mb-4">Bạn đã sẵn sàng cho lịch hẹn tiếp theo chưa?</p>
        <Link to="/user/services">
          <Button className="bg-white text-blue-600 hover:bg-gray-100">
            <Calendar className="w-4 h-4 mr-2" />
            Đặt lịch ngay
          </Button>
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        {quickStats.map((stat, index) => (
          <Card key={index} className="text-center">
            <CardContent className="p-4">
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full mb-2 ${stat.color}`}>
                <span className="text-lg font-bold">{stat.value}</span>
              </div>
              <p className="text-xs text-gray-600 font-medium">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Next Appointment */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="w-5 h-5 text-green-600" />
            Lịch hẹn tiếp theo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-gray-900">Cắt & Nhuộm tóc</h3>
              <p className="text-sm text-gray-600">với Emma Johnson</p>
            </div>
            <Badge variant="outline" className="text-green-600 border-green-600">
              Đã xác nhận
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>Ngày mai, 14:30</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>90 phút</span>
            </div>
          </div>
          <Link to="/user/appointments">
            <Button variant="outline" size="sm" className="w-full">
              Xem chi tiết
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Featured Services */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Dịch vụ nổi bật</h3>
          <Link to="/user/services" className="text-blue-600 text-sm font-medium">
            Xem tất cả
          </Link>
        </div>
        <div className="space-y-4">
          {featuredServices.map((service) => (
            <Card key={service.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-24 h-24 object-cover"
                  />
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                          {service.name}
                          {service.popular && (
                            <Badge className="bg-orange-100 text-orange-700 text-xs">
                              Phổ biến
                            </Badge>
                          )}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">{service.rating}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{service.price}</p>
                        <p className="text-sm text-gray-500">{service.duration}</p>
                      </div>
                    </div>
                    <Link to={`/user/booking/${service.id}`}>
                      <Button size="sm" className="w-full">
                        Đặt lịch
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Business Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Thông tin Salon</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-gray-400" />
            <div>
              <p className="font-medium text-gray-900">123 Beauty Street</p>
              <p className="text-sm text-gray-600">Trung tâm thành phố, NY 10001</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-gray-400" />
            <div>
              <p className="font-medium text-gray-900">(555) 123-4567</p>
              <p className="text-sm text-gray-600">Gọi để đặt lịch hẹn</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-gray-400" />
            <div>
              <p className="font-medium text-gray-900">Thứ 2 - Thứ 7: 9:00 - 19:00</p>
              <p className="text-sm text-gray-600">Chủ nhật: Đóng cửa</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
