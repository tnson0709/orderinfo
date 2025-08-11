/**
 * Admin Analytics - Business insights and performance metrics
 */
import { TrendingUp, Calendar, DollarSign, Users, Clock, Star } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'

export default function AdminAnalytics() {
  /** Sample analytics data */
  const revenueData = [
    { month: 'Jan', revenue: 4500, appointments: 45 },
    { month: 'Feb', revenue: 5200, appointments: 52 },
    { month: 'Mar', revenue: 4800, appointments: 48 },
    { month: 'Apr', revenue: 6100, appointments: 61 },
    { month: 'May', revenue: 5900, appointments: 59 },
    { month: 'Jun', revenue: 7200, appointments: 72 }
  ]

  const topServices = [
    { name: 'Hair Cut & Style', bookings: 28, revenue: 2380 },
    { name: 'Hair Color', bookings: 15, revenue: 1800 },
    { name: 'Massage Therapy', bookings: 12, revenue: 900 },
    { name: 'Beard Trim', bookings: 18, revenue: 630 }
  ]

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600">Track your business performance and insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Monthly Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">$7,200</div>
            <p className="text-xs text-green-600 mt-1">+22% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Appointments
            </CardTitle>
            <Calendar className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">72</div>
            <p className="text-xs text-green-600 mt-1">+18% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Avg. Service Time
            </CardTitle>
            <Clock className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">58min</div>
            <p className="text-xs text-red-600 mt-1">+3min from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Customer Rating
            </CardTitle>
            <Star className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">4.8</div>
            <p className="text-xs text-green-600 mt-1">+0.2 from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Monthly revenue and appointment count over time</CardDescription>
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
                        <p className="text-sm text-gray-600">{data.appointments} appointments</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-green-600">${data.revenue.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">${(data.revenue / data.appointments).toFixed(0)} avg</div>
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
              <CardTitle>Top Performing Services</CardTitle>
              <CardDescription>Most popular services by bookings and revenue</CardDescription>
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
                        <p className="text-sm text-gray-600">{service.bookings} bookings this month</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-green-600">${service.revenue.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">${(service.revenue / service.bookings).toFixed(0)} avg</div>
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
              <CardTitle>Customer Insights</CardTitle>
              <CardDescription>Customer behavior and retention metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="text-center p-6 border rounded-lg">
                    <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">248</div>
                    <div className="text-sm text-gray-600">Total Customers</div>
                  </div>
                  <div className="text-center p-6 border rounded-lg">
                    <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">68%</div>
                    <div className="text-sm text-gray-600">Return Rate</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="text-center p-6 border rounded-lg">
                    <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">2.9</div>
                    <div className="text-sm text-gray-600">Avg Visits/Customer</div>
                  </div>
                  <div className="text-center p-6 border rounded-lg">
                    <DollarSign className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">$182</div>
                    <div className="text-sm text-gray-600">Avg Customer Value</div>
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
