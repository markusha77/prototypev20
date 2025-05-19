import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import logo from '../assets/logo.svg'

const WelcomePage: React.FC = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-indigo-50 to-white">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100 rounded-full opacity-50 blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-100 rounded-full opacity-40 blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-100 rounded-full opacity-30 blur-3xl transform -translate-y-1/2"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
        
        {/* Subtle Dots Pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}></div>
        
        {/* Animated Floating Elements */}
        <div className="absolute top-20 left-[10%] w-8 h-8 bg-indigo-200 rounded-full opacity-20 animate-pulse-slow"></div>
        <div className="absolute top-[40%] right-[15%] w-6 h-6 bg-purple-200 rounded-full opacity-20 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-[20%] left-[20%] w-10 h-10 bg-blue-200 rounded-full opacity-20 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        
        {/* Decorative Lines */}
        <div className="absolute top-[15%] right-[30%] w-[150px] h-[1px] bg-indigo-200 transform rotate-45"></div>
        <div className="absolute bottom-[25%] left-[40%] w-[200px] h-[1px] bg-indigo-200 transform -rotate-45"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-100 rounded-full blur-md transform scale-110"></div>
              <div className="relative bg-white p-3 rounded-full shadow-sm border border-indigo-100">
                <img src={logo} alt="ChatAndBuild Logo" className="h-16 w-16" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Welcome to <span className="text-gradient">ChatAndBuild</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Build amazing projects through conversation. Our AI-powered platform helps you create, collaborate, and share your ideas with the world.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-8 hover:shadow-md transition-all border border-gray-100 transform hover:-translate-y-1 duration-300">
            <div className="bg-indigo-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Explore Community Projects</h2>
            <p className="text-gray-600 mb-6">
              Discover projects created by other users, get inspired, and learn from their implementations. Filter by categories, technologies, and more.
            </p>
            <Link 
              to="/community" 
              className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-800 group"
            >
              Browse Community
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-8 hover:shadow-md transition-all border border-gray-100 transform hover:-translate-y-1 duration-300">
            <div className="bg-indigo-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Start Building</h2>
            <p className="text-gray-600 mb-6">
              Create your own project using our conversational AI builder. Just describe what you want to build, and we'll help you bring it to life.
            </p>
            <Link 
              to="/builder" 
              className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-800 group"
            >
              Launch Builder
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-md p-8 text-white text-center relative overflow-hidden">
          {/* Decorative elements inside the CTA box */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full opacity-10 transform translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full opacity-10 transform -translate-x-1/3 translate-y-1/3"></div>
            
            {/* Subtle pattern */}
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}></div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
              Join our community of builders and create something amazing today. No coding experience required!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/signup" 
                className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-lg hover:bg-gray-100 transition-colors shadow-sm hover:shadow"
              >
                Sign Up
              </Link>
              <Link 
                to="/signin" 
                className="px-6 py-3 bg-indigo-700 text-white font-medium rounded-lg hover:bg-indigo-800 transition-colors shadow-sm hover:shadow border border-indigo-500"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Subtle footer with gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"></div>
    </div>
  )
}

export default WelcomePage
