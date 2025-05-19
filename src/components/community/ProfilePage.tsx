import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowUp, 
  Share2, 
  Code, 
  Calendar, 
  User, 
  Tag, 
  ExternalLink, 
  Github, 
  Twitter, 
  Linkedin, 
  Globe, 
  Clock, 
  MessageSquare,
  Users,
  Send,
  Plus,
  BookOpen,
  Briefcase,
  Compass,
  Cpu,
  Edit3,
  Filter,
  Layers,
  BarChart2,
  ChevronDown,
  MessageCircle,
  Eye
} from 'lucide-react';
import { mockProjects } from '../data/mockProjects';
import { Project, SortOption } from '../types';

interface ProfilePageProps {
  projectId?: string;
  onBackClick: () => void;
  previousPath?: string;
  onProfileClick?: (userId: string) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ 
  projectId, 
  onBackClick, 
  previousPath,
  onProfileClick 
}) => {
  const [project, setProject] = useState<Project | null>(null);
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [upvotes, setUpvotes] = useState(0);
  const [remixCount, setRemixCount] = useState(42); // Mock data
  const [isLoading, setIsLoading] = useState(true);
  const [followersCount, setFollowersCount] = useState(324); // Mock data
  const [isFollowing, setIsFollowing] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [userProjects, setUserProjects] = useState<Project[]>([]);
  const [showProjectDetail, setShowProjectDetail] = useState(false);
  const [comments, setComments] = useState([
    {
      id: '1',
      author: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      text: 'This is an amazing project! I love how you implemented the AI features.',
      date: '2 days ago',
      likes: 12
    },
    {
      id: '2',
      author: 'Sarah Miller',
      avatar: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      text: 'Would love to see how this could be integrated with other productivity tools.',
      date: '1 week ago',
      likes: 8
    }
  ]);

  // User profile data
  const userProfile = {
    id: 'user123',
    name: 'David Chen',
    username: '@davidchen',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    banner: 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    bio: 'AI Developer & UX Designer. Building innovative solutions at the intersection of artificial intelligence and human-centered design.',
    location: 'San Francisco, CA',
    joinDate: '2022-05-15T14:48:00.000Z',
    viewCount: 2547,
    interests: [
      { name: 'AI Development', icon: <Cpu /> },
      { name: 'UX Design', icon: <Edit3 /> },
      { name: 'Web Development', icon: <Code /> },
      { name: 'Data Visualization', icon: <BarChart2 /> }
    ],
    subcommunities: [
      { name: 'AI Builders', members: 1243 },
      { name: 'UX Collective', members: 856 },
      { name: 'Web3 Explorers', members: 512 }
    ],
    socialLinks: {
      website: 'https://davidchen.dev',
      github: 'https://github.com/davidchen',
      twitter: 'https://twitter.com/davidchen',
      linkedin: 'https://linkedin.com/in/davidchen'
    }
  };

  useEffect(() => {
    // Simulate API call to fetch user projects
    const fetchUserProjects = async () => {
      setIsLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Get 5 random projects as user projects
      const randomProjects = [...mockProjects]
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);
      
      setUserProjects(randomProjects);
      setIsLoading(false);
    };
    
    fetchUserProjects();
  }, []);

  useEffect(() => {
    // If projectId is provided, fetch and show project details
    if (projectId) {
      const fetchProject = async () => {
        setIsLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const foundProject = mockProjects.find(p => p.id === projectId);
        if (foundProject) {
          setProject(foundProject);
          setUpvotes(foundProject.metrics.upvotes);
          setShowProjectDetail(true);
        }
        
        setIsLoading(false);
      };
      
      fetchProject();
    } else {
      setShowProjectDetail(false);
    }
  }, [projectId]);

  const handleUpvote = () => {
    if (isUpvoted) {
      setUpvotes(upvotes - 1);
    } else {
      setUpvotes(upvotes + 1);
    }
    setIsUpvoted(!isUpvoted);
  };

  const handleCommentUpvote = (commentId: string) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.likes + 1
        };
      }
      return comment;
    }));
  };

  const handleFollow = () => {
    if (isFollowing) {
      setFollowersCount(followersCount - 1);
    } else {
      setFollowersCount(followersCount + 1);
    }
    setIsFollowing(!isFollowing);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment = {
      id: `${comments.length + 1}`,
      author: 'You',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      text: commentText,
      date: 'Just now',
      likes: 0
    };

    setComments([newComment, ...comments]);
    setCommentText('');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(date);
  };

  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
    
    // Sort projects based on selected option
    let sortedProjects = [...userProjects];
    
    switch(option) {
      case 'newest':
        sortedProjects.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'most_upvoted':
        sortedProjects.sort((a, b) => b.metrics.upvotes - a.metrics.upvotes);
        break;
      case 'most_commented':
        sortedProjects.sort((a, b) => b.metrics.comments - a.metrics.comments);
        break;
      case 'most_visited':
        sortedProjects.sort((a, b) => b.metrics.visits - a.metrics.visits);
        break;
      default:
        break;
    }
    
    setUserProjects(sortedProjects);
  };

  // Handle back button click with context awareness
  const handleBackButtonClick = () => {
    if (showProjectDetail && previousPath === 'profile') {
      // If we're viewing a project and came from profile, go back to profile
      setShowProjectDetail(false);
    } else {
      // Otherwise use the parent component's back handler
      onBackClick();
    }
  };

  // Handle builder profile click
  const handleBuilderProfileClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onProfileClick && project) {
      // In a real app, you would pass the builder's ID
      onProfileClick('user123');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="flex space-x-1 items-center">
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
          </div>
          <span className="mt-4 text-neutral-600">Loading...</span>
        </div>
      </div>
    );
  }

  // If showing project detail
  if (showProjectDetail && project) {
    return (
      <div className="animate-fade-in">
        {/* Back button */}
        <button 
          onClick={handleBackButtonClick}
          className="mb-6 inline-flex items-center text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back to {previousPath === 'profile' ? 'profile' : 'projects'}</span>
        </button>
        
        {/* Project title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">{project.title}</h1>
          <div className="flex items-center text-neutral-500 text-sm">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Created on {formatDate(project.createdAt)}</span>
            <span className="mx-2">•</span>
            <span>{project.metrics.visits} views</span>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column - Project preview */}
          <div className="w-full lg:w-7/12">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-w-16 aspect-h-9 bg-neutral-100">
                <img 
                  src={project.thumbnail} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback for failed image loads
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/800x450?text=Project+Preview';
                    target.onerror = null;
                  }}
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-neutral-900 mb-2">Project Preview</h2>
                    <p className="text-neutral-600">
                      This is an interactive preview of the project. You can explore its features and functionality.
                    </p>
                  </div>
                  <button 
                    className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors duration-200 shadow-sm"
                  >
                    Open Full Preview
                  </button>
                </div>
                
                <div className="border-t border-neutral-200 pt-4">
                  <h3 className="text-lg font-medium text-neutral-900 mb-3">Project Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-neutral-600">
                      <MessageSquare className="h-4 w-4 mr-2 text-neutral-400" />
                      <span>Last comment 2 days ago</span>
                    </div>
                    <div className="flex items-center text-sm text-neutral-600">
                      <Clock className="h-4 w-4 mr-2 text-neutral-400" />
                      <span>Updated {formatDate(project.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Additional project details */}
            <div className="mt-6 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">Project Details</h2>
              <p className="text-neutral-700 mb-4">
                {project.description}
              </p>
              <p className="text-neutral-700 mb-4">
                This project demonstrates how AI can be leveraged to enhance productivity and streamline daily tasks. 
                The implementation uses modern web technologies and focuses on providing an intuitive user experience.
              </p>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium text-neutral-900 mb-3">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {['React', 'TypeScript', 'Tailwind CSS', 'AI', ...project.tags].map((tech, index) => (
                    <span 
                      key={index} 
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-neutral-100 text-neutral-800"
                    >
                      <Code className="h-3.5 w-3.5 mr-1.5" />
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Comments section */}
            <div className="mt-6 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">Comments</h2>
              
              {/* Comment form */}
              <form onSubmit={handleCommentSubmit} className="mb-6">
                <div className="flex items-start space-x-3">
                  <img 
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                    alt="Your avatar" 
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/40x40?text=You';
                      target.onerror = null;
                    }}
                  />
                  <div className="flex-1">
                    <textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Add a comment..."
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 min-h-[80px]"
                    />
                    <div className="flex justify-end mt-2">
                      <button 
                        type="submit"
                        className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors duration-200 shadow-sm"
                        disabled={!commentText.trim()}
                      >
                        <Send className="h-4 w-4 mr-1.5" />
                        Post Comment
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              
              {/* Comments list */}
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-3">
                    <img 
                      src={comment.avatar} 
                      alt={comment.author} 
                      className="w-10 h-10 rounded-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/40x40?text=User';
                        target.onerror = null;
                      }}
                    />
                    <div className="flex-1">
                      <div className="bg-neutral-50 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-neutral-900">{comment.author}</span>
                          <span className="text-xs text-neutral-500">{comment.date}</span>
                        </div>
                        <p className="text-neutral-700">{comment.text}</p>
                      </div>
                      <div className="flex items-center mt-1 text-xs text-neutral-500">
                        <button 
                          className="flex items-center hover:text-primary-600 transition-colors duration-200"
                          onClick={() => handleCommentUpvote(comment.id)}
                        >
                          <ArrowUp className="h-3.5 w-3.5 mr-1" />
                          <span>{comment.likes} upvotes</span>
                        </button>
                        <span className="mx-2">•</span>
                        <button className="hover:text-primary-600 transition-colors duration-200">Reply</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right column - Project info */}
          <div className="w-full lg:w-5/12 space-y-6">
            {/* About this project */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">About this project</h2>
              <p className="text-neutral-700 mb-4">
                {project.description} This project was created to showcase the capabilities of AI in everyday applications.
              </p>
              
              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={handleUpvote}
                    className={`flex items-center space-x-1 px-3 py-1.5 rounded-md border ${isUpvoted ? 'border-accent-500 bg-accent-50 text-accent-600' : 'border-neutral-300 hover:bg-neutral-50'} transition-colors duration-200`}
                  >
                    <ArrowUp className="h-4 w-4" />
                    <span>{upvotes}</span>
                  </button>
                  
                  <button className="flex items-center space-x-1 px-3 py-1.5 rounded-md border border-neutral-300 hover:bg-neutral-50 transition-colors duration-200">
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </button>
                </div>
                
                <button className="flex items-center space-x-1 px-3 py-1.5 rounded-md bg-accent-500 text-white hover:bg-accent-600 transition-colors duration-200 shadow-sm">
                  <span>Remix</span>
                  <span className="ml-1 bg-white/20 px-1.5 py-0.5 rounded text-xs">{remixCount}</span>
                </button>
              </div>
            </div>
            
            {/* Project categories */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-neutral-900 mb-3">Project Categories</h2>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-neutral-100 text-neutral-800 hover:bg-neutral-200 transition-colors duration-200 cursor-pointer"
                  >
                    <Tag className="h-3.5 w-3.5 mr-1.5" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* About the builder */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-neutral-900 mb-4">About the builder</h2>
              <div className="flex items-center mb-4">
                <div 
                  onClick={handleBuilderProfileClick}
                  className="cursor-pointer hover:opacity-90 transition-opacity duration-200"
                >
                  <img 
                    src={project.builder.avatar} 
                    alt={project.builder.name} 
                    className="w-12 h-12 rounded-full mr-3 object-cover border-2 border-white shadow-sm"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/48x48?text=Builder';
                      target.onerror = null;
                    }}
                  />
                </div>
                <div>
                  <h3 
                    onClick={handleBuilderProfileClick}
                    className="font-medium text-neutral-900 hover:text-primary-600 cursor-pointer transition-colors duration-200"
                  >
                    {project.builder.name}
                  </h3>
                  <p className="text-sm text-neutral-500">AI Developer & UX Designer</p>
                </div>
              </div>
              
              <p className="text-neutral-700 mb-4">
                Passionate about creating intuitive AI-powered applications that solve real-world problems.
                Specializes in user-centered design and modern web technologies.
              </p>
              
              {/* Builder links */}
              <div className="flex flex-wrap gap-3 mb-4">
                <a 
                  href="#" 
                  className="flex items-center text-neutral-700 hover:text-primary-600 transition-colors duration-200"
                >
                  <Globe className="h-4 w-4 mr-1.5 text-neutral-500" />
                  <span>Website</span>
                </a>
                <a 
                  href="#" 
                  className="flex items-center text-neutral-700 hover:text-primary-600 transition-colors duration-200"
                >
                  <Github className="h-4 w-4 mr-1.5 text-neutral-500" />
                  <span>GitHub</span>
                </a>
                <a 
                  href="#" 
                  className="flex items-center text-neutral-700 hover:text-primary-600 transition-colors duration-200"
                >
                  <Twitter className="h-4 w-4 mr-1.5 text-neutral-500" />
                  <span>Twitter</span>
                </a>
                <a 
                  href="#" 
                  className="flex items-center text-neutral-700 hover:text-primary-600 transition-colors duration-200"
                >
                  <Linkedin className="h-4 w-4 mr-1.5 text-neutral-500" />
                  <span>LinkedIn</span>
                </a>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-neutral-700">
                  <Users className="h-4 w-4 mr-1.5 text-neutral-500" />
                  <span className="text-sm">{followersCount} followers</span>
                </div>
                <button 
                  onClick={handleFollow}
                  className={`text-sm px-3 py-1 border rounded-md transition-colors duration-200 ${
                    isFollowing 
                      ? 'border-primary-500 bg-primary-50 text-primary-600' 
                      : 'border-neutral-300 hover:bg-neutral-50 text-neutral-700'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>
            </div>
            
            {/* Project stats */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-neutral-900 mb-3">Project Stats</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-neutral-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-primary-600">{upvotes}</div>
                  <div className="text-sm text-neutral-600">Upvotes</div>
                </div>
                <div className="bg-neutral-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-primary-600">{remixCount}</div>
                  <div className="text-sm text-neutral-600">Remixes</div>
                </div>
                <div className="bg-neutral-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-primary-600">{comments.length}</div>
                  <div className="text-sm text-neutral-600">Comments</div>
                </div>
                <div className="bg-neutral-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-primary-600">{project.metrics.visits}</div>
                  <div className="text-sm text-neutral-600">Views</div>
                </div>
              </div>
            </div>
            
            {/* Activity section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-neutral-500">
                  <Clock className="h-4 w-4 inline mr-1.5" />
                  <span>Last updated: {formatDate(project.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // User profile view (default)
  return (
    <div className="animate-fade-in max-w-7xl mx-auto">
      {/* Back button */}
      <button 
        onClick={onBackClick}
        className="mb-6 inline-flex items-center text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        <span>Back to home</span>
      </button>
      
      {/* Profile header with banner */}
      <div className="relative mb-8">
        {/* Banner image */}
        <div className="h-48 md:h-64 w-full rounded-xl overflow-hidden bg-gradient-to-r from-primary-500 to-accent-500">
          <img 
            src={userProfile.banner} 
            alt="Profile banner" 
            className="w-full h-full object-cover opacity-80"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/1200x400?text=Profile+Banner';
              target.onerror = null;
            }}
          />
        </div>
        
        {/* Profile info overlay */}
        <div className="absolute -bottom-16 left-0 right-0 px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-end">
            {/* Profile picture */}
            <div className="relative">
              <img 
                src={userProfile.avatar} 
                alt={userProfile.name} 
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-md object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/128x128?text=User';
                  target.onerror = null;
                }}
              />
            </div>
            
            {/* Profile text info */}
            <div className="mt-4 md:mt-0 md:ml-6 flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-neutral-900">{userProfile.name}</h1>
              <p className="text-neutral-600">{userProfile.username}</p>
            </div>
            
            {/* Profile actions */}
            <div className="mt-4 md:mt-0 flex items-center space-x-3">
              <div className="flex items-center text-neutral-700">
                <Users className="h-4 w-4 mr-1.5 text-neutral-500" />
                <span className="text-sm">{followersCount} followers</span>
                <span className="mx-2 text-neutral-300">•</span>
                <Eye className="h-4 w-4 mr-1.5 text-neutral-500" />
                <span className="text-sm">{userProfile.viewCount} views</span>
              </div>
              <button 
                onClick={handleFollow}
                className={`text-sm px-4 py-2 rounded-md transition-colors duration-200 ${
                  isFollowing 
                    ? 'bg-primary-50 text-primary-600 border border-primary-500' 
                    : 'bg-primary-600 text-white hover:bg-primary-700'
                }`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
              <button className="text-sm px-4 py-2 bg-neutral-100 text-neutral-700 rounded-md hover:bg-neutral-200 transition-colors duration-200">
                <MessageCircle className="h-4 w-4 inline mr-1.5" />
                Chat
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content with spacing for profile picture */}
      <div className="mt-20 md:mt-16">
        {/* Bio section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <p className="text-neutral-700">{userProfile.bio}</p>
          <div className="flex flex-wrap items-center mt-4 text-sm text-neutral-600">
            <div className="flex items-center mr-4">
              <Calendar className="h-4 w-4 mr-1.5 text-neutral-400" />
              <span>Joined {formatDate(userProfile.joinDate)}</span>
            </div>
            <div className="flex items-center">
              <Compass className="h-4 w-4 mr-1.5 text-neutral-400" />
              <span>{userProfile.location}</span>
            </div>
          </div>
          
          {/* Social links */}
          <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-neutral-100">
            <a 
              href={userProfile.socialLinks.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-neutral-700 hover:text-primary-600 transition-colors duration-200"
            >
              <Globe className="h-4 w-4 mr-1.5 text-neutral-500" />
              <span>Website</span>
            </a>
            <a 
              href={userProfile.socialLinks.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-neutral-700 hover:text-primary-600 transition-colors duration-200"
            >
              <Github className="h-4 w-4 mr-1.5 text-neutral-500" />
              <span>GitHub</span>
            </a>
            <a 
              href={userProfile.socialLinks.twitter} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-neutral-700 hover:text-primary-600 transition-colors duration-200"
            >
              <Twitter className="h-4 w-4 mr-1.5 text-neutral-500" />
              <span>Twitter</span>
            </a>
            <a 
              href={userProfile.socialLinks.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-neutral-700 hover:text-primary-600 transition-colors duration-200"
            >
              <Linkedin className="h-4 w-4 mr-1.5 text-neutral-500" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
        
        {/* Two-column layout for categories and projects */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Categories */}
          <div className="lg:col-span-1">
            {/* Interests section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
                <Tag className="h-5 w-5 mr-2 text-primary-500" />
                Interests
              </h2>
              <div className="space-y-3">
                {userProfile.interests.map((interest, index) => (
                  <div 
                    key={index} 
                    className="flex items-center p-2 rounded-md hover:bg-neutral-50 transition-colors duration-200 cursor-pointer"
                  >
                    <div className="p-1.5 bg-primary-50 rounded-md text-primary-600 mr-3">
                      {interest.icon}
                    </div>
                    <span className="text-neutral-800">{interest.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Subcommunities section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
                <Users className="h-5 w-5 mr-2 text-primary-500" />
                Subcommunities
              </h2>
              <div className="space-y-3">
                {userProfile.subcommunities.map((community, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-2 rounded-md hover:bg-neutral-50 transition-colors duration-200 cursor-pointer"
                  >
                    <span className="text-neutral-800">{community.name}</span>
                    <span className="text-xs text-neutral-500 bg-neutral-100 px-2 py-1 rounded-full">
                      {community.members.toLocaleString()} members
                    </span>
                  </div>
                ))}
                <button className="w-full mt-2 flex items-center justify-center p-2 text-sm text-primary-600 hover:bg-primary-50 rounded-md transition-colors duration-200">
                  <Plus className="h-4 w-4 mr-1.5" />
                  Join more communities
                </button>
              </div>
            </div>
          </div>
          
          {/* Right column - Projects */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
                  <Briefcase className="h-5 w-5 mr-2 text-primary-500" />
                  Projects
                </h2>
                
                {/* Sort options */}
                <div className="flex items-center">
                  <span className="text-sm text-neutral-500 mr-2">Sort by:</span>
                  <div className="relative">
                    <button className="flex items-center text-sm font-medium text-neutral-700 hover:text-primary-600 transition-colors duration-200">
                      {sortOption === 'newest' && 'Newest'}
                      {sortOption === 'most_upvoted' && 'Most Upvoted'}
                      {sortOption === 'most_commented' && 'Most Commented'}
                      {sortOption === 'most_visited' && 'Most Visited'}
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </button>
                    
                    {/* Dropdown menu */}
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                      <button
                        onClick={() => handleSortChange('newest')}
                        className={`block px-4 py-2 text-sm w-full text-left ${sortOption === 'newest' ? 'bg-primary-50 text-primary-600' : 'text-neutral-700 hover:bg-neutral-50'}`}
                      >
                        Newest
                      </button>
                      <button
                        onClick={() => handleSortChange('most_upvoted')}
                        className={`block px-4 py-2 text-sm w-full text-left ${sortOption === 'most_upvoted' ? 'bg-primary-50 text-primary-600' : 'text-neutral-700 hover:bg-neutral-50'}`}
                      >
                        Most Upvoted
                      </button>
                      <button
                        onClick={() => handleSortChange('most_commented')}
                        className={`block px-4 py-2 text-sm w-full text-left ${sortOption === 'most_commented' ? 'bg-primary-50 text-primary-600' : 'text-neutral-700 hover:bg-neutral-50'}`}
                      >
                        Most Commented
                      </button>
                      <button
                        onClick={() => handleSortChange('most_visited')}
                        className={`block px-4 py-2 text-sm w-full text-left ${sortOption === 'most_visited' ? 'bg-primary-50 text-primary-600' : 'text-neutral-700 hover:bg-neutral-50'}`}
                      >
                        Most Visited
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Projects grid */}
              {userProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {userProjects.map((project, index) => (
                    <div 
                      key={project.id} 
                      className="bg-white border border-neutral-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
                      onClick={() => {
                        setProject(project);
                        setUpvotes(project.metrics.upvotes);
                        setShowProjectDetail(true);
                      }}
                    >
                      <div className="relative">
                        <img 
                          src={project.thumbnail} 
                          alt={project.title} 
                          className="w-full h-40 object-cover"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://via.placeholder.com/400x200?text=Project+Image';
                            target.onerror = null;
                          }}
                        />
                        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1">
                          <span className="text-xs text-white">{formatDate(project.createdAt)}</span>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-neutral-900 mb-1">{project.title}</h3>
                        <p className="text-neutral-600 text-sm mb-3 line-clamp-2">{project.description}</p>
                        
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {project.tags.slice(0, 3).map((tag, index) => (
                            <span 
                              key={index} 
                              className="inline-block bg-neutral-100 rounded-full px-2.5 py-0.5 text-xs font-medium text-neutral-800"
                            >
                              {tag}
                            </span>
                          ))}
                          {project.tags.length > 3 && (
                            <span className="inline-block bg-neutral-100 rounded-full px-2.5 py-0.5 text-xs font-medium text-neutral-500">
                              +{project.tags.length - 3} more
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between text-neutral-500 text-sm">
                          <div className="flex items-center space-x-3">
                            <span className="flex items-center">
                              <ArrowUp className="h-3.5 w-3.5 mr-1 text-neutral-400" />
                              {project.metrics.upvotes}
                            </span>
                            <span className="flex items-center">
                              <MessageSquare className="h-3.5 w-3.5 mr-1 text-neutral-400" />
                              {project.metrics.comments}
                            </span>
                            <span className="flex items-center">
                              <Share2 className="h-3.5 w-3.5 mr-1 text-neutral-400" />
                              {project.metrics.shares}
                            </span>
                          </div>
                          <span className="text-xs">{project.metrics.visits} views</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-100 mb-4">
                    <Briefcase className="h-8 w-8 text-neutral-400" />
                  </div>
                  <h3 className="text-lg font-medium text-neutral-900 mb-2">No projects yet</h3>
                  <p className="text-neutral-600 mb-6 max-w-md mx-auto">
                    Start building your first project with ChatAndBuild and showcase your creativity to the community.
                  </p>
                  <a 
                    href="https://chatandbuild.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors duration-200 shadow-sm"
                  >
                    <Plus className="h-4 w-4 mr-1.5" />
                    Create Project
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
