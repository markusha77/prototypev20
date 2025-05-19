import React from 'react'
import { Users, MessageSquare, Code } from 'lucide-react'

export const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Users className="h-8 w-8 text-indigo-600" />
          <span className="font-bold text-xl text-gray-900">ChatAndBuild Community Spaces</span>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center text-gray-600 hover:text-gray-900">
            <MessageSquare className="h-5 w-5 mr-1" />
            <span>Help</span>
          </button>
          <button className="flex items-center text-gray-600 hover:text-gray-900">
            <Code className="h-5 w-5 mr-1" />
            <span>Docs</span>
          </button>
        </div>
      </div>
    </header>
  )
}
