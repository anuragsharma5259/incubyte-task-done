import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Mail, Lock, ShieldCheck, Eye, EyeOff, ArrowLeft } from 'lucide-react'
import { toast } from 'react-toastify'

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    const success = await login(formData.email, formData.password)
    
    if (success) {
      const user = JSON.parse(localStorage.getItem('user'))
      if (user.role === 'admin') {
        toast.success('Admin login successful! 👑', { icon: '🔐' })
        navigate('/admin')
      } else {
        toast.error('Access denied. Admin privileges required.')
        navigate('/dashboard')
      }
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-semibold">Back to Home</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-purple-600 to-indigo-600 p-6 rounded-full border-4 border-purple-400/30">
                <ShieldCheck className="h-16 w-16 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
            Admin Portal
          </h1>
          <p className="text-purple-200 font-medium text-lg">
            Secure administrative access
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-white mb-2 flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Admin Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-4 rounded-xl bg-white/10 border-2 border-white/20 focus:border-purple-400 focus:ring-4 focus:ring-purple-500/30 transition-all duration-300 outline-none text-white placeholder-white/50 backdrop-blur-sm"
                placeholder="admin@sweetshop.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold text-white mb-2 flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-4 rounded-xl bg-white/10 border-2 border-white/20 focus:border-purple-400 focus:ring-4 focus:ring-purple-500/30 transition-all duration-300 outline-none text-white placeholder-white/50 backdrop-blur-sm pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
                  <span>Authenticating...</span>
                </div>
              ) : (
                <span className="flex items-center justify-center gap-3">
                  <ShieldCheck className="h-6 w-6" />
                  Access Admin Panel
                </span>
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-white/70 text-sm">
              Regular user?{' '}
              <Link
                to="/login"
                className="font-bold text-purple-300 hover:text-purple-200 transition-colors"
              >
                User Login
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AdminLogin
