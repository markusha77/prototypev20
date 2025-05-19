/**
 * Utility functions for handling scroll position management
 */

/**
 * Save the current scroll position to session storage
 * @param key - The key to store the scroll position under
 */
export const saveScrollPosition = (key: string): void => {
  try {
    const scrollY = window.scrollY;
    sessionStorage.setItem(key, scrollY.toString());
  } catch (error) {
    console.warn('Failed to save scroll position:', error);
  }
};

/**
 * Restore scroll position from session storage
 * @param key - The key the scroll position was stored under
 * @param behavior - The scroll behavior ('auto' or 'smooth')
 */
export const restoreScrollPosition = (key: string, behavior: ScrollBehavior = 'auto'): void => {
  try {
    const savedPosition = sessionStorage.getItem(key);
    
    if (savedPosition) {
      // Use requestAnimationFrame for smoother scrolling after render
      requestAnimationFrame(() => {
        window.scrollTo({
          top: parseInt(savedPosition, 10),
          behavior
        });
      });
    }
  } catch (error) {
    console.warn('Failed to restore scroll position:', error);
  }
};

/**
 * Clear a saved scroll position from session storage
 * @param key - The key the scroll position was stored under
 */
export const clearScrollPosition = (key: string): void => {
  try {
    sessionStorage.removeItem(key);
  } catch (error) {
    console.warn('Failed to clear scroll position:', error);
  }
};
