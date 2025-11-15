import { useState, useEffect } from 'react'
import axios from '../utils/axios'
import { toast } from 'react-toastify'
import AdminNavbar from '../components/AdminNavbar'
import { Plus, Edit2, Trash2, Package, X, TrendingUp, DollarSign, ShoppingBag, AlertCircle, Search } from 'lucide-react'
import ConfirmModal from '../components/ConfirmModal'

const AdminPanel = () => {
  const [sweets, setSweets] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [currentSweet, setCurrentSweet] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    category: 'chocolate',
    price: '',
    quantity: '',
    description: ''
  })

  // Confirmation Modal State
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  
  const categories = ['chocolate', 'candy', 'gummy', 'hard candy', 'lollipop', 'other']

  const fetchSweets = async () => {
    try {
      const response = await axios.get('/api/sweets')
      setSweets(response.data.data)
    } catch (error) {
      toast.error('Failed to fetch sweets')
    }
  }

  useEffect(() => {
    fetchSweets()
  }, [])

  // Calculate statistics
  const stats = {
    totalSweets: sweets.length,
    inStock: sweets.filter(s => s.quantity > 0).length,
    outOfStock: sweets.filter(s => s.quantity === 0).length,
    totalValue: sweets.reduce((sum, s) => sum + (s.price * s.quantity), 0),
    lowStock: sweets.filter(s => s.quantity > 0 && s.quantity < 10).length
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'chocolate',
      price: '',
      quantity: '',
      description: ''
    })
    setEditMode(false)
    setCurrentSweet(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editMode) {
        await axios.put(`/api/sweets/${currentSweet._id}`, formData)
        toast.success('Sweet updated successfully! 🎉')
      } else {
        // Add new sweet
        await axios.post('/api/sweets', {
          name: formData.name,
          category: formData.category,
          price: Number(formData.price),
          quantity: Number(formData.quantity),
          description: formData.description
        })
        toast.success('Sweet added successfully! 🍬')
      }
      setShowModal(false)
      resetForm()
      fetchSweets()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed')
    }
  }

  const handleEdit = (sweet) => {
    setCurrentSweet(sweet)
    setFormData({
      name: sweet.name,
      category: sweet.category,
      price: sweet.price,
      quantity: sweet.quantity,
      description: sweet.description || ''
    })
    setEditMode(true)
    setShowModal(true)
  }

  const handleDeleteClick = (sweet) => {
    setDeleteTarget(sweet)
    setShowConfirmModal(true)
  }

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return

    try {
      const toastId = toast.loading(`Deleting ${deleteTarget.name}...`)
      
      await axios.delete(`/api/sweets/${deleteTarget._id}`)
      
      toast.update(toastId, {
        render: `${deleteTarget.name} deleted successfully! 🗑️`,
        type: 'success',
        isLoading: false,
        autoClose: 3000,
        closeButton: true
      })
      
      fetchSweets()
      setDeleteTarget(null)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete sweet', {
        icon: '❌'
      })
    }
  }

  const handleRestock = async (id) => {
    const quantity = prompt('Enter quantity to add:')
    if (quantity && !isNaN(quantity) && parseInt(quantity) > 0) {
      try {
        await axios.post(`/api/sweets/${id}/restock`, { quantity: parseInt(quantity) })
        toast.success('Sweet restocked successfully! 📦')
        fetchSweets()
      } catch (error) {
        toast.error(error.response?.data?.message || 'Restock failed')
      }
    }
  }

  const filteredSweets = sweets.filter(sweet =>
    sweet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sweet.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
      <AdminNavbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Statistics Dashboard */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <div className="card p-4 sm:p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white transform hover:scale-105 transition-all animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 font-semibold mb-1 text-xs sm:text-sm">Total Products</p>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-black">{stats.totalSweets}</p>
              </div>
              <ShoppingBag className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-white/30" />
            </div>
          </div>

          <div className="card p-4 sm:p-6 bg-gradient-to-br from-green-500 to-emerald-600 text-white transform hover:scale-105 transition-all animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 font-semibold mb-1 text-xs sm:text-sm">In Stock</p>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-black">{stats.inStock}</p>
              </div>
              <Package className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-white/30" />
            </div>
          </div>

          <div className="card p-4 sm:p-6 bg-gradient-to-br from-red-500 to-pink-600 text-white transform hover:scale-105 transition-all animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 font-semibold mb-1 text-xs sm:text-sm">Out of Stock</p>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-black">{stats.outOfStock}</p>
              </div>
              <AlertCircle className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-white/30" />
            </div>
          </div>

          <div className="card p-4 sm:p-6 bg-gradient-to-br from-orange-500 to-amber-600 text-white transform hover:scale-105 transition-all animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 font-semibold mb-1 text-xs sm:text-sm">Low Stock</p>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-black">{stats.lowStock}</p>
              </div>
              <TrendingUp className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-white/30" />
            </div>
          </div>

          <div className="card p-4 sm:p-6 bg-gradient-to-br from-purple-500 to-indigo-600 text-white transform hover:scale-105 transition-all animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 font-semibold mb-1 text-xs sm:text-sm">Total Value</p>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-black">₹{stats.totalValue.toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-white/30" />
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8 animate-slide-up">
          <div className="relative flex-1 max-w-full sm:max-w-md">
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search sweets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10 sm:pl-12 w-full text-sm sm:text-base"
            />
          </div>
          <button
            onClick={() => {
              resetForm()
              setShowModal(true)
            }}
            className="btn-primary flex items-center justify-center gap-2 text-base sm:text-lg px-6 sm:px-8 py-3 w-full sm:w-auto"
          >
            <Plus className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="hidden sm:inline">Add New Sweet</span>
            <span className="sm:hidden">Add Sweet</span>
          </button>
        </div>

        {/* Sweets Table */}
        <div className="card overflow-hidden animate-slide-up">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-bold">Product</th>
                  <th className="px-6 py-4 text-left font-bold">Category</th>
                  <th className="px-6 py-4 text-left font-bold">Price</th>
                  <th className="px-6 py-4 text-left font-bold">Stock</th>
                  <th className="px-6 py-4 text-left font-bold">Status</th>
                  <th className="px-6 py-4 text-left font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredSweets.map((sweet, index) => (
                  <tr key={sweet._id} className="hover:bg-purple-50 transition-colors" style={{ animationDelay: `${index * 0.05}s` }}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-pink-200 to-purple-200 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">🍬</span>
                        </div>
                        <div>
                          <p className="font-bold text-gray-800">{sweet.name}</p>
                          {sweet.description && (
                            <p className="text-xs text-gray-500 truncate max-w-xs">{sweet.description}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="badge bg-purple-100 text-purple-800 border border-purple-200">
                        {sweet.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-lg font-black text-green-600">
                        ₹{sweet.price.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-lg font-bold ${sweet.quantity === 0 ? 'text-red-500' : sweet.quantity < 10 ? 'text-orange-500' : 'text-gray-700'}`}>
                        {sweet.quantity}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {sweet.quantity === 0 ? (
                        <span className="badge bg-red-100 text-red-700 border border-red-200">
                          Out of Stock
                        </span>
                      ) : sweet.quantity < 10 ? (
                        <span className="badge bg-orange-100 text-orange-700 border border-orange-200">
                          Low Stock
                        </span>
                      ) : (
                        <span className="badge bg-green-100 text-green-700 border border-green-200">
                          In Stock
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleRestock(sweet._id)}
                          className="p-2.5 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-all transform hover:scale-110"
                          title="Restock"
                        >
                          <Package className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleEdit(sweet)}
                          className="p-2.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-all transform hover:scale-110"
                          title="Edit"
                        >
                          <Edit2 className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(sweet)}
                          className="p-2.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all transform hover:scale-110"
                          title="Delete"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-6 flex justify-between items-center rounded-t-3xl">
              <h2 className="text-3xl font-black">
                {editMode ? 'Edit Sweet' : 'Add New Sweet'}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false)
                  resetForm()
                }}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Sweet Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="e.g., Chocolate Bar"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    required
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="0.00"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    required
                    min="0"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="0"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="input-field"
                    rows="3"
                    placeholder="Optional description..."
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false)
                    resetForm()
                  }}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary flex-1">
                  {editMode ? 'Update Sweet' : 'Add Sweet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => {
          setShowConfirmModal(false)
          setDeleteTarget(null)
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Sweet"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone and will permanently remove this sweet from your inventory.`}
        confirmText="Yes, Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  )
}

export default AdminPanel
