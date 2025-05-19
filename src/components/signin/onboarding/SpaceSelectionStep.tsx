import React, { useState } from 'react'
import { ArrowRight, ArrowLeft, Check, X } from 'lucide-react'
import { AlertModal } from '../../common/AlertModal'

interface SpaceSelectionStepProps {
  selectedSpaces: string[]
  updateSpaces: (spaces: string[]) => void
  onNext: () => void
  onBack: () => void
  onCancel: () => void
}

export const SpaceSelectionStep: React.FC<SpaceSelectionStepProps> = ({ 
  selectedSpaces, 
  updateSpaces, 
  onNext, 
  onBack,
  onCancel
}) => {
  const [showValidationAlert, setShowValidationAlert] = useState(false)
  
  // Sample spaces data - in a real app, this would come from an API
  const spaces = [
    {
      id: '1',
      name: 'Frontend Developers',
      description: 'A community for frontend developers to share knowledge, discuss trends, and collaborate on projects.',
      members: 2453,
      image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
    },
    {
      id: '2',
      name: 'Mobile App Builders',
      description: 'Connect with other mobile app developers, share your work, and get feedback on your projects.',
      members: 1872,
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
    },
    {
      id: '3',
      name: 'AI & ML Enthusiasts',
      description: 'Explore the world of artificial intelligence and machine learning with like-minded enthusiasts.',
      members: 3241,
      image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
    },
    {
      id: '4',
      name: 'Startup Founders',
      description: 'A space for startup founders to connect, share experiences, and help each other grow their businesses.',
      members: 1563,
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
    },
    {
      id: '5',
      name: 'Content Creators',
      description: 'For bloggers, vloggers, podcasters, and all types of content creators to network and collaborate.',
      members: 2187,
      image: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
    },
    {
      id: '6',
      name: 'Game Developers',
      description: 'Connect with game developers, share your projects, and discuss game development techniques.',
      members: 1932,
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
    },
    {
      id: '7',
      name: 'UI/UX Designers',
      description: 'A community for designers to share their work, get feedback, and discuss design principles.',
      members: 2765,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
    },
    {
      id: '8',
      name: 'Blockchain Innovators',
      description: 'Explore blockchain technology, cryptocurrencies, and decentralized applications.',
      members: 1456,
      image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
    },
    {
      id: '9',
      name: 'Remote Workers',
      description: 'Connect with other remote workers, share tips, and discuss the challenges of remote work.',
      members: 3421,
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
    }
  ]

  const toggleSpace = (spaceId: string) => {
    const newSelectedSpaces = selectedSpaces.includes(spaceId)
      ? selectedSpaces.filter(id => id !== spaceId)
      : [...selectedSpaces, spaceId]
    
    updateSpaces(newSelectedSpaces)
  }

  const handleContinue = () => {
    if (selectedSpaces.length > 0) {
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
      
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Join Spaces</h2>
      <p className="text-gray-600 mb-6">
        Join spaces to connect with like-minded people, share your projects, and get feedback from the community.
      </p>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        {spaces.map((space) => {
          const isSelected = selectedSpaces.includes(space.id)
          
          return (
            <div 
              key={space.id}
              className={`border rounded-lg overflow-hidden transition-all ${
                isSelected ? 'border-indigo-300 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex flex-col h-full">
                <div className="h-40">
                  <img 
                    src={space.image} 
                    alt={space.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-gray-900">{space.name}</h3>
                      <span className="text-sm text-gray-500">{space.members.toLocaleString()} members</span>
                    </div>
                    <p className="text-gray-600 text-sm mt-2">{space.description}</p>
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => toggleSpace(space.id)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        isSelected 
                          ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                          : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {isSelected ? (
                        <span className="flex items-center">
                          <Check className="mr-1 h-4 w-4" />
                          Joined
                        </span>
                      ) : (
                        'Join Space'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
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
            {selectedSpaces.length} selected
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
        message="Please join at least one space to continue."
        type="info"
      />
    </div>
  )
}
