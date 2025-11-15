import { useState, useEffect } from 'react'
import { Package, Phone, MapPin, User, Calendar, DollarSign, TrendingUp } from 'lucide-react'
import axios from '../utils/axios'
import { toast } from 'react-toastify'
import AdminNavbar from '../components/AdminNavbar'

const AdminOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/orders')
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

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`/api/orders/${orderId}/status`, { status: newStatus })
      toast.success('Order status updated!')
      fetchOrders()
    } catch (error) {
      toast.error('Failed to update status')
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      processing: 'bg-blue-100 text-blue-800 border-blue-200',
      shipped: 'bg-purple-100 text-purple-800 border-purple-200',
      delivered: 'bg-green-100 text-green-800 border-green-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200'
    }
    return colors[status] || colors.pending
  }

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    revenue: orders.filter(o => o.status === 'delivered').reduce((sum, o) => sum + o.totalAmount, 0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
      <AdminNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black gradient-text mb-2">Orders Management</h1>
          <p className="text-gray-600 font-semibold">View and manage customer orders</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <Package className="h-8 w-8 mb-3" />
            <p className="text-3xl font-black">{stats.total}</p>
            <p className="text-sm text-white/80">Total Orders</p>
          </div>
          <div className="card p-6 bg-gradient-to-br from-yellow-500 to-orange-600 text-white">
            <TrendingUp className="h-8 w-8 mb-3" />
            <p className="text-3xl font-black">{stats.pending}</p>
            <p className="text-sm text-white/80">Pending</p>
          </div>
          <div className="card p-6 bg-gradient-to-br from-green-500 to-emerald-600 text-white">
            <Package className="h-8 w-8 mb-3" />
            <p className="text-3xl font-black">{stats.delivered}</p>
            <p className="text-sm text-white/80">Delivered</p>
          </div>
          <div className="card p-6 bg-gradient-to-br from-purple-500 to-pink-600 text-white">
            <DollarSign className="h-8 w-8 mb-3" />
            <p className="text-3xl font-black">₹{stats.revenue}</p>
            <p className="text-sm text-white/80">Revenue</p>
          </div>
        </div>

        {/* Orders List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="card p-12 text-center">
            <Package className="h-20 w-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No Orders Yet</h3>
            <p className="text-gray-500">Orders will appear here once customers place them</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="card p-6 hover:shadow-xl transition-shadow">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Order Info */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-black text-gray-800">Order #{order._id.slice(-8)}</h3>
                        <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(order.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <span className={`badge ${getStatusColor(order.status)} border-2 px-4 py-2 text-sm font-bold uppercase`}>
                        {order.status}
                      </span>
                    </div>

                    {/* Customer Details */}
                    <div className="bg-gray-50 rounded-xl p-4 mb-4">
                      <h4 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Customer Details
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="font-semibold text-gray-600">Name:</span>
                          <p className="text-gray-800">{order.shippingAddress.fullName}</p>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-600 flex items-center gap-1">
                            <Phone className="h-3 w-3" /> Phone:
                          </span>
                          <p className="text-gray-800">{order.shippingAddress.phone}</p>
                        </div>
                        <div className="md:col-span-2">
                          <span className="font-semibold text-gray-600 flex items-center gap-1">
                            <MapPin className="h-3 w-3" /> Address:
                          </span>
                          <p className="text-gray-800">
                            {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Items */}
                    <div>
                      <h4 className="font-bold text-gray-700 mb-2">Ordered Items</h4>
                      <div className="space-y-2">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center bg-white rounded-lg p-3 border">
                            <div>
                              <p className="font-semibold">{item.name}</p>
                              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                            </div>
                            <p className="font-bold text-purple-600">₹{(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="lg:w-64 space-y-4">
                    <div className="bg-purple-50 rounded-xl p-4 text-center">
                      <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                      <p className="text-3xl font-black gradient-text">₹{order.totalAmount.toFixed(2)}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Update Status</label>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none font-semibold"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
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

export default AdminOrders
