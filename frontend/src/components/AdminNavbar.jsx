import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Candy, LogOut, ShieldCheck, LayoutDashboard, Package, Crown } from 'lucide-react'

const AdminNavbar = () => {
  const { logout, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/admin-login')
  }

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-r from-purple-900 to-indigo-900 border-b border-purple-700 shadow-2xl">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 md:h-20">
          {/* Logo - Extreme Leftmost */}
          <Link to="/admin" className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3 group flex-shrink-0 min-w-0">
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg sm:rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-gradient-to-r from-purple-600 to-indigo-600 p-1.5 sm:p-2 md:p-3 rounded-lg sm:rounded-xl transform group-hover:scale-110 transition duration-300 border-2 border-purple-400/30">
                <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 md:h-7 md:w-7 text-white" />
              </div>
            </div>
            <div className="min-w-0">
              <span className="text-sm sm:text-lg md:text-xl lg:text-2xl font-black text-white flex items-center gap-1 sm:gap-2 whitespace-nowrap">
                <span className="hidden xs:inline">Admin</span>
                <span className="hidden sm:inline">Panel</span>
                <span className="xs:hidden">Admin</span>
                <Crown className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-yellow-400 animate-pulse flex-shrink-0" />
              </span>
              <span className="text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs text-purple-200 font-bold tracking-wider hidden sm:block truncate">
                MANAGEMENT
              </span>
            </div>
          </Link>

          {/* Desktop Menu - Extreme Rightmost */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3 flex-shrink-0">
            {/* Dashboard Link */}
            <Link
              to="/admin"
              className={`flex items-center space-x-1.5 lg:space-x-2 px-2.5 lg:px-4 xl:px-5 py-2 lg:py-2.5 rounded-lg lg:rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ${
                location.pathname === '/admin'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <LayoutDashboard className="h-4 w-4 lg:h-5 lg:w-5 flex-shrink-0" />
              <span className="text-xs lg:text-sm xl:text-base whitespace-nowrap">Dashboard</span>
            </Link>

            {/* Orders Link */}
            <Link
              to="/admin/orders"
              className={`flex items-center space-x-1.5 lg:space-x-2 px-2.5 lg:px-4 xl:px-5 py-2 lg:py-2.5 rounded-lg lg:rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ${
                location.pathname === '/admin/orders'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Package className="h-4 w-4 lg:h-5 lg:w-5 flex-shrink-0" />
              <span className="text-xs lg:text-sm xl:text-base whitespace-nowrap">Orders</span>
            </Link>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1.5 lg:space-x-2 px-2.5 lg:px-4 xl:px-5 py-2 lg:py-2.5 rounded-lg lg:rounded-xl bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <LogOut className="h-4 w-4 lg:h-5 lg:w-5 flex-shrink-0" />
              <span className="text-xs lg:text-sm xl:text-base whitespace-nowrap">Logout</span>
            </button>
          </div>

          {/* Mobile Menu - Tablet and below */}
          <div className="md:hidden flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <Link
              to="/admin"
              className={`p-1.5 sm:p-2 rounded-lg transition-colors ${
                location.pathname === '/admin'
                  ? 'bg-white/20 text-white'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <LayoutDashboard className="h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
            <Link
              to="/admin/orders"
              className={`p-1.5 sm:p-2 rounded-lg transition-colors ${
                location.pathname === '/admin/orders'
                  ? 'bg-white/20 text-white'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Package className="h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
            <button
              onClick={handleLogout}
              className="p-1.5 sm:p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
              <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default AdminNavbar
