import { Link } from 'react-router-dom'
import { Candy, ShoppingBag, Heart, Star, Sparkles, ChevronRight, Shield, Zap, Award, ArrowRight, TrendingUp, Users, Crown } from 'lucide-react'

const Home = () => {
  const featuredSweets = [
    { name: 'Premium Chocolate Bar', category: 'chocolate', price: 99, emoji: '🍫', rating: 4.9, tag: 'Bestseller' },
    { name: 'Rainbow Gummy Bears', category: 'gummy', price: 79, emoji: '🐻', rating: 4.8, tag: 'Popular' },
    { name: 'Strawberry Lollipop', category: 'lollipop', price: 49, emoji: '🍭', rating: 4.7, tag: 'New' },
    { name: 'Caramel Candy', category: 'candy', price: 69, emoji: '🍬', rating: 4.6, tag: 'Trending' },
    { name: 'Mint Hard Candy', category: 'hard candy', price: 59, emoji: '🍬', rating: 4.8, tag: 'Hot' },
    { name: 'Dark Chocolate Truffle', category: 'chocolate', price: 129, emoji: '🍫', rating: 5.0, tag: 'Premium' }
  ]

  const features = [
    { icon: Shield, title: 'Premium Quality', desc: 'Finest ingredients, guaranteed freshness', color: 'from-blue-500 to-cyan-500' },
    { icon: Zap, title: 'Fast Delivery', desc: 'Lightning-fast shipping nationwide', color: 'from-orange-500 to-amber-500' },
    { icon: Award, title: 'Top Rated', desc: '4.9★ by 10,000+ customers', color: 'from-purple-500 to-pink-500' }
  ]

  const stats = [
    { icon: Users, value: '10,000+', label: 'Happy Customers' },
    { icon: Candy, value: '500+', label: 'Sweet Varieties' },
    { icon: Star, value: '4.9', label: 'Average Rating' },
    { icon: TrendingUp, value: '98%', label: 'Satisfaction' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Premium Navbar - Fully Responsive */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-purple-100/50 shadow-xl">
        <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-18 md:h-20">
            {/* Logo - Extreme Left */}
            <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 flex-shrink-0">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-xl sm:rounded-2xl blur-md sm:blur-lg opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-2 sm:p-2.5 md:p-3 rounded-xl sm:rounded-2xl transform group-hover:scale-110 transition duration-300">
                  <Candy className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white" />
                </div>
              </div>
              <div>
                <span className="text-xl sm:text-2xl md:text-3xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-1 sm:gap-2 whitespace-nowrap">
                  Sweet Shop
                  <Crown className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-yellow-500 animate-pulse" />
                </span>
                <span className="text-[8px] sm:text-[10px] md:text-xs font-bold text-gray-500 tracking-wider hidden sm:block">PREMIUM SWEETS</span>
              </div>
            </div>

            {/* Buttons - Extreme Right */}
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-shrink-0">
              <Link 
                to="/login" 
                className="inline-flex items-center px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm md:text-base text-gray-700 font-bold hover:text-white bg-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 border-2 border-gray-300 hover:border-transparent rounded-lg md:rounded-xl transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1 whitespace-nowrap"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="inline-flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white font-black px-3 sm:px-6 md:px-8 py-1.5 sm:py-2 md:py-3 rounded-lg md:rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 text-xs sm:text-sm md:text-base whitespace-nowrap"
              >
                Get Started
                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Responsive */}
      <div className="relative overflow-hidden py-12 sm:py-20 md:py-28 lg:py-32">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center animate-fade-in">
            {/* Floating Candies Animation - Responsive */}
            <div className="flex justify-center mb-6 sm:mb-8 relative">
              <div className="relative">
                <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl animate-float">🍬</span>
                <Sparkles className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-yellow-400 animate-pulse" />
              </div>
              <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl animate-float mx-2 sm:mx-4" style={{ animationDelay: '0.2s' }}>🍭</span>
              <div className="relative">
                <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl animate-float">🍫</span>
                <Star className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-yellow-400 animate-pulse fill-yellow-400" />
              </div>
            </div>

            {/* Hero Text - Responsive */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 sm:mb-6 leading-tight px-4">
              <span className="block bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent drop-shadow-2xl">
                Welcome to
              </span>
              <span className="block bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-pulse">
                Sweet Paradise!
              </span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mb-3 sm:mb-4 max-w-3xl mx-auto font-bold leading-relaxed px-4">
              Discover the most <span className="text-pink-600">delicious</span> collection of premium sweets
            </p>

            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-8 sm:mb-12 font-medium px-4">
              Your journey to sweetness starts here! 🎉✨
            </p>

            {/* CTA Buttons - Responsive */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8 sm:mb-12 px-4">
              <Link to="/register" className="group relative inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white font-black text-base sm:text-lg md:text-xl px-8 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden w-full sm:w-auto">
                <span className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 relative z-10" />
                <span className="relative z-10 whitespace-nowrap">Start Shopping Now</span>
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 relative z-10 group-hover:translate-x-2 transition-transform" />
              </Link>
              
              <Link to="/admin-login" className="inline-flex items-center gap-2 sm:gap-3 bg-white text-gray-800 font-black text-base sm:text-lg md:text-xl px-8 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl border-4 border-purple-200 hover:border-purple-400 transform hover:-translate-y-2 transition-all duration-300 w-full sm:w-auto">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-purple-600" />
                <span className="whitespace-nowrap">Admin Access</span>
              </Link>
            </div>

            {/* Stats - Responsive Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto px-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-purple-100">
                  <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-purple-600 mx-auto mb-2 sm:mb-3" />
                  <p className="text-xl sm:text-2xl md:text-3xl font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-1">{stat.value}</p>
                  <p className="text-[10px] sm:text-xs md:text-sm font-bold text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - Responsive */}
      <div className="py-12 sm:py-16 md:py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3 sm:mb-4 drop-shadow-lg">
              Why Choose Us?
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 font-bold px-4">Experience the difference with our premium service</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 px-4">
            {features.map((feature, index) => (
              <div key={index} className="group relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 border-2 border-purple-100 hover:border-purple-300" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${feature.color} mb-4 sm:mb-6 shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <feature.icon className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black mb-2 sm:mb-3 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600 font-semibold text-base sm:text-lg">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Sweets - Fully Responsive */}
      <div className="py-12 sm:py-16 md:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 md:mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3 sm:mb-4 drop-shadow-lg">
              Featured Sweets ✨
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 font-bold px-4">Handpicked favorites from our premium collection</p>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {featuredSweets.map((sweet, index) => (
              <div key={index} className="group relative transform hover:scale-105 transition-all duration-500 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400 rounded-2xl sm:rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                
                <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border-4 border-purple-100 group-hover:border-purple-300 transition-all duration-500">
                  {/* Tag */}
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10">
                    <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-black shadow-lg">
                      {sweet.tag}
                    </span>
                  </div>

                  {/* Image Area */}
                  <div className="h-40 sm:h-48 md:h-56 bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
                    <span className="text-6xl sm:text-7xl md:text-8xl relative z-10 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">{sweet.emoji}</span>
                    <Sparkles className="absolute top-3 sm:top-4 left-3 sm:left-4 h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-yellow-300 animate-pulse" />
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-5 md:p-6">
                    <div className="flex items-start justify-between mb-2 sm:mb-3 gap-2">
                      <h3 className="text-base sm:text-lg md:text-xl font-black text-gray-800 group-hover:text-purple-600 transition-colors line-clamp-2">
                        {sweet.name}
                      </h3>
                      <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded-full border-2 border-yellow-300 flex-shrink-0">
                        <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-600 fill-yellow-600" />
                        <span className="text-xs sm:text-sm font-black text-yellow-700">{sweet.rating}</span>
                      </div>
                    </div>
                    
                    <span className="inline-block px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-purple-100 text-purple-700 border-2 border-purple-200 mb-3 sm:mb-4">
                      {sweet.category}
                    </span>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-2xl sm:text-2xl md:text-3xl font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                        ₹{sweet.price}
                      </span>
                      <Heart className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-red-400 hover:text-red-500 hover:fill-red-500 cursor-pointer transition-all transform hover:scale-125" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 sm:mt-12 md:mt-16">
            <Link to="/register" className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white font-black text-base sm:text-lg md:text-xl px-8 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300">
              <span>View All Sweets</span>
              <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section - Premium */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Animated circles */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 drop-shadow-2xl">
            Ready to Satisfy Your Sweet Tooth? 🍬
          </h2>
          <p className="text-2xl text-white/90 mb-10 font-bold">
            Join thousands of happy customers and start your sweet journey today!
          </p>
          <Link to="/register" className="inline-flex items-center gap-3 bg-white text-purple-600 font-black px-12 py-5 rounded-2xl text-xl shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300">
            <ShoppingBag className="h-7 w-7" />
            <span>Create Free Account</span>
            <ChevronRight className="h-7 w-7" />
          </Link>
        </div>
      </div>

      {/* Footer - Premium */}
      <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Candy className="h-10 w-10 text-pink-400" />
            <span className="text-3xl font-black">Sweet Shop</span>
            <Crown className="h-8 w-8 text-yellow-400" />
          </div>
          <p className="text-white/80 mb-4 text-lg font-semibold">Making life sweeter, one treat at a time 🍬✨</p>
          <p className="text-sm text-white/60 font-medium">© 2025 Sweet Shop. All rights reserved. | Premium Sweets & Candies</p>
        </div>
      </footer>
    </div>
  )
}

export default Home
