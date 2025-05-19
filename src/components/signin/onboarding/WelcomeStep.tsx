import React from 'react'
import { Users, ArrowRight, X } from 'lucide-react'

interface WelcomeStepProps {
  onNext: () => void
  onCancel: () => void
  isFirstStep?: boolean
}

export const WelcomeStep: React.FC<WelcomeStepProps> = ({ onNext, onCancel, isFirstStep }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="absolute top-4 right-4">
        <button 
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Cancel"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      
      <div className="bg-indigo-100 p-4 rounded-full mb-6">
        <Users className="h-12 w-12 text-indigo-600" />
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Community Spaces</h1>
      
      <p className="text-lg text-gray-600 mb-8 max-w-lg">
        Join our vibrant community of builders, creators, and innovators. Let's get you set up with your profile and connect you with spaces that match your interests.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-8">
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2">Create Your Profile</h3>
          <p className="text-gray-600 text-sm">Personalize your experience and let others know who you are</p>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2">Select Interests</h3>
          <p className="text-gray-600 text-sm">Tell us what you're passionate about to find relevant content</p>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2">Join Spaces</h3>
          <p className="text-gray-600 text-sm">Connect with like-minded people in community spaces</p>
        </div>
      </div>
      
      <div className="flex w-full md:w-auto">
        <button 
          onClick={onNext}
          className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors w-full"
        >
          Next
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
