/**
 * Trang đặt lịch ứng dụng Người dùng
 * Quy trình đặt dịch vụ với chọn ngày/giờ và xác nhận
 */
import { useState } from 'react'
import { useParams, Link } from 'react-router'
import { Calendar, Clock, ArrowLeft, User, Phone, Mail, CreditCard } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Textarea } from '../../components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group'

export default function BookingPage() {
  const { serviceId } = useParams()
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [step, setStep] = useState(1) // 1: Ngày giờ, 2: Thông tin, 3: Xác nhận

  /** Dữ liệu mẫu dịch vụ */
  const service = {
    id: 1,
    name: 'Cắt & tạo kiểu tóc',
    description: 'Cắt tóc chuyên nghiệp, tạo kiểu và hoàn thiện',
    price: 85,
    duration: 60,
    image: 'https://pub-cdn.sider.ai/u/U07GH2W2594/web-coder/6891fe61964e57bb00419b3b/resource/29324b32-a272-4542-9d19-679f33e876da.jpg'
  }

  /** Khung giờ có sẵn */
  const timeSlots = [
    '9:00', '9:30', '10:00', '10:30', '11:00', '11:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30'
  ]

  /** Ngày có sẵn (14 ngày tiếp theo) */
  const availableDates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i + 1)
    return {
      date: date.toISOString().split('T')[0],
      display: date.toLocaleDateString('vi-VN', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      })
    }
  })

  const handleBooking = () => {
    // Xử lý đặt lịch
    console.log('Đã xác nhận đặt lịch:', { serviceId, selectedDate, selectedTime })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link to="/user/services">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Đặt lịch hẹn</h1>
          <p className="text-sm text-gray-600">Bước {step} / 3</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center space-x-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            1
          </div>
          <div className={`w-8 h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            2
          </div>
          <div className={`w-8 h-1 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`} />
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            3
          </div>
        </div>
      </div>

      {/* Service Info */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <img
              src={service.image}
              alt={service.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{service.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{service.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {service.duration} phút
                </span>
                <span className="font-semibold text-green-600">{service.price}₫</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step 1: Date & Time Selection */}
      {step === 1 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Chọn ngày
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {availableDates.slice(0, 8).map((date) => (
                  <button
                    key={date.date}
                    onClick={() => setSelectedDate(date.date)}
                    className={`p-3 text-sm rounded-lg border transition-colors ${
                      selectedDate === date.date
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    {date.display}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {selectedDate && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Chọn giờ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-2 text-sm rounded-lg border transition-colors ${
                        selectedTime === time
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Button 
            onClick={() => setStep(2)} 
            disabled={!selectedDate || !selectedTime}
            className="w-full"
          >
            Tiếp tục nhập thông tin
          </Button>
        </div>
      )}

      {/* Step 2: Personal Details */}
      {step === 2 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Thông tin cá nhân
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Họ</Label>
                  <Input id="firstName" placeholder="Nhập họ" defaultValue="" />
                </div>
                <div>
                  <Label htmlFor="lastName">Tên</Label>
                  <Input id="lastName" placeholder="Nhập tên" defaultValue="" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Nhập email"
                  defaultValue=""
                />
              </div>
              <div>
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  placeholder="Nhập số điện thoại"
                  defaultValue=""
                />
              </div>
              <div>
                <Label htmlFor="notes">Yêu cầu đặc biệt (Không bắt buộc)</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Ghi chú hoặc yêu cầu đặc biệt..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => setStep(1)}
              className="flex-1"
            >
              Quay lại
            </Button>
            <Button 
              onClick={() => setStep(3)}
              className="flex-1"
            >
              Xem lại đặt lịch
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Confirmation */}
      {step === 3 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tóm tắt đặt lịch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">Dịch vụ</span>
                <span className="font-medium">{service.name}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">Ngày</span>
                <span className="font-medium">
                  {availableDates.find(d => d.date === selectedDate)?.display}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">Giờ</span>
                <span className="font-medium">{selectedTime}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">Thời lượng</span>
                <span className="font-medium">{service.duration} phút</span>
              </div>
              <div className="flex items-center justify-between py-2 text-lg font-semibold">
                <span>Tổng cộng</span>
                <span className="text-green-600">{service.price}₫</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Phương thức thanh toán
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue="card" className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex-1">Thanh toán bằng thẻ</Label>
                  <Badge variant="outline">Khuyên dùng</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal">PayPal</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash">Thanh toán tại cửa hàng</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => setStep(2)}
              className="flex-1"
            >
              Quay lại
            </Button>
            <Link to="/user/appointments" className="flex-1">
              <Button 
                onClick={handleBooking}
                className="w-full"
              >
                Xác nhận đặt lịch
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
