import React from 'react'
import { Link } from 'react-router-dom'

export const HeroSection: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Discover Amazing Projects</span>
            <span className="block">Built with ChatAndBuild</span>
          </h1>
          
          <p className="mt-4 text-xl text-indigo-100 max-w-2xl mx-auto">
            Explore a community of innovative projects created by developers like you.
            Get inspired, learn new techniques, and share your own creations.
          </p>
          
          <div className="mt-8 flex justify-center">
            <Link
              to="https://www.chatandbuild.com/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 shadow-md"
            >
              Start Building
            </Link>
            
            <Link
              to="/community/featured"
              className="ml-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 bg-opacity-30 hover:bg-opacity-40"
            >
              Featured Projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
