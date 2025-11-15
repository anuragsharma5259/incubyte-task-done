import { useState, useEffect } from 'react'
import { Package, MapPin, Phone, Calendar, TrendingUp, CheckCircle, Clock, Truck, XCircle } from 'lucide-react'
import axios from '../utils/axios'
import { toast } from 'react-toastify'
import Navbar from '../components/Navbar'

const MyOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/orders/my')
      setOrders(response.data.data)
    } catch (error) {
      toast.error('Failed to fetch orders')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const getStatusIcon = (status) => {
    const icons = {
      pending: <Clock className="h-6 w-6" />,
      processing: <TrendingUp className="h-6 w-6" />,
      shipped: <Truck className="h-6 w-6" />,
      delivered: <CheckCircle className="h-6 w-6" />,
      cancelled: <XCircle className="h-6 w-6" />
    }
    return icons[status] || icons.pending
  }

  const getStatusColor = (status) => {
    const colors = {
      pending: 'from-yellow-400 to-orange-500',
      processing: 'from-blue-400 to-blue-600',
      shipped: 'from-purple-400 to-purple-600',
      delivered: 'from-green-400 to-green-600',
      cancelled: 'from-red-400 to-red-600'
    }
    return colors[status] || colors.pending
  }

  const getStatusSteps = (currentStatus) => {
    const steps = [
      { name: 'Order Placed', status: 'pending', icon: <Package className="h-5 w-5" /> },
      { name: 'Processing', status: 'processing', icon: <TrendingUp className="h-5 w-5" /> },
      { name: 'Shipped', status: 'shipped', icon: <Truck className="h-5 w-5" /> },
      { name: 'Delivered', status: 'delivered', icon: <CheckCircle className="h-5 w-5" /> }
    ]

    const statusOrder = ['pending', 'processing', 'shipped', 'delivered']
    const currentIndex = statusOrder.indexOf(currentStatus)

    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex,
      active: index === currentIndex
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black gradient-text mb-2">My Orders</h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 font-semibold">Track and manage your orders</p>
        </div>

        {/* Orders List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-4 border-b-4 border-purple-500"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="card p-8 sm:p-12 text-center animate-slide-up">
            <Package className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl sm:text-2xl font-bold text-gray-600 mb-2">No Orders Yet</h3>
            <p className="text-sm sm:text-base text-gray-500 mb-6">Start shopping and your orders will appear here</p>
            <a href="/dashboard" className="btn-primary inline-flex items-center gap-2 text-sm sm:text-base">
              <Package className="h-4 w-4 sm:h-5 sm:w-5" />
              Start Shopping
            </a>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {orders.map((order, idx) => (
              <div key={order._id} className="card overflow-hidden hover:shadow-2xl transition-all duration-300 animate-slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                {/* Order Header */}
                <div className={`bg-gradient-to-r ${getStatusColor(order.status)} text-white p-4 sm:p-6`}>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
                    <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                      <div className="bg-white/20 backdrop-blur-sm p-2 sm:p-3 rounded-xl flex-shrink-0">
                        {getStatusIcon(order.status)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg sm:text-xl font-black truncate">Order #{order._id.slice(-8)}</h3>
                        <p className="text-xs sm:text-sm text-white/90 flex items-center gap-2 mt-1">
                          <Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                          <span className="truncate">{new Date(order.createdAt).toLocaleDateString('en-IN')}</span>
                        </p>
                      </div>
                    </div>
                    <div className="text-left sm:text-right w-full sm:w-auto">
                      <p className="text-xs sm:text-sm text-white/80">Total Amount</p>
                      <p className="text-2xl sm:text-3xl font-black">₹{order.totalAmount.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  {/* Order Status Timeline */}
                  <div className="mb-4 sm:mb-6">
                    <h4 className="font-bold text-gray-700 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                      <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
                      Order Status
                    </h4>
                    
                    {order.status === 'cancelled' ? (
                      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3 sm:p-4 text-center">
                        <XCircle className="h-10 w-10 sm:h-12 sm:w-12 text-red-500 mx-auto mb-2" />
                        <p className="text-lg sm:text-xl font-bold text-red-700">Order Cancelled</p>
                      </div>
                    ) : (
                      <div className="relative">
                        {/* Progress Bar - Responsive */}
                        <div className="flex items-center justify-between mb-6 sm:mb-8">
                          {getStatusSteps(order.status).map((step, index) => (
                            <div key={index} className="flex-1 relative">
                              {index < 3 && (
                                <div className={`absolute top-4 sm:top-6 left-1/2 w-full h-0.5 sm:h-1 ${
                                  step.completed ? 'bg-gradient-to-r from-purple-500 to-indigo-500' : 'bg-gray-200'
                                }`} style={{ zIndex: 0 }}></div>
                              )}
                              
                              <div className="relative z-10 flex flex-col items-center">
                                <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-1 sm:mb-2 transition-all duration-300 ${
                                  step.active 
                                    ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg scale-110' 
                                    : step.completed 
                                    ? 'bg-gradient-to-r from-green-400 to-green-600 text-white' 
                                    : 'bg-gray-200 text-gray-400'
                                }`}>
                                  <div className="scale-75 sm:scale-100">{step.icon}</div>
                                </div>
                                <p className={`text-[10px] sm:text-xs lg:text-sm font-bold text-center ${
                                  step.active ? 'text-purple-600' : step.completed ? 'text-green-600' : 'text-gray-400'
                                }`}>
                                  {step.name}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Current Status Message */}
                        <div className={`bg-gradient-to-r ${getStatusColor(order.status)} bg-opacity-10 border-2 rounded-xl p-3 sm:p-4`}>
                          <p className="text-center font-bold text-gray-700 text-xs sm:text-sm lg:text-base">
                            {order.status === 'pending' && '⏳ Your order has been placed'}
                            {order.status === 'processing' && '📦 Your order is being processed'}
                            {order.status === 'shipped' && '🚚 Your order is on the way!'}
                            {order.status === 'delivered' && '✅ Your order has been delivered'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Shipping Address */}
                  <div className="bg-purple-50 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                    <h4 className="font-bold text-gray-700 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                      <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
                      Delivery Address
                    </h4>
                    <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                      <p className="font-semibold text-gray-800">{order.shippingAddress.fullName}</p>
                      <p className="text-gray-600 flex items-center gap-2">
                        <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                        {order.shippingAddress.phone}
                      </p>
                      <p className="text-gray-600 break-words">
                        {order.shippingAddress.address}<br />
                        {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                      </p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div>
                    <h4 className="font-bold text-gray-700 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                      <Package className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
                      Items ({order.items.length})
                    </h4>
                    <div className="space-y-2 sm:space-y-3">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-white rounded-xl p-3 sm:p-4 border-2 border-gray-100 hover:border-purple-200 transition-colors gap-3">
                          <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-pink-200 to-purple-200 rounded-xl flex items-center justify-center flex-shrink-0">
                              <span className="text-2xl sm:text-3xl">🍬</span>
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-bold text-gray-800 text-sm sm:text-base truncate">{item.name}</p>
                              <p className="text-xs sm:text-sm text-gray-500">Qty: {item.quantity}</p>
                              <p className="text-xs sm:text-sm text-gray-600">₹{item.price} each</p>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-base sm:text-lg font-black gradient-text whitespace-nowrap">
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t-2 border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-base sm:text-lg font-bold text-gray-700">Total Paid</span>
                      <span className="text-2xl sm:text-3xl font-black gradient-text">
                        ₹{order.totalAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyOrders
