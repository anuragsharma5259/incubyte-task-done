import { X, Plus, Minus, Trash2, ShoppingBag, CreditCard } from 'lucide-react'
import { useCart } from '../context/CartContext'
import axios from '../utils/axios'
import { toast } from 'react-toastify'
import { useState } from 'react'
import CheckoutModal from './CheckoutModal'

const CartSidebar = () => {
  const { cartItems, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCart()
  const [showCheckout, setShowCheckout] = useState(false)

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty!')
      return
    }
    setShowCheckout(true)
  }

  const handleOrderSuccess = () => {
    clearCart()
    setIsCartOpen(false)
    setTimeout(() => {
      window.location.reload()
    }, 1500)
  }

  if (!isCartOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in"
        onClick={() => setIsCartOpen(false)}
      ></div>

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-7 w-7" />
            <div>
              <h2 className="text-2xl font-black">Your Cart</h2>
              <p className="text-sm text-white/80 font-medium">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-white/20 rounded-lg transition-all"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <ShoppingBag className="h-24 w-24 text-gray-300 mb-4" />
              <h3 className="text-xl font-bold text-gray-600 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">Add some delicious sweets to get started!</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="btn-primary"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item._id} className="card p-4 flex gap-4">
                {/* Item Image */}
                <div className="w-20 h-20 bg-gradient-to-br from-pink-200 to-purple-200 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl">🍬</span>
                </div>

                {/* Item Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-800 truncate">{item.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">₹{item.price.toFixed(2)} each</p>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => updateQuantity(item._id, item.cartQuantity - 1)}
                        className="p-1 hover:bg-white rounded transition-all"
                        disabled={item.cartQuantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="font-bold px-2 min-w-[2rem] text-center">
                        {item.cartQuantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item._id, item.cartQuantity + 1)}
                        className="p-1 hover:bg-white rounded transition-all"
                        disabled={item.cartQuantity >= item.quantity}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Item Total */}
                <div className="text-right">
                  <p className="text-lg font-black gradient-text">
                    ₹{(item.price * item.cartQuantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 p-6 space-y-4 bg-gray-50">
            {/* Total */}
            <div className="flex items-center justify-between text-xl font-black">
              <span>Total:</span>
              <span className="gradient-text text-3xl">
                ₹{getTotalPrice().toFixed(2)}
              </span>
            </div>

            {/* Action Buttons */}
            <button
              onClick={handleCheckout}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <CreditCard className="h-5 w-5" />
              <span>Proceed to Checkout</span>
            </button>

            <button
              onClick={clearCart}
              className="w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-semibold transition-all"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        cartItems={cartItems}
        totalPrice={getTotalPrice()}
        onOrderSuccess={handleOrderSuccess}
      />
    </>
  )
}

export default CartSidebar
