import { Search, Filter, X, SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'

const SearchBar = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const categories = ['chocolate', 'candy', 'gummy', 'hard candy', 'lollipop', 'other']

  const handleSearch = () => {
    onSearch({
      name: searchTerm,
      category,
      minPrice,
      maxPrice
    })
  }

  const handleClear = () => {
    setSearchTerm('')
    setCategory('')
    setMinPrice('')
    setMaxPrice('')
    onFilter({})
  }

  return (
    <div className="card p-6 mb-8 animate-slide-up backdrop-blur-xl bg-white/90">
      <div className="flex gap-4 items-center flex-wrap">
        {/* Search Input */}
        <div className="flex-1 min-w-[250px] relative group">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400 group-focus-within:text-purple-600 transition-colors" />
          <input
            type="text"
            placeholder="Search for your favorite sweets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="input-field pl-12 font-medium"
          />
        </div>

        {/* Filter Toggle Button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`btn-secondary flex items-center space-x-2 ${showFilters ? 'bg-purple-50 border-purple-400' : ''}`}
        >
          <SlidersHorizontal className="h-5 w-5" />
          <span>Filters</span>
          {(category || minPrice || maxPrice) && (
            <span className="h-2 w-2 bg-purple-500 rounded-full animate-pulse"></span>
          )}
        </button>

        {/* Search Button */}
        <button 
          onClick={handleSearch} 
          className="btn-primary flex items-center space-x-2"
        >
          <Search className="h-5 w-5" />
          <span>Search</span>
        </button>
      </div>

      {/* Filters Section */}
      {showFilters && (
        <div className="mt-6 pt-6 border-t-2 border-purple-100 animate-slide-up">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Filter className="h-4 w-4 text-purple-500" />
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="input-field font-medium"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat} className="font-medium">
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Min Price Filter */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Min Price (₹)
              </label>
              <input
                type="number"
                placeholder="0.00"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="input-field font-medium"
                min="0"
                step="0.01"
              />
            </div>

            {/* Max Price Filter */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Max Price (₹)
              </label>
              <input
                type="number"
                placeholder="1000.00"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="input-field font-medium"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          {/* Clear Filters Button */}
          <div className="flex justify-end">
            <button
              onClick={handleClear}
              className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:text-red-700 font-semibold hover:bg-red-50 rounded-lg transition-all"
            >
              <X className="h-5 w-5" />
              <span>Clear All Filters</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchBar
