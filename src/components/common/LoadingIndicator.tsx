import React from 'react';

interface LoadingIndicatorProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'indigo' | 'blue' | 'gray';
  message?: string;
  className?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  size = 'md',
  color = 'indigo',
  message,
  className = ''
}) => {
  // Size mappings
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };
  
  // Color mappings
  const colorClasses = {
    indigo: 'text-indigo-600',
    blue: 'text-blue-600',
    gray: 'text-gray-600'
  };
  
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`animate-spin rounded-full border-t-2 border-b-2 ${colorClasses[color]} ${sizeClasses[size]}`}></div>
      {message && (
        <p className="mt-3 text-sm text-gray-600">{message}</p>
      )}
    </div>
  );
};

export default LoadingIndicator;
