import React from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, Bell, User } from 'lucide-react'
import logo from '../../assets/logo.svg'

export const Navbar: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="ChatAndBuild Logo" className="h-8 w-8 mr-2" />
              <span className="text-xl font-bold text-indigo-600">ChatAndBuild</span>
            </Link>
            
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              <Link to="/community" className="text-gray-900 font-medium hover:text-indigo-600 px-3 py-2 rounded-md">
                Community
              </Link>
              
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
  )
}
