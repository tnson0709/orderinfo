/**
 * User App services page component
 * Display all available services with categories, search, and filtering
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
    { id: 'hair', name: 'Hair Services', count: 8 },
    { id: 'facial', name: 'Facial Treatments', count: 6 },
    { id: 'massage', name: 'Massage Therapy', count: 4 },
    { id: 'nails', name: 'Nail Care', count: 5 },
    { id: 'body', name: 'Body Treatments', count: 3 }
  ]

  const priceRanges = [
    { id: 'under-50', label: 'Under $50', count: 12 },
    { id: '50-100', label: '$50 - $100', count: 8 },
    { id: '100-150', label: '$100 - $150', count: 5 },
    { id: 'over-150', label: 'Over $150', count: 3 }
  ]

  const services = [
    {
      id: 1,
      name: 'Classic Hair Cut',
      category: 'hair',
      price: 45,
      duration: 60,
      rating: 4.8,
      reviews: 124,
      description: 'Professional hair cutting and styling',
      image: 'https://pub-cdn.sider.ai/u/U07GH2W2594/web-coder/6891fe61964e57bb00419b3b/resource/5eaa15c2-b33f-4790-995a-1d0cae6ecf8d.jpg',
      popular: true
    },
    {
      id: 2,
      name: 'Deep Cleansing Facial',
      category: 'facial',
      price: 80,
      duration: 90,
      rating: 4.9,
      reviews: 89,
      description: 'Intensive facial treatment for deep cleansing',
      image: 'https://pub-cdn.sider.ai/u/U07GH2W2594/web-coder/6891fe61964e57bb00419b3b/resource/281e1493-f677-4bdb-9e5e-2434d65ee05a.jpg'
    },
    {
      id: 3,
      name: 'Relaxation Massage',
      category: 'massage',
      price: 120,
      duration: 60,
      rating: 4.7,
      reviews: 156,
      description: 'Full body relaxation massage therapy',
      image: 'https://pub-cdn.sider.ai/u/U07GH2W2594/web-coder/6891fe61964e57bb00419b3b/resource/6f210efb-f988-4ac9-a902-206b7eb51c72.jpg'
    },
    {
      id: 4,
      name: 'Gel Manicure',
      category: 'nails',
      price: 35,
      duration: 45,
      rating: 4.6,
      reviews: 92,
      description: 'Long-lasting gel manicure service',
      image: 'https://pub-cdn.sider.ai/u/U07GH2W2594/web-coder/6891fe61964e57bb00419b3b/resource/d877bfbc-2583-4b8b-865a-ce1bc94c05d1.jpg'
    },
    {
      id: 5,
      name: 'Hair Color & Highlights',
      category: 'hair',
      price: 150,
      duration: 180,
      rating: 4.9,
      reviews: 67,
      description: 'Professional hair coloring and highlighting',
      image: 'https://pub-cdn.sider.ai/u/U07GH2W2594/web-coder/6891fe61964e57bb00419b3b/resource/f13fec59-da2a-4378-bf58-a2015bd404bd.jpg',
      popular: true
    },
    {
      id: 6,
      name: 'Anti-Aging Facial',
      category: 'facial',
      price: 110,
      duration: 75,
      rating: 4.8,
      reviews: 43,
      description: 'Advanced anti-aging facial treatment',
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
        case 'under-50': return service.price < 50
        case '50-100': return service.price >= 50 && service.price <= 100
        case '100-150': return service.price >= 100 && service.price <= 150
        case 'over-150': return service.price > 150
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
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-gray-900">Services</h1>
            <Badge variant="secondary">{filteredServices.length} available</Badge>
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle>Filter Services</SheetTitle>
              </SheetHeader>
              
              <div className="space-y-6 mt-6">
                {/* Categories */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
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
                  <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
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
                  Clear All Filters
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
                            Popular
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
                          <span>{service.duration} min</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="font-bold text-lg text-gray-900">${service.price}</p>
                    </div>
                  </div>
                  <Link to={`/user/booking/${service.id}`}>
                    <Button size="sm" className="w-full">
                      Book Now
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
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No services found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
          <Button onClick={clearFilters} variant="outline">
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}
