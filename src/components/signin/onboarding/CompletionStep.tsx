import React from 'react'
import { CheckCircle, ArrowRight, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface CompletionStepProps {
  userData: {
    name: string
    username: string
    avatar: string
    interests: string[]
    spaces: string[]
  }
  isLastStep: boolean
  onCancel: () => void
}

export const CompletionStep: React.FC<CompletionStepProps> = ({ userData, isLastStep, onCancel }) => {
  const navigate = useNavigate()

  const handleContinue = () => {
    navigate('/builder') // Redirect to the builder profile page
  }

  const handleSkip = () => {
    navigate('/community') // Redirect to the community page
  }

  return (
    <div className="flex flex-col items-center text-center">
      <div className="bg-green-100 p-4 rounded-full mb-6">
        <CheckCircle className="h-12 w-12 text-green-600" />
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-4">You're All Set!</h1>
      
      <p className="text-lg text-gray-600 mb-8 max-w-lg">
        Welcome to ChatAndBuild Community Spaces, {userData.name}! Your profile is ready and you've joined {userData.spaces.length} spaces.
      </p>
      
      
      
      <div className="flex space-x-4 w-full md:w-auto">
        <button 
          onClick={handleSkip}
          className="flex items-center justify-center border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3 px-6 rounded-lg transition-colors"
        >
          Skip for now 
        </button>
        
        <button 
          onClick={handleContinue}
          className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex-1"
        >
          Continue setting up the profile
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
