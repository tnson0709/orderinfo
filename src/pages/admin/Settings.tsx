/**
 * Admin Settings - Business configuration and preferences
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
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Configure your business preferences and settings</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="business" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="scheduling">Scheduling</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
        </TabsList>

        <TabsContent value="business" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="h-5 w-5 mr-2" />
                Business Information
              </CardTitle>
              <CardDescription>Update your business details and contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input id="businessName" defaultValue="Bella Beauty Salon" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type</Label>
                  <Select defaultValue="salon">
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="salon">Beauty Salon</SelectItem>
                      <SelectItem value="barbershop">Barbershop</SelectItem>
                      <SelectItem value="spa">Spa & Wellness</SelectItem>
                      <SelectItem value="clinic">Medical Clinic</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="businessAddress">Business Address</Label>
                <Textarea 
                  id="businessAddress" 
                  defaultValue="123 Main Street&#10;Downtown, NY 10001"
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessPhone">Phone Number</Label>
                  <Input id="businessPhone" defaultValue="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessEmail">Email Address</Label>
                  <Input id="businessEmail" type="email" defaultValue="info@bellasalon.com" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="businessDescription">Business Description</Label>
                <Textarea 
                  id="businessDescription" 
                  defaultValue="Professional beauty salon offering premium hair, skincare, and wellness services in a relaxing atmosphere."
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
                Scheduling Preferences
              </CardTitle>
              <CardDescription>Configure your appointment scheduling rules and availability</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Business Hours</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Opening Time</Label>
                    <Select defaultValue="9">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="8">8:00 AM</SelectItem>
                        <SelectItem value="9">9:00 AM</SelectItem>
                        <SelectItem value="10">10:00 AM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Closing Time</Label>
                    <Select defaultValue="18">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="17">5:00 PM</SelectItem>
                        <SelectItem value="18">6:00 PM</SelectItem>
                        <SelectItem value="19">7:00 PM</SelectItem>
                        <SelectItem value="20">8:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Booking Rules</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Advance Booking (Days)</Label>
                    <Select defaultValue="30">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 Days</SelectItem>
                        <SelectItem value="14">14 Days</SelectItem>
                        <SelectItem value="30">30 Days</SelectItem>
                        <SelectItem value="60">60 Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Minimum Notice (Hours)</Label>
                    <Select defaultValue="2">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Hour</SelectItem>
                        <SelectItem value="2">2 Hours</SelectItem>
                        <SelectItem value="4">4 Hours</SelectItem>
                        <SelectItem value="24">24 Hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Appointment Settings</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Allow Online Booking</Label>
                      <p className="text-sm text-gray-600">Enable customers to book appointments online</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Require Deposit</Label>
                      <p className="text-sm text-gray-600">Request deposit for appointment confirmation</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto Confirmation</Label>
                      <p className="text-sm text-gray-600">Automatically confirm online bookings</p>
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
                Notification Preferences
              </CardTitle>
              <CardDescription>Configure how you receive notifications about appointments and business updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Email Notifications</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>New Appointments</Label>
                      <p className="text-sm text-gray-600">Get notified when customers book appointments</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Cancellations</Label>
                      <p className="text-sm text-gray-600">Get notified when appointments are cancelled</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Daily Summary</Label>
                      <p className="text-sm text-gray-600">Receive daily appointment summary</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">SMS Notifications</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Urgent Updates</Label>
                      <p className="text-sm text-gray-600">Important appointment changes via SMS</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Same-day Bookings</Label>
                      <p className="text-sm text-gray-600">SMS alerts for same-day appointments</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Customer Reminders</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Send Appointment Reminders</Label>
                      <p className="text-sm text-gray-600">Automatically remind customers of upcoming appointments</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label>Reminder Timing</Label>
                    <Select defaultValue="24">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 Hours Before</SelectItem>
                        <SelectItem value="24">24 Hours Before</SelectItem>
                        <SelectItem value="48">48 Hours Before</SelectItem>
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
                Brand Customization
              </CardTitle>
              <CardDescription>Customize the appearance of your booking system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Brand Colors</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>Primary Color</Label>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-600 rounded border"></div>
                      <Input defaultValue="#2563eb" className="flex-1" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Secondary Color</Label>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-purple-600 rounded border"></div>
                      <Input defaultValue="#9333ea" className="flex-1" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Accent Color</Label>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-green-600 rounded border"></div>
                      <Input defaultValue="#16a34a" className="flex-1" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Background</Label>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gray-50 rounded border"></div>
                      <Input defaultValue="#f9fafb" className="flex-1" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Logo & Images</h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Business Logo</Label>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Building className="h-8 w-8 text-gray-400" />
                      </div>
                      <Button variant="outline">Upload Logo</Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Hero Image</Label>
                    <div className="flex items-center space-x-4">
                      <div className="w-24 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Palette className="h-6 w-6 text-gray-400" />
                      </div>
                      <Button variant="outline">Upload Image</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">App Customization</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Dark Mode Support</Label>
                      <p className="text-sm text-gray-600">Allow customers to use dark theme</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Custom Welcome Message</Label>
                      <p className="text-sm text-gray-600">Show personalized message to customers</p>
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
