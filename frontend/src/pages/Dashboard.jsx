import { useState, useEffect } from 'react'
import axios from '../utils/axios'
import Navbar from '../components/Navbar'
import SearchBar from '../components/SearchBar'
import SweetCard from '../components/SweetCard'
import CartSidebar from '../components/CartSidebar'
import { Candy, Package, TrendingUp, Heart } from 'lucide-react'

const Dashboard = () => {
  const [sweets, setSweets] = useState([])
  const [filteredSweets, setFilteredSweets] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchSweets = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/sweets')
      setSweets(response.data.data)
      setFilteredSweets(response.data.data)
    } catch (error) {
      console.error('Error fetching sweets:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSweets()
  }, [])

  const handleSearch = async (filters) => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (filters.name) params.append('name', filters.name)
      if (filters.category) params.append('category', filters.category)
      if (filters.minPrice) params.append('minPrice', filters.minPrice)
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice)

      const response = await axios.get(`/api/sweets/search?${params.toString()}`)
      setFilteredSweets(response.data.data)
    } catch (error) {
      console.error('Error searching sweets:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilter = (filters) => {
    if (Object.keys(filters).length === 0) {
      setFilteredSweets(sweets)
    }
  }

  // Calculate stats
  const totalSweets = filteredSweets.length
  const inStock = filteredSweets.filter(s => s.quantity > 0).length
  const lowStock = filteredSweets.filter(s => s.quantity > 0 && s.quantity < 10).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <Navbar />
      <CartSidebar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        {/* Hero Section */}
        <div className="text-center mb-6 sm:mb-10 lg:mb-12 animate-fade-in">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full blur-xl sm:blur-2xl opacity-30 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-pink-500 to-purple-600 p-3 sm:p-5 lg:p-6 rounded-full">
                <Candy className="h-8 w-8 sm:h-12 sm:w-12 lg:h-16 lg:w-16 text-white animate-bounce-slow" />
              </div>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black gradient-text mb-2 sm:mb-3 px-4">
            Welcome to Sweet Paradise!
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 font-semibold px-4">
            Discover delicious sweets and treats 🍬✨
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6 sm:mb-8 lg:mb-10">
          <SearchBar sweets={sweets} setFilteredSweets={setFilteredSweets} />
        </div>

        {/* Sweets Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-4 border-b-4 border-purple-500"></div>
          </div>
        ) : filteredSweets.length === 0 ? (
          <div className="card p-8 sm:p-12 text-center">
            <Candy className="h-16 w-16 sm:h-24 sm:w-24 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl sm:text-2xl font-bold text-gray-600 mb-2">No sweets found</h3>
            <p className="text-sm sm:text-base text-gray-500">Try adjusting your search filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {filteredSweets.map((sweet, index) => (
              <SweetCard key={sweet._id} sweet={sweet} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
