import React, { useState } from 'react'
import { Camera, Upload, Trash2 } from 'lucide-react'
import { Modal } from '../../../components/common/Modal'

interface ProfileData {
  name: string
  username: string
  bio: string
  avatar: string
  email: string
  github: string
  twitter: string
  telegram: string
  slack: string
  discord: string
  linkedin: string
  website: string
}

interface ProfileSetupStepProps {
  userData: ProfileData
  updateUserData: (data: Partial<ProfileData>) => void
  onNext: () => void
  onBack: () => void
  onCancel: () => void
}

export const ProfileSetupStep: React.FC<ProfileSetupStepProps> = ({ 
  userData, 
  updateUserData, 
  onNext, 
  onBack,
  onCancel
}) => {
  const [activeTab, setActiveTab] = useState('basic')
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [isProfilePictureModalOpen, setIsProfilePictureModalOpen] = useState(false)
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    const newErrors: {[key: string]: string} = {}
    
    if (!userData.name.trim()) {
      newErrors.name = 'Full Name is required'
    }
    
    if (!userData.username.trim()) {
      newErrors.username = 'Username is required'
    }
    
    if (!userData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    setErrors(newErrors)
    
    // Only proceed if there are no errors
    if (Object.keys(newErrors).length === 0) {
      onNext()
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateUserData({ avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
    setIsProfilePictureModalOpen(false);
  };

  const handleDeleteProfilePicture = () => {
    updateUserData({ avatar: '' });
    setIsProfilePictureModalOpen(false);
  };
  
  // Blank profile picture SVG
  const blankProfilePic = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Set Up Your Profile</h2>
      
      <div className="mb-6">
        <div className="flex border-b border-gray-200">
          <button
            className={`py-2 px-4 font-medium text-sm ${
              activeTab === 'basic' 
                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('basic')}
          >
            Basic Info
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm ${
              activeTab === 'social' 
                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('social')}
          >
            Social Profiles
          </button>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        {activeTab === 'basic' ? (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="sm:w-1/3 flex flex-col items-center">
                <div 
                  className="relative group mb-3 cursor-pointer"
                  onClick={() => setIsProfilePictureModalOpen(true)}
                >
                  <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-white shadow-md">
                    {userData.avatar ? (
                      <img 
                        src={userData.avatar} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : blankProfilePic}
                  </div>
                  <button
                    type="button"
                    className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full shadow-md hover:bg-indigo-700 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsProfilePictureModalOpen(true);
                    }}
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-500">Upload a profile picture</p>
              </div>
              
              <div className="sm:w-2/3 space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={userData.name}
                    onChange={(e) => updateUserData({ name: e.target.value })}
                    className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                    placeholder="John Doe"
                    required
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>
                
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                    Username <span className="text-red-500">*</span>
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      @
                    </span>
                    <input
                      type="text"
                      id="username"
                      value={userData.username}
                      onChange={(e) => updateUserData({ username: e.target.value })}
                      className={`flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border ${errors.username ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      placeholder="johndoe"
                      required
                    />
                  </div>
                  {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={userData.email}
                    onChange={(e) => updateUserData({ email: e.target.value })}
                    className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                    placeholder="john@example.com"
                    required
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>
                
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    rows={3}
                    value={userData.bio}
                    onChange={(e) => updateUserData({ bio: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Tell us a bit about yourself..."
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
             <p className="text-sm text-gray-500 italic">
              All social profiles are optional. They will be displayed on your public profile.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div>
        
                <label htmlFor="github" className="block text-sm font-medium text-gray-700 mb-1">
                  GitHub
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    github.com/
                  </span>
                  <input
                    type="text"
                    id="github"
                    value={userData.github}
                    onChange={(e) => updateUserData({ github: e.target.value })}
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="username"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 mb-1">
                  Twitter
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    twitter.com/
                  </span>
                  <input
                    type="text"
                    id="twitter"
                    value={userData.twitter}
                    onChange={(e) => updateUserData({ twitter: e.target.value })}
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="username"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">
                  LinkedIn
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    linkedin.com/in/
                  </span>
                  <input
                    type="text"
                    id="linkedin"
                    value={userData.linkedin}
                    onChange={(e) => updateUserData({ linkedin: e.target.value })}
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="username"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                  Website
                </label>
                <input
                  type="text"
                  id="website"
                  value={userData.website}
                  onChange={(e) => updateUserData({ website: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="https://example.com"
                />
              </div>
              
              <div>
                <label htmlFor="discord" className="block text-sm font-medium text-gray-700 mb-1">
                  Discord
                </label>
                <input
                  type="text"
                  id="discord"
                  value={userData.discord}
                  onChange={(e) => updateUserData({ discord: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="username#0000"
                />
              </div>
              
              <div>
                <label htmlFor="telegram" className="block text-sm font-medium text-gray-700 mb-1">
                  Telegram
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    t.me/
                  </span>
                  <input
                    type="text"
                    id="telegram"
                    value={userData.telegram}
                    onChange={(e) => updateUserData({ telegram: e.target.value })}
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="username"
                  />
                </div>
              </div>
            </div>
            
           
          </div>
        )}
        
        <div className="mt-8 flex justify-between">
          <div>
            <button
              type="button"
              onClick={onBack}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Back
            </button>
          </div>
          
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              {activeTab === 'basic' ? 'Continue' : 'Next'}
            </button>
          </div>
        </div>
      </form>

      {/* Profile Picture Modal */}
      <Modal
        isOpen={isProfilePictureModalOpen}
        onClose={() => setIsProfilePictureModalOpen(false)}
        title="Profile Picture"
        size="md"
      >
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="w-48 h-48 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-gray-200">
              {userData.avatar ? (
                <img 
                  src={userData.avatar} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : blankProfilePic}
            </div>
          </div>
          
          <div className="flex flex-col space-y-3">
            <label className="relative flex items-center justify-center p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg cursor-pointer transition-colors">
              <Upload className="h-5 w-5 mr-2" />
              <span>Upload New Picture</span>
              <input 
                type="file" 
                accept="image/*" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                onChange={handleFileUpload}
              />
            </label>
            
            <button
              type="button"
              onClick={handleDeleteProfilePicture}
              className="flex items-center justify-center p-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Trash2 className="h-5 w-5 mr-2 text-red-500" />
              <span>Remove Picture</span>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
