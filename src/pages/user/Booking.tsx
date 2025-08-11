/**
 * User App booking page component
 * Service booking flow with date/time selection and confirmation
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
  const [step, setStep] = useState(1) // 1: DateTime, 2: Details, 3: Confirmation

  /** Sample service data */
  const service = {
    id: 1,
    name: 'Hair Cut & Style',
    description: 'Professional haircut with styling and finish',
    price: 85,
    duration: 60,
    image: 'https://pub-cdn.sider.ai/u/U07GH2W2594/web-coder/6891fe61964e57bb00419b3b/resource/29324b32-a272-4542-9d19-679f33e876da.jpg'
  }

  /** Available time slots */
  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM'
  ]

  /** Available dates (next 14 days) */
  const availableDates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i + 1)
    return {
      date: date.toISOString().split('T')[0],
      display: date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      })
    }
  })

  const handleBooking = () => {
    // Handle booking submission
    console.log('Booking confirmed:', { serviceId, selectedDate, selectedTime })
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
          <h1 className="text-xl font-bold text-gray-900">Book Appointment</h1>
          <p className="text-sm text-gray-600">Step {step} of 3</p>
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
                  {service.duration} min
                </span>
                <span className="font-semibold text-green-600">${service.price}</span>
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
                Select Date
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
                  Select Time
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
            Continue to Details
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
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" defaultValue="Sarah" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" defaultValue="Johnson" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="john@example.com"
                  defaultValue="sarah.johnson@email.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  placeholder="+1 (555) 123-4567"
                  defaultValue="+1 (555) 123-4567"
                />
              </div>
              <div>
                <Label htmlFor="notes">Special Requests (Optional)</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Any special requests or notes..."
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
              Back
            </Button>
            <Button 
              onClick={() => setStep(3)}
              className="flex-1"
            >
              Review Booking
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Confirmation */}
      {step === 3 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">Service</span>
                <span className="font-medium">{service.name}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">Date</span>
                <span className="font-medium">
                  {availableDates.find(d => d.date === selectedDate)?.display}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">Time</span>
                <span className="font-medium">{selectedTime}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">Duration</span>
                <span className="font-medium">{service.duration} minutes</span>
              </div>
              <div className="flex items-center justify-between py-2 text-lg font-semibold">
                <span>Total</span>
                <span className="text-green-600">${service.price}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue="card" className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex-1">Pay with Card</Label>
                  <Badge variant="outline">Recommended</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal">PayPal</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash">Pay at Location</Label>
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
              Back
            </Button>
            <Link to="/user/appointments" className="flex-1">
              <Button 
                onClick={handleBooking}
                className="w-full"
              >
                Confirm Booking
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
