import { useState, useEffect } from 'react';

// Define the Profile type
interface Profile {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  location: string;
  email: string;
  website: string;
  github: string;
  twitter: string;
  telegram: string;
  slack: string;
  discord: string;
  linkedin: string;
  skills: string[];
  projects: any[]; // This would be more specific in a real app
}

// Create a hook for profile management
export const useProfile = () => {
  // Initialize with data from localStorage or empty values
  const [profile, setProfile] = useState<Profile | null>(() => {
    const savedProfile = localStorage.getItem('userProfile');
    return savedProfile ? JSON.parse(savedProfile) : null;
  });

  // Save to localStorage whenever profile changes
  useEffect(() => {
    if (profile) {
      localStorage.setItem('userProfile', JSON.stringify(profile));
    }
  }, [profile]);

  // Function to update the profile
  const updateProfile = (newProfileData: Profile) => {
    setProfile(newProfileData);
  };

  return { profile, updateProfile };
};
