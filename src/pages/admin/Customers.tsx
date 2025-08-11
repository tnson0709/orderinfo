/**
 * Admin Customers - Customer management interface with profiles and history
 */
import { useState } from 'react'
import { Search, Plus, Phone, Mail, Calendar, User } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Badge } from '../../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'

export default function AdminCustomers() {
  const [searchTerm, setSearchTerm] = useState('')

  /** Sample customers data */
  const customers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
      joinDate: '2024-01-15',
      totalAppointments: 8,
      totalSpent: 680,
      lastVisit: '2024-07-25',
      status: 'active',
      avatar: 'https://pub-cdn.sider.ai/u/U07GH2W2594/web-coder/6891fe61964e57bb00419b3b/resource/34c03f65-1cf4-4cd3-843f-df2049cad17d.jpg'
    },
    {
      id: 2,
      name: 'Mike Chen',
      email: 'mike.chen@email.com',
      phone: '+1 (555) 234-5678',
      joinDate: '2024-02-08',
      totalAppointments: 12,
      totalSpent: 420,
      lastVisit: '2024-08-01',
      status: 'active',
      avatar: 'https://pub-cdn.sider.ai/u/U07GH2W2594/web-coder/6891fe61964e57bb00419b3b/resource/320f2709-ae21-4a7a-a39e-0e7f1c0a0d1b.jpg'
    },
    {
      id: 3,
      name: 'Emma Wilson',
      email: 'emma.wilson@email.com',
      phone: '+1 (555) 345-6789',
      joinDate: '2023-11-22',
      totalAppointments: 15,
      totalSpent: 1250,
      lastVisit: '2024-07-30',
      status: 'vip',
      avatar: 'https://pub-cdn.sider.ai/u/U07GH2W2594/web-coder/6891fe61964e57bb00419b3b/resource/69adc613-6010-4869-bf30-ab86e98dc5b5.jpg'
    },
    {
      id: 4,
      name: 'David Brown',
      email: 'david.brown@email.com',
      phone: '+1 (555) 456-7890',
      joinDate: '2024-03-10',
      totalAppointments: 3,
      totalSpent: 225,
      lastVisit: '2024-06-15',
      status: 'inactive',
      avatar: 'https://pub-cdn.sider.ai/u/U07GH2W2594/web-coder/6891fe61964e57bb00419b3b/resource/bd0ebc33-b479-4ecb-af70-3c0b22ce0fc4.jpg'
    }
  ]

  /** Filter customers based on search */
  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  )

  /** Get status badge variant */
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active': return 'default'
      case 'vip': return 'secondary'
      case 'inactive': return 'outline'
      default: return 'outline'
    }
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Khách hàng</h1>
          <p className="text-gray-600">Quản lý mối quan hệ và lịch sử khách hàng của bạn</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Thêm Khách hàng
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Tìm kiếm khách hàng theo tên, email hoặc số điện thoại..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">{customers.length}</div>
                <div className="text-sm text-gray-600">Tổng Khách hàng</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Badge variant="default" className="text-xs">Hoạt động</Badge>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {customers.filter(c => c.status === 'active').length}
                </div>
                <div className="text-sm text-gray-600">Khách hàng đang hoạt động</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="text-xs">VIP</Badge>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {customers.filter(c => c.status === 'vip').length}
                </div>
                <div className="text-sm text-gray-600">Khách hàng VIP</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">38</div>
                <div className="text-sm text-gray-600">Tổng số cuộc hẹn</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer List */}
      <div className="space-y-4">
        {filteredCustomers.map((customer) => (
          <Card key={customer.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <img
                    src={customer.avatar}
                    alt={customer.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{customer.name}</h3>
                      <Badge variant={getStatusVariant(customer.status)} className="capitalize">
                        {customer.status}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        {customer.email}
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                        {customer.phone}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-right space-y-1">
                  <div className="text-sm font-medium text-gray-900">
                    {customer.totalAppointments} cuộc hẹn
                  </div>
                  <div className="text-sm font-semibold text-green-600">
                    ${customer.totalSpent} tổng
                  </div>
                  <div className="text-xs text-gray-500">
                    Lần ghé thăm cuối cùng: {new Date(customer.lastVisit).toLocaleDateString()}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 mt-4 pt-4 border-t">
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4 mr-2" />
                  SĐT
                </Button>
                <Button variant="outline" size="sm">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Lịch trình
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
