import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';
import Button from './ui/Button';
import { MapPin, Mail, Globe, Github, Twitter, Linkedin, ExternalLink, Code, ArrowLeft, Edit } from 'lucide-react';

const ProfilePreview: React.FC = () => {
  const { profile } = useProfile();
  const navigate = useNavigate();
  
  if (!profile) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-t-lg">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <img 
            src={profile.avatar || 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80'} 
            alt={profile.name} 
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
          />
          
          <div className="text-center md:text-left flex-grow">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start">
              <div>
                <h1 className="text-3xl font-bold mb-2">{profile.name}</h1>
                <p className="text-xl text-blue-100 mb-4">{profile.title}</p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => navigate('/profile')}
                className="bg-white/20 border-white/40 text-white hover:bg-white/30 mt-2 md:mt-0"
              >
                <Edit size={16} className="mr-2" />
                Edit Profile
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
              {profile.location && (
                <div className="flex items-center">
                  <MapPin size={18} className="mr-1" />
                  <span>{profile.location}</span>
                </div>
              )}
              
              {profile.email && (
                <div className="flex items-center">
                  <Mail size={18} className="mr-1" />
                  <a href={`mailto:${profile.email}`} className="hover:underline">
                    {profile.email}
                  </a>
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              {profile.website && (
                <a 
                  href={profile.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center hover:underline"
                >
                  <Globe size={18} className="mr-1" />
                  Website
                </a>
              )}
              
              {profile.github && (
                <a 
                  href={profile.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center hover:underline"
                >
                  <Github size={18} className="mr-1" />
                  GitHub
                </a>
              )}
              
              {profile.twitter && (
                <a 
                  href={profile.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center hover:underline"
                >
                  <Twitter size={18} className="mr-1" />
                  Twitter
                </a>
              )}
              
              {profile.linkedin && (
                <a 
                  href={profile.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center hover:underline"
                >
                  <Linkedin size={18} className="mr-1" />
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-8 rounded-b-lg shadow-md">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">About Me</h2>
          <p className="text-gray-700 whitespace-pre-line">{profile.bio}</p>
        </div>
        
        {profile.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Skills & Technologies</h2>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map(skill => (
                <span 
                  key={skill} 
                  className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
            <Button 
              variant="outline" 
              onClick={() => navigate('/projects')}
              className="mt-2 md:mt-0"
            >
              <Edit size={16} className="mr-2" />
              Edit Projects
            </Button>
          </div>
          
          {profile.projects.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No projects added yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profile.projects.map(project => (
                <div 
                  key={project.id} 
                  className="border border-gray-200 rounded-lg overflow-hidden flex flex-col"
                >
                  <div className="h-48">
                    <img 
                      src={project.image || 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'} 
                      alt={project.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
                      }}
                    />
                  </div>
                  
                  <div className="p-4 flex-grow">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                    
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {project.categories.map(category => (
                          <span 
                            key={category} 
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map(tech => (
                          <span 
                            key={tech} 
                            className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                            +{project.technologies.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border-t border-gray-200 bg-gray-50 flex gap-4">
                    {project.demoUrl && (
                      <a 
                        href={project.demoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                      >
                        <ExternalLink size={16} className="mr-1" />
                        View Demo
                      </a>
                    )}
                    
                    {project.repoUrl && (
                      <a 
                        href={project.repoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800"
                      >
                        <Code size={16} className="mr-1" />
                        View Code
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/builder')}
            className="flex items-center"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Portfolio
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePreview;
