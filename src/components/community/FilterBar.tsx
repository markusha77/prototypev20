import React, { useState } from 'react'

export const FilterBar: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter)
  }
  
  return (
    <div className="mb-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeFilter === 'all'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => handleFilterChange('all')}
          >
            All Projects
          </button>
          
          <button
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeFilter === 'trending'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => handleFilterChange('trending')}
          >
            Trending
          </button>
          
          <button
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeFilter === 'new'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => handleFilterChange('new')}
          >
            New
          </button>
          
          <button
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeFilter === 'following'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => handleFilterChange('following')}
          >
            Following
          </button>
        </nav>
      </div>
    </div>
  )
}
