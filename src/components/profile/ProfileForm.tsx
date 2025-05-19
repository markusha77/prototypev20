import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useProfile } from '../../hooks/useProfile';
import Input from './ui/Input';
import TextArea from './ui/TextArea';
import MultiSelect from './ui/MultiSelect';
import Button from './ui/Button';
import { TECHNOLOGIES } from '../../types';
import { User, MapPin, Mail, Upload, Trash2, Globe, Github, Linkedin, MessageSquare } from 'lucide-react';
import { Modal } from '../common/Modal';

const ProfileForm: React.FC = () => {
  // This would normally come from a context, but we'll mock it for now
  const { profile, updateProfile } = {
    profile: null,
    updateProfile: (data: any) => console.log('Profile updated:', data)
  };
  
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Check if we came from the profile page
  const fromProfile = location.state?.from === '/profile' || document.referrer.includes('/profile');
  
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    title: profile?.title || '',
    bio: profile?.bio || '',
    avatar: profile?.avatar || '',
    location: profile?.location || '',
    email: profile?.email || '',
    website: profile?.website || '',
    github: profile?.github || '',
    twitter: profile?.twitter || '',
    telegram: profile?.telegram || '',
    slack: profile?.slack || '',
    discord: profile?.discord || '',
    linkedin: profile?.linkedin || '',
    skills: profile?.skills || [],
    projects: profile?.projects || []
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProfilePictureModalOpen, setIsProfilePictureModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSkillsChange = (skills: string[]) => {
    setFormData(prev => ({ ...prev, skills }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    // Removed bio validation as it's no longer required
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    updateProfile({
      ...formData,
      projects: formData.projects || []
    });
    
    // Conditional navigation based on where the user came from
    if (fromProfile) {
      navigate('/profile');
    } else {
      navigate('/projects');
    }
  };

  const handleCancel = () => {
    // Conditional navigation based on where the user came from
    if (fromProfile) {
      navigate('/profile');
    } else {
      navigate('/builder');
    }
  };

  const handleDeleteProfilePicture = () => {
    setFormData(prev => ({ ...prev, avatar: '' }));
    setIsProfilePictureModalOpen(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
    setIsProfilePictureModalOpen(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const defaultAvatar = '';

  // Custom Slack icon component
  const SlackIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-gray-500"
    >
      <path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z" />
      <path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
      <path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z" />
      <path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z" />
      <path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z" />
      <path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z" />
      <path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z" />
      <path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z" />
    </svg>
  );

  // Improved X (Twitter) icon component based on web reference
  const XIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-gray-500"
    >
      <path d="M4 4l16 16" />
      <path d="M20 4L4 20" />
    </svg>
  );

  // Custom Telegram icon component
  const TelegramIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-gray-500"
    >
      <path d="M21.5 4.5L2.5 12.5L11.5 14.5L14.5 21.5L21.5 4.5Z" />
      <path d="M11.5 14.5L14.5 11.5" />
    </svg>
  );

  // Improved Discord icon component based on web reference
  const DiscordIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-gray-500"
    >
      <path d="M18 9a4 4 0 0 0-4-4H10a4 4 0 0 0-4 4v5a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4V9Z" />
      <circle cx="9" cy="12" r="1" />
      <circle cx="15" cy="12" r="1" />
      <path d="M8 7.5c0-1 .5-2.5 2-2.5" />
      <path d="M16 7.5c0-1-.5-2.5-2-2.5" />
      <path d="M8.5 16.5S9.5 18 12 18s3.5-1.5 3.5-1.5" />
    </svg>
  );

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      <div className="flex items-center mb-8">
        <div className="w-2 h-8 bg-indigo-600 rounded-full mr-3"></div>
        <h2 className="text-2xl font-bold text-gray-800">Your Profile</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                error={errors.name}
                fullWidth
                required
                icon={<User size={18} className="text-gray-500" />}
              />
              
              <Input
                label="Professional Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Full Stack Developer"
                error={errors.title}
                fullWidth
                required
              />
            </div>
            
            <TextArea
              label="Bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself, your experience, and what you're passionate about"
              error={errors.bio}
              fullWidth
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, Country"
                fullWidth
                icon={<MapPin size={18} className="text-gray-500" />}
              />
              
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                error={errors.email}
                fullWidth
                required
                icon={<Mail size={18} className="text-gray-500" />}
              />
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="mb-3">
              <h3 className="text-sm font-medium text-gray-700 mb-2 text-center">
                Profile Picture
              </h3>
              <div 
                className={`relative w-48 h-48 rounded-full overflow-hidden border-2 ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 bg-gray-50'} transition-all duration-200 flex items-center justify-center cursor-pointer`}
                onClick={triggerFileInput}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {formData.avatar ? (
                  <img 
                    src={formData.avatar} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-4 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">
                      Click or drag image here
                    </p>
                  </div>
                )}
                
                <input 
                  ref={fileInputRef}
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleFileUpload}
                />
              </div>
            </div>
            
            <div className="flex space-x-2 mt-2">
              <button
                type="button"
                onClick={triggerFileInput}
                className="px-3 py-1.5 text-xs bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100 transition-colors"
              >
                Upload
              </button>
              {formData.avatar && (
                <button
                  type="button"
                  onClick={handleDeleteProfilePicture}
                  className="px-3 py-1.5 text-xs bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Social Profiles Section */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <div className="flex items-center mb-4">
            <div className="w-1.5 h-6 bg-indigo-400 rounded-full mr-3"></div>
            <h3 className="text-lg font-medium text-gray-800">Social Profiles (optional)</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://yourportfolio.com"
              fullWidth
              icon={<Globe size={18} className="text-gray-500" />}
            />
            
            <Input
              label="GitHub"
              name="github"
              value={formData.github}
              onChange={handleChange}
              placeholder="https://github.com/yourusername"
              fullWidth
              icon={<Github size={18} className="text-gray-500" />}
            />
            
            <Input
              label="X"
              name="twitter"
              value={formData.twitter}
              onChange={handleChange}
              placeholder="https://twitter.com/yourusername"
              fullWidth
              icon={<XIcon />}
            />
            
            <Input
              label="Telegram"
              name="telegram"
              value={formData.telegram}
              onChange={handleChange}
              placeholder="Telegram username"
              fullWidth
              icon={<TelegramIcon />}
            />
            
            <Input
              label="Slack"
              name="slack"
              value={formData.slack}
              onChange={handleChange}
              placeholder="Slack handle"
              fullWidth
              icon={<SlackIcon />}
            />
            
            <Input
              label="Discord"
              name="discord"
              value={formData.discord}
              onChange={handleChange}
              placeholder="https://discord.com/users/yourusername"
              fullWidth
              icon={<DiscordIcon />}
            />
            
            <Input
              label="LinkedIn"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/yourusername"
              fullWidth
              icon={<Linkedin size={18} className="text-gray-500" />}
            />
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-xl">
          <div className="flex items-center mb-4">
            <div className="w-1.5 h-6 bg-indigo-400 rounded-full mr-3"></div>
            <h3 className="text-lg font-medium text-gray-800">Skills & Technologies</h3>
          </div>
          
          <MultiSelect
            options={TECHNOLOGIES}
            selectedValues={formData.skills}
            onChange={handleSkillsChange}
            placeholder="Select or type to add skills"
          />
        </div>
        
        <div className="flex justify-end space-x-4 pt-6">
          <Button 
            type="button" 
            variant="outline"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button type="submit">
            Save & Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
