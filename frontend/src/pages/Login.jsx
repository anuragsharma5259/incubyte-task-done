import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Mail, Lock, Candy, Heart, Sparkles, ArrowLeft, Star } from 'lucide-react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const success = await login(email, password)
    setLoading(false)
    if (success) {
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-500 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 text-5xl sm:text-8xl animate-float opacity-80">🍬</div>
        <div className="absolute top-20 sm:top-40 right-10 sm:right-20 text-6xl sm:text-9xl animate-float opacity-70" style={{ animationDelay: '1s' }}>🍭</div>
        <div className="absolute bottom-20 sm:bottom-32 left-1/4 text-5xl sm:text-8xl animate-float opacity-90" style={{ animationDelay: '2s' }}>🍫</div>
        <div className="absolute bottom-10 sm:bottom-20 right-1/3 text-5xl sm:text-7xl animate-float opacity-75" style={{ animationDelay: '1.5s' }}>🍩</div>
        <div className="absolute top-1/3 right-5 sm:right-10 text-4xl sm:text-6xl animate-float opacity-85" style={{ animationDelay: '0.5s' }}>🧁</div>
        
        {/* Stars & Sparkles */}
        <Star className="absolute top-1/4 left-1/4 h-6 w-6 sm:h-8 sm:w-8 text-yellow-300 animate-pulse" />
        <Sparkles className="absolute bottom-1/3 right-1/4 h-6 w-6 sm:h-10 sm:w-10 text-pink-300 animate-pulse" />
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-white hover:text-yellow-200 mb-4 sm:mb-6 transition-colors font-bold backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full"
        >
          <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="text-sm sm:text-base">Back to Home</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 animate-fade-in">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-white rounded-full blur-2xl opacity-40 animate-pulse"></div>
              <div className="relative bg-white p-5 sm:p-6 rounded-full shadow-2xl">
                <Candy className="h-10 w-10 sm:h-14 sm:w-14 text-pink-500 animate-bounce-slow" />
              </div>
            </div>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white mb-2 sm:mb-3 drop-shadow-2xl flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            Welcome Back!
            <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-300 animate-pulse" />
          </h1>
          <p className="text-white text-base sm:text-lg font-bold drop-shadow-lg px-4">
            Sign in to continue your sweet journey
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 border-2 border-white/50 animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <div>
              <label className="block text-sm font-black text-gray-700 mb-2 flex items-center gap-2">
                <Mail className="h-4 w-4 text-purple-500" />
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 sm:py-3.5 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300 outline-none bg-white placeholder-gray-400 text-sm sm:text-base"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-black text-gray-700 mb-2 flex items-center gap-2">
                <Lock className="h-4 w-4 text-purple-500" />
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 sm:py-3.5 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300 outline-none bg-white placeholder-gray-400 text-sm sm:text-base"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-black text-base sm:text-lg px-6 py-3 sm:py-4 rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-white/30"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  <span>Signing in...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Heart className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span>Sign In</span>
                </span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 sm:mt-8 space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-600 font-bold">New to Sweet Shop?</span>
              </div>
            </div>

            <Link
              to="/register"
              className="block text-center w-full py-3 sm:py-4 bg-white border-2 border-purple-300 text-purple-600 font-black text-sm sm:text-base rounded-xl hover:bg-purple-50 hover:border-purple-400 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <span className="gradient-text">Create Your Account</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
