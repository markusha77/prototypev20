import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';
import Button from './ui/Button';
import { Edit, Trash2, ExternalLink, Github, Plus, ArrowLeft, Save, Eye } from 'lucide-react';
import { getProjectViewCount } from '../../utils/viewCountUtils';

const ProjectList: React.FC = () => {
  const { profile, deleteProject } = useProfile();
  const navigate = useNavigate();
  
  const handleEdit = (projectId: string) => {
    navigate(`/projects/edit/${projectId}`);
  };
  
  const handleDelete = (projectId: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProject(projectId);
    }
  };
  
  const handleSaveAndExit = () => {
    // Navigate to the community main page
    navigate('/community');
  };
  
  // Get view count for a project
  const getViews = (projectId: string) => {
    return getProjectViewCount(projectId) || 0;
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Your Projects</h2>
        <Button 
          onClick={() => navigate('/projects/new')}
          className="flex items-center space-x-2"
        >
          <Plus size={18} />
          <span>Add Project</span>
        </Button>
      </div>
      
      {profile?.projects.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-700 mb-2">No projects yet</h3>
          <p className="text-gray-500 mb-6">Showcase your work by adding your first project</p>
          <Button 
            onClick={() => navigate('/projects/new')}
            className="flex items-center space-x-2 mx-auto"
          >
            <Plus size={18} />
            <span>Add Your First Project</span>
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {profile?.projects.map(project => (
            <div 
              key={project.id} 
              className="border border-gray-200 rounded-lg overflow-hidden flex flex-col md:flex-row"
            >
              <div className="md:w-1/3 h-48 md:h-auto">
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
              
              <div className="p-6 md:w-2/3 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-800">{project.title}</h3>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Eye size={14} className="mr-1" />
                    <span>{getViews(project.id)} views</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4 flex-grow">{project.description}</p>
                
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
                    {project.technologies.map(tech => (
                      <span 
                        key={tech} 
                        className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 mt-auto">
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
                      <Github size={16} className="mr-1" />
                      View Code
                    </a>
                  )}
                  
                  <div className="flex-grow"></div>
                  
                  <button 
                    onClick={() => handleEdit(project.id)}
                    className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800"
                  >
                    <Edit size={16} className="mr-1" />
                    Edit
                  </button>
                  
                  <button 
                    onClick={() => handleDelete(project.id)}
                    className="inline-flex items-center text-sm text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={16} className="mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-8 flex justify-between">
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            onClick={() => navigate('/builder')}
            className="flex items-center"
          >
            <ArrowLeft size={16} className="mr-2" />
            Cancel
          </Button>
          {/* <Button 
            variant="outline" 
            onClick={() => navigate('/profile')}
          >
            Edit Profile
          </Button> */}
        </div>
        <div className="flex space-x-3">
          {/* <Button 
            variant="primary"
            onClick={handleSaveAndExit}
            className="flex items-center"
          >
            <Save size={16} className="mr-2" />
            Save & Exit
          </Button> */}
          <Button onClick={() => navigate('/preview')}>
            Preview Portfolio
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
