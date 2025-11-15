import { useState } from 'react'
import { X, MapPin, Phone, User, Home, Building, Mail } from 'lucide-react'
import { toast } from 'react-toastify'
import axios from '../utils/axios'

const CheckoutModal = ({ isOpen, onClose, cartItems, totalPrice, onOrderSuccess }) => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const orderData = {
        items: cartItems.map(item => ({
          sweetId: item._id,
          quantity: item.cartQuantity
        })),
        shippingAddress: formData
      }

      const response = await axios.post('/api/orders', orderData)
      toast.success('Order placed successfully! 🎉', { icon: '✅' })
      onOrderSuccess()
      onClose()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Order failed')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 sm:px-6 py-4 sm:py-5 flex justify-between items-center rounded-t-2xl sm:rounded-t-3xl">
          <div>
            <h2 className="text-xl sm:text-2xl font-black">Checkout</h2>
            <p className="text-xs sm:text-sm text-white/80">Enter shipping details</p>
          </div>
          <button onClick={onClose} className="p-1.5 sm:p-2 hover:bg-white/20 rounded-lg transition-colors">
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>

        {/* Order Summary */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 bg-purple-50 border-b">
          <div className="flex justify-between items-center">
            <span className="font-bold text-gray-700 text-sm sm:text-base">Total Items: {cartItems.length}</span>
            <span className="text-xl sm:text-2xl font-black gradient-text">₹{totalPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {/* Full Name */}
            <div className="sm:col-span-2">
              <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2 flex items-center gap-2">
                <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-500" />
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="input-field text-sm sm:text-base"
                placeholder="John Doe"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2 flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-500" />
                Phone *
              </label>
              <input
                type="tel"
                name="phone"
                required
                pattern="[0-9]{10}"
                value={formData.phone}
                onChange={handleChange}
                className="input-field text-sm sm:text-base"
                placeholder="9876543210"
              />
            </div>

            {/* Pincode */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2 flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-500" />
                Pincode *
              </label>
              <input
                type="text"
                name="pincode"
                required
                pattern="[0-9]{6}"
                value={formData.pincode}
                onChange={handleChange}
                className="input-field text-sm sm:text-base"
                placeholder="110001"
              />
            </div>

            {/* Address */}
            <div className="sm:col-span-2">
              <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2 flex items-center gap-2">
                <Home className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-500" />
                Full Address *
              </label>
              <textarea
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                className="input-field text-sm sm:text-base"
                rows="2"
                placeholder="House No., Street, Area"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2 flex items-center gap-2">
                <Building className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-500" />
                City *
              </label>
              <input
                type="text"
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
                className="input-field text-sm sm:text-base"
                placeholder="Mumbai"
              />
            </div>

            {/* State */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2 flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-500" />
                State *
              </label>
              <input
                type="text"
                name="state"
                required
                value={formData.state}
                onChange={handleChange}
                className="input-field text-sm sm:text-base"
                placeholder="Maharashtra"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-3 sm:pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1 text-sm sm:text-base py-2.5 sm:py-3"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1 text-sm sm:text-base py-2.5 sm:py-3"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-t-2 border-b-2 border-white"></div>
                  Processing...
                </span>
              ) : (
                'Place Order'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CheckoutModal
