import { useEffect } from 'react';

/**
 * Hook to save and restore scroll position
 * 
 * This hook handles:
 * 1. Saving scroll position when navigating away from a page
 * 2. Restoring scroll position when returning to a page
 * 3. Providing fallbacks for browsers without sessionStorage
 */
export const useScrollPosition = (
  key: string = 'scrollPosition',
  shouldRestore: boolean = true
) => {
  // Save current scroll position before unmounting
  useEffect(() => {
    // Function to save scroll position
    const saveScrollPosition = () => {
      try {
        const scrollY = window.scrollY;
        sessionStorage.setItem(key, scrollY.toString());
      } catch (error) {
        console.warn('Failed to save scroll position:', error);
      }
    };

    // Save position when component unmounts
    return () => {
      saveScrollPosition();
    };
  }, [key]);

  // Restore scroll position on mount if needed
  useEffect(() => {
    if (!shouldRestore) return;

    // Function to restore scroll position with a small delay to ensure DOM is ready
    const restoreScrollPosition = () => {
      try {
        const savedPosition = sessionStorage.getItem(key);
        
        if (savedPosition) {
          // Use requestAnimationFrame for smoother scrolling after render
          requestAnimationFrame(() => {
            window.scrollTo({
              top: parseInt(savedPosition, 10),
              behavior: 'auto' // Use 'auto' instead of 'smooth' to prevent visual jumps
            });
          });
        }
      } catch (error) {
        console.warn('Failed to restore scroll position:', error);
      }
    };

    // Small timeout to ensure DOM is fully rendered
    const timeoutId = setTimeout(restoreScrollPosition, 0);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, [key, shouldRestore]);
};

export default useScrollPosition;
