import { useState, useEffect, useCallback, CSSProperties } from 'react';

interface ContentLoaderOptions {
  scrollToTop?: boolean;
  scrollDelay?: number;
  loadingDelay?: number;
  fadeInDuration?: number;
}

/**
 * Custom hook to manage content loading states and transitions
 * Handles scrolling, loading indicators, and fade-in effects
 */
const useContentLoader = ({
  scrollToTop = true,
  scrollDelay = 100,
  loadingDelay = 300,
  fadeInDuration = 300
}: ContentLoaderOptions = {}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isContentReady, setIsContentReady] = useState(false);
  
  // Content style for fade-in effect
  const contentStyle: CSSProperties = {
    opacity: isContentReady ? 1 : 0,
    transition: `opacity ${fadeInDuration}ms ease-in-out`
  };
  
  // Function to prepare content - handles loading state and scrolling
  const prepareContent = useCallback(() => {
    // Start with loading state
    setIsLoading(true);
    setIsContentReady(false);
    
    // Use setTimeout to simulate network delay and allow UI to update
    const loadingTimer = setTimeout(() => {
      // If scrollToTop is true, scroll to top of page
      if (scrollToTop) {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
      
      // After scroll delay, mark loading as complete
      const scrollTimer = setTimeout(() => {
        setIsLoading(false);
        
        // After a brief delay for rendering, mark content as ready for fade-in
        const fadeTimer = setTimeout(() => {
          setIsContentReady(true);
        }, 50);
        
        return () => clearTimeout(fadeTimer);
      }, scrollDelay);
      
      return () => clearTimeout(scrollTimer);
    }, loadingDelay);
    
    return () => clearTimeout(loadingTimer);
  }, [scrollToTop, scrollDelay, loadingDelay]);
  
  return {
    isLoading,
    isContentReady,
    contentStyle,
    prepareContent
  };
};

export default useContentLoader;
