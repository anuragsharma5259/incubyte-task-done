import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Mail, Lock, User, Candy, Heart, Sparkles, ArrowLeft, Star } from 'lucide-react'
import { toast } from 'react-toastify'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setLoading(true)
    const success = await register(formData.name, formData.email, formData.password, 'user')
    setLoading(false)
    
    if (success) {
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-500 flex items-center justify-center">
      {/* Animated Candy Background */}
      <div className={`absolute inset-0 overflow-hidden pointer-events-none transition-all duration-500 ${isFocused ? 'blur-md opacity-40' : 'blur-0 opacity-100'}`}>
        {/* Floating candies - adjusted for all screen sizes */}
        <div className="absolute top-5 sm:top-10 left-5 sm:left-10 text-5xl sm:text-8xl animate-float opacity-80">🍬</div>
        <div className="absolute top-10 sm:top-20 right-10 sm:right-20 text-6xl sm:text-9xl animate-float opacity-70" style={{ animationDelay: '1s' }}>🍭</div>
        <div className="absolute bottom-20 sm:bottom-32 left-1/4 text-4xl sm:text-7xl animate-float opacity-90" style={{ animationDelay: '2s' }}>🍫</div>
        <div className="absolute bottom-24 sm:bottom-40 right-1/3 text-5xl sm:text-8xl animate-float opacity-75" style={{ animationDelay: '1.5s' }}>🍩</div>
        <div className="absolute top-1/3 right-5 sm:right-10 text-4xl sm:text-6xl animate-float opacity-85" style={{ animationDelay: '0.5s' }}>🧁</div>
        <div className="absolute top-1/2 left-10 sm:left-20 text-4xl sm:text-7xl animate-float opacity-80" style={{ animationDelay: '2.5s' }}>🍪</div>
        <div className="absolute bottom-10 sm:bottom-20 left-1/2 text-4xl sm:text-6xl animate-float opacity-70" style={{ animationDelay: '3s' }}>🎂</div>
        
        {/* Sparkle effects */}
        <div className="absolute top-1/4 left-1/3">
          <Star className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-300 animate-pulse" />
        </div>
        <div className="absolute top-2/3 right-1/4">
          <Sparkles className="h-8 w-8 sm:h-10 sm:w-10 text-pink-300 animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="absolute bottom-1/4 left-1/4">
          <Heart className="h-8 w-8 sm:h-12 sm:w-12 text-red-300 animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        
        {/* Colorful bubbles */}
        <div className="absolute top-1/4 right-1/3 w-20 h-20 sm:w-32 sm:h-32 bg-pink-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-24 h-24 sm:w-40 sm:h-40 bg-purple-300 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 sm:w-24 sm:h-24 bg-yellow-300 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="w-full max-w-lg mx-auto px-4 py-2 relative z-10">
        {/* Back Button */}
        <Link 
          to="/" 
          className={`inline-flex items-center gap-2 text-white hover:text-yellow-200 mb-2 transition-all duration-500 font-bold backdrop-blur-sm bg-white/10 px-3 py-1.5 rounded-full text-xs sm:text-sm ${isFocused ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Link>

        {/* Header - More Compact */}
        <div className={`text-center mb-2 sm:mb-3 animate-fade-in transition-all duration-500 ${isFocused ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'}`}>
          <div className="flex justify-center mb-2">
            <div className="relative">
              {/* Glowing effect */}
              <div className="absolute inset-0 bg-white rounded-full blur-lg opacity-30 animate-pulse"></div>
              
              {/* Center candy only */}
              <div className="relative bg-white p-2 sm:p-3 rounded-full shadow-2xl">
                <Candy className="h-5 w-5 sm:h-8 sm:w-8 text-pink-500 animate-bounce-slow" />
              </div>
            </div>
          </div>

          <h1 className="text-xl sm:text-3xl font-black text-white mb-1 drop-shadow-2xl">
            <span className="whitespace-nowrap">Join Sweet Shop!</span>
          </h1>
          <p className="text-white text-xs sm:text-sm font-bold drop-shadow-lg px-4">
            Start your delicious journey! ✨
          </p>
        </div>

        {/* Registration Card - Centered & No Scroll */}
        <div className={`bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-6 border-2 border-white/50 animate-slide-up transition-all duration-500 ${isFocused ? 'scale-105 shadow-3xl' : 'scale-100'}`}>
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            {/* Name Input */}
            <div className="relative group">
              <label className="block text-xs sm:text-sm font-black text-gray-700 mb-1.5 flex items-center gap-2">
                <User className="h-3.5 w-3.5 text-pink-500" />
                <span>Name</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pl-10 sm:pl-11 rounded-lg sm:rounded-xl border-2 border-pink-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-200 transition-all duration-300 outline-none bg-white placeholder-gray-400 text-sm sm:text-base"
                  placeholder="John Candy"
                />
                <div className="absolute left-3 sm:left-3.5 top-1/2 transform -translate-y-1/2">
          
                </div>
              </div>
            </div>

            {/* Email Input */}
            <div className="relative group">
              <label className="block text-xs sm:text-sm font-black text-gray-700 mb-1.5 flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-purple-500" />
                <span>Email</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pl-10 sm:pl-11 rounded-lg sm:rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300 outline-none bg-white placeholder-gray-400 text-sm sm:text-base"
                  placeholder="your@email.com"
                />
                
              </div>
            </div>

            {/* Password Input */}
            <div className="relative group">
              <label className="block text-xs sm:text-sm font-black text-gray-700 mb-1.5 flex items-center gap-2">
                <Lock className="h-3.5 w-3.5 text-indigo-500" />
                <span>Password</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pl-10 sm:pl-11 rounded-lg sm:rounded-xl border-2 border-indigo-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 transition-all duration-300 outline-none bg-white placeholder-gray-400 text-sm sm:text-base"
                  placeholder="••••••••"
                />
               
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="relative group">
              <label className="block text-xs sm:text-sm font-black text-gray-700 mb-1.5 flex items-center gap-2">
                <Lock className="h-3.5 w-3.5 text-green-500" />
                <span>Confirm Password</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pl-10 sm:pl-11 rounded-lg sm:rounded-xl border-2 border-green-200 focus:border-green-500 focus:ring-4 focus:ring-green-200 transition-all duration-300 outline-none bg-white placeholder-gray-400 text-sm sm:text-base"
                  placeholder="••••••••"
                />
             
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-black text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 border-2 border-white/30 relative overflow-hidden group mt-3"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <span className="text-lg animate-bounce-slow">🎈</span>
                    <span>Create Account!</span>
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
          </form>

          {/* Divider */}
          <div className="mt-4 sm:mt-5 space-y-3">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-gray-300 border-dashed"></div>
              </div>
              <div className="relative flex justify-center text-xs sm:text-sm">
                <span className="px-2 sm:px-3 bg-white text-gray-600 font-bold">Already a member?</span>
              </div>
            </div>

            <Link
              to="/login"
              className="block text-center w-full py-2.5 sm:py-3 bg-white border-2 border-purple-300 text-purple-600 font-black text-sm sm:text-base rounded-lg sm:rounded-xl hover:bg-purple-50 hover:border-purple-400 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <span className="flex items-center justify-center gap-2">
                <span className="text-lg sm:text-xl">🍭</span>
                <span>Sign In</span>
                <span className="text-lg sm:text-xl">🍬</span>
              </span>
            </Link>
          </div>
        </div>

        {/* Fun Message - Compact */}
        <div className={`mt-2 text-center animate-fade-in transition-all duration-500 ${isFocused ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
          <div className="bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-2.5 border-2 border-white/50 shadow-xl">
            <p className="text-gray-600 font-bold text-xs flex items-center justify-center gap-1">
              <span className="text-sm sm:text-base">🎉</span>
              <span>Join <span className="text-pink-600">10,000+</span> sweet lovers!</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
