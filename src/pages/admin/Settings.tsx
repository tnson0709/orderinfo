/**
 * Cài đặt quản trị - Cấu hình doanh nghiệp và tùy chọn
 */
import { Save, Building, Clock, DollarSign, Palette, Bell, Shield } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Textarea } from '../../components/ui/textarea'
import { Switch } from '../../components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'

export default function AdminSettings() {
  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cài đặt</h1>
          <p className="text-gray-600">Cấu hình thông tin và tùy chọn doanh nghiệp</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Save className="h-4 w-4 mr-2" />
          Lưu thay đổi
        </Button>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="business" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
          <TabsTrigger value="business">Doanh nghiệp</TabsTrigger>
          <TabsTrigger value="scheduling">Lịch làm việc</TabsTrigger>
          <TabsTrigger value="notifications">Thông báo</TabsTrigger>
          <TabsTrigger value="branding">Thương hiệu</TabsTrigger>
        </TabsList>

        <TabsContent value="business" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="h-5 w-5 mr-2" />
                Thông tin doanh nghiệp
              </CardTitle>
              <CardDescription>Cập nhật thông tin và liên hệ doanh nghiệp</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Tên doanh nghiệp</Label>
                  <Input id="businessName" defaultValue="Bella Beauty Salon" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessType">Loại hình doanh nghiệp</Label>
                  <Select defaultValue="salon">
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại hình" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="salon">Salon làm đẹp</SelectItem>
                      <SelectItem value="barbershop">Tiệm cắt tóc nam</SelectItem>
                      <SelectItem value="spa">Spa & Sức khỏe</SelectItem>
                      <SelectItem value="clinic">Phòng khám</SelectItem>
                      <SelectItem value="other">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="businessAddress">Địa chỉ doanh nghiệp</Label>
                <Textarea 
                  id="businessAddress" 
                  defaultValue="123 Main Street&#10;Downtown, NY 10001"
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessPhone">Số điện thoại</Label>
                  <Input id="businessPhone" defaultValue="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessEmail">Email</Label>
                  <Input id="businessEmail" type="email" defaultValue="info@bellasalon.com" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="businessDescription">Mô tả doanh nghiệp</Label>
                <Textarea 
                  id="businessDescription" 
                  defaultValue="Salon chuyên nghiệp cung cấp dịch vụ tóc, chăm sóc da và sức khỏe cao cấp trong không gian thư giãn."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduling" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Tùy chọn lịch làm việc
              </CardTitle>
              <CardDescription>Cấu hình quy tắc đặt lịch và thời gian làm việc</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Giờ làm việc</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Giờ mở cửa</Label>
                    <Select defaultValue="9">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="8">8:00</SelectItem>
                        <SelectItem value="9">9:00</SelectItem>
                        <SelectItem value="10">10:00</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Giờ đóng cửa</Label>
                    <Select defaultValue="18">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="17">17:00</SelectItem>
                        <SelectItem value="18">18:00</SelectItem>
                        <SelectItem value="19">19:00</SelectItem>
                        <SelectItem value="20">20:00</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Quy tắc đặt lịch</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Đặt trước (ngày)</Label>
                    <Select defaultValue="30">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 ngày</SelectItem>
                        <SelectItem value="14">14 ngày</SelectItem>
                        <SelectItem value="30">30 ngày</SelectItem>
                        <SelectItem value="60">60 ngày</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Thông báo trước (giờ)</Label>
                    <Select defaultValue="2">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 giờ</SelectItem>
                        <SelectItem value="2">2 giờ</SelectItem>
                        <SelectItem value="4">4 giờ</SelectItem>
                        <SelectItem value="24">24 giờ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Cài đặt lịch hẹn</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Cho phép đặt lịch trực tuyến</Label>
                      <p className="text-sm text-gray-600">Khách hàng có thể đặt lịch trực tuyến</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Yêu cầu đặt cọc</Label>
                      <p className="text-sm text-gray-600">Yêu cầu đặt cọc khi xác nhận lịch hẹn</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Tự động xác nhận</Label>
                      <p className="text-sm text-gray-600">Tự động xác nhận lịch đặt trực tuyến</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Tùy chọn thông báo
              </CardTitle>
              <CardDescription>Cấu hình nhận thông báo về lịch hẹn và cập nhật doanh nghiệp</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Thông báo Email</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Lịch hẹn mới</Label>
                      <p className="text-sm text-gray-600">Nhận thông báo khi khách đặt lịch</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Hủy lịch</Label>
                      <p className="text-sm text-gray-600">Nhận thông báo khi lịch bị hủy</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Tổng kết hàng ngày</Label>
                      <p className="text-sm text-gray-600">Nhận tổng kết lịch hẹn mỗi ngày</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Thông báo SMS</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Cập nhật khẩn cấp</Label>
                      <p className="text-sm text-gray-600">Thay đổi lịch hẹn quan trọng qua SMS</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Đặt lịch trong ngày</Label>
                      <p className="text-sm text-gray-600">Thông báo SMS cho lịch hẹn cùng ngày</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Nhắc khách hàng</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Gửi nhắc lịch hẹn</Label>
                      <p className="text-sm text-gray-600">Tự động nhắc khách về lịch hẹn sắp tới</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label>Thời gian nhắc</Label>
                    <Select defaultValue="24">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">Trước 2 giờ</SelectItem>
                        <SelectItem value="24">Trước 24 giờ</SelectItem>
                        <SelectItem value="48">Trước 48 giờ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branding" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="h-5 w-5 mr-2" />
                Tùy chỉnh thương hiệu
              </CardTitle>
              <CardDescription>Tùy chỉnh giao diện hệ thống đặt lịch</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Màu thương hiệu</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>Màu chính</Label>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-600 rounded border"></div>
                      <Input defaultValue="#2563eb" className="flex-1" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Màu phụ</Label>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-purple-600 rounded border"></div>
                      <Input defaultValue="#9333ea" className="flex-1" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Màu nhấn</Label>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-green-600 rounded border"></div>
                      <Input defaultValue="#16a34a" className="flex-1" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Nền</Label>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gray-50 rounded border"></div>
                      <Input defaultValue="#f9fafb" className="flex-1" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Logo & Hình ảnh</h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Logo doanh nghiệp</Label>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Building className="h-8 w-8 text-gray-400" />
                      </div>
                      <Button variant="outline">Tải lên logo</Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Ảnh nền</Label>
                    <div className="flex items-center space-x-4">
                      <div className="w-24 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Palette className="h-6 w-6 text-gray-400" />
                      </div>
                      <Button variant="outline">Tải lên ảnh</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Tùy chỉnh ứng dụng</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Hỗ trợ chế độ tối</Label>
                      <p className="text-sm text-gray-600">Cho phép khách sử dụng giao diện tối</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Thông điệp chào mừng tùy chỉnh</Label>
                      <p className="text-sm text-gray-600">Hiển thị thông điệp cá nhân hóa cho khách</p>
                    </div>
                    <Switch defaultChecked />
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
