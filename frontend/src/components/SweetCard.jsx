import { ShoppingCart, Package, Candy, Star, Sparkles } from 'lucide-react'
import { toast } from 'react-toastify'
import axios from '../utils/axios'
import { useCart } from '../context/CartContext'

const SweetCard = ({ sweet, onPurchase }) => {
  const { addToCart } = useCart()

  const getCategoryColor = (category) => {
    const colors = {
      chocolate: 'from-amber-400 to-orange-500',
      candy: 'from-pink-400 to-rose-500',
      gummy: 'from-green-400 to-emerald-500',
      'hard candy': 'from-blue-400 to-cyan-500',
      lollipop: 'from-purple-400 to-fuchsia-500',
      other: 'from-gray-400 to-slate-500'
    }
    return colors[category] || colors.other
  }

  const getCategoryBadgeColor = (category) => {
    const colors = {
      chocolate: 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border-amber-200',
      candy: 'bg-gradient-to-r from-pink-100 to-rose-100 text-pink-800 border-pink-200',
      gummy: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200',
      'hard candy': 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200',
      lollipop: 'bg-gradient-to-r from-purple-100 to-fuchsia-100 text-purple-800 border-purple-200',
      other: 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200'
    }
    return colors[category] || colors.other
  }

  const handlePurchase = async () => {
    try {
      const response = await axios.post(`/api/sweets/${sweet._id}/purchase`, { quantity: 1 })
      toast.success(response.data.message, {
        icon: '🍬'
      })
      onPurchase()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Purchase failed')
    }
  }

  const handleAddToCart = () => {
    if (sweet.quantity === 0) {
      return
    }
    addToCart(sweet)
  }

  return (
    <div className="card card-hover group animate-fade-in">
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(sweet.category)} opacity-90`}>
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        </div>
        
        <div className="relative h-full flex items-center justify-center">
          <Candy className="h-28 w-28 text-white drop-shadow-2xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" />
          <Sparkles className="absolute top-4 right-4 h-6 w-6 text-yellow-300 animate-pulse" />
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className={`badge ${getCategoryBadgeColor(sweet.category)} border-2 backdrop-blur-sm shadow-lg`}>
            {sweet.category}
          </span>
        </div>

        {/* Stock Badge */}
        {sweet.quantity === 0 && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center transform -rotate-12">
              <span className="bg-red-500 text-white px-6 py-3 rounded-2xl font-black text-xl shadow-2xl inline-block animate-pulse">
                OUT OF STOCK
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-black text-gray-800 mb-2 group-hover:text-purple-600 transition-colors flex items-center gap-2">
          {sweet.name}
          {sweet.quantity > 0 && sweet.quantity < 10 && (
            <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-bold animate-pulse">
              Low Stock
            </span>
          )}
        </h3>
        
        {/* Description */}
        {sweet.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {sweet.description}
          </p>
        )}

        {/* Stock & Price */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b-2 border-gray-100">
          <div className="flex items-center space-x-2">
            <Package className={`h-5 w-5 ${sweet.quantity === 0 ? 'text-red-500' : 'text-green-500'}`} />
            <span className={`font-bold text-sm ${sweet.quantity === 0 ? 'text-red-500' : 'text-gray-700'}`}>
              {sweet.quantity} in stock
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className="text-xs text-gray-500 font-semibold">4.8</span>
          </div>
        </div>

        {/* Price & Button */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-gray-500 font-medium block">Price</span>
            <span className="text-3xl font-black gradient-text">
              ₹{sweet.price.toFixed(2)}
            </span>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={sweet.quantity === 0}
            className="btn-primary flex items-center space-x-2 px-6 py-3 shimmer"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SweetCard
