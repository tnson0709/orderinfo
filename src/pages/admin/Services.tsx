/**
 * Admin Services - Service management interface with CRUD operations
 */
import { useState } from 'react'
import { Plus, Search, Edit, Trash2, Clock, DollarSign } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Badge } from '../../components/ui/badge'

export default function AdminServices() {
  const [searchTerm, setSearchTerm] = useState('')

  /** Sample services data */
  const services = [
    {
      id: 1,
      name: 'Hair Cut & Style',
      description: 'Professional haircut with styling and finish',
      duration: 60,
      price: 85,
      category: 'Hair Services',
      active: true,
      image: 'https://pub-cdn.sider.ai/u/U07GH2W2594/web-coder/6891fe61964e57bb00419b3b/resource/5392ffa5-99b5-4ace-997b-eb8771e3b7b1.jpg'
    },
    {
      id: 2,
      name: 'Beard Trim',
      description: 'Precision beard trimming and shaping',
      duration: 30,
      price: 35,
      category: 'Grooming',
      active: true,
      image: 'https://pub-cdn.sider.ai/u/U07GH2W2594/web-coder/6891fe61964e57bb00419b3b/resource/9f57e1bb-ce9d-45f1-a535-94ab20f9188b.jpg'
    },
    {
      id: 3,
      name: 'Hair Color',
      description: 'Professional hair coloring and highlights',
      duration: 90,
      price: 120,
      category: 'Hair Services',
      active: true,
      image: 'https://pub-cdn.sider.ai/u/U07GH2W2594/web-coder/6891fe61964e57bb00419b3b/resource/d501c723-13cb-468d-b411-c0f67db3e855.jpg'
    },
    {
      id: 4,
      name: 'Massage Therapy',
      description: 'Relaxing full-body massage therapy',
      duration: 45,
      price: 75,
      category: 'Wellness',
      active: true,
      image: 'https://pub-cdn.sider.ai/u/U07GH2W2594/web-coder/6891fe61964e57bb00419b3b/resource/5efa2472-a9d2-4a1e-a924-0a2f97951d80.jpg'
    },
    {
      id: 5,
      name: 'Facial Treatment',
      description: 'Deep cleansing and moisturizing facial',
      duration: 75,
      price: 95,
      category: 'Skincare',
      active: false,
      image: 'https://pub-cdn.sider.ai/u/U07GH2W2594/web-coder/6891fe61964e57bb00419b3b/resource/749a9cca-49fc-45fa-8f71-b606d63d3611.jpg'
    }
  ]

  /** Filter services based on search */
  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dịch vụ</h1>
          <p className="text-gray-600">Quản lý dịch vụ và giá cả của bạn</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Thêm Dịch vụ
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Tìm kiếm Dịch vụ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Card key={service.id} className="hover:shadow-md transition-shadow">
            <div className="aspect-video relative overflow-hidden rounded-t-lg">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                <Badge variant={service.active ? 'default' : 'secondary'}>
                  {service.active ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            </div>
            
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  <CardDescription className="text-sm text-blue-600 font-medium">
                    {service.category}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 line-clamp-2">
                {service.description}
              </p>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  {service.duration} phút
                </div>
                <div className="flex items-center font-semibold text-green-600">
                  <DollarSign className="h-4 w-4 mr-1" />
                  {service.price}
                </div>
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-4 w-4 mr-2" />
                  Sửa
                </Button>
                <Button variant="outline" size="sm" className="px-3">
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Service Categories Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Danh mục dịch vụ</CardTitle>
          <CardDescription>Tổng quan về các dịch vụ của bạn theo danh mục</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {['Hair Services', 'Grooming', 'Wellness', 'Skincare'].map((category) => {
              const categoryServices = services.filter(s => s.category === category)
              const activeCount = categoryServices.filter(s => s.active).length
              
              return (
                <div key={category} className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{activeCount}</div>
                  <div className="text-sm text-gray-600">{category}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {categoryServices.length} tổng
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
