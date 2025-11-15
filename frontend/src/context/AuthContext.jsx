import { createContext, useState, useContext, useEffect } from 'react'
import axios from '../utils/axios'
import { toast } from 'react-toastify'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const storedToken = localStorage.getItem('token')
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser))
      setToken(storedToken)
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password })
      const { token, user } = response.data
    
      setUser(user)
      setToken(token)
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      
      toast.success('Login successful!')
      return true
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed')
      return false
    }
  }

  const register = async (name, email, password, role = 'user') => {
    try {
      const payload = { name, email, password, role };
      
      // If admin role, add secret key to headers
      const config = {};
      if (role === 'admin') {
        config.headers = {
          'x-admin-secret': 'SUPER_SECRET_ADMIN_KEY_2024'
        };
      }
      
      const response = await axios.post('/api/auth/register', payload, config)
      const { token, user } = response.data
      
      setUser(user)
      setToken(token)
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      
      toast.success(response.data.message || 'Registration successful!')
      return true
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed')
      return false
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    toast.info('Logged out successfully')
  }

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAdmin: user?.role === 'admin',
    setUser,
    setToken
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
