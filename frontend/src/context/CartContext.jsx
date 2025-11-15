import { createContext, useState, useContext, useEffect } from 'react'
import { toast } from 'react-toastify'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (sweet) => {
    const existingItem = cartItems.find(item => item._id === sweet._id)
    
    if (existingItem) {
      // Increase quantity if already in cart
      setCartItems(cartItems.map(item =>
        item._id === sweet._id
          ? { ...item, cartQuantity: item.cartQuantity + 1 }
          : item
      ))
      toast.success(`${sweet.name} quantity increased in cart!`, { icon: '🛒' })
    } else {
      // Add new item to cart
      setCartItems([...cartItems, { ...sweet, cartQuantity: 1 }])
      toast.success(`${sweet.name} added to cart!`, { icon: '🛒' })
    }
    
    setIsCartOpen(true)
  }

  const removeFromCart = (sweetId) => {
    const item = cartItems.find(item => item._id === sweetId)
    setCartItems(cartItems.filter(item => item._id !== sweetId))
    toast.info(`${item.name} removed from cart`)
  }

  const updateQuantity = (sweetId, quantity) => {
    if (quantity === 0) {
      removeFromCart(sweetId)
      return
    }
    
    setCartItems(cartItems.map(item =>
      item._id === sweetId
        ? { ...item, cartQuantity: quantity }
        : item
    ))
  }

  const clearCart = () => {
    setCartItems([])
    toast.info('Cart cleared')
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.cartQuantity, 0)
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.cartQuantity), 0)
  }

  const value = {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
