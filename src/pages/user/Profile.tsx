/**
 * User App profile page component
 * User profile management with personal info, preferences, and settings
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

  /** Sample user data */
  const user = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    address: '456 Oak Street, Downtown, NY 10001',
    joinDate: 'January 15, 2024',
    loyaltyPoints: 2340,
    totalAppointments: 8,
    totalSpent: 680,
    membershipTier: 'Gold',
    avatar: 'https://pub-cdn.sider.ai/u/U07GH2W2594/web-coder/6891fe61964e57bb00419b3b/resource/149f1176-1954-4f4d-9046-eb111af0214a.jpg'
  }

  const favoriteServices = [
    { name: 'Hair Cut & Style', count: 3, lastBooked: '1 week ago' },
    { name: 'Facial Treatment', count: 2, lastBooked: '2 weeks ago' },
    { name: 'Massage Therapy', count: 1, lastBooked: '1 month ago' }
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
              <p className="text-gray-600 mb-2">Member since {user.joinDate}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>{user.totalAppointments} appointments</span>
                <span>${user.totalSpent} spent</span>
                <span>{user.loyaltyPoints} points</span>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit className="w-4 h-4 mr-2" />
              {isEditing ? 'Save' : 'Edit'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Loyalty Points */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-purple-600" />
            Loyalty Rewards
          </CardTitle>
          <CardDescription>Earn points with every appointment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Current Points</span>
              <span className="text-2xl font-bold text-purple-600">{user.loyaltyPoints}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full" 
                style={{ width: `${(user.loyaltyPoints % 1000) / 10}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Gold Member</span>
              <span>{1000 - (user.loyaltyPoints % 1000)} points to Platinum</span>
            </div>
            <Button variant="outline" className="w-full">
              Redeem Points
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                defaultValue={user.name}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue={user.email}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                defaultValue={user.phone}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                defaultValue={user.address}
                disabled={!isEditing}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Favorite Services */}
      <Card>
        <CardHeader>
          <CardTitle>Favorite Services</CardTitle>
          <CardDescription>Services you book most often</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {favoriteServices.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{service.name}</h4>
                  <p className="text-sm text-gray-600">
                    Booked {service.count} times • Last: {service.lastBooked}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Book Again
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
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="appointment-notifications">Appointment Reminders</Label>
              <p className="text-sm text-gray-600">Get notified about upcoming appointments</p>
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
              <Label htmlFor="promotion-notifications">Promotions & Offers</Label>
              <p className="text-sm text-gray-600">Receive special offers and discounts</p>
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
              <Label htmlFor="reminder-notifications">Booking Reminders</Label>
              <p className="text-sm text-gray-600">Reminders to book your next appointment</p>
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
            Payment Methods
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
                <p className="text-sm text-gray-600">Expires 12/26</p>
              </div>
            </div>
            <Badge variant="outline">Default</Badge>
          </div>
          <Button variant="outline" className="w-full">
            Add Payment Method
          </Button>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Account Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <Settings className="w-4 h-4 mr-2" />
            Privacy Settings
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Bell className="w-4 h-4 mr-2" />
            Notification Preferences
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Gift className="w-4 h-4 mr-2" />
            Referral Program
          </Button>
          <Separator />
          <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
