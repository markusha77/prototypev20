import React from 'react'
import { Modal } from './Modal'
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react'

type AlertType = 'success' | 'error' | 'warning' | 'info'

interface AlertModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  message: string
  type?: AlertType
  confirmLabel?: string
  onConfirm?: () => void
  cancelLabel?: string
  showCancel?: boolean
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  type = 'info',
  confirmLabel = 'OK',
  onConfirm,
  cancelLabel = 'Cancel',
  showCancel = false
}) => {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm()
    }
    onClose()
  }

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-6 w-6 text-green-500" />
      case 'error':
        return <AlertCircle className="h-6 w-6 text-red-500" />
      case 'warning':
        return <AlertTriangle className="h-6 w-6 text-amber-500" />
      case 'info':
      default:
        return <Info className="h-6 w-6 text-blue-500" />
    }
  }

  const getButtonColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-600 hover:bg-green-700'
      case 'error':
        return 'bg-red-600 hover:bg-red-700'
      case 'warning':
        return 'bg-amber-600 hover:bg-amber-700'
      case 'info':
      default:
        return 'bg-blue-600 hover:bg-blue-700'
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4">
          {getIcon()}
        </div>
        
        <p className="text-gray-700 mb-6">{message}</p>
        
        <div className="flex space-x-3 w-full">
          {showCancel && (
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {cancelLabel}
            </button>
          )}
          
          <button
            onClick={handleConfirm}
            className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors ${getButtonColor()}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  )
}
