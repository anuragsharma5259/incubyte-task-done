import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { Candy, LogOut, ShieldCheck, User, LayoutDashboard, ShoppingCart, Menu, X, Package } from 'lucide-react'
import { useState } from 'react'

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth()
  const { getTotalItems, setIsCartOpen } = useCart()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
    setMobileMenuOpen(false)
  }

  const totalItems = getTotalItems()

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 border-b border-purple-100 shadow-lg">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo - Extreme Left */}
          <Link to="/dashboard" className="flex items-center space-x-2 sm:space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl sm:rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-gradient-to-r from-pink-500 to-purple-600 p-2 sm:p-3 rounded-xl sm:rounded-2xl transform group-hover:scale-110 transition duration-300">
                <Candy className="h-5 w-5 sm:h-7 sm:w-7 text-white" />
              </div>
            </div>
            <span className="text-lg sm:text-2xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Sweet Shop
            </span>
          </Link>

          {/* Desktop Menu - Extreme Right */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-3 flex-shrink-0">
            {/* User Info */}
            {!isAdmin && (
              <div className="flex items-center space-x-2 bg-gradient-to-r from-pink-100 to-purple-100 px-3 lg:px-4 py-2 rounded-full border-2 border-purple-200">
                <User className="h-4 w-4 sm:h-5 sm:w-5 text-pink-600 flex-shrink-0" />
                <span className="font-bold text-gray-700 text-sm lg:text-base max-w-[80px] lg:max-w-[120px] truncate">{user?.name}</span>
              </div>
            )}

            {/* My Orders Button - Only for non-admin */}
            {!isAdmin && (
              <Link
                to="/my-orders"
                className="flex items-center space-x-2 px-3 lg:px-5 py-2 lg:py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <Package className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden lg:inline text-sm">My Orders</span>
              </Link>
            )}

            {/* Cart Button - Only for non-admin users */}
            {!isAdmin && (
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center space-x-2 px-3 lg:px-5 py-2 lg:py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden lg:inline text-sm">Cart</span>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-black rounded-full h-5 w-5 flex items-center justify-center animate-pulse border-2 border-white">
                    {totalItems}
                  </span>
                )}
              </button>
            )}

            {/* Admin Badge - Only for admin */}
            {isAdmin && (
              <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-indigo-100 px-4 py-2 rounded-full border-2 border-purple-300">
                <ShieldCheck className="h-5 w-5 text-purple-600 flex-shrink-0 animate-pulse" />
                <span className="font-bold text-gray-700 text-sm lg:text-base">Administrator</span>
              </div>
            )}

            {/* Admin Panel Button */}
            {isAdmin && (
              <Link
                to="/admin"
                className="flex items-center space-x-2 px-3 lg:px-5 py-2 lg:py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <LayoutDashboard className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-sm lg:text-base">Dashboard</span>
              </Link>
            )}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-3 lg:px-5 py-2 lg:py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-sm lg:text-base">Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors flex-shrink-0"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 animate-slide-up border-t border-purple-100">
            {/* User Info Mobile - Only for non-admin */}
            {!isAdmin && (
              <div className="flex items-center space-x-3 bg-gradient-to-r from-pink-100 to-purple-100 px-4 py-3 rounded-xl border-2 border-purple-200">
                <User className="h-5 w-5 text-pink-600" />
                <div className="flex-1">
                  <span className="font-bold text-gray-700 block">{user?.name}</span>
                  <span className="text-xs text-gray-500">{user?.email}</span>
                </div>
              </div>
            )}

            {/* Admin Badge Mobile */}
            {isAdmin && (
              <div className="flex items-center space-x-3 bg-gradient-to-r from-purple-100 to-indigo-100 px-4 py-3 rounded-xl border-2 border-purple-300">
                <ShieldCheck className="h-6 w-6 text-purple-600 animate-pulse" />
                <div className="flex-1">
                  <span className="font-bold text-gray-800 block">Administrator</span>
                  <span className="text-xs text-purple-600 font-semibold">{user?.email}</span>
                </div>
              </div>
            )}

            {/* My Orders Mobile - Only for non-admin */}
            {!isAdmin && (
              <Link
                to="/my-orders"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-bold shadow-lg"
              >
                <Package className="h-5 w-5" />
                <span>My Orders</span>
              </Link>
            )}

            {/* Cart Button Mobile - Only for non-admin users */}
            {!isAdmin && (
              <button
                onClick={() => {
                  setIsCartOpen(true)
                  setMobileMenuOpen(false)
                }}
                className="w-full relative flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold shadow-lg"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>View Cart</span>
                {totalItems > 0 && (
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-black rounded-full h-6 w-6 flex items-center justify-center animate-pulse border-2 border-white">
                    {totalItems}
                  </span>
                )}
              </button>
            )}

            {/* Admin Panel Mobile */}
            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-lg"
              >
                <LayoutDashboard className="h-5 w-5" />
                <span>Admin Dashboard</span>
              </Link>
            )}

            {/* Logout Mobile */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold shadow-lg"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
