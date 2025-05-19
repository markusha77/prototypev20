import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Heart, MessageSquare, Share2, ExternalLink, Github, Calendar, Globe, Twitter, Linkedin, Eye } from 'lucide-react'
import { formatDate } from '../../utils/dateUtils'
import { Navbar } from './Navbar'
import { saveScrollPosition } from '../../utils/scrollUtils'
import useContentLoader from '../../hooks/useContentLoader'
import LoadingIndicator from '../common/LoadingIndicator'
import BackToProjectsButton from '../navigation/BackToProjectsButton'

// Mock comments data
const mockComments = [
  {
    id: 'c1',
    author: {
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
    },
    content: 'This is such an innovative project! I love how you approached the UI design. Have you considered adding dark mode support?',
    date: '2023-10-05T14:30:00Z',
    likes: 8
  },
  {
    id: 'c2',
    author: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
    },
    content: 'I\'ve been looking for something exactly like this. The data visualization is really impressive. Would love to see how it handles larger datasets.',
    date: '2023-10-04T09:15:00Z',
    likes: 5
  },
  {
    id: 'c3',
    author: {
      name: 'Sophia Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
    },
    content: 'Great work! I tried the demo and it works flawlessly. The performance optimization is really noticeable compared to similar tools.',
    date: '2023-10-03T16:45:00Z',
    likes: 12
  },
  {
    id: 'c4',
    author: {
      name: 'James Wilson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
    },
    content: 'I\'m curious about the tech stack you used. Did you encounter any challenges with state management?',
    date: '2023-10-02T11:20:00Z',
    likes: 3
  }
];

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>()
  const navigate = useNavigate()
  const [liked, setLiked] = useState(false)
  
  // Use the content loader hook to manage loading state and scrolling
  const { 
    isLoading, 
    isContentReady, 
    contentStyle, 
    prepareContent 
  } = useContentLoader({
    scrollToTop: true,
    scrollDelay: 100,
    loadingDelay: 200,
    fadeInDuration: 300
  })
  
  // Trigger content preparation when component mounts or projectId changes
  useEffect(() => {
    prepareContent()
  }, [projectId, prepareContent])

  // This would normally come from an API or context
  // For now, we'll use mock data based on the projectId
  const projects = [
    {
      id: '1',
      title: 'Interactive Data Visualization Tool',
      description: 'Transform complex datasets into beautiful, interactive visualizations with no coding required.',
      longDescription: 'Transform complex datasets into beautiful, interactive visualizations with no coding required. This project was created to showcase the capabilities of AI in everyday applications.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      author: {
        name: 'Natalie Wong',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
        bio: 'AI Developer & UX Designer',
        description: 'Passionate about creating intuitive, AI-powered applications that solve real-world problems. Specializes in user-centered design and modern web technologies.'
      },
      likes: 433,
      comments: 4,
      views: 1967,
      remixes: 42,
      tags: ['Data', 'Visualization', 'No-Code'],
      demoUrl: 'https://example.com/demo',
      githubUrl: 'https://github.com/example/data-viz-tool',
      websiteUrl: 'https://example.com',
      twitterUrl: 'https://twitter.com/example',
      linkedinUrl: 'https://linkedin.com/in/example',
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'AI', 'Data', 'Visualization', 'No-Code'],
      screenshots: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      ],
      createdAt: '2023-10-08T10:30:00Z',
      lastUpdated: '2023-10-08T10:30:00Z',
      lastComment: '2023-10-06T10:30:00Z',
      followers: 324
    },
    {
      id: '2',
      title: 'Virtual Reality Meditation Space',
      description: 'A VR application that creates immersive meditation environments with guided sessions and biofeedback integration.',
      longDescription: 'This VR meditation application transports users to serene natural environments designed specifically for mindfulness practice. It features guided meditation sessions led by experienced instructors, ambient soundscapes recorded in 3D audio, and optional biofeedback integration via compatible wearables. The app adapts the environment based on the user\'s stress levels and meditation goals, creating a truly personalized experience.',
      image: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      author: {
        name: 'Maya Patel',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
        bio: 'XR developer and meditation practitioner. Creating technology that enhances mental wellbeing and mindfulness.'
      },
      likes: 89,
      comments: 4,
      views: 842,
      remixes: 15,
      tags: ['VR', 'Wellness', 'Unity'],
      demoUrl: 'https://example.com/vr-demo',
      githubUrl: 'https://github.com/example/vr-meditation',
      techStack: ['Unity', 'C#', 'Oculus SDK', 'Bluetooth LE'],
      screenshots: [
        'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      ],
      createdAt: '2023-07-22T14:45:00Z',
      lastUpdated: '2023-09-15T08:30:00Z',
      lastComment: '2023-09-10T14:20:00Z',
      followers: 78
    },
    {
      id: '3',
      title: 'Sustainable Food Delivery Platform',
      description: 'An eco-friendly food delivery service that connects users with local restaurants using zero-waste packaging.',
      longDescription: 'This platform revolutionizes food delivery by prioritizing sustainability at every step. It partners exclusively with restaurants committed to eco-friendly practices and uses a fleet of electric bikes and vehicles for delivery. All meals are packaged in compostable or reusable containers, and customers can opt into a container return program for additional discounts. The app also calculates and displays the carbon footprint saved with each order compared to traditional delivery services.',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      author: {
        name: 'Carlos Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
        bio: 'Environmental engineer turned developer. Building tech solutions for a more sustainable future.'
      },
      likes: 56,
      comments: 4,
      views: 635,
      remixes: 8,
      tags: ['Sustainability', 'Food', 'Mobile App'],
      demoUrl: 'https://example.com/eco-food-demo',
      githubUrl: 'https://github.com/example/eco-food-delivery',
      techStack: ['React Native', 'Firebase', 'Google Maps API', 'Stripe'],
      screenshots: [
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1488900128323-21503983a07e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      ],
      createdAt: '2023-08-05T09:15:00Z',
      lastUpdated: '2023-08-20T16:45:00Z',
      lastComment: '2023-08-18T11:30:00Z',
      followers: 42
    },
    {
      id: '4',
      title: 'Collaborative Music Creation Tool',
      description: 'A web platform that allows musicians to collaborate remotely on tracks with real-time editing and mixing capabilities.',
      longDescription: 'This collaborative platform enables musicians around the world to create together in real-time. It features a multi-track audio editor with version control, real-time collaboration tools, and integrated video chat. Musicians can record directly in the browser, import existing tracks, and apply professional-grade effects. The platform handles latency intelligently to ensure a smooth jamming experience even across continents. Finished projects can be exported in various formats or published directly to streaming platforms.',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      author: {
        name: 'Jamie Lee',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
        bio: 'Audio engineer and web developer. Creating tools that make music production more accessible and collaborative.'
      },
      likes: 210,
      comments: 4,
      views: 1243,
      remixes: 27,
      tags: ['Music', 'Collaboration', 'Web Audio'],
      demoUrl: 'https://example.com/music-collab-demo',
      githubUrl: 'https://github.com/example/music-collab',
      techStack: ['WebRTC', 'Web Audio API', 'React', 'WebSockets', 'AWS'],
      screenshots: [
        'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1507838153414-b4b713384a76?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1513829596324-4bb2800c5efb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      ],
      createdAt: '2023-09-12T16:20:00Z',
      lastUpdated: '2023-10-05T09:15:00Z',
      lastComment: '2023-10-01T14:30:00Z',
      followers: 156
    },
    {
      id: '5',
      title: 'Smart Home Energy Monitor',
      description: 'An IoT device and companion app that tracks and optimizes home energy usage with AI-powered recommendations.',
      longDescription: 'This comprehensive energy monitoring system combines hardware sensors with intelligent software to give homeowners unprecedented insight into their energy consumption. The system identifies energy-hungry appliances, detects inefficient usage patterns, and provides actionable recommendations for reducing consumption. The AI learns from your habits and automatically adjusts connected smart home devices to optimize energy usage without sacrificing comfort. Users typically see 15-30% reduction in energy bills within the first three months.',
      image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      author: {
        name: 'Sarah Kim',
        avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
        bio: 'IoT specialist and clean energy advocate. Building smart solutions for more efficient and sustainable homes.'
      },
      likes: 76,
      comments: 4,
      views: 521,
      remixes: 11,
      tags: ['IoT', 'Energy', 'Sustainability'],
      demoUrl: 'https://example.com/energy-monitor-demo',
      githubUrl: 'https://github.com/example/smart-energy',
      techStack: ['ESP32', 'MQTT', 'TensorFlow Lite', 'React Native', 'AWS IoT'],
      screenshots: [
        'https://images.unsplash.com/photo-1558449028-b53a39d100fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1584267385494-9fdd9a71ad75?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      ],
      createdAt: '2023-10-03T11:05:00Z',
      lastUpdated: '2023-10-10T08:45:00Z',
      lastComment: '2023-10-08T16:20:00Z',
      followers: 63
    },
    {
      id: '6',
      title: 'Augmented Reality Language Learning',
      description: 'An AR app that helps users learn new languages by overlaying translations and pronunciation guides on real-world objects.',
      longDescription: 'This innovative language learning application uses augmented reality to make vocabulary acquisition intuitive and contextual. Users simply point their camera at objects around them, and the app identifies the items and displays their names in the target language, complete with pronunciation guides. The spaced repetition system tracks which words you\'ve learned and which need review, creating a personalized learning experience. The app supports 12 languages with plans to add more based on user demand.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      author: {
        name: 'David Chen',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
        bio: 'AR/VR developer and language enthusiast. Creating immersive educational experiences through technology.'
      },
      likes: 143,
      comments: 4,
      views: 978,
      remixes: 19,
      tags: ['AR', 'Education', 'Mobile App'],
      demoUrl: 'https://example.com/ar-language-demo',
      githubUrl: 'https://github.com/example/ar-language',
      techStack: ['ARKit', 'ARCore', 'Unity', 'ML Kit', 'Firebase'],
      screenshots: [
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      ],
      createdAt: '2023-11-18T13:40:00Z',
      lastUpdated: '2023-11-25T10:15:00Z',
      lastComment: '2023-11-22T09:30:00Z',
      followers: 92
    }
  ]

  const project = projects.find(p => p.id === projectId)

  if (!project) {
    return (
      <div>
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Project not found</h2>
            <BackToProjectsButton 
              variant="default"
              size="md"
            />
          </div>
        </div>
      </div>
    )
  }

  const handleLike = () => {
    setLiked(!liked);
  };

  // Show loading indicator while content is being prepared
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <LoadingIndicator 
            size="md" 
            color="indigo" 
            message="Loading project details..." 
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <Navbar />
      
      {/* Main content with fade-in effect */}
      <div style={contentStyle} className="max-w-4xl mx-auto px-4 py-8">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-6 mb-8 text-white">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl font-bold">{project.title}</h1>
            <div className="flex items-center space-x-2">
              <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                {project.category || project.tags[0]}
              </span>
            </div>
          </div>
          <p className="mt-2 text-indigo-100 max-w-2xl">{project.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span 
                key={tag}
                className="px-2 py-1 bg-white bg-opacity-10 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        {/* Back button - Using our new component */}
        <div className="mb-6">
          <BackToProjectsButton 
            variant="text"
            size="md"
            className="transition-all duration-200 hover:translate-x-[-4px]"
          />
        </div>
        
        {/* Project header */}
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <img 
              src={project.author.avatar} 
              alt={project.author.name}
              className="h-10 w-10 rounded-full mr-3"
            />
            <div>
              <p className="font-medium text-gray-900">{project.author.name}</p>
              <p className="text-sm text-gray-500">{project.author.bio}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span 
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center space-x-6 text-gray-500">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span className="text-sm">Created {formatDate(project.createdAt)}</span>
            </div>
            
            {project.lastUpdated && (
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span className="text-sm">Updated {formatDate(project.lastUpdated)}</span>
              </div>
            )}
            
            <div className="flex items-center">
              <Eye className="h-4 w-4 mr-1" />
              <span className="text-sm">{project.views} views</span>
            </div>
          </div>
        </div>
        
        {/* Main image */}
        <div className="mb-8 rounded-lg overflow-hidden shadow-md">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-auto"
            onError={(e) => {
              // Fallback image if the project image fails to load
              e.currentTarget.src = "https://images.unsplash.com/photo-1555421689-3f034debb7a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
            }}
          />
        </div>
        
        {/* Project details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2">
            <h2 className="text-xl font-bold text-gray-900 mb-4">About this project</h2>
            <div className="prose prose-indigo max-w-none">
              <p className="text-gray-700 mb-6">{project.longDescription}</p>
            </div>
            
            {project.techStack && project.techStack.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Technologies used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {project.screenshots && project.screenshots.length > 1 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Screenshots</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.screenshots.slice(1).map((screenshot, index) => (
                    <div key={index} className="rounded-lg overflow-hidden shadow-sm">
                      <img 
                        src={screenshot} 
                        alt={`${project.title} screenshot ${index + 1}`}
                        className="w-full h-auto"
                        onError={(e) => {
                          // Fallback image if screenshot fails to load
                          e.currentTarget.src = "https://images.unsplash.com/photo-1555421689-3f034debb7a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Stats</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Likes</span>
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 mr-1 text-red-500" />
                    <span>{project.likes}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Comments</span>
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-1 text-blue-500" />
                    <span>{project.comments}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Views</span>
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1 text-green-500" />
                    <span>{project.views}</span>
                  </div>
                </div>
                
                {project.remixes !== undefined && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Remixes</span>
                    <span>{project.remixes}</span>
                  </div>
                )}
                
                {project.followers !== undefined && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Followers</span>
                    <span>{project.followers}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Links</h3>
              
              <div className="space-y-3">
                {project.demoUrl && (
                  <a 
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-indigo-600 hover:text-indigo-800"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    <span>Live Demo</span>
                  </a>
                )}
                
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-indigo-600 hover:text-indigo-800"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    <span>Source Code</span>
                  </a>
                )}
                
                {project.websiteUrl && (
                  <a 
                    href={project.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-indigo-600 hover:text-indigo-800"
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    <span>Website</span>
                  </a>
                )}
                
                {project.twitterUrl && (
                  <a 
                    href={project.twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-indigo-600 hover:text-indigo-800"
                  >
                    <Twitter className="h-4 w-4 mr-2" />
                    <span>Twitter</span>
                  </a>
                )}
                
                {project.linkedinUrl && (
                  <a 
                    href={project.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-indigo-600 hover:text-indigo-800"
                  >
                    <Linkedin className="h-4 w-4 mr-2" />
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Comments section */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Comments ({mockComments.length})</h2>
          
          <div className="space-y-6">
            {mockComments.map((comment) => (
              <div key={comment.id} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-start">
                  <img 
                    src={comment.author.avatar} 
                    alt={comment.author.name}
                    className="h-10 w-10 rounded-full mr-3"
                    onError={(e) => {
                      // Fallback avatar if the comment author avatar fails to load
                      e.currentTarget.src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80";
                    }}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-medium text-gray-900">{comment.author.name}</h4>
                      <span className="text-xs text-gray-500">{formatDate(comment.date)}</span>
                    </div>
                    <p className="text-gray-700 text-sm">{comment.content}</p>
                    <div className="mt-2 flex items-center">
                      <button className="text-gray-500 hover:text-indigo-600 text-xs flex items-center">
                        <Heart className="h-3 w-3 mr-1" />
                        <span>{comment.likes}</span>
                      </button>
                      <button className="ml-4 text-gray-500 hover:text-indigo-600 text-xs">Reply</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Comment form */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Leave a comment</h3>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <textarea 
                className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                rows={4}
                placeholder="Share your thoughts about this project..."
              ></textarea>
              <div className="mt-3 flex justify-end">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium">
                  Post Comment
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-center space-x-6 md:hidden">
          <button 
            onClick={handleLike}
            className={`flex flex-col items-center ${liked ? 'text-red-500' : 'text-gray-500'}`}
          >
            <Heart className="h-6 w-6" fill={liked ? "currentColor" : "none"} />
            <span className="text-xs mt-1">Like</span>
          </button>
          
          <button className="flex flex-col items-center text-gray-500">
            <MessageSquare className="h-6 w-6" />
            <span className="text-xs mt-1">Comment</span>
          </button>
          
          <button className="flex flex-col items-center text-gray-500">
            <Share2 className="h-6 w-6" />
            <span className="text-xs mt-1">Share</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail
