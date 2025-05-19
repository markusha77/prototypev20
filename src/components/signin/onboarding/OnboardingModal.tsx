import React, { useState } from 'react'
import { Modal } from '../../common/Modal'
import { WelcomeStep } from './WelcomeStep'
import { ProfileSetupStep } from './ProfileSetupStep'
import { InterestsStep } from './InterestsStep'
import { SpaceSelectionStep } from './SpaceSelectionStep'
import { CompletionStep } from './CompletionStep'

interface OnboardingModalProps {
  isOpen: boolean
  onClose: () => void
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0)
  
  const [userData, setUserData] = useState({
    name: '',
    username: '',
    bio: '',
    avatar: '',
    email: '',
    github: '',
    twitter: '',
    telegram: '',
    slack: '',
    discord: '',
    linkedin: '',
    website: '',
    interests: [] as string[],
    selectedSpaces: [] as string[]
  })
  
  const updateUserData = (data: Partial<typeof userData>) => {
    setUserData(prev => ({ ...prev, ...data }))
  }
  
  const updateSpaces = (spaces: string[]) => {
    setUserData(prev => ({ ...prev, selectedSpaces: spaces }))
  }
  
  const handleNext = () => {
    setCurrentStep(prev => prev + 1)
  }
  
  const handleBack = () => {
    setCurrentStep(prev => prev - 1)
  }
  
  const handleComplete = () => {
    // In a real app, you would save the user data to the backend here
    onClose()
    // Reset the form for next time
    setCurrentStep(0)
    setUserData({
      name: '',
      username: '',
      bio: '',
      avatar: '',
      email: '',
      github: '',
      twitter: '',
      telegram: '',
      slack: '',
      discord: '',
      linkedin: '',
      website: '',
      interests: [],
      selectedSpaces: []
    })
  }
  
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeStep onNext={handleNext} onCancel={onClose} />
      case 1:
        return (
          <ProfileSetupStep 
            userData={userData} 
            updateUserData={updateUserData} 
            onNext={handleNext} 
            onBack={handleBack}
            onCancel={onClose}
          />
        )
      case 2:
        return (
          <InterestsStep 
            userData={userData} 
            updateUserData={updateUserData} 
            onNext={handleNext} 
            onBack={handleBack}
            onCancel={onClose}
          />
        )
      case 3:
        return (
          <SpaceSelectionStep 
            selectedSpaces={userData.selectedSpaces} 
            updateSpaces={updateSpaces} 
            onNext={handleNext} 
            onBack={handleBack}
            onCancel={onClose}
          />
        )
      case 4:
        return (
          <CompletionStep 
            userData={userData} 
            onComplete={handleComplete} 
            onBack={handleBack}
          />
        )
      default:
        return null
    }
  }
  
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="lg"
      showCloseButton={false}
      preventClose={true}
    >
      <div className="w-full max-w-2xl">
        {renderStep()}
      </div>
    </Modal>
  )
}
