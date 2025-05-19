import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';
import Input from './ui/Input';
import TextArea from './ui/TextArea';
import MultiSelect from './ui/MultiSelect';
import Button from './ui/Button';
import { Project, CATEGORIES, TECHNOLOGIES } from '../../types';
import { Image, Link, Tag, Code } from 'lucide-react';

const ProjectForm: React.FC = () => {
  const { profile, addProject, updateProject } = useProfile();
  const navigate = useNavigate();
  const { projectId } = useParams();
  
  const emptyProject: Project = {
    id: crypto.randomUUID(),
    title: '',
    description: '',
    image: '',
    demoUrl: '',
    repoUrl: '',
    categories: [],
    technologies: [],
    createdAt: new Date().toISOString()
  };
  
  const existingProject = projectId 
    ? profile?.projects.find(p => p.id === projectId) 
    : null;
  
  const [formData, setFormData] = useState<Project>(existingProject || emptyProject);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (projectId && !existingProject) {
      navigate('/projects');
    }
  }, [projectId, existingProject, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoriesChange = (categories: string[]) => {
    setFormData(prev => ({ ...prev, categories }));
  };

  const handleTechnologiesChange = (technologies: string[]) => {
    setFormData(prev => ({ ...prev, technologies }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.categories.length === 0) newErrors.categories = 'Select at least one category';
    if (formData.technologies.length === 0) newErrors.technologies = 'Select at least one technology';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (existingProject) {
      updateProject(formData);
    } else {
      addProject(formData);
    }
    
    navigate('/projects');
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {existingProject ? 'Edit Project' : 'Add New Project'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <Input
              label="Project Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. E-commerce Platform"
              error={errors.title}
              fullWidth
            />
          </div>
          
          <div className="md:col-span-2">
            <TextArea
              label="Project Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your project, its features, and what problem it solves"
              error={errors.description}
              fullWidth
            />
          </div>
          
          <div>
            <div className="flex items-center space-x-2">
              <Image size={18} className="text-gray-500" />
              <Input
                label="Project Image URL"
                name="image"
                value={formData.image || ''}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                fullWidth
              />
            </div>
          </div>
          
          <div>
            {formData.image && (
              <div className="mt-6">
                <img 
                  src={formData.image} 
                  alt={formData.title} 
                  className="w-full h-40 object-cover rounded-md border border-gray-200"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
                  }}
                />
              </div>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center space-x-2">
              <Link size={18} className="text-gray-500" />
              <Input
                label="Demo URL"
                name="demoUrl"
                value={formData.demoUrl || ''}
                onChange={handleChange}
                placeholder="https://yourdemo.com"
                fullWidth
              />
            </div>
          </div>
          
          <div>
            <div className="flex items-center space-x-2">
              <Code size={18} className="text-gray-500" />
              <Input
                label="Repository URL"
                name="repoUrl"
                value={formData.repoUrl || ''}
                onChange={handleChange}
                placeholder="https://github.com/yourusername/project"
                fullWidth
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <Tag size={18} className="text-gray-500" />
              <label className="block text-sm font-medium text-gray-700">
                Categories
              </label>
            </div>
            <MultiSelect
              options={CATEGORIES}
              selectedValues={formData.categories}
              onChange={handleCategoriesChange}
              placeholder="Select categories"
              error={errors.categories}
            />
          </div>
          
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <Code size={18} className="text-gray-500" />
              <label className="block text-sm font-medium text-gray-700">
                Technologies Used
              </label>
            </div>
            <MultiSelect
              options={TECHNOLOGIES}
              selectedValues={formData.technologies}
              onChange={handleTechnologiesChange}
              placeholder="Select technologies"
              error={errors.technologies}
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-4 pt-4">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => navigate('/projects')}
          >
            Cancel
          </Button>
          <Button type="submit">
            {existingProject ? 'Update Project' : 'Add Project'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
