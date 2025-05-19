import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { restoreScrollPosition, hasScrollPosition, clearScrollPosition } from '../../utils/scrollUtils'
import useContentLoader from '../../hooks/useContentLoader'
import LoadingIndicator from '../common/LoadingIndicator'
import ProjectCard from './ProjectCard'

interface Project {
  id: string
  title: string
  description: string
  image: string
  author: {
    name: string
    avatar: string
  }
  likes: number
  comments: number
  tags: string[]
}

interface ProjectListProps {
  projects: Project[]
  title?: string
  emptyMessage?: string
}

const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  title = 'Community Projects',
  emptyMessage = 'No projects found'
}) => {
  const navigate = useNavigate()
  
  // Use the content loader hook to manage loading state and scrolling
  const { 
    isLoading, 
    isContentReady, 
    contentStyle, 
    prepareContent 
  } = useContentLoader({
    scrollToTop: false, // Don't scroll to top automatically
    loadingDelay: 100,
    fadeInDuration: 200
  })
  
  // Check for saved scroll position and restore it if exists
  useEffect(() => {
    const scrollPositionKey = 'scrollPosition-/community'
    
    // Use a small timeout to ensure the component is fully mounted
    const timer = setTimeout(() => {
      if (hasScrollPosition(scrollPositionKey)) {
        // Show loading state while we prepare to restore scroll position
        prepareContent()
        
        // Restore the scroll position
        restoreScrollPosition(scrollPositionKey)
        
        // Clear the saved position after restoring
        clearScrollPosition(scrollPositionKey)
      } else {
        // No saved position, just show content normally
        prepareContent()
      }
    }, 0);
    
    return () => clearTimeout(timer);
  }, [prepareContent])
  
  const handleProjectClick = (projectId: string) => {
    navigate(`/community/project/${projectId}`)
  }
  
  // Show loading indicator while content is being prepared
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingIndicator 
          size="md" 
          color="indigo" 
          message="Loading projects..." 
        />
      </div>
    )
  }

  return (
    <div style={contentStyle}>
      {title && (
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      )}
      
      {projects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">{emptyMessage}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => handleProjectClick(project.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProjectList
