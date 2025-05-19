import React, { useState } from 'react'
import { X, Users, Sparkles, Zap, Play } from 'lucide-react'

export const HeroSection: React.FC = () => {
  const [showHero, setShowHero] = useState(true)

  if (!showHero) return null

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
      <div className="relative bg-gradient-to-r from-blue-400 to-purple-600 text-white py-12 px-6 sm:px-8 lg:px-12 mb-8 rounded-lg shadow-lg">
        <button 
          className="absolute top-3 right-3 text-white/80 hover:text-white focus:outline-none transition-colors duration-200" 
          aria-label="Close hero section"
          onClick={() => setShowHero(false)}
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:flex-1 mb-8 md:mb-0">
            <h1 className="text-3xl font-bold mb-4 leading-tight">
              Discover & Connect in the ChatAndBuild Community Space
            </h1>
            <p className="text-white/90 mb-6 text-lg">
              Explore innovative projects, connect with fellow builders, and showcase your own creations in our collaborative community.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <Users className="h-5 w-5 mr-3 text-yellow-400 flex-shrink-0 mt-0.5" />
                <p className="text-white/80">
                  Connect with a diverse community of creators and AI enthusiasts
                </p>
              </div>
              
              <div className="flex items-start">
                <Sparkles className="h-5 w-5 mr-3 text-yellow-400 flex-shrink-0 mt-0.5" />
                <p className="text-white/80">
                  Get inspired by trending projects and innovative solutions
                </p>
              </div>
              
              <div className="flex items-start">
                <Zap className="h-5 w-5 mr-3 text-yellow-400 flex-shrink-0 mt-0.5" />
                <p className="text-white/80">
                  Share feedback and collaborate on projects in real-time
                </p>
              </div>
            </div>
            
            <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-md text-purple-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-600 focus:ring-white transition-all duration-200 hover:shadow-lg">
              <Play className="mr-2 h-4 w-4" />
              Take A Tour
            </button>
          </div>
          
          <div className="md:flex-1 w-full">
            {/* Completely rewritten video frame */}
            <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-white/20">
              {/* Video thumbnail with gradient overlay */}
              <div className="relative aspect-video w-full">
                <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/40 z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                  alt="Community collaboration" 
                  className="w-full h-full object-cover"
                />
                
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="group cursor-pointer transform transition-all duration-300 hover:scale-110">
                    {/* Outer ring */}
                    <div className="absolute inset-0 rounded-full bg-white/30 animate-ping opacity-75 h-16 w-16"></div>
                    
                    {/* Play button background */}
                    <div className="relative bg-indigo-600 rounded-full p-4 shadow-lg">
                      <Play className="h-8 w-8 text-white group-hover:text-yellow-200 transition-colors" />
                    </div>
                  </div>
                </div>
                
                {/* Video title overlay */}
                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <h3 className="text-white font-bold text-lg mb-1 drop-shadow-md">Community Showcase</h3>
                  <p className="text-white/80 text-sm drop-shadow-md">See how builders collaborate and create amazing projects</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-blue-500 text-white px-3 py-1.5 rounded-full shadow-lg text-sm font-medium animate-bounce">
              New Features!
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
