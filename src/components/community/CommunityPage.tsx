import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, Filter, Bell, User } from 'lucide-react'
import { ProjectFeed } from './ProjectFeed'
import { FilterBar } from './FilterBar'
import { HeroSection } from './HeroSection'
import { CATEGORIES } from '../../types'
import logo from '../../assets/logo.svg'
import { restoreScrollPosition } from '../../utils/scrollUtils'
import { HeroSection as SectionWelcoming } from './SectionWelcoming'

const CommunityPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [sortOption, setSortOption] = useState('Most Recent')
  const location = useLocation()
  
  // Use direct scroll position restoration without animation
  useEffect(() => {
    const scrollPositionKey = `scrollPosition-${location.pathname}`
    
    // Use a small timeout to ensure the DOM is ready
    const timer = setTimeout(() => {
      restoreScrollPosition(scrollPositionKey);
    }, 0);
    
    return () => clearTimeout(timer);
  }, [location.pathname])

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value)
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Now with sticky positioning */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/community" className="flex items-center">
                <img src={logo} alt="ChatAndBuild Logo" className="h-8 w-8 mr-2" />
                <span className="text-xl font-bold text-indigo-600">ChatAndBuild</span>
              </Link>
              
              <nav className="hidden md:ml-10 md:flex md:space-x-8">
                {/* <Link to="/community" className="text-gray-900 font-medium hover:text-indigo-600 px-3 py-2 rounded-md">
                  Community
                </Link> */}
                
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              
              <button className="p-2 text-gray-500 hover:text-indigo-600 rounded-full hover:bg-gray-100">
                <Filter className="h-5 w-5" />
              </button>
              
              <button className="p-2 text-gray-500 hover:text-indigo-600 rounded-full hover:bg-gray-100">
                <Bell className="h-5 w-5" />
              </button>
              
              <Link to="/profile" className="p-1 rounded-full border-2 border-transparent hover:border-indigo-500">
                <User className="h-6 w-6 text-gray-700" />
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      {/* Section Welcome */}
      <SectionWelcoming />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Community Projects</h1>
          
          <div className="flex space-x-4">
            <select 
              className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option>All Categories</option>
              {CATEGORIES.map(category => (
                <option key={category}>{category}</option>
              ))}
            </select>
            
            <select 
              className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={sortOption}
              onChange={handleSortChange}
            >
              <option>Most Recent</option>
              <option>Most Popular</option>
              <option>Most Commented</option>
            </select>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Featured Project</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Featured Project"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold text-gray-900 mb-2">AI-Powered Task Manager</h3>
              
              <p className="text-gray-600 mb-4">
                A task management app that uses AI to prioritize and suggest tasks based on your work patterns and deadlines. 
                The system learns from your habits and helps you focus on what matters most.
              </p>
              
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80" 
                  alt="Alex Johnson"
                  className="h-8 w-8 rounded-full mr-2"
                />
                <span className="text-sm text-gray-700">Alex Johnson</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">AI</span>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">Productivity</span>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">React</span>
              </div>
              
              <Link 
                to="/community/project/1"
                className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                View Project
              </Link>
            </div>
          </div>
        </div>
        
        <FilterBar />
        <ProjectFeed 
          categoryFilter={selectedCategory} 
          sortOption={sortOption} 
        />
      </main>
    </div>
  )
}

export default CommunityPage
