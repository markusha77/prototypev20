import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the Profile type
interface Profile {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  location: string;
  website: string;
  github: string;
  twitter: string;
  linkedin: string;
  skills: string[];
  projects: Project[];
}

// Define the Project type
interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  demoUrl?: string;
  repoUrl?: string;
  categories: string[];
  technologies: string[];
  additionalImages?: string[];
  createdAt: string;
}

// Define the context type
interface ProfileContextType {
  profile: Profile | null;
  updateProfile: (profile: Profile) => void;
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (projectId: string) => void;
}

// Create the context
const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

// Create a provider component
export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<Profile | null>({
    id: '1',
    name: 'Jane Developer',
    bio: 'Full-stack developer passionate about creating intuitive user experiences',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80',
    location: 'San Francisco, CA',
    website: 'https://janedeveloper.com',
    github: 'janedeveloper',
    twitter: 'janedeveloper',
    linkedin: 'janedeveloper',
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
    projects: [
      {
        id: '1',
        title: 'E-commerce Platform',
        description: 'A full-featured e-commerce platform with product management, cart, and checkout functionality.',
        image: 'https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        demoUrl: 'https://ecommerce-demo.com',
        repoUrl: 'https://github.com/janedeveloper/ecommerce',
        categories: ['Web Development', 'E-commerce'],
        technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
        createdAt: '2023-01-15T00:00:00Z'
      },
      {
        id: '2',
        title: 'Task Management App',
        description: 'A productivity app for managing tasks, projects, and team collaboration.',
        image: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        demoUrl: 'https://taskmanager-demo.com',
        repoUrl: 'https://github.com/janedeveloper/taskmanager',
        categories: ['Web Development', 'Productivity'],
        technologies: ['Vue.js', 'Firebase', 'Tailwind CSS'],
        createdAt: '2023-03-22T00:00:00Z'
      }
    ]
  });

  const updateProfile = (updatedProfile: Profile) => {
    setProfile(updatedProfile);
  };

  const addProject = (project: Project) => {
    if (profile) {
      setProfile({
        ...profile,
        projects: [...profile.projects, project]
      });
    }
  };

  const updateProject = (updatedProject: Project) => {
    if (profile) {
      const updatedProjects = profile.projects.map(project => 
        project.id === updatedProject.id ? updatedProject : project
      );
      
      setProfile({
        ...profile,
        projects: updatedProjects
      });
    }
  };

  const deleteProject = (projectId: string) => {
    if (profile) {
      const updatedProjects = profile.projects.filter(project => project.id !== projectId);
      
      setProfile({
        ...profile,
        projects: updatedProjects
      });
    }
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, addProject, updateProject, deleteProject }}>
      {children}
    </ProfileContext.Provider>
  );
};

// Create a hook to use the profile context
export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
