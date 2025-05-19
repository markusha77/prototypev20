/**
 * Format a date string into a human-readable format
 * @param dateString - ISO date string to format
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }
    
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // If less than 1 day ago
    if (diffDays < 1) {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      
      if (diffHours < 1) {
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        return diffMinutes < 1 ? 'just now' : `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
      }
      
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    }
    
    // If less than 7 days ago
    if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    }
    
    // If less than 30 days ago
    if (diffDays < 30) {
      const diffWeeks = Math.floor(diffDays / 7);
      return `${diffWeeks} week${diffWeeks !== 1 ? 's' : ''} ago`;
    }
    
    // If less than 365 days ago
    if (diffDays < 365) {
      const diffMonths = Math.floor(diffDays / 30);
      return `${diffMonths} month${diffMonths !== 1 ? 's' : ''} ago`;
    }
    
    // Otherwise, show the full date
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    
    return date.toLocaleDateString(undefined, options);
  } catch (error) {
    console.warn('Error formatting date:', error);
    return 'Unknown date';
  }
};
