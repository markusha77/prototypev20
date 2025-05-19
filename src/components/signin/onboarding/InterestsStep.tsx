import React, { useState } from 'react'
import { ArrowRight, ArrowLeft, Check, X } from 'lucide-react'
import { AlertModal } from '../../common/AlertModal'

interface InterestsStepProps {
  userData: {
    interests: string[]
  }
  updateUserData: (data: Partial<{ interests: string[] }>) => void
  onNext: () => void
  onBack: () => void
  onCancel: () => void
}

export const InterestsStep: React.FC<InterestsStepProps> = ({ 
  userData, 
  updateUserData, 
  onNext, 
  onBack,
  onCancel
}) => {
  const [showValidationAlert, setShowValidationAlert] = useState(false)
  
  const interestCategories = [
    {
      name: 'Development',
      options: [
        'Web Development', 
        'Mobile Apps', 
        'Game Development', 
        'AI & Machine Learning', 
        'Blockchain',
        'DevOps',
        'Backend Development',
        'Frontend Development',
        'Cloud Computing',
        'Cybersecurity',
        'Data Science',
        'IoT',
        'AR/VR Development'
      ]
    },
    {
      name: 'Design',
      options: [
        'UI/UX Design', 
        'Graphic Design', 
        '3D Modeling', 
        'Animation', 
        'Illustration',
        'Product Design',
        'Motion Graphics',
        'Typography',
        'Brand Identity',
        'Design Systems',
        'Web Design',
        'Game Design',
        'Interaction Design'
      ]
    },
    {
      name: 'Business',
      options: [
        'Startups', 
        'Marketing', 
        'Product Management', 
        'Entrepreneurship', 
        'Freelancing',
        'E-commerce',
        'Growth Hacking',
        'Business Strategy',
        'Sales',
        'Finance',
        'Venture Capital',
        'Business Analytics',
        'Remote Work'
      ]
    },
    {
      name: 'Content',
      options: [
        'Writing', 
        'Video Production', 
        'Podcasting', 
        'Social Media', 
        'Blogging',
        'Content Strategy',
        'Technical Writing',
        'Copywriting',
        'Content Marketing',
        'Storytelling',
        'Newsletter Creation',
        'SEO',
        'Community Building'
      ]
    },
    {
      name: 'Creative',
      options: [
        'Photography',
        'Music Production',
        'Film Making',
        'Digital Art',
        'Creative Writing',
        'Crafting',
        'Fashion Design',
        'Interior Design',
        'Sculpture',
        'Painting',
        'Performing Arts',
        'Culinary Arts'
      ]
    },
    {
      name: 'Technology',
      options: [
        'Artificial Intelligence',
        'Robotics',
        'Quantum Computing',
        'Biotechnology',
        'Nanotechnology',
        'Space Technology',
        'Clean Tech',
        'Wearable Tech',
        'Smart Home',
        'Cryptocurrency',
        'NFTs',
        'Metaverse'
      ]
    },
    {
      name: 'Education',
      options: [
        'Online Learning',
        'EdTech',
        'Teaching',
        'Curriculum Development',
        'Language Learning',
        'STEM Education',
        'Lifelong Learning',
        'Educational Psychology',
        'Academic Research',
        'Mentoring',
        'Coaching'
      ]
    },
    {
      name: 'Health & Wellness',
      options: [
        'Mental Health',
        'Fitness',
        'Nutrition',
        'Meditation',
        'Healthcare Tech',
        'Telemedicine',
        'Biohacking',
        'Sleep Science',
        'Yoga',
        'Personal Development',
        'Mindfulness'
      ]
    }
  ]

  const toggleInterest = (interest: string) => {
    const newInterests = userData.interests.includes(interest)
      ? userData.interests.filter(i => i !== interest)
      : [...userData.interests, interest]
    
    updateUserData({ interests: newInterests })
  }

  const handleContinue = () => {
    if (userData.interests.length > 0) {
      onNext()
    } else {
      setShowValidationAlert(true)
    }
  }

  return (
    <div className="max-h-[70vh] overflow-y-auto pr-2">
      <div className="sticky top-0 right-4 z-10 float-right">
        <button 
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Cancel"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Your Interests</h2>
      <p className="text-gray-600 mb-6">
        Choose topics you're interested in to help us personalize your experience and recommend relevant spaces.
      </p>
      
      <div className="grid grid-cols-1 gap-y-6 mb-8">
        {interestCategories.map((category) => (
          <div key={category.name} className="pb-4 border-b border-gray-100 last:border-0">
            <h3 className="font-medium text-gray-900 mb-3">{category.name}</h3>
            <div className="flex flex-wrap gap-3">
              {category.options.map((interest) => {
                const isSelected = userData.interests.includes(interest)
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-4 py-2 rounded-full border ${
                      isSelected 
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-700' 
                        : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    } transition-colors flex items-center`}
                  >
                    {isSelected && <Check className="mr-1 h-4 w-4" />}
                    {interest}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
      
      <div className="sticky bottom-0 bg-white py-3 flex justify-between">
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 font-medium py-2 px-4"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back
          </button>
          
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 font-medium py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
        
        <div className="flex items-center">
          <span className="mr-3 text-sm text-gray-500">
            {userData.interests.length} selected
          </span>
          <button
            type="button"
            onClick={handleContinue}
            className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Continue
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Validation alert */}
      <AlertModal
        isOpen={showValidationAlert}
        onClose={() => setShowValidationAlert(false)}
        title="Selection Required"
        message="Please select at least one interest to continue."
        type="info"
      />
    </div>
  )
}
