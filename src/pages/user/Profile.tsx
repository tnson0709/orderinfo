/**
 * Trang hồ sơ người dùng
 * Quản lý thông tin cá nhân, sở thích và cài đặt
 */
import { useState } from 'react'
import { User, Phone, Mail, MapPin, Bell, CreditCard, Gift, Settings, LogOut, Edit } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Switch } from '../../components/ui/switch'
import { Separator } from '../../components/ui/separator'

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [notifications, setNotifications] = useState({
    appointments: true,
    promotions: false,
    reminders: true
  })

  /** Dữ liệu mẫu người dùng */
  const user = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    address: '456 Oak Street, Downtown, NY 10001',
    joinDate: '15/01/2024',
    loyaltyPoints: 2340,
    totalAppointments: 8,
    totalSpent: 680,
    membershipTier: 'Vàng',
    avatar: 'https://pub-cdn.sider.ai/u/U07GH2W2594/web-coder/6891fe61964e57bb00419b3b/resource/149f1176-1954-4f4d-9046-eb111af0214a.jpg'
  }

  const favoriteServices = [
    { name: 'Cắt & tạo kiểu tóc', count: 3, lastBooked: '1 tuần trước' },
    { name: 'Chăm sóc da mặt', count: 2, lastBooked: '2 tuần trước' },
    { name: 'Massage trị liệu', count: 1, lastBooked: '1 tháng trước' }
  ]

  return (
    <div className="space-y-6 p-4">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  {user.membershipTier}
                </Badge>
              </div>
              <p className="text-gray-600 mb-2">Thành viên từ {user.joinDate}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>{user.totalAppointments} lịch hẹn</span>
                <span>{user.totalSpent}₫ đã chi tiêu</span>
                <span>{user.loyaltyPoints} điểm</span>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit className="w-4 h-4 mr-2" />
              {isEditing ? 'Lưu' : 'Chỉnh sửa'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Loyalty Points */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-purple-600" />
            Điểm thưởng thành viên
          </CardTitle>
          <CardDescription>Nhận điểm khi đặt lịch hẹn</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Điểm hiện tại</span>
              <span className="text-2xl font-bold text-purple-600">{user.loyaltyPoints}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full" 
                style={{ width: `${(user.loyaltyPoints % 1000) / 10}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Thành viên Vàng</span>
              <span>Còn {1000 - (user.loyaltyPoints % 1000)} điểm để lên Bạch Kim</span>
            </div>
            <Button variant="outline" className="w-full">
              Đổi điểm thưởng
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Thông tin cá nhân
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="name">Họ và tên</Label>
              <Input
                id="name"
                defaultValue={user.name}
                disabled={!isEditing}
                placeholder="Nhập họ và tên"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue={user.email}
                disabled={!isEditing}
                placeholder="Nhập email"
              />
            </div>
            <div>
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input
                id="phone"
                type="tel"
                defaultValue={user.phone}
                disabled={!isEditing}
                placeholder="Nhập số điện thoại"
              />
            </div>
            <div>
              <Label htmlFor="address">Địa chỉ</Label>
              <Input
                id="address"
                defaultValue={user.address}
                disabled={!isEditing}
                placeholder="Nhập địa chỉ"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Favorite Services */}
      <Card>
        <CardHeader>
          <CardTitle>Dịch vụ yêu thích</CardTitle>
          <CardDescription>Những dịch vụ bạn đặt nhiều nhất</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {favoriteServices.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{service.name}</h4>
                  <p className="text-sm text-gray-600">
                    Đã đặt {service.count} lần • Lần gần nhất: {service.lastBooked}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Đặt lại
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Thông báo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="appointment-notifications">Nhắc lịch hẹn</Label>
              <p className="text-sm text-gray-600">Nhận thông báo về lịch hẹn sắp tới</p>
            </div>
            <Switch
              id="appointment-notifications"
              checked={notifications.appointments}
              onCheckedChange={(checked) => 
                setNotifications(prev => ({ ...prev, appointments: checked }))
              }
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="promotion-notifications">Khuyến mãi & Ưu đãi</Label>
              <p className="text-sm text-gray-600">Nhận thông tin ưu đãi và giảm giá</p>
            </div>
            <Switch
              id="promotion-notifications"
              checked={notifications.promotions}
              onCheckedChange={(checked) => 
                setNotifications(prev => ({ ...prev, promotions: checked }))
              }
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="reminder-notifications">Nhắc đặt lịch</Label>
              <p className="text-sm text-gray-600">Nhắc bạn đặt lịch hẹn tiếp theo</p>
            </div>
            <Switch
              id="reminder-notifications"
              checked={notifications.reminders}
              onCheckedChange={(checked) => 
                setNotifications(prev => ({ ...prev, reminders: checked }))
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Phương thức thanh toán
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                VISA
              </div>
              <div>
                <p className="font-medium">•••• •••• •••• 4242</p>
                <p className="text-sm text-gray-600">Hết hạn 12/26</p>
              </div>
            </div>
            <Badge variant="outline">Mặc định</Badge>
          </div>
          <Button variant="outline" className="w-full">
            Thêm phương thức thanh toán
          </Button>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Cài đặt tài khoản
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <Settings className="w-4 h-4 mr-2" />
            Quyền riêng tư
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Bell className="w-4 h-4 mr-2" />
            Cài đặt thông báo
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Gift className="w-4 h-4 mr-2" />
            Chương trình giới thiệu
          </Button>
          <Separator />
          <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
            <LogOut className="w-4 h-4 mr-2" />
            Đăng xuất
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
