import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { saveScrollPosition } from '../../utils/scrollUtils';

interface BackToProjectsButtonProps {
  variant?: 'default' | 'text' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const BackToProjectsButton: React.FC<BackToProjectsButtonProps> = ({
  variant = 'default',
  size = 'md',
  className = ''
}) => {
  const navigate = useNavigate();
  
  // Size mappings
  const sizeClasses = {
    sm: 'text-xs py-1 px-2',
    md: 'text-sm py-2 px-3',
    lg: 'text-base py-2 px-4'
  };
  
  // Variant mappings
  const variantClasses = {
    default: 'bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow-sm',
    text: 'text-indigo-600 hover:text-indigo-800',
    outline: 'border border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-md'
  };
  
  // Icon size mappings
  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 18
  };
  
  const handleClick = () => {
    // Save scroll position before navigating
    saveScrollPosition('scrollPosition-/community');
    
    // Navigate back to community page
    navigate('/community');
  };
  
  return (
    <button
      onClick={handleClick}
      className={`flex items-center font-medium ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      <ArrowLeft size={iconSizes[size]} className="mr-1" />
      Back to Projects
    </button>
  );
};

export default BackToProjectsButton;
