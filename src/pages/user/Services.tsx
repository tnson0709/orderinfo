/**
 * Trang dịch vụ ứng dụng Người dùng
 * Hiển thị tất cả dịch vụ với danh mục, tìm kiếm và lọc
 */
import { useState } from 'react'
import { Link } from 'react-router'
import { Search, Star, Clock, Filter } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Input } from '../../components/ui/input'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../../components/ui/sheet'
import { Checkbox } from '../../components/ui/checkbox'

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<string[]>([])

  const categories = [
    { id: 'hair', name: 'Dịch vụ tóc', count: 8 },
    { id: 'facial', name: 'Chăm sóc da mặt', count: 6 },
    { id: 'massage', name: 'Massage trị liệu', count: 4 },
    { id: 'nails', name: 'Chăm sóc móng', count: 5 },
    { id: 'body', name: 'Chăm sóc cơ thể', count: 3 }
  ]

  const priceRanges = [
    { id: 'under-50', label: 'Dưới 50.000₫', count: 12 },
    { id: '50-100', label: '50.000₫ - 100.000₫', count: 8 },
    { id: '100-150', label: '100.000₫ - 150.000₫', count: 5 },
    { id: 'over-150', label: 'Trên 150.000₫', count: 3 }
  ]

  const services = [
    {
      id: 1,
      name: 'Cắt tóc cơ bản',
      category: 'hair',
      price: 45000,
      duration: 60,
      rating: 4.8,
      reviews: 124,
      description: 'Cắt tóc chuyên nghiệp và tạo kiểu',
      image: 'https://pub-cdn.sider.ai/u/U07GH2W2594/web-coder/6891fe61964e57bb00419b3b/resource/5eaa15c2-b33f-4790-995a-1d0cae6ecf8d.jpg',
      popular: true
    },
    {
      id: 2,
      name: 'Chăm sóc da mặt sâu',
      category: 'facial',
      price: 80000,
      duration: 90,
      rating: 4.9,
      reviews: 89,
      description: 'Liệu trình chăm sóc da mặt chuyên sâu',
      image: 'https://pub-cdn.sider.ai/u/U07GH2W2594/web-coder/6891fe61964e57bb00419b3b/resource/281e1493-f677-4bdb-9e5e-2434d65ee05a.jpg'
    },
    {
      id: 3,
      name: 'Massage thư giãn',
      category: 'massage',
      price: 120000,
      duration: 60,
      rating: 4.7,
      reviews: 156,
      description: 'Liệu trình massage toàn thân thư giãn',
      image: 'https://pub-cdn.sider.ai/u/U07GH2W2594/web-coder/6891fe61964e57bb00419b3b/resource/6f210efb-f988-4ac9-a902-206b7eb51c72.jpg'
    },
    {
      id: 4,
      name: 'Sơn gel móng tay',
      category: 'nails',
      price: 35000,
      duration: 45,
      rating: 4.6,
      reviews: 92,
      description: 'Dịch vụ sơn gel móng tay bền đẹp',
      image: 'https://pub-cdn.sider.ai/u/U07GH2W2594/web-coder/6891fe61964e57bb00419b3b/resource/d877bfbc-2583-4b8b-865a-ce1bc94c05d1.jpg'
    },
    {
      id: 5,
      name: 'Nhuộm & tạo highlight tóc',
      category: 'hair',
      price: 150000,
      duration: 180,
      rating: 4.9,
      reviews: 67,
      description: 'Nhuộm tóc chuyên nghiệp và tạo highlight',
      image: 'https://pub-cdn.sider.ai/u/U07GH2W2594/web-coder/6891fe61964e57bb00419b3b/resource/f13fec59-da2a-4378-bf58-a2015bd404bd.jpg',
      popular: true
    },
    {
      id: 6,
      name: 'Chăm sóc da chống lão hóa',
      category: 'facial',
      price: 110000,
      duration: 75,
      rating: 4.8,
      reviews: 43,
      description: 'Liệu trình chăm sóc da mặt chống lão hóa',
      image: 'https://pub-cdn.sider.ai/u/U07GH2W2594/web-coder/6891fe61964e57bb00419b3b/resource/773952fb-6c95-476b-ad65-b7b618444c5a.jpg'
    }
  ]

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = selectedCategories.length === 0 || 
                           selectedCategories.includes(service.category)
    
    const matchesPrice = priceRange.length === 0 || priceRange.some(range => {
      switch (range) {
        case 'under-50': return service.price < 50000
        case '50-100': return service.price >= 50000 && service.price <= 100000
        case '100-150': return service.price >= 100000 && service.price <= 150000
        case 'over-150': return service.price > 150000
        default: return true
      }
    })
    
    return matchesSearch && matchesCategory && matchesPrice
  })

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId])
    } else {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId))
    }
  }

  const handlePriceRangeChange = (rangeId: string, checked: boolean) => {
    if (checked) {
      setPriceRange([...priceRange, rangeId])
    } else {
      setPriceRange(priceRange.filter(id => id !== rangeId))
    }
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setPriceRange([])
    setSearchQuery('')
  }

  return (
    <div className="space-y-4 p-4">
      {/* Search and Filter Header */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Tìm kiếm dịch vụ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-gray-900">Dịch vụ</h1>
            <Badge variant="secondary">{filteredServices.length} dịch vụ</Badge>
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Bộ lọc
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle>Lọc dịch vụ</SheetTitle>
              </SheetHeader>
              
              <div className="space-y-6 mt-6">
                {/* Categories */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Danh mục</h3>
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={category.id}
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={(checked) => 
                            handleCategoryChange(category.id, checked as boolean)
                          }
                        />
                        <label
                          htmlFor={category.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1"
                        >
                          {category.name}
                        </label>
                        <span className="text-xs text-gray-500">({category.count})</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Khoảng giá</h3>
                  <div className="space-y-3">
                    {priceRanges.map((range) => (
                      <div key={range.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={range.id}
                          checked={priceRange.includes(range.id)}
                          onCheckedChange={(checked) => 
                            handlePriceRangeChange(range.id, checked as boolean)
                          }
                        />
                        <label
                          htmlFor={range.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1"
                        >
                          {range.label}
                        </label>
                        <span className="text-xs text-gray-500">({range.count})</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button onClick={clearFilters} variant="outline" className="w-full">
                  Xóa tất cả bộ lọc
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Services Grid */}
      <div className="space-y-4">
        {filteredServices.map((service) => (
          <Card key={service.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="flex">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-28 h-28 object-cover"
                />
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-1">
                        {service.name}
                        {service.popular && (
                          <Badge className="bg-orange-100 text-orange-700 text-xs">
                            Phổ biến
                          </Badge>
                        )}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span>{service.rating}</span>
                          <span>({service.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{service.duration} phút</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="font-bold text-lg text-gray-900">{service.price.toLocaleString()}₫</p>
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

      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Không tìm thấy dịch vụ</h3>
          <p className="text-gray-500 mb-4">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
          <Button onClick={clearFilters} variant="outline">
            Xóa bộ lọc
          </Button>
        </div>
      )}
    </div>
  )
}
