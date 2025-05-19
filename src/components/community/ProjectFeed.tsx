import React, { useState, useEffect } from 'react'
import { ProjectCard } from './ProjectCard'
import { getProjectViewCount } from '../../utils/viewCountUtils'

interface ProjectFeedProps {
  categoryFilter?: string;
  sortOption?: string;
  filterType?: string;
}

export const ProjectFeed: React.FC<ProjectFeedProps> = ({ 
  categoryFilter = 'All Categories', 
  sortOption = 'Most Recent',
  filterType = 'all'
}) => {
  // Mock data for projects
  const allProjects = [
    {
      id: '1',
      title: 'AI-Powered Task Manager',
      description: 'A task management app that uses AI to prioritize and suggest tasks based on your work patterns and deadlines.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      author: {
        name: 'Alex Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80'
      },
      likes: 124,
      comments: 18,
      views: 1967,
      tags: ['AI', 'Productivity', 'React'],
      category: 'Web Development',
      createdAt: '2023-05-15T10:30:00Z'
    },
    {
      id: '2',
      title: 'Virtual Reality Meditation Space',
      description: 'A VR application that creates immersive meditation environments with guided sessions and biofeedback integration.',
      image: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      author: {
        name: 'Maya Patel',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80'
      },
      likes: 89,
      comments: 7,
      views: 842,
      tags: ['VR', 'Wellness', 'Unity'],
      category: 'Game Development',
      createdAt: '2023-06-20T14:45:00Z'
    },
    {
      id: '3',
      title: 'Sustainable Food Delivery Platform',
      description: 'An eco-friendly food delivery service that connects users with local restaurants using zero-waste packaging.',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      author: {
        name: 'Carlos Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80'
      },
      likes: 56,
      comments: 12,
      views: 635,
      tags: ['Sustainability', 'Food', 'Mobile App'],
      category: 'Mobile Development',
      createdAt: '2023-01-10T09:15:00Z'
    },
    {
      id: '4',
      title: 'Collaborative Music Creation Tool',
      description: 'A web platform that allows musicians to collaborate remotely on tracks with real-time editing and mixing capabilities.',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      author: {
        name: 'Jamie Lee',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80'
      },
      likes: 210,
      comments: 34,
      views: 1243,
      tags: ['Music', 'Collaboration', 'Web Audio'],
      category: 'Web Development',
      createdAt: '2023-04-05T16:20:00Z'
    },
    {
      id: '5',
      title: 'Smart Home Energy Monitor',
      description: 'An IoT device and companion app that tracks and optimizes home energy usage with AI-powered recommendations.',
      image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      author: {
        name: 'Sarah Kim',
        avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80'
      },
      likes: 76,
      comments: 9,
      views: 528,
      tags: ['IoT', 'Energy', 'Sustainability'],
      category: 'IoT',
      createdAt: '2023-03-12T11:40:00Z'
    },
    {
      id: '6',
      title: 'Augmented Reality Language Learning',
      description: 'An AR app that helps users learn new languages by overlaying translations and pronunciation guides on real-world objects.',
      image: 'https://images.unsplash.com/photo-1546777701-8ef25158125a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      author: {
        name: 'David Chen',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80'
      },
      likes: 143,
      comments: 21,
      views: 976,
      tags: ['AR', 'Education', 'Mobile App'],
      category: 'Mobile Development',
      createdAt: '2023-07-01T08:30:00Z'
    }
  ]

  const [filteredProjects, setFilteredProjects] = useState(allProjects)

  // Update projects with view counts from local storage
  const projectsWithUpdatedViews = allProjects.map(project => {
    const storedViews = getProjectViewCount(project.id);
    return {
      ...project,
      views: storedViews > 0 ? storedViews : project.views
    };
  });

  useEffect(() => {
    let result = [...projectsWithUpdatedViews]
    
    // Apply category filter
    if (categoryFilter !== 'All Categories') {
      result = result.filter(project => project.category === categoryFilter)
    }
    
    // Apply filter type
    if (filterType === 'trending') {
      result = result.sort((a, b) => b.likes - a.likes)
    } else if (filterType === 'new') {
      result = result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }
    
    // Apply sort option
    if (sortOption === 'Most Recent') {
      result = result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    } else if (sortOption === 'Most Popular') {
      result = result.sort((a, b) => b.likes - a.likes)
    } else if (sortOption === 'Most Commented') {
      result = result.sort((a, b) => b.comments - a.comments)
    } else if (sortOption === 'Most Viewed') {
      result = result.sort((a, b) => (b.views || 0) - (a.views || 0))
    }
    
    setFilteredProjects(result)
  }, [categoryFilter, sortOption, filterType])

  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No projects found matching your criteria.</p>
          <p className="text-gray-400">Try adjusting your filters or categories.</p>
        </div>
      )}
    </div>
  )
}
