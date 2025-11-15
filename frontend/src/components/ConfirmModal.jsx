import { AlertCircle, X } from 'lucide-react'

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Confirm", cancelText = "Cancel", type = "danger" }) => {
  if (!isOpen) return null

  const typeStyles = {
    danger: {
      bg: 'from-red-500 to-pink-600',
      icon: 'bg-red-100 text-red-600',
      button: 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700'
    },
    warning: {
      bg: 'from-orange-500 to-amber-600',
      icon: 'bg-orange-100 text-orange-600',
      button: 'bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700'
    },
    success: {
      bg: 'from-green-500 to-emerald-600',
      icon: 'bg-green-100 text-green-600',
      button: 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
    }
  }

  const style = typeStyles[type] || typeStyles.danger

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full animate-slide-up overflow-hidden">
        {/* Header with gradient */}
        <div className={`bg-gradient-to-r ${style.bg} p-6 text-white relative`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className={`${style.icon} p-3 rounded-full`}>
                <AlertCircle className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-2xl font-black">{title}</h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <p className="text-gray-700 text-lg leading-relaxed">
            {message}
          </p>
        </div>

        {/* Actions */}
        <div className="p-6 bg-gray-50 flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all transform hover:scale-105"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm()
              onClose()
            }}
            className={`flex-1 px-6 py-3 ${style.button} text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
