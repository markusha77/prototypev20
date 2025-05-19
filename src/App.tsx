import React, { useState } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { OnboardingFlow } from './components/signin/OnboardingFlow'
import { Header } from './components/Header'
import ProfileForm from './components/profile/ProfileForm'
import Welcome from './components/profile/Welcome'
import ProjectList from './components/profile/ProjectList'
import ProjectForm from './components/profile/ProjectForm'
import ProfilePreview from './components/profile/ProfilePreview'
import CommunityPage from './components/community/CommunityPage'
import ProjectDetail from './components/community/ProjectDetail'
import LandingPage from './components/landing/LandingPage'
import ProfilePage from './components/profile/ProfilePage'

function App() {
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  const handleOnboardingComplete = () => {
    setShowOnboarding(false)
    setIsLoggedIn(true)
    console.log('Onboarding completed!')
  }

  const handleOnboardingCancel = () => {
    setShowOnboarding(false)
    // Redirect to landing page on cancel
    navigate('/')
    console.log('Onboarding cancelled!')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Routes>
        {/* Landing page route */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Welcome/Onboarding route */}
        <Route path="/welcome" element={
          <>
            <Header />
            <main className="flex-1 flex items-center justify-center p-4">
              {showOnboarding ? (
                <OnboardingFlow 
                  onComplete={handleOnboardingComplete} 
                  onCancel={handleOnboardingCancel} 
                />
              ) : (
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to ChatAndBuild Community Spaces!</h2>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Join our community to connect with other builders, share your projects, and get feedback.
                  </p>
                  <button
                    onClick={() => setShowOnboarding(true)}
                    className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Let's get started
                  </button>
                </div>
              )}
            </main>
          </>
        } />
        
        <Route path="/profile" element={<ProfilePage />} />
        
        <Route path="/profile/edit" element={
          <>
            <Header />
            <main className="flex-1 py-8">
              <ProfileForm />
            </main>
          </>
        } />
        
        <Route path="/builder" element={
          <>
            <Header />
            <main className="flex-1 py-8">
              <Welcome />
            </main>
          </>
        } />
        
        {/* Project routes */}
        <Route path="/projects" element={
          <>
            <Header />
            <main className="flex-1 py-8">
              <ProjectList />
            </main>
          </>
        } />
        
        <Route path="/projects/new" element={
          <>
            <Header />
            <main className="flex-1 py-8">
              <ProjectForm />
            </main>
          </>
        } />
        
        <Route path="/projects/edit/:projectId" element={
          <>
            <Header />
            <main className="flex-1 py-8">
              <ProjectForm />
            </main>
          </>
        } />
        
        <Route path="/preview" element={
          <>
            <Header />
            <main className="flex-1 py-8">
              <ProfilePreview />
            </main>
          </>
        } />
        
        {/* Community routes */}
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/community/project/:projectId" element={<ProjectDetail />} />
        
        {/* Redirect home route to dashboard if logged in */}
        <Route path="/home" element={
          isLoggedIn ? <CommunityPage /> : <Navigate to="/welcome" />
        } />
      </Routes>
    </div>
  )
}

export default App
